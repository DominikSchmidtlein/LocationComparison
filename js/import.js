function openFile(index) {
  var fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.onchange = function(result) {
    readFile(result, index);
  };
  fileSelector.click();
  return false;
}

function readFile(result, index) {
  var file = result.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    processFile(this.result, index);
  };
  reader.readAsText(file);
}

function processFile(result, index) {
  var rows = document.getElementById('table-body').children.length;
  
  var lines = result.split('\n');
  for(var i = 0; i < lines.length - 1; i++) {
    if(rows <= i) addRow();
    var src = index == 0 ? lines[i] : null;
    var dest = index == 1 ? lines[i] : null;
    populateRow(i, src, dest, null, null, null, null);
  }
}