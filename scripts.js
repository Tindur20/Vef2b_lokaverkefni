"use strict";
$.ajax({
  'url': 'http://apis.is/concerts',
  'type': 'GET',
  'dataType': 'json',
  'success': function(data) {
    console.log(data);

    show(data);
  }
});

var el_ul = document.getElementById("container");
function show(data){
          for (var i = 0; i < data.results.length; i++) {
            //bý hér til li tög til að láta allt fyrir neðan í til að vinna með það.
            var el_li = document.createElement("li");
            //bý hér til div html tag til að láta það sem er um myndina/tónleikana.
            var el_title = document.createElement("div");
            var el_skrifa = document.createTextNode(data.results[i].eventDateName);
            el_title.appendChild(el_skrifa);
            //bý til img html tagið hér og læt myndirnar í það.
            var el_mynd = document.createElement("img");
            el_mynd.src = data.results[i].imageSource;
            el_li.appendChild(el_mynd);
            el_li.appendChild(el_title);
            el_ul.appendChild(el_li);

        }     
}