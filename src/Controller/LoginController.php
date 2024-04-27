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

        $email = $user->getUserIdentifier();


        $tokenPayload = [
            'email' => $email,
            'iat' => time(),  // время создания токена
            'exp' => time() + 3600,  // время истечения токена
        ];


        $token = $JWTManager->createFromPayload($user, $tokenPayload);

        $userInfo = [
            'id' => $user->getId(),
            'email' => $email,
            'role' => $user->getRoles(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
        ];


        return new JsonResponse([
            'userInfo' => $userInfo,
            'token' => $token,
            'user' => $user
        ], 200);
    }
}

