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
        console.log(err.Description);
    }
}

// Copies the selected item to the clipboard
function copy(str) {
	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successfully' : 'unsuccessfully';
        showSnackBar(str);
	} catch (err) {
		showSnackBar('Oops, something went wrong, try again!');
	}
}

function toggler(e,str) {
    if( e.innerHTML === 'Show' ) {
        e.innerHTML = 'Hide'
        document.getElementById(str).type="text";
    } else {
        e.innerHTML = 'Show'
        document.getElementById(str).type="password";
    }
}

function showSnackBar(str) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar")

    // Add the "show" class to DIV
    x.className = "show";
    
    x.textContent = str;

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}