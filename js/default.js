// Default JavaScript Functions and Initiations
$(document).ready(function() {

  // Retrieve clinic
  var request = new XMLHttpRequest();
  var endpoint = 'http://private-6e916-medigochallenges.apiary-mock.com/'
// Event monitoring
request.addEventListener("load", reqComplete, false);
request.addEventListener("error", reqError, false);
function reqError(evt) {
	console.log("An error occurred.")
}
function reqComplete(evt) {
	console.log("The request was completed.")
}

request.open('GET', endpoint+'clinics');

  //Ajax callback
request.onreadystatechange = function() {
	if (this.readyState === 4) {
		// console.log('Status:', this.status);
		// console.log('Headers:', this.getAllResponseHeaders());
		// console.log('Body:', this.responseText);
		json = JSON.parse(this.responseText)
    console.log(json)
	}
  };
  request.send();
}); // end document ready
