// Default JavaScript Functions and Initiations
$(document).ready(function() {
  var apiEp = 'http://private-6e916-medigochallenges.apiary-mock.com/'
  var allClinics = sendRequest('clinics')

  for (var i = 0; i <= allClinics.length - 1; i++) {
  $('#testarea').append('<div>'+allClinics[i]+'</div>')
  }


// Helper
// Generic getter

function sendRequest(_path) {
  req = new XMLHttpRequest()
  req.open('GET', apiEp+_path, false)
  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      results = JSON.parse(this.response)
    }
  }
  req.send()
  return results
}
}); // end document ready
