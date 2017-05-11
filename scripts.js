"use strict";
//sæki gögn frá apis.is
$.ajax({
  'url': 'http://apis.is/concerts',
  'type': 'GET',
  'dataType': 'json',
  'success': function(data) {
    console.log(data);
    //sýnir upplýsingar
    show(data);

// data tags filter 
  var $lis = $('#container li');                  // Stores all lis elements
  var $buttons = $('#buttons');                   // Store buttons element
  var tagged = {};                                // Create tagged object

  $lis.each(function() {                         // Loop through images and
    var li = this;                               // Store img in variable
    var tags = $(this).data('tags');              // Get this element's tags

    if (tags) {                                   // If the element had tags
      tags.split(',').forEach(function(tagName) { // Split at comma and
        if (tagged[tagName] == null) {            // If object doesn't have tag
          tagged[tagName] = [];                   // Add empty array to object
        }
        tagged[tagName].push(li);                // Add the image to the array
      });
    }
  });

  $('<button/>', {                                 // Create empty button
    text: 'Allir atburðir',                              // Add text 'show all'
    class: 'active',                               // Make it active
    click: function() {                            // Add onclick handler to
      $(this)                                      // Get the clicked on button
        .addClass('active')                        // Add the class of active
        .siblings()                                // Get its siblings
        .removeClass('active');                    // Remove active from siblings
      $lis.show();                                // Show all images
    }
  }).appendTo($buttons);                           // Add to buttons

  $.each(tagged, function(tagName) {               // For each tag name
    $('<button/>', {                               // Create empty button
      text: tagName + ' (' + tagged[tagName].length + ')', // Add tag name
      click: function() {                          // Add click handler
        $(this)                                    // The button clicked on
          .addClass('active')                      // Make clicked item active
          .siblings()                              // Get its siblings
          .removeClass('active');                  // Remove active from siblings
        $lis                                       // With all of the ls elements
          .hide()                                  // Hide them
          .filter(tagged[tagName])                 // Find ones with this tag  
          .show();                                 // Show just those images
      }
    }).appendTo($buttons);                         // Add to the buttons
  });

// Search Box
  var $element = $('#container .flokka');
  var $search = $('#filter-search');      // Get the input element
  var cache = [];                         // Create an array called cache

  $lis.each(function() {                 // For each image
    cache.push({                          // Add an object to the cache array
      element: this,                      // This image
      text: this.innerHTML.trim().toLowerCase() // Its alt text (lowercase trimmed)
    });
  });
//function sem filterar
  function filter() {                     // Declare filter() function
    var query = this.value.trim().toLowerCase();  // Get the query
    cache.forEach(function(li) {         // For each entry in cache pass image 
      var index = 0;                      // Set index to 0

      if (query) {                        // If there is some query text
        index = li.text.indexOf(query);  // Find if query text is in there
      }

      li.element.style.display = index === -1 ? 'none' : '';  // Show / hide
    });
  }
 //ef browserinn supportar oninput eða inout þá er það notað

  if ('oninput' in $search[0]) {          // If browser supports input event
    $search.on('input', filter);          // Use input event to call filter()
  } else {                                // Otherwise
    $search.on('keyup', filter);          // Use keyup event to call filter()
  }


  }
});
//þetta sækir í element sem er með id container og lætur allt virka
var el_ul = document.getElementById("container");

  function show(data){ 
    var gogn = data.results;  
    for (var i = 0; i < gogn.length; i++) {
    //bý hér til li tög til að láta allt fyrir neðan í til að vinna með það.
    var el_li = document.createElement("li");
    el_li.className = 'element';
    //bý hér til div html tag til að láta það sem er um myndina/tónleikana.
    var el_title = document.createElement("div");
    el_title.className = 'event';
    var el_skrifa = document.createTextNode(gogn[i].eventDateName);
    el_title.appendChild(el_skrifa);

    //bý hér til div tag til að láta meira texta inn sem er dateOfShow.     "."
    var el_title2 = document.createElement("div");
    el_title2.className = 'event';
    var el_skrifa2 = document.createTextNode(gogn[i].dateOfShow);

    var el_title3 = document.createElement("div");
    var el_skrifa3 = document.createTextNode(gogn[i].eventHallName);

    el_title2.appendChild(el_skrifa2);
    el_title3.appendChild(el_skrifa3);

    //bý til img html tagið hér og læt myndirnar í það.
    var el_mynd = document.createElement("img");
    el_mynd.src = gogn[i].imageSource;

    //bæta við data-tags
    el_li.setAttribute('data-tags', gogn[i].eventHallName);
    el_mynd.setAttribute('data-tags', gogn[i].eventHallName);

    //appendað elementið
    el_li.appendChild(el_mynd);
    el_li.appendChild(el_title);
    el_li.appendChild(el_title2);
    el_li.appendChild(el_title3);
    el_ul.appendChild(el_li);

   }
 }