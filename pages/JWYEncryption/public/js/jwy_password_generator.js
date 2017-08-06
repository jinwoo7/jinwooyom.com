"use strict";

var hashBtn = document.querySelector('#hashBtn');

hashBtn.addEventListener('click', function (event) {
	var text = document.querySelector('#password');
    var key = document.querySelector('#key');
    
	if (text.value === "") { console.log("empty"); return; }

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
	copy(text);
	text.value = "";
});

// Limits the users to only input alphabets
function onlyAlphabets(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        } else if (e) {
            var charCode = e.which;
        } else { return true; }
        
        if (isUpper(charCode) || isLower(charCode))
            return true;
        else
            return false;
    }
    catch (err) {
        alert(err.Description);
    }
}

// Copies the selected item to the clipboard
function copy() {
	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successfully' : 'unsuccessfully';
		console.log('Hash was ' + msg + " copied to your clipboard!");
	} catch (err) {
		console.log('Oops, unable to copy');
	}
}