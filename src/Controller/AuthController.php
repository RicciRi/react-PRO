<?php

// src/Controller/AuthController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Cookie;



class AuthController extends AbstractController
{
    public function login(AuthenticationUtils $authUtils): JsonResponse
    {
        $error = $authUtils->getLastAuthenticationError();
        $lastUsername = $authUtils->getLastUsername();

        return new JsonResponse([
            'error' => $error ? $error->getMessage() : null,
            'last_username' => $lastUsername,
        ]);
    }

    public function logout(): JsonResponse
    {
        $cookie = new Cookie(
            'auth_token',
            '',
            time() - 3600, // Удаление токена
            '/',
            null,
            true, // Secure
            true, // HTTP-only
            false,
            'Lax'
        );

        $response = new JsonResponse(['message' => 'Logged out successfully']);
        $response->headers->setCookie($cookie);
        return $response;
    }


    #[Route('/api/check-auth', name: 'check_auth', methods: ['GET'])]
    public function checkAuth(Request $request, JWTEncoderInterface $jwtEncoder): JsonResponse
    {
        $cookie = $request->cookies->get('auth_token'); // Получить куки с токеном

        if (!$cookie) {
            return new JsonResponse(['authenticated' => false], 200); // Пользователь не вошел в систему
        }

        $decoded = $jwtEncoder->decode($cookie); // Декодировать токен

        if (!$decoded) {
            return new JsonResponse(['authenticated' => false], 200); // Токен недействителен
        }

        // Если декодирование успешно, вернуть успешный статус аутентификации
        return new JsonResponse(['authenticated' => true], 200);
    }



}
