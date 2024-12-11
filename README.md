# SVURL - URL SHORTERNER SERVICE

A secure URL shortening service built with PHP that integrates with YOURLS (Your Own URL Shortener) and includes payload encryption.

## Prerequisites

- PHP 7.4 or higher
- MySQL/MariaDB
- [YOURLS](https://yourls.org/) installed and configured
- Composer (PHP package manager)
- Web server (Apache/Nginx)

## Setting up API

- 3. Create a `.env` file in the config directory with the following variables:

```
   ENCRYPTION_KEY=your_32_byte_hex_encryption_key
   YOURLS_API_KEY=your_yourls_api_key
   DB_HOST=localhost
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASS=your_database_password
```

- Note: Take a while for me to find the yours_api_key cause its my first time using it - use this if u dont find one (5be0034d05)

## Setting and installing YOURLS

Install and configure YOURLS:

- Download and install YOURLS from [yourls.org](https://yourls.org/)
- Configure YOURLS with your database settings
- Get your API key from the YOURLS admin interface
- Update the YOURLS endpoint in `url_shortener

- Note: Put the YOURLS folder in the htdocs and not inside the repo of this project.

  ```
     htdocs/YOURSL | ✅
     htdocs/sv_url/YOURLS | ❌
  ```

## Configuration

### Database Setup

1. Make sure your YOURLS database is properly configured
2. The API will use the existing YOURLS database tables

- Note: Use the same database name in your xampp when setting up the config of YOURLS.
  ex:

```
   <?php
      /* This is a sample config file.

      * Edit this file with your own settings and save it as "config.php"
      *
      * IMPORTANT: edit and save this file as plain ASCII text, using a text editor, for instance TextEdit on Mac OS or
      * Notepad on Windows. Make sure there is no character before the opening <?php at the beginning of this file.
      \*/

      /_
      \*\* MySQL settings - You can get this info from your web host
      _/

      /\*_ MySQL database username _/
      define('YOURLS_DB_USER', 'root');

      /\*_ MySQL database password _/
      define('YOURLS_DB_PASS', '');

      /** The name of the database for YOURLS
      ** Use lower case letters [a-z], digits [0-9] and underscores [_] only \*/
      define('YOURLS_DB_NAME', 'sv_url');

      /** MySQL hostname.
      ** If using a non standard port, specify it like 'hostname:port', e.g. 'localhost:9999' or '127.0.0.1:666' \*/
      define('YOURLS_DB_HOST', 'localhost');

      /** MySQL tables prefix
      ** YOURLS will create tables using this prefix (eg `yourls_url`, `yourls_options`, ...) \*_ Use lower case letters [a-z], digits [0-9] and underscores [_] only _/
      define('YOURLS*DB_PREFIX', 'yourls*');

      /_
      \*\* Site options
      _/

      /** YOURLS installation URL
      ** All lowercase, no trailing slash at the end.
      ** If you define it to "http://sho.rt", don't use "http://www.sho.rt" in your browser (and vice-versa)
      ** To use an IDN domain (eg http://héhé.com), write its ascii form here (eg http://xn--hh-bjab.com) \*/
      define('YOURLS_SITE', 'http://localhost/yourls');

      /** YOURLS language
      ** Change this setting to use a translation file for your language, instead of the default English.
      ** That translation file (a .mo file) must be installed in the user/language directory.
      ** See http://yourls.org/translations for more information \*/
      define('YOURLS_LANG', '');

      /** Allow multiple short URLs for a same long URL
      ** Set to true to have only one pair of shortURL/longURL (default YOURLS behavior) \*_ Set to false to allow multiple short URLs pointing to the same long URL (bit.ly behavior) _/
      define('YOURLS_UNIQUE_URLS', true);

      /** Private means the Admin area will be protected with login/pass as defined below.
      ** Set to false for public usage (eg on a restricted intranet or for test setups) \*_ Read http://yourls.org/privatepublic for more details if you're unsure _/
      define('YOURLS_PRIVATE', true);

      /** A random secret hash used to encrypt cookies. You don't have to remember it, make it long and complicated
      ** Hint: copy from http://yourls.org/cookie \*/
      define('YOURLS_COOKIEKEY', 'fBkpS3rR142mdqDp_PWm1yMtMKBLJ~jnh~1T{rzn');

      /** Username(s) and password(s) allowed to access the site. Passwords either in plain text or as encrypted hashes
      ** YOURLS will auto encrypt plain text passwords in this file \*_ Read http://yourls.org/userpassword for more information _/
      $yourls_user_passwords = [
      'sv_urls' => 'phpass:!2y!10!K1FXQXv20HQZoYXUX3KBvOE42OodiwURCABpsjgWRDm6f8Dmdti32' /* Password encrypted by YOURLS */,
      // 'username2' => 'password2',
      // You can have one or more 'login'=>'password' lines
      ];

      /** URL shortening method: either 36 or 62
      ** 36: generates all lowercase keywords (ie: 13jkm)
      ** 62: generates mixed case keywords (ie: 13jKm or 13JKm)
      ** For more information, see https://yourls.org/urlconvert \*/
      define('YOURLS_URL_CONVERT', 62);

      /** Debug mode to output some internal information
      ** Default is false for live site. Enable when coding or before submitting a new issue \*/
      define('YOURLS_DEBUG', false);

      /\*\*

      - Reserved keywords (so that generated URLs won't match them)
      - Define here negative, unwanted or potentially misleading keywords.
      \*/
      $yourls_reserved_URL = [
      'porn',
      'faggot',
      'sex',
      'nigger',
      'fuck',
      'cunt',
      'dick',
      ];

      /_
      \*\* Personal settings would go after here.
      _/

```

### Security

- Generate a secure encryption key (32 bytes in hexadecimal format)
- Store it in your `.env` file
- The API automatically encrypts successful responses (HTTP 200)

## Security Features

- Payload encryption using AES-256-CBC
- Random IV generation for each encryption
- Input validation for URLs
- Error handling and logging

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 400: Invalid input
- 500: Server error

Response format:json

```

{
"status": {
"remarks": "success/failed",
"message": "Description of the result"
},
"payload": {
"short_url": "http://your-domain/abcd123"
},
"prepared_by": "Etrella Yue",
"timestamp": "2024-03-21T12:00:00Z"
}

```
