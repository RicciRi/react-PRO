<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class ConfirmationController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserRepository $userRepository;
    private MailerInterface $mailer;

    public function __construct(EntityManagerInterface $entityManager, UserRepository $userRepository, MailerInterface $mailer)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->mailer = $mailer;
    }

    #[Route('/api/send-confirmation', name: 'send_confirmation', methods: ['POST'])]
    public function sendConfirmationEmail(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? '';

        // Поиск пользователя по email
        $user = $this->userRepository->findOneBy(['email' => $email]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        if ($user->getIsConfirmed()) {
            return new JsonResponse(['message' => 'Account is already confirmed'], 200);
        }

        // Генерация кода подтверждения
        $confirmationCode = bin2hex(random_bytes(16));
        $expirationTime = new \DateTime('+24 hours'); // Время жизни 24 часа
        $user->setConfirmationCode($confirmationCode);
        $user->setConfirmationCodeExpiration($expirationTime);

        // Сохранение изменений
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        // Отправка электронного письма с кодом подтверждения
        $emailMessage = (new Email())
            ->from('no-reply@example.com')
            ->to($email)
            ->subject('Please confirm your account')
            ->text("Use the following code to confirm your account: $confirmationCode");

        $this->mailer->send($emailMessage);

        return new JsonResponse(['message' => 'Confirmation email sent'], 200);
    }

    #[Route('/api/confirm-email', name: 'confirm_email', methods: ['POST'])]
    public function confirmEmail(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $confirmationCode = $data['confirmationCode'] ?? '';

        // Поиск пользователя по коду подтверждения
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['confirmationCode' => $confirmationCode]);

        if (!$user) {
            return new JsonResponse(['error' => 'Invalid confirmation code'], 404);
        }

        // Подтверждение учетной записи
        $user->setIsConfirmed(true);
        $user->setConfirmationCode(null); // Сброс кода после подтверждения

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Account confirmed successfully'], 200);
    }
}
