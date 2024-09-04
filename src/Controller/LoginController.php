<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;

// Подключение Doctrine
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;

// Подключение сущности User


class LoginController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager; // Внедрение зависимости Doctrine
    }

    #[Route('/api/login', name: 'login', methods: ['POST'])]
    public function login(
        Request                     $request,
        UserPasswordHasherInterface $passwordHasher,
        JWTTokenManagerInterface    $JWTManager,
    ): JsonResponse
    {
        $requestData = json_decode($request->getContent(), true); // Парсинг данных из запроса
        $email       = $requestData['email'];
        $password    = $requestData['password'];

        // Поиск пользователя по email
        $user = $this->entityManager
            ->getRepository(User::class) // Используем EntityManager
            ->findOneBy(['email' => $email]);

        if (!$user) { // Если пользователь не найден
            return new JsonResponse(['error' => 'User not found'], 404); // Ошибка 404
        }

        $isConfirmed = $user->getIsConfirmed();

        if (!$isConfirmed) {
            return new JsonResponse([
                                        'error' => "You didn't confirm your email!",
                                                                                                                                                                                                                            'confirmEmail' => true,
                                    ], 404); // Ошибка 404
        }


        // Проверка пароля
        if (!$passwordHasher->isPasswordValid($user, $password)) { // Если пароль неверен
            return new JsonResponse(['error' => 'Invalid password'], 401); // Ошибка 401
        }

        // Генерация JWT токена при успешной аутентификации
        $tokenTTL = $this->getParameter('lexik_jwt_authentication.token_ttl'); // Получаем время жизни токена

        $tokenPayload = [
            'email'     => $user->getEmail(),
            'id'        => $user->getId(),
            'firstName' => $user->getFirstName(),
            'lastName'  => $user->getLastName(),
            'iat'       => time(),
            'exp'       => time() + $tokenTTL,

        ];

        $token = $JWTManager->createFromPayload($user, $tokenPayload); // Генерация токена

        // Установка куки с токеном
        $cookie = new Cookie(
            'auth_token',
            $token,
            strtotime('+1 hour'), // Время жизни куки
            '/',
            null,
            true, // Secure
            false, // HTTP-only
            false,
            'Lax', // SameSite
        );

        $response = new JsonResponse([
                                         'userInfo' => [
                                             'id'        => $user->getId(),
                                             'email'     => $user->getEmail(),
                                             'roles'     => $user->getRoles(),
                                             'firstName' => $user->getFirstName(),
                                             'lastName'  => $user->getLastName(),
                                         ],
                                     ]);

        // Добавляем куки в заголовок ответа
        $response->headers->setCookie($cookie);
        return $response;
    }
}
