<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SpaController extends AbstractController
{
    #[Route('/{reactRouting}', name: 'react_spa', requirements: ['reactRouting' => '.*'])]
    public function index(): Response
    {
        return $this->render('base.html.twig', [
            'controller_name' => 'SpaController',
        ]);
    }
}
