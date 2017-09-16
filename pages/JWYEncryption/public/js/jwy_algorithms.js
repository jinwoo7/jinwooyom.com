
/* ------------------------- */
/* --- helper functions ---- */
/* ------------------------- */

// Tests whether the specified character code is an uppercase letter.
function isUpper(c) {
	return (65 <= c) && (c <= 90);  // 65='A' - 90='Z'
}

// Tests whether the specified character code is a lowercase letter.
function isLower(c) {
	return (97 <= c) && (c <= 122);  // 97='a' - 122='z'.
}

// Tests whether the specified character code is a letter.
function isLetter(c) {
	return isUpper(c) || isLower(c);
}

/* ------------------------- */
/* -Custom Proto. functions- */
/* ------------------------- */
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

/* ------------------------- */
/* --- Hashing Algorithms -- */
/* ------------------------- */
// Base64 Hasing Algorithm
function b64(str) {
	return window.btoa(str);
}

// Vigenere Encryption Algorithm
function vigenere(str, key) {
	var output = "";
    var newkey = key.toLowerCase();
    var keyLen = newkey.length;
    var keyi = 0;
    var i;
    
    for (i = 0; i < str.length; i++) {
        var cn = str.charCodeAt(i);
        if (isLetter(cn)) {
            var addAmount = newkey.charCodeAt(keyi % keyLen) - 97;
            if (isUpper(cn)) {
                output += String.fromCharCode((cn - 65 + addAmount) % 26 + 65);
            } else {
                output += String.fromCharCode((cn - 97 + addAmount) % 26 + 97);
            }
            keyi++;
        } else {
            output += String(str).charAt(i);
        }
    }
	return output;
}

// Reverses the string;
function reverseStr(str) {
    return str.split('').reverse().join('');
}

// Custom algorithm for adding special characters
function addSpecial(str, key) {
    var sChar = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    var sCharLen = sChar.length;

    var keyVal = 0;
    for (var i = 0; i < key.length; i++) {
        keyVal += key.charCodeAt(i);
    }

    // Special Char frequency will vary from 2 - 5
    var frequency = keyVal % 3 + 2;

    var index = frequency;
    while(index < str.length) {
        // Find a (psudo)random value for the index
        var charToReplace = str.charCodeAt(index);
        var randomValue = charToReplace + keyVal;
        // Find a special character to use for that index
        var specialChar = sChar[randomValue % sCharLen];
        // Replace the character in that index
        str = str.replaceAt(index, specialChar);
        // Repeat on the next (psudo)random frequent index
        index += frequency;
    }
    return str;
}

// Rotation cipher
function rotationChipher (str, n) {
    var index = 0;
    var output = "";
    while (index < str.length) {
        var charCode = str.charCodeAt(index);
        if (isUpper(charCode)) {
            charCode -= 65;
            charCode = (charCode + n) % 26;
            charCode += 65;
        } else if (isLower(charCode)) {
            charCode -= 97;
            charCode = (charCode + n) % 26;
            charCode += 97;
        }
    
        output += String.fromCharCode(charCode);
        index++;
    }
    return output;
}

function xssPrevention(str) {
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    return str;
}

function uuid4() {
    //// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    var uuid = '', ii;
    for (ii = 0; ii < 32; ii += 1) {
        switch (ii) {
        case 8:
        case 20:
            uuid += '-';
            uuid += (Math.random() * 16 | 0).toString(16);
            break;
        case 12:
            uuid += '-';
            uuid += '4';
            break;
        case 16:
            uuid += '-';
            uuid += (Math.random() * 4 | 8).toString(16);
            break;
        default:
            uuid += (Math.random() * 16 | 0).toString(16);
        }
    }
    return uuid;
};

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomNumber(min, max) {
    var result = parseInt(Math.floor(Math.random() * (max - min))) + parseInt(min);
    return result;
}
