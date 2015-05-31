// Default JavaScript Functions and Initiations
$(document).ready(function() {
var apiEp = 'http://private-6e916-medigochallenges.apiary-mock.com/'
var queryPath = apiEp+'clinics'
var $isoContainer = $('#isoContainer').isotope({
  getSortData: {
    name: '.name'
  }
});

// Populate Array(object.property)
function populateArray(_o) {
  var array = []
  for (var i = 0; i < _o.length; i++) {
  cleanProcedures = _o[i].name.split(' ').join('_').toLowerCase() //rom
  array.push(cleanProcedures)
  }
  return array
}

// Helpers
function populateClinicDiv(_object) {
  //object properties
  clinicName = _object.name
  clinicId = _object.id
  clinicUrl = _object.url
  clinicDesc = _object.desc
  clinicImg = _object.img
  clinicScore = _object.score
  clinicAccreditation = _object.accreditations
  clinicProcedures = populateArray(_object.procedures).join(' ')

  //html
  itemId = 'clinic-'+clinicId
  itemDiv  = '<div id='+itemId+' class="grid-item col-12 col-tablet-6 col-desktop-4 col-hd-3 '+clinicProcedures+'"></div>'
  $isoContainer.append(itemDiv)
  // $isoContainer.append('<div id="clinic-'+clinicId+'" class="grid-item col-12 col-tablet-6 col-desktop-4 col-hd-3 '+clinicProcedures+'">'+_object.name+'</div><div class="cf"></div>')
  // var $divId = $('#clinic-'+clinicId)
  // var content =
  // '<img class="col-12 thumbs" src="'+_object.img+'">'+
  // '<h4 class="name">'+
  // _object.name+
  // '</h4>'+
  // '<h5>'+
  // 'Score'+_object.score+
  // '</h5>'+
  // '<p>'+
  // _object.desc+
  // '</p>'
  $("#"+itemId).html("<p>dem buuuuugs</p>")
  $isoContainer.isotope('appended', itemId)
  $isoContainer.isotope('layout')
  $isoContainer.isotope({ sortBy : 'name' });
}

// Main fetching function
function sendRequest(_path, _cb) {
  req = new XMLHttpRequest()
  req.onerror = reqError
  req.onload = reqSuccess
  req.callback = _cb
  req.open('GET', _path, true) // true == asyn == obv. makes the request inordered
  req.onreadystatechange = function() {
      if (this.readyState === 4) {
        if(this.status === 200) {
          this.callback(JSON.parse(this.responseText))
          }
      }
  }
  req.send(null)
}

//Handlers
function reqSuccess () {
}

function reqError() {
  console.error(this.statusText);
}

// filter items on button click
$('.filter-button-group a').click( function() {
  var filterValue = $(this).attr('data-filter')
  $isoContainer.isotope({ filter: filterValue })
});

// Where the magic happens...
sendRequest(queryPath, function (_response) { // Callback on clinic list to iterate through them
  for (var i = 0; i <= _response.length - 1; i++) {
    sendRequest(queryPath+'/'+_response[i], populateClinicDiv) // On 200 of each clinic, call the populateClinicDiv
  }
})

// $("img").unveil(200, function() {
//   $(this).load(function() {
//     this.style.opacity = 1;
//   });
// });


}); // end document ready
