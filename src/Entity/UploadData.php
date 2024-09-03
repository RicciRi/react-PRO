<?php

namespace App\Entity;

use App\Repository\UploadDataRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UploadDataRepository::class)]
class UploadData
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?string $uploadId = null;

    #[ORM\Column]
    private ?int $userId = null;

    #[ORM\Column(length: 255)]
    private ?string $uploadPassword = null;

    #[ORM\Column(length: 255)]
    private ?string $uploadTittle = null;

    #[ORM\Column(length: 255)]
    private ?string $uploadMessage = null;

    #[ORM\Column(type: 'datetime')]
    private $uploadTime;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUploadId(): ?string
    {
        return $this->uploadId;
    }

    public function setUploadId(string $uploadId): static
    {
        $this->uploadId = $uploadId;

        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): static
    {
        $this->userId = $userId;

        return $this;
    }

    public function getUploadPassword(): ?string
    {
        return $this->uploadPassword;
    }

    public function setUploadPassword(string $uploadPassword): static
    {
        $this->uploadPassword = $uploadPassword;

        return $this;
    }

    public function getUploadMessage(): ?string
    {
        return $this->uploadMessage;
    }

    public function setUploadMessage(string $uploadMessage): static
    {
        $this->uploadMessage = $uploadMessage;

        return $this;
    }

    public function getUploadTittle(): ?string
    {
        return $this->uploadTittle;
    }

    public function setUploadTittle(string $uploadTittle): static
    {
        $this->uploadTittle = $uploadTittle;

        return $this;
    }

    public function getUploadTime(): ?\DateTime
    {
        return $this->uploadTime;
    }

    public function setUploadTime(\DateTime $uploadTime): static
    {
        $this->uploadTime = $uploadTime;

        return $this;
    }
}
