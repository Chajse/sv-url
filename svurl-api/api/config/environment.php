<?php

class Environment
{
    private static $instance = null;
    private $variables = [];

    private function __construct()
    {
        try {
            $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
            $dotenv->load();
            $this->variables = [
                'ENCRYPTION_KEY' => $_ENV['ENCRYPTION_KEY'] ?? null,
                'YOURLS_API_KEY' => $_ENV['YOURLS_API_KEY'] ?? null,
                'DB_HOST' => $_ENV['DB_HOST'] ?? null,
                'DB_NAME' => $_ENV['DB_NAME'] ?? null,
                'DB_USER' => $_ENV['DB_USER'] ?? null,
                'DB_PASSWORD' => $_ENV['DB_PASSWORD'] ?? null,
            ];
        } catch (Exception $e) {
            error_log("Error loading environment variables: " . $e->getMessage());
            throw $e;
        }
    }

    public static function getInstance(): Environment
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function get(string $key)
    {
        if (!isset($this->variables[$key])) {
            throw new Exception("Environment variable '$key' not found");
        }
        return $this->variables[$key];
    }
}
