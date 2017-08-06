var hashBtn = document.querySelector('#rotBtn');

hashBtn.addEventListener('click', function (event) {
	var text = document.querySelector('#rotText');
    var table = document.getElementById('rotations');
    var str = text.value;
    // Empty table
    var rowCount = table.rows.length;
    for (var x= rowCount-1; x > -1; x--) {
        table.deleteRow(x);
    }
    // ROT from +1 to +26
    for (var rotNum = 25; rotNum > -1; rotNum--) {
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        cell1.setAttribute("id","leftCell");
        var cell2 = row.insertCell(1);
        cell2.setAttribute("id","rightCell");

        // Add some text to the new cells:
        cell1.innerHTML = '+' + rotNum;
        cell2.innerHTML = xssPrevention(rotationChipher(text.value, rotNum));
    }
});