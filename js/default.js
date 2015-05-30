// Default JavaScript Functions and Initiations
$(document).ready(function() {
  var apiEp = 'http://private-6e916-medigochallenges.apiary-mock.com/'
  var clinicIndex = sendRequest('clinics')

  for (var i = 0; i <= clinicIndex.length - 1; i++) {
  $('#testarea').append('<div id="clinic-'+clinicIndex[i]+'">'+clinicIndex[i]+'</div>')
  clinicProperties = sendRequest('clinics/'+clinicIndex[i])
  $('#clinic-'+clinicIndex[i]).append(clinicProperties['name'])
  $('#clinic-'+clinicIndex[i]).append(clinicProperties['url'])
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
