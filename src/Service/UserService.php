<?php
namespace App\Service;

use App\Repository\ContactRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Request;

class UserService
{
    private RequestStack $requestStack;

    public function __construct(
        RequestStack            $requestStack,
        private JWTEncoderInterface   $jwtEncoder,
        public ContactRepository      $contactRepository,
        public EntityManagerInterface $entityManager,
    ) {
        $this->requestStack = $requestStack;
    }

    public function getUserByCookies(): array
    {
        // Получаем текущий запрос из стека
        $request = $this->requestStack->getCurrentRequest();

        if (!$request instanceof Request) {
            throw new \Exception('Request not found', 404);
        }

        $cookie = $request->cookies->get('auth_token');

        if (!$cookie) {
            throw new \Exception('Token not found', 404);
        }

        try {
            $tokenData = $this->jwtEncoder->decode($cookie);
        } catch (\Exception $e) {
            throw new \Exception('Cannot decode token', 404);
        }

        if (!$tokenData) {
            throw new \Exception('Invalid token data', 404);
        }

        return $tokenData;
    }
}

