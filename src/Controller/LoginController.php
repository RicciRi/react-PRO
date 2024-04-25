<?php

// src/Controller/LoginController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Routing\Annotation\Route;


#[Route('/api/login', name: 'login', methods: ['POST'])]

class LoginController extends AbstractController
{
    public function login(AuthenticationUtils $authUtils, Request $request): JsonResponse
    {
        $error = $authUtils->getLastAuthenticationError();

        if ($error) {
            return new JsonResponse(['error' => $error->getMessage()], 401);
        }

        $lastUsername = $authUtils->getLastUsername();


        return new JsonResponse([
            'status' => 'Logged in',
            'username' => $lastUsername,
        ], 200);
    }
}
