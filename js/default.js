// Default JavaScript Functions and Initiations
$(document).ready(function() {
var apiEp = 'http://private-6e916-medigochallenges.apiary-mock.com/'
var queryPath = apiEp+'clinics'

// Helpers
function populateClinicDiv(_object) {
  $('#listing').append('<div id="clinic-'+_object.id+'"class="clinic-wrapper col-4">'+_object.name+'</div>')
  var divId = '#clinic-'+_object.id
  var content =
  '<h4>'+
  _object.name+
  '</h4>'+
  '<h5>'+
  _object.score+
  '</h5>'+
  '<p>'+
  _object.desc+
  '</p>'+
  '<img class="col-12" src="'+_object.img+'">'
  // $(divId).hide()
  $(divId).html(content)
  // $(divId).fadeIn("fast")
}

// Error logging
function reqError() {
  console.error(this.statusText);
}

// Main fetching function
function sendRequest(_path, _cb) {
  req = new XMLHttpRequest()
  req.onerror = reqError
  req.callback = _cb
  req.open('GET', _path, true) // This obv. makes the request inordered
  req.onreadystatechange = function() {
      if (this.readyState === 4) {
        if(this.status === 200) {
          this.callback(JSON.parse(this.responseText))
          }
      }
  }
  req.send(null)
}

// Where the magic happens...
sendRequest(queryPath, function (_response) { // Callback on clinic list to iterate through them
  for (var i = 0; i <= _response.length - 1; i++) {
    sendRequest(queryPath+'/'+_response[i], populateClinicDiv) // On 200 of each clinic, call the populateClinicDiv
  }
})

}); // end document ready
