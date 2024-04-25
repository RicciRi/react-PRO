<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class TranslationController extends AbstractController
{
    #[Route('/api/translations/{locale}', name: 'api_translations')]
    public function getTranslations(string $locale): JsonResponse
    {
        // Загрузите переводы для данного языка
        $translator = $this->get('translator');
        $catalogue = $translator->getCatalogue($locale);

        // Преобразуйте переводы в JSON
        $translations = $catalogue->all();

        return new JsonResponse($translations);
    }
}

