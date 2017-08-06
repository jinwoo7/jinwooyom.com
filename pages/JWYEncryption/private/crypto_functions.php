<?php
    include('vendor/RSA.php');
    define('CIPHER_METHOD','AES-256-CBC');

    /* ---------------- Symmetric Encryptions ------------------ */

    function key_encrypt($string, $key, $cipher_method=CIPHER_METHOD) {
      // pdding the key to 32 bytes long
      $key = str_pad($key, 32, '*');
      $iv_len = openssl_cipher_iv_length($cipher_method);
      $iv = openssl_random_pseudo_bytes($iv_len);
      // Encrypting
      $ciphertext = openssl_encrypt($string, $cipher_method, $key, OPENSSL_RAW_DATA, $iv);
      // Save iv for decoding
      return base64_encode($iv . $ciphertext);
    }

    function key_decrypt($string, $key, $cipher_method = CIPHER_METHOD) {
      // pdding the key to 32 bytes long
      $key = str_pad($key, 32, '*');
      // Decode the cipertext
      $iv_ciphertext = base64_decode($string);
      // parsing iv and ciphertext
      $iv_len = openssl_cipher_iv_length($cipher_method);
      $iv = substr($iv_ciphertext, 0, $iv_len);
      $ciphertext = substr($iv_ciphertext, $iv_len);
      // Decrypting
      $decrypted_text = openssl_decrypt($ciphertext, $cipher_method, $key, OPENSSL_RAW_DATA, $iv);
      return $decrypted_text;
    }
    
    /* ---- Asymmetric Encryption / Public-Key Cryptography ---- */

    function generate_keys() {
        $rsa = new Crypt_RSA();
        extract($rsa->createKey());
        
        return array('private' => $privatekey, 'public' => $publickey);
    }

    function pkey_encrypt($string, $public_key) {
        openssl_public_encrypt($string, $encrypted, $public_key);
        $message = base64_encode($encrypted);

        return $message;
    }

    function pkey_decrypt($string, $private_key) {
        // Decode from base64 to get raw data
        $ciphertext = base64_decode($string);
        openssl_private_decrypt($ciphertext, $decrypted, $private_key);

        return $decrypted;
    }

    /* ------ Digital Signature using public/private keys ------ */

    function create_signature($data, $private_key) {
        $raw_signature = "";
        // A-Za-z : ykMwnXKRVqheCFaxsSNDEOfzgTpYroJBmdIPitGbQUAcZuLjvlWH
        openssl_sign($data, $raw_signature, $private_key);

        // Use base64_encode to make contents viewable/sharable
        return base64_encode($raw_signature);
    }

    function verify_signature($data, $signature, $public_key) {
        $raw_signature = base64_decode($signature);

        // returns 1 if data and signature match 0 if not
        return openssl_verify($data, $raw_signature, $public_key);
    }
?>