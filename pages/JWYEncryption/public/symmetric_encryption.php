<?php
  require_once('../private/initialize.php');

  $plain_text = '';
  $encode_key = '';
  $encrypted_text = '';
  $cipher_text = '';
  $decode_key = '';
  $decrypted_text = '';

  if(isset($_GET['cipher'])) {
      $cipher_text = $_GET['cipher'];
  }

  if(isset($_POST['submit'])) {
  
    if(isset($_POST['encode_key'])) {
      // This is an encode request
      $plain_text = isset($_POST['plain_text']) ? $_POST['plain_text'] : nil;
      $encode_key = isset($_POST['encode_key']) ? $_POST['encode_key'] : nil;
      $encode_algorithm = isset($_POST['encode_algorithm']) ? $_POST['encode_algorithm'] : nil;
      $encrypted_text = key_encrypt($plain_text, $encode_key, $encode_algorithm);
      $cipher_text = $encrypted_text;
    
    } else {
      // This is a decode request
      $cipher_text = isset($_POST['cipher_text']) ? $_POST['cipher_text'] : nil;
      $decode_key = isset($_POST['decode_key']) ? $_POST['decode_key'] : nil;
      $decode_algorithm = isset($_POST['decode_algorithm']) ? $_POST['decode_algorithm'] : nil;
      $decrypted_text = htmlspecialchars(key_decrypt($cipher_text, $decode_key, $decode_algorithm));    
    }
  }
?>

<!doctype html>

<html lang="en">
  <head>
    <title>Symmetric Encryption: Encrypt/Decrypt</title>
    <meta charset="utf-8">
    <meta name="description" content="">
    <link rel="stylesheet" media="all" href="includes/styles.css" />
    <link rel="stylesheet" type="text/css" href="./css/effects.css">
    <link rel="stylesheet" type="text/css" href="./css/jwy_symmetric_style.css">
  </head>
  <body>
      <div id="content">
        <a class="btn" href="index.html">Menu</a>
        <br/>

        <h1>Symmetric Encryption</h1>

        <div id="encoder">
          <h2>Encrypt</h2>
          <form action="" method="post">
            <div class="section_inputs">
              <label for="encode_algorithm">Algorithm</label>
              <select name="encode_algorithm">
                <option value="AES-256-CBC">AES-256-CBC</option>
                <option value="BF-CBC">BF-CBC</option>
                <option value="DES-EDE3-CBC">DES-EDE3-CBC</option>
              </select>
            </div>
            <div class="section_inputs">
              <label for="plain_text">Plain text</label>
              <textarea name="plain_text"><?php echo $plain_text; ?></textarea>
            </div>
            <div class="section_inputs">
              <label for="encode_key">Key</label>
              <input type="text" name="encode_key" value="<?php echo $encode_key; ?>" />
            </div>
            <input class="btn" type="submit" name="submit" value="Encrypt">
          </form>

          <div class="result"><?php echo $encrypted_text; ?></div>
          <div style="clear:both;"></div>
        </div>

        <hr />

        <div id="decoder">
          <h2>Decrypt</h2>
          <form action="" method="post">
            <div class="section_inputs">
              <label for="decode_algorithm">Algorithm</label>
              <select name="decode_algorithm">
                <option value="AES-256-CBC">AES-256-CBC</option>
                <option value="BF-CBC">BF-CBC</option>
                <option value="DES-EDE3-CBC">DES-EDE3-CBC</option>
              </select>
            </div>
            <div class="section_inputs">
              <label for="cipher_text">Cipher text</label>
              <textarea id="cipherText" name="cipher_text"><?php echo $cipher_text; ?></textarea>
            </div>
            <div class="section_inputs">
              <label for="decode_key">Key</label>
              <input type="text" name="decode_key" value="<?php echo $decode_key; ?>" />
            </div>
            <input class="btn" type="submit" name="submit" value="Decrypt">
          </form>

          <div class="result"><?php echo $decrypted_text; ?></div>
          <div style="clear:both;"></div>
        </div>

        <div id="snackbar"></div>

        <script src="./js/jwy_password_generator.js"></script>
        <?php
            if(isset($_POST['encode_key']) && $_POST['encode_key'] !== '') {
                echo("<div id='share'>");
                echo('Share this link:<br/>');
                echo('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'] . '?cipher=' . $encrypted_text);
                echo("</div>");
            }
        ?>
    </div>
  </body>
</html>
