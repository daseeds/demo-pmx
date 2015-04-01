var supportTouch;
var map;

var body = document.body,
    timer;



$(document).ready(function() {
  $(document).on('init.slides', function() {
    $('.loading-container').fadeOut(function() {
      $(this).remove();
    });
  });

  $("#google-iframe").on('mousewheel', function() {

//    alert("scroll")
    return false;
  }, false);

  $(".gm-style").on('mousewheel', function() {

//    alert("scroll")
    return false;
  }, false);

  $('#slides').superslides({
    slide_easing: 'easeInOutCubic',
    slide_speed: 800,
    pagination: true,
    hashchange: true,
    scrollable: true,
    /*play: 6000,*/
  });

/*  document.ontouchmove = function(e) {
    e.preventDefault();
  };*/
  $('#slides').hammer().on('swipeleft', function(e) {
    e.preventDefault();
    $(this).superslides('animate', 'next');
  });

  $('#slides').hammer().on('swiperight', function(e) {
    e.preventDefault();
    $(this).superslides('animate', 'prev');
  });

  supportTouch = !! ('ontouchstart' in window) || !! ('msmaxtouchpoints' in window.navigator);


  //$('#slides').superslides('start')

  //var s = skrollr.init();
  			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 40
			});
});



var manoirLatLng = {
    latLng: new google.maps.LatLng(49.422673,-1.257685),
    label: "Le Manoir de Juganville"
}

var service;
var infowindow;

function initialize() {
  var map_canvas = document.getElementById("map-canvas");
  var map_options = {
          center: manoirLatLng.latLng,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          maxZoom: 20,
          minZoom: 5,
          scrollwheel: false,
          draggable: !supportTouch //turn off draggable when device support touch(such as phone/tablet)
      };
  map = new google.maps.Map(map_canvas, map_options);
  
  var request = {
    reference: 'CnRkAAAAGnBVNFDeQoOQHzgdOpOqJNV7K9-c5IQrWFUYD9TNhUmz5-aHhfqyKH0zmAcUlkqVCrpaKcV8ZjGQKzB6GXxtzUYcP-muHafGsmW-1CwjTPBCmK43AZpAwW0FRtQDQADj3H2bzwwHVIXlQAiccm7r4xIQmjt_Oqm2FejWpBxLWs3L_RoUbharABi5FMnKnzmRL2TGju6UA4k'
  };

 var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Le Manoir de Juganville</h1>'+
      '<div id="bodyContent">'+
      '<p>39 Les Mézières,<br>Saint Martin de Varreville,<br>France<br>'+
      '<a target="_blank" href="http://juganville.com">juganville.com</a><br>02 33 95 01 97</p>'+
      '<a target="_blank" href="https://plus.google.com/116401793659720366058/about?hl=en">'+
      'more info</a><br> '+ 
      '<a target="_blank" href="https://www.google.com/maps/dir//49.422673,-1.257685/@49.4226527,-1.3263512,12z/data=!3m1!4b1!4m4!4m3!1m0!1m1!4e1?hl=en">'+
      'directions</a>' +
      '</p>'+
      '</div>'+
      '</div>';

var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

  var iconBase = 'http://google.com/mapfiles/ms/micons/';
  var marker = new google.maps.Marker({
    position:  manoirLatLng.latLng,
    map: map,
    title: "Le Manoir de Juganville",
    /*icon: iconBase + 'blue.png',*/
    content: "<p>Le Manoir de Juganville</p>"
  });

  infowindow.open(map, marker);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });

}


