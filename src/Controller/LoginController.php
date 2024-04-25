<?php

// src/Controller/NameController.php
namespace App\Controller;

use App\Entity\Person;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }


    #[Route('/login', methods: ['POST'])]
    public function submitName(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $firstName = $data['first_name'] ?? null;
        $lastName = $data['last_name'] ?? null;

        if ($firstName && $lastName) {
            $person = new Person();
            $person->setFirstName($firstName);
            $person->setLastName($lastName);

            $this->entityManager->persist($person);
            $this->entityManager->flush();

            return $this->json([
                'message' => 'Name submitted successfully!',
                'first_name' => $firstName,
                'last_name' => $lastName,
            ]);
        } else {
            return $this->json(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
        }
    }
}
