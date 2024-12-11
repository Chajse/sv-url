<?php

require_once __DIR__ . '/environment.php';

//set default time zone

date_default_timezone_set("Asia/Manila");

//set time limit of requests
set_time_limit(1000);

class Connection
{
    private $connectionString;
    private $options = [
        \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
        \PDO::ATTR_EMULATE_PREPARES => false
    ];

    public function __construct()
    {
        $env = Environment::getInstance();
        $this->connectionString = sprintf(
            "mysql:host=%s;dbname=%s;charset=utf8mb4",
            $env->get('DB_HOST'),
            $env->get('DB_NAME')
        );
    }

    public function connect()
    {
        try {
            $env = Environment::getInstance();
            return new \PDO(
                $this->connectionString,
                $env->get('DB_USER'),
                $env->get('DB_PASSWORD'),
                $this->options
            );
        } catch (\PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }
}
