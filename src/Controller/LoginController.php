<?php

// src/Controller/LoginController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;


#[Route('/api/login', name: 'login', methods: ['POST'])]

class LoginController extends AbstractController
{
    public function login(AuthenticationUtils $authUtils, Request $request, JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $error = $authUtils->getLastAuthenticationError();

        if ($error) {
            return new JsonResponse(['error' => $error->getMessage()], 401);
        }

        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        $token = $JWTManager->create($user);


        $lastUsername = $authUtils->getLastUsername();


        return new JsonResponse([
            'status' => 'Logged in',
            'username' => $lastUsername,
            'token' => $token,
        ], 200);
    }
}

