<?php

namespace App\Controller;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;



#[Route('/api/register', name: 'register_user', methods: ['POST'])]

class RegistrationController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserRepository $userRepository;
    private MailerInterface $mailer;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function register(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'];
        $existingUser = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

        if ($existingUser) {
            if (!$existingUser->getIsConfirmed()) {
                // Проверьте, истек ли код подтверждения
                if ($existingUser->getConfirmationCodeExpiration() < new \DateTime()) {
                    // Генерируйте новый код, если истек
                    $confirmationCode = bin2hex(random_bytes(16));
                    $expirationTime = new \DateTime('+24 hours');
                    $existingUser->setConfirmationCode($confirmationCode);
                    $existingUser->setConfirmationCodeExpiration($expirationTime);

                    $this->entityManager->persist($existingUser);
                    $this->entityManager->flush();

                    // Отправьте новый код подтверждения
                    $emailMessage = (new Email())
                        ->from('no-reply@example.com')
                        ->to($email)
                        ->subject('Please confirm your account')
                        ->text("Use this code to confirm your account: $confirmationCode");

                    $this->mailer->send($emailMessage);
                }

                return new JsonResponse([
                    'error' => 'Account not confirmed. A new confirmation code has been sent to your email.',
                    'confirmEmail' => true
                ], 400);
            }

            // Если аккаунт подтвержден, вернуть ошибку "Email already in use"
            return new JsonResponse(['error' => 'Email already in use'], 400);
        }

        $user = new User();
        $user->setEmail($data['email']);
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);


        $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        // save user
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'User created!'], 201);
    }
}