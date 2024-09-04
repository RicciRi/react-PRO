<?php

namespace App\Controller;

use App\Repository\UploadDataRepository;
use App\Repository\UploadedFilesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class DownloadController extends AbstractController
{
    private $uploadDataRepository;
    private $uploadedFilesRepository;

    public function __construct(
        UploadDataRepository $uploadDataRepository,
        UploadedFilesRepository $uploadedFilesRepository
    )
    {
        $this->uploadDataRepository    = $uploadDataRepository;
        $this->uploadedFilesRepository = $uploadedFilesRepository;

    }

    #[Route('/download/login', name: 'download_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data     = json_decode($request->getContent(), true); // Получаем JSON-данные
        $uploadId = $data['uploadId'] ?? null;
        $password = $data['password'] ?? null;

        if (empty($uploadId) || empty($password)) {
            return $this->json(['error' => 'Upload ID and password required'], 400);
        }

        $uploadData = $this->uploadDataRepository->findOneBy(['uploadId' => $uploadId]);

        if (!$uploadData) {
            return $this->json(['error' => 'Invalid Upload ID'], 401);
        }

        $uploadTime    = $uploadData->getUploadTime();
        $formattedTime = $uploadTime->format('Y-m-d H:i');

        $uploadFiles = $this->uploadedFilesRepository->findBy(['uploadId' => $uploadId]);

        $filesArray = array_map(function($file) {
            return [
                'originalFileName' => $file->getOriginalFileName(),
                'fileName' => $file->getFileName(),
                'id' => $file->getId()
            ];
        }, $uploadFiles);

        return $this->json([
                               'files'       => $filesArray,
                               'upload_data' => [
                                   'message' => $uploadData->getUploadMessage(),
                                   'title'   => $uploadData->getUploadTittle(),
                                   'id'      => $uploadData->getUploadId(),
                                   'time'    => $formattedTime,
                                   ],
                           ]);
    }

    #[Route('/download/file/{id}', name: 'download_file', methods: ['GET'])]
    public function downloadFile($id, UploadedFilesRepository $uploadedFilesRepository): Response
    {
        // Находим файл по ID
        $file = $uploadedFilesRepository->find($id);

        if (!$file) {
            return $this->json(['error' => 'File not found'], 404);
        }

        $filePath = $this->getParameter('kernel.project_dir') . '/public/uploads/files/' . $file->getFileName();

        if (!file_exists($filePath)) {
            return $this->json(['error' => 'File not found on server'], 404);
        }

        // Отправляем файл на скачивание
        $response = new BinaryFileResponse($filePath);
        $response->setContentDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            $file->getOriginalFileName()
        );

        return $response;
    }
}
