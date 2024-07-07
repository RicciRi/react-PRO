<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use App\Repository\UserRepository;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\Validator\Validator\ValidatorInterface;

// Для валидации
use Symfony\Component\Serializer\SerializerInterface;

// Для десериализации данных
use Doctrine\ORM\EntityManagerInterface;

// Подключение EntityManagerInterface
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

// Импортируем класс
use App\Entity\User;

use Symfony\Component\HttpFoundation\File\Exception\FileException;


class UserController extends AbstractController
{
    private UserRepository           $userRepository;
    private EntityManagerInterface   $entityManager; // Объявление свойства
    private JWTTokenManagerInterface $JWTManager; // Объявление свойства JWTManager


    public function __construct(
        EntityManagerInterface   $entityManager,
        UserRepository           $userRepository,
        JWTTokenManagerInterface $JWTManager, // Внедрение JWTManager
    )
    {
        $this->entityManager  = $entityManager;
        $this->userRepository = $userRepository;
        $this->JWTManager     = $JWTManager; // Инициализация JWTManager

    }

    #[Route('/api/user', name: 'get_user', methods: ['GET'])]
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
                                    'id'        => $user->getId(),
                                    'email'     => $user->getEmail(),
                                    'roles'     => $user->getRoles(),
                                    'firstName' => $user->getFirstName(),
                                    'lastName'  => $user->getLastName(),
                                    'accountImage' => $user->getAccountImage()
                                ]);
    }

    #[Route('/api/user/update', name: 'update_user', methods: ['POST'])]
    public function updateUser(
        Request             $request,
        JWTEncoderInterface $jwtEncoder,
        ValidatorInterface  $validator,

    ): JsonResponse
    {
        $cookie = $request->cookies->get('auth_token');

        if (!$cookie) {
            return new JsonResponse(['error' => 'Token not found'], 401);
        }

        $decoded = $jwtEncoder->decode($cookie);

        if (!$decoded || !isset($decoded['email'])) {
            return new JsonResponse(['error' => 'Invalid token'], 401);
        }

        $user = $this->userRepository->findOneBy(['email' => $decoded['email']]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        // $data = json_decode($request->getContent(), true);
        $data = $request->request->all();
        $file = $request->files->get('AccountImage');

        if ($file) {
            $originalFilename = $file->getClientOriginalName();
            $newFilename      = uniqid() . '.' . $file->guessExtension();

            try {
                $file->move(
                    $this->getParameter('upload_photo_directory'),
                    $originalFilename,
                );
                $user->setAccountImage($originalFilename); // Сохранение имени файла в базе данных
            } catch (FileException $e) {
                return new JsonResponse(['success' => false, 'error' => $e->getMessage()]);
            }
        }

        if (isset($data['firstName'])) {
            $user->setFirstName($data['firstName']);
        }

        if (isset($data['lastName'])) {
            $user->setLastName($data['lastName']);
        }
        $tokenTTL = $this->getParameter('lexik_jwt_authentication.token_ttl'); // Получаем время жизни токена

        $tokenPayload = [
            'email' => $user->getEmail(),
            'iat'   => time(),
            'exp'   => time() + $tokenTTL,
        ];

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $token = $this->JWTManager->createFromPayload($user, $tokenPayload);

        $cookie = new Cookie(
            'auth_token',
            $token,
            strtotime('+1 hour'), // Время жизни куки
            '/',
            null,
            true, // Secure
            true, // HTTP-only
            false,
            'Lax', // SameSite
        );

        $response = new JsonResponse([
                                         'response'     => $data,
                                         'file'         => $file,
                                         'id'           => $user->getId(),
                                         'email'        => $user->getEmail(),
                                         'roles'        => $user->getRoles(),
                                         'firstName'    => $user->getFirstName(),
                                         'lastName'     => $user->getLastName(),
                                         'accountImage' => $user->getAccountImage(),
                                     ]);

        $response->headers->setCookie($cookie);

        return $response;
    }
}