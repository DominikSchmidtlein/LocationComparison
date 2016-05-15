// convert table contents to CSV string
function toCSV() {
  var rows = document.getElementById('table-body').children;
  if(!rows) alert("Table is empty.");

  var csv = "";
  for(var i = 0; i < rows.length; i++) {
    csv += '"' + rows[i].cells[0].children[0].value + '"' + ", ";
    csv += '"' + rows[i].cells[1].children[0].value + '"' + ", ";
    csv += '"' + rows[i].cells[2].children[0].value + '"' + ", ";
    csv += '"' + rows[i].cells[3].innerHTML + '"' + ", ";
    csv += '"' + rows[i].cells[4].innerHTML + '"' + ", ";
    csv += '"' + rows[i].cells[5].children[0].checked + '"' + ", ";
    csv += "\n"
  }
  download('table.csv', csv);
}

// trigger csv file download
function download(filename, text) {
  var dl = document.createElement('a');
  dl.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
  dl.download = filename;

  if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      dl.dispatchEvent(event);
  }
  else {
      dl.click();
  }
}