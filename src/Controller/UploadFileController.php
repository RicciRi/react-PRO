<?php

// src/Controller/EmailController.php
namespace App\Controller;


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
    ): Response
    {
        $user    = $userService->getUserByCookies();
        $subject = $request->request->get('subject');
        $body    = $request->request->get('body');
        $sendTo  = $request->request->get('email');

        /** @var UploadedFile[] $files */

        $files = $request->files->get('files');

        $uploadId       = $generateService->generateUploadId();
        $uploadPassword = $generateService->generatePassword();
        $userId         = $user['id'];
        $uploadTittle   = $subject;
        $uploadMessage  = $body;
        $uploadTime     = new \DateTime();


        $uploadData = new UploadData();
        $uploadData->setUploadId($uploadId);
        $uploadData->setUploadPassword($uploadPassword);
        $uploadData->setUserId($userId);
        $uploadData->setUploadTittle($uploadTittle);
        $uploadData->setUploadMessage($uploadMessage);
        $uploadData->setUploadTime($uploadTime);

        $entityManager->persist($uploadData);

        $email = (new Email())
            ->from('no-reply@example.com')
            ->to($sendTo)
            ->subject($subject)
            ->html($body);

        $fileUrls = [];
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




        $body = '<br>
        <br>
        <p>Hello! You can download your files by this link:</p>
        <br>
        https://localhost:8000/download 
        <br>
        <p>Code: ' . $uploadId . '</p>
        <p>Password: ' . $uploadPassword . '</p>';


        $email->html($body);
        $mailer->send($email);


        return new Response('Email sent!', Response::HTTP_OK);
    }


}


