<?php

  require_once('../private/initialize.php');

  $plain_text = '';
  $public_key = '';
  $encrypted_text = '';
  $cipher_text = '';
  $private_key = '';
  $decrypted_text = '';

  if(isset($_POST['submit'])) {
  
    if(isset($_POST['public_key'])) {
    
      // This is an encode request
      $plain_text = isset($_POST['plain_text']) ? $_POST['plain_text'] : null;
      $public_key = isset($_POST['public_key']) ? $_POST['public_key'] : null;
      if ($plain_text != null && $public_key != null) {
        $encrypted_text = pkey_encrypt($plain_text, $public_key);
        $cipher_text = $encrypted_text;
      }
      
    
    } else {
    
      // This is a decode request
      $cipher_text = isset($_POST['cipher_text']) ? $_POST['cipher_text'] : null;
      $private_key = isset($_POST['private_key']) ? $_POST['private_key'] : null;
      if ($cipher_text != null && $private_key != null) {
        $decrypted_text = htmlspecialchars(pkey_decrypt($cipher_text, $private_key));
      }
    }
  }

?>

<!doctype html>

<html lang="en">
  <head>
    <title>Asymmetric Encryption: Encrypt/Decrypt</title>
    <meta charset="utf-8">
    <meta name="description" content="">
    <link rel="stylesheet" media="all" href="includes/styles.css" />
    <link rel="stylesheet" type="text/css" href="./css/jwy_symmetric_style.css">
  </head>
  <body>
    <div id="content">
        <a class="btn" href="index.html">Menu</a>
        <br/>

        <h1>Asymmetric Encryption</h1>

        <div id="encoder">
          <h2>Encrypt</h2>

          <p>Plain text may not exceed 245 characters.</p>
          <form action="" method="post">
            <div class="section_inputs">
              <label for="plain_text">Plain text</label>
              <textarea name="plain_text" maxlength="245"><?php echo h($plain_text); ?></textarea>
            </div>
            <div class="section_inputs">
              <label for="public_key">Public Key</label>
              <textarea name="public_key"><?php echo h($public_key); ?></textarea>
            </div>
            <div>
              <input class="btn" type="submit" name="submit" value="Encrypt">
            </div>
          </form>

          <div class="result"><?php echo h($encrypted_text); ?></div>
          <div style="clear:both;"></div>
        </div>

        <hr />

        <div id="decoder">
          <h2>Decrypt</h2>

          <form action="" method="post">
            <div class="section_inputs">
              <label for="cipher_text">Cipher text</label>
              <textarea name="cipher_text"><?php echo h($cipher_text); ?></textarea>
            </div>
            <div class="section_inputs">
              <label for="private_key">Private Key</label>
              <textarea name="private_key"><?php echo h($private_key); ?></textarea>
            </div>
            <div>
              <input class="btn" type="submit" name="submit" value="Decrypt">
            </div>
          </form>

          <div class="result"><?php echo h($decrypted_text); ?></div>
          <div style="clear:both;"></div>
        </div>
        <div id="margin"></div>
    </div>
  </body>
</html>
