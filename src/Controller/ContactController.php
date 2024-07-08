<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Entity\User;
use App\Repository\ContactRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;


class ContactController extends AbstractController
{

    #[Route('/api/contacts', name: 'api_contacts', methods: ['POST'])]
    public function getContacts(Request $request, JWTEncoderInterface $jwtEncoder, ContactRepository $contactRepository, EntityManagerInterface $entityManager): Response
    {
        $cookie = $request->cookies->get('auth_token');

        if (!$cookie) {
            return $this->json(['error' => 'Token not found'], 404);
        }

        try {
            $tokenData = $jwtEncoder->decode($cookie);
        } catch (\Exception $e) {
            return $this->json(['error' => 'Cant decode token'], 404);
        }

        if (!$tokenData) {
            return $this->json(['error' => 'Cant decode token'], 404);
        }

        $userId = $tokenData['id'];

        $contacts = $contactRepository->findBy(['user' => $userId]);

        // Создаем массив с нужными полями
        $contactsArray = array_map(function($contact) {
            return [
                'id' => $contact->getId(),
                'name' => $contact->getName(),
                'email' => $contact->getEmail(),
                'company' => $contact->getCompany()
            ];
        }, $contacts);

        return $this->json($contactsArray);
    }
    #[Route('/api/contacts/add', name: 'add_contact', methods: ['POST'])]
    public function addContact(Request $request, JWTEncoderInterface $jwtEncoder, ContactRepository $contactRepository, EntityManagerInterface $entityManager): Response
    {
        $cookie = $request->cookies->get('auth_token');

        if (!$cookie) {
            return $this->json(['error' => 'Token not found'], 404);
        }

        $tokenData = $jwtEncoder->decode($cookie);

        if (!$tokenData) {
            return $this->json(['error' => 'Cant decode token'], 404);
        }

        $userId = $tokenData['id'];

        $name = $request->request->get('name');
        $email = $request->request->get('email');
        $company = $request->request->get('company');

        $contact = new Contact();
        $contact->setName($name);
        $contact->setEmail($email);
        $contact->setCompany($company ?? null);
        $contact->setUser($userId);

        $entityManager->persist($contact);
        $entityManager->flush();

        return new Response('Email sent!', Response::HTTP_OK);
    }

    #[Route('/api/contacts/delete/{id}', name: 'delete_contact', methods: ['DELETE'])]
    public function deleteContact($id, Request $request, JWTEncoderInterface $jwtEncoder, ContactRepository $contactRepository, EntityManagerInterface $entityManager): Response
    {
        $cookie = $request->cookies->get('auth_token');

        if (!$cookie) {
            return $this->json(['error' => 'Token not found'], 404);
        }

        $tokenData = $jwtEncoder->decode($cookie);

        if (!$tokenData) {
            return $this->json(['error' => 'Cant decode token'], 404);
        }

        $userId = $tokenData['id'];

        $contact = $contactRepository->findOneBy(['id' => $id, 'user' => $userId]);

        if (!$contact) {
            return $this->json(['error' => 'Contact not found'], 404);
        }

        $entityManager->remove($contact);
        $entityManager->flush();

        return new Response('Contact deleted!', Response::HTTP_OK);
    }

}

