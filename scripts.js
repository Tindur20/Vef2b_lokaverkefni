"use strict";
$.ajax({
  'url': 'http://apis.is/concerts',
  'type': 'GET',
  'dataType': 'json',
  'success': function(data) {
    console.log(data);
  }
});
