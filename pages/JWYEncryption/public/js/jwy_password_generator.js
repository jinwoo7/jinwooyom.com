"use strict";

var hashBtn = document.querySelector('#hashBtn');

hashBtn.addEventListener('click', function (event) {
	var text = document.querySelector('#password');
    var key = document.querySelector('#key');
    var textStr = text.value;
    
	if (textStr === "") { showSnackBar("Your Passphrase is Empty!"); return; }

	/* -------- Hashing -------- */
    // Reverse
    if (document.getElementById("reverse").checked) {
        text.value = reverseStr(text.value);
    }
	// Vigenere
	if (document.getElementById("vigenere").checked) {
		text.value = vigenere(text.value, key.value);
	}
	// B64
	if (document.getElementById("b64").checked) {
		text.value = b64(text.value);
	}
    // SpecialChars
    if (document.getElementById("sChars").checked) {
        text.value = addSpecial(text.value, key.value);
    }

	text.select();
	copy();
    text.value = textStr;
});
