"use strict";

var hashBtn = document.querySelector('#hashBtn');

window.onload = function (event) {
    console.log("here!");
	var text = document.querySelector('#resultArea');
    text.value = "";
};

function uuidGenerator() {
    var text = document.querySelector('#resultArea');
    text.value += (uuid4() + "\n");
    text.scrollTop = text.scrollHeight;
}

function numberGenerator() {
    var text = document.querySelector('#resultArea');
    var min = document.querySelector('#min');
    var max = document.querySelector('#max');
    
    if (min.value !== "" && max.value !== "") {
        if (parseInt(min.value) < parseInt(max.value)) {
            text.value += (getRandomNumber(min.value, max.value) + "\n");
            text.scrollTop = text.scrollHeight;
        } else {
            showSnackBar("Min value must be less than Max value!");
        }
    } else {
        showSnackBar("Please specify both min and the max value!");
    }
    
}