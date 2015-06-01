// Default JavaScript Functions and Initiations
//
//
$(document).ready(function() {

//### Variables ###
var apiEp = 'http://private-6e916-medigochallenges.apiary-mock.com/'
var queryPath = apiEp+'clinics'

// Isotope instance
var $isoContainer = $('#isoContainer').isotope({
  getSortData: {
    name: '.name',
    score: '.score parseInt'
  },
  sortAscending: {
    name: true,
    score: false
  }
});



//### Helpers ###

// Parse object and construct html: buildItemHtml(jsonobject)
function buildItemHtml(_object) {
  $('.loader').fadeOut("slow", function() {
  //object properties
  clinicName = _object.name
  clinicId = _object.id
  clinicUrl = _object.url
  clinicDesc = _object.desc.split(".")[0]+"..." // Only getting the first sentence of desc with the idea of js slidedown of the full desc on click...
  clinicImg = _object.img
  clinicScore = _object.score
  clinicAccreditation = _object.accreditations
  clinicProcedures = populateArray(_object.procedures).join(' ')

  //html
  itemId = 'clinic-'+clinicId
  itemDiv  = '<div id='+itemId+' class="grid-item col-6 col-tablet-6 col-desktop-4 col-hd-4 '+clinicProcedures+'"></div>'
  $isoContainer.append(itemDiv)
  

  var htmlContent =
  '<h3 class="name text-center">'+clinicName+'</h3> \
  <div class="thumbs no-padding no-margin"><img class="col-12 no-padding no-margin" src="'+clinicImg+'"></div> \
  <h5 class="col-6">Score: </h5><h5 class="score col-6">'+clinicScore+'</h5> \
  <p class="hide-mobile show-tablet">'+clinicDesc+'</p>'

  $("#"+itemId).html(htmlContent)
  $isoContainer.isotope('appended', $("#"+itemId)) //Add item to isotope grid
  timeoutImageLoad(800) // Kludge fix because isotope doesn't play well with unloaded images :(
});
}

// timeoutImageLoad(msdelay) Give time for images to load before reinitializing the isotope layout
function timeoutImageLoad(_delay) {
  timeoutID = window.setTimeout(function() {
  $isoContainer.isotope('layout')  //Reinstanciate isotope layout
  $isoContainer.isotope({ sortBy : 'name' }) //Order by name by default
  $isoContainer.fadeTo(500, 1)
  fadeInElement("#footer", 200)
  fadeInElement(".thumbs", 400)
  }, _delay);
}

// fadeInimages(elementclassname, msdelay)... ideally should be using imageLoaded but couldn't make it work with async
function fadeInElement(_class, _delay) {
  $(_class).each(function() {
    $(this).fadeTo(_delay, 1)
  })
}

// populateArray(object.property)
function populateArray(_object) {
  var array = []
  for (var i = 0; i < _object.length; i++) {
  cleanProcedures = _object[i].name.split(' ').join('_').toLowerCase() //rom
  array.push(cleanProcedures)
}
return array
}

// Fetch json:  sendRequest(apipath, callback)
function sendRequest(_path, _cb) {
  req = new XMLHttpRequest()
  req.onerror = reqError
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



//### Handlers ###

// Error handling
function reqError() {
  console.error(this.statusText);
}

// Filter items
$('.filter-button-group a').click( function() {
  filterValue = $(this).attr('data-filter')
  event.preventDefault();
  $isoContainer.isotope({ filter: filterValue })
});

// Sort items
$('.sort-button-group a').click( function() {
  sortValue = $(this).attr('data-filter')
  event.preventDefault();
  $isoContainer.isotope({ sortBy: sortValue })
});


// $(".header-wrapper").sticky({topSpacing:0});
// $('#sticker').on('sticky-start', function() { console.log("Started"); });


// ### Main ###

// Where the magic happens...
sendRequest(queryPath, function (_response) { // Callback on clinic list to iterate through them
  for (var i = 0; i <= _response.length - 1; i++) {
    sendRequest(queryPath+'/'+_response[i], buildItemHtml) // On 200 of each clinic, call the buildItemHtml
  }
})



}); // end document ready
