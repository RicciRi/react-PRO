<?php

// src/Controller/EmailController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;

class UploadFileController extends AbstractController
{
    #[Route('/api/upload', name: 'api_upload', methods: ['POST'])]
    public function upload(Request $request, MailerInterface $mailer, SluggerInterface $slugger): Response
    {
        $subject = $request->request->get('subject');
        $body = $request->request->get('body');
        $sendTo = $request->request->get('email');
        /** @var UploadedFile[] $files */
        $files = $request->files->get('files');

        $email = (new Email())
            ->from('no-reply@example.com')
            ->to($sendTo)
            ->subject($subject)
            ->html($body);

        $fileUrls = [];
        foreach ($files as $file) {
            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();

            $file->move(
                $this->getParameter('upload_directory'),
                $newFilename
            );

            $fileUrls[] = $this->generateUrl('download_file', ['filename' => $newFilename], 0);
        }

        $body .= '<br><br>Files:<br>';
        foreach ($fileUrls as $url) {
            $body .= '<a href="'.$url.'">'.$url.'</a><br>';
        }

        $email->html($body);
        $mailer->send($email);

        return new Response('Email sent!', Response::HTTP_OK);
    }

    #[Route('/files/{filename}', name: 'download_file')]
    public function downloadFile($filename): Response
    {
        $filePath = $this->getParameter('files_directory').'/'.$filename;
        return $this->file($filePath);
    }
}
