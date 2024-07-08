<?php

// src/Controller/ContactController.php
namespace App\Controller;

use App\Entity\Contact;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContactController extends AbstractController
{
    public function __construct(private readonly UserRepository $userRepository)
    {
    }
    #[Route('/api/contacts', name: 'get_contacts', methods: ['GET'])]
    public function getContacts(EntityManagerInterface $entityManager, UserRepository $userRepository): JsonResponse
    {
        $user = $this->userRepository->findOneBy(['id' => $this->getUser()]);
        if ($user) {
            return $this->json($user);
        }
        return new Response('User not authenticated', Response::HTTP_UNAUTHORIZED);

        // Дальнейший код, использующий $userId
        // Например, получение контактов пользователя по его id

//        return $this->json(['userId' => $userId]);

//        if (!$user instanceof User) {
//            return new Response('User not authenticated', Response::HTTP_UNAUTHORIZED);
//        }

//        $contacts = $entityManager->getRepository(Contact::class)->findBy(['user' => $user]);

//        return $this->json($contacts);
    }

//    #[Route('/api/add/contacts', name: 'add_contact', methods: ['POST'])]
//    public function addContact(Request $request, EntityManagerInterface $entityManager): Response
//    {
//        $user = $this->getUser();
//
//        if (!$user instanceof User) {
//            return new Response('User not authenticated', Response::HTTP_UNAUTHORIZED);
//        }
//
//        $data = json_decode($request->getContent(), true);
//
//        $contact = new Contact();
//        $contact->setName($data['name'] ?? '');
//        $contact->setEmail($data['email'] ?? '');
//        $contact->setCompany($data['company'] ?? null);
//        $contact->setUser($user);
//
//        $entityManager->persist($contact);
//        $entityManager->flush();
//
//        return $this->json($contact);
//    }
//
//    #[Route('/api/contacts/{id}', name: 'delete_contact', methods: ['DELETE'])]
//    public function deleteContact(int $id, EntityManagerInterface $entityManager): Response
//    {
//        $user = $this->getUser();
//
//        if (!$user instanceof User) {
//            return new Response('User not authenticated', Response::HTTP_UNAUTHORIZED);
//        }
//
//        $contact = $entityManager->getRepository(Contact::class)->findOneBy(['id' => $id, 'user' => $user]);
//
//        if ($contact) {
//            $entityManager->remove($contact);
//            $entityManager->flush();
//            return new Response('Contact deleted', Response::HTTP_OK);
//        }
//
//        return new Response('Contact not found', Response::HTTP_NOT_FOUND);
//    }
}

