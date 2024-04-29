<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use App\Repository\UserRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Cookie;


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
        $cookie = $request->cookies->get('auth_token');

        if (!$cookie) {
            return new JsonResponse(['error' => 'Token not found'], 401); // Токен отсутствует
        }

        $decoded = $jwtEncoder->decode($cookie);

        if (!$decoded) {
            return new JsonResponse(['error' => 'Invalid token'], 401); // Токен недействителен
        }


        if (!isset($decoded['email'])) {
            return new JsonResponse(['error' => 'Token does not contain user email'], 401); // Недействительный токен
        }

        // Находим пользователя по email в базе данных
        $user = $this->userRepository->findOneBy(['email' => $decoded['email']]);
        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        // Возвращаем информацию о пользователе
        return new JsonResponse([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
        ]);
    }
}
