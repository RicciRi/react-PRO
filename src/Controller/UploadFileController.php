<?php

namespace App\Controller;


use App\Entity\Contact;
use App\Entity\UploadData;
use App\Entity\UploadedFiles;
use App\Entity\User;
use App\Service\GenerateService;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Twig\Environment;
use Symfony\Component\HttpFoundation\JsonResponse;


class UploadFileController extends AbstractController
{

    #[Route('/api/upload', name: 'api_upload', methods: ['POST'])]
    public function upload(
        Request                $request,
        MailerInterface        $mailer,
        SluggerInterface       $slugger,
        EntityManagerInterface $entityManager,
        GenerateService        $generateService,
        UserService            $userService,
        Environment            $twig,
    ): Response
    {
        $user    = $userService->getUserByCookies();
        $title   = $request->request->get('subject');
        $message = $request->request->get('body');
        // $sendTo  = $request->request->get('email');

        $contacts = $request->request->all('contacts'); // Получаем все контакты как массив


        /** @var UploadedFile[] $files */

        $files = $request->files->get('files');

        $uploadId       = $generateService->generateUploadId();
        $uploadPassword = $generateService->generatePassword();
        $userId         = $user['id'];
        $uploadTittle   = $title;
        $uploadMessage  = $message;
        $uploadTime     = new \DateTime();

        $uploadData = new UploadData();
        $uploadData->setUploadId($uploadId);
        $uploadData->setUploadPassword($uploadPassword);
        $uploadData->setUserId($userId);
        $uploadData->setUploadTittle($uploadTittle);
        $uploadData->setUploadMessage($uploadMessage);
        $uploadData->setUploadTime($uploadTime);

        $entityManager->persist($uploadData);

        $body = $twig->render('email/upload_template.html.twig', [
            'userName' => $user['firstName'] . ' ' . $user['lastName'],
            'uploadID' => $uploadId,
            'password' => $uploadPassword,
        ]);


//        $email = (new Email())
//            ->from('no-reply@example.com')
//            ->to($sendTo)
//            ->subject($title)
//            ->html($body);

        foreach ($contacts as $contactEmail) {
            $email = (new Email())
                ->from('no-reply@example.com')
                ->to($contactEmail)
                ->subject($title)
                ->html($body);

            $mailer->send($email);
        }

        foreach ($files as $file) {
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename     = $slugger->slug($originalFilename);
            $newFilename      = $safeFilename . '-' . uniqid() . '.' . $file->guessExtension();

            $file->move(
                $this->getParameter('upload_directory'),
                $newFilename,
            );

            $uploadedFiles = new UploadedFiles();
            $uploadedFiles->setFileName($newFilename);
            $uploadedFiles->setOriginalFileName($file->getClientOriginalName());
            $uploadedFiles->setUploadId($uploadId);

            $entityManager->persist($uploadedFiles);
        }

        $entityManager->flush();

        return new Response('Email sent!', Response::HTTP_OK);
    }


    #[Route('/api/search-contacts', name: 'api_search_contacts', methods: ['GET'])]
    public function searchContacts(
        EntityManagerInterface $entityManager,
        Request                $request,
        UserService            $userService,
    ): JsonResponse
    {
        $searchTerm  = $request->query->get('query');
        $currentUser = $userService->getUserByCookies();  // Получаем текущего пользователя

        if (!$searchTerm || !$currentUser) {
            return new JsonResponse([], 200);  // Пустой результат, если нет поискового запроса
        }

        $contacts = $entityManager->getRepository(Contact::class)->searchUserContacts($currentUser['id'], $searchTerm);

        $contactArray = [];
        foreach ($contacts as $contact) {
            $contactArray[] = [
                'id'      => $contact->getId(),
                'email'   => $contact->getEmail(),
                'company' => $contact->getCompany(),
                'name'    => $contact->getName(),
            ];
        }

        return new JsonResponse($contactArray, 200);
    }
}


