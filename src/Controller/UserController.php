<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use App\Repository\UserRepository;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/user', name: 'get_user', methods: ['GET'])]
class UserController extends AbstractController
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getCurrentUser(Request $request, JWTEncoderInterface $jwtEncoder): JsonResponse
    {
        // Проверяем, есть ли заголовок Authorization
        $authorizationHeader = $request->headers->get('Authorization');
        if (!$authorizationHeader) {
            return new JsonResponse(['error' => 'Authorization header is missing'], 401);
        }

        // Проверяем, начинается ли заголовок с "Bearer "
        if (!str_starts_with($authorizationHeader, 'Bearer ')) {
            return new JsonResponse(['error' => 'Invalid authorization header format'], 401);
        }

        // Получаем токен и декодируем его
        $token = substr($authorizationHeader, 7);
        $decoded = $jwtEncoder->decode($token);

        if (!$decoded) {
            return new JsonResponse(['error' => 'Invalid token'], 401);
        }

        if (!isset($decoded['email'])) {
            return new JsonResponse(['error' => 'Token does not contain user email'], 401);
        }

        // Находим пользователя по email в базе данных
        $user = $this->userRepository->findOneBy(['email' => $decoded['email']]);
        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        // Возвращаем информацию о пользователе
        return new JsonResponse([
            'email' => $user->getEmail(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
        ]);
    }
}
