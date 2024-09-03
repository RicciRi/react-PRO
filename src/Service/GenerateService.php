<?php

namespace App\Service;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class GenerateService extends AbstractController
{
    public function __construct(
//        private EntityManagerInterface       $entityManager,
//        private LogService                   $logService,
    )
    {
    }

    public function generateUploadId(int $length = 8): string
    {
        return bin2hex(random_bytes($length / 2));
    }

    public function generatePassword(int $length = 6): string
    {
        $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $charactersLength = strlen($characters);
        $randomString = '';

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }

        return $randomString;
    }

}