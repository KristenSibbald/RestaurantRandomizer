var arrayOfTerms = ['salad', 'food', 'restaurant', 'dinner', 'lunch']
var counter = 0;
var terms = arrayOfTerms[counter];

var offsetCounter = 0;

var prevZip = "94608"
var currentZip = '94608';

var message, parameters, parameterMap , returnedData , number, businessName, yelpUrl;

setUpRequest();

function setUpRequest () {
        parameters = [];
        parameters.push(['term', terms]);
        parameters.push(['location', currentZip]);
        parameters.push(['offset', offsetCounter]);
        parameters.push(['callback', 'cb']);

        message = {
          'action' : 'http://www.thingimade.com:3000',
          'method' : 'GET',
          'parameters' : parameters
        };

        parameterMap = message.parameters.toString();
}

function cb(data) {
      console.log(data);
      returnedData = data;
      randomize();
    }

function randomize() {

      number = Math.floor(Math.random() * returnedData.businesses.length);

      businessName = (returnedData.businesses[number].name);
      $("#restaurantName").html(businessName);

      $("#restaurantCategories").html("");
      businessCategories = (returnedData.businesses[number].categories);
      for (var i = 0; i < businessCategories.length; i++) {
        $("#restaurantCategories").append(businessCategories[i][0]+"<br>");
      };

      $("#restaurantAddress").html("");
      businessDisplayAddress = (returnedData.businesses[number].location.display_address);
      for (var i = 0; i < businessDisplayAddress.length; i++) {
        $("#restaurantAddress").append(businessDisplayAddress[i]+"<br>");
      };

      yelpUrl = (returnedData.businesses[number].url);
      // $("#googleMapsLink").html('<a href="' + yelpUrl + '">Link</a>');
      returnedData.businesses.splice(number, 1);
      if (returnedData.businesses.length === 5) {
        // if (counter < arrayOfTerms.length) {counter ++
        // } else {counter = 0};
        offsetCounter = offsetCounter + 20;
        // terms = arrayOfTerms[counter];
        setUpRequest();
        newRequest();}

    }

    function newRequest () {
      $.ajax({
        'url' : message.action,
        'data' : parameterMap,
        'dataType' : 'jsonp',
        'jsonpCallback' : 'cb',
        'cache': true
    })
    .done(function(data, textStatus, jqXHR) {
      console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
    }
  )
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
    }
  );
    }

function goToYelp() {window.location.href = yelpUrl;}

    function randomizer() {
      if (currentZip !== document.getElementById("zipcode").value && document.getElementById("zipcode").value) {
        prevZip = currentZip;
        currentZip = document.getElementById("zipcode").value;

        setUpRequest();
        newRequest();


      } else {randomize();}
    };

    $("#randomizer").click(randomizer);
    $("#submitButton").click(randomizer);
    $("#submitButton").hide();
      //http://stackoverflow.com/questions/3682805/javascript-load-a-page-on-button-click
    $("#yelp").click(goToYelp);

    console.log(document.getElementById("zipcode").value)


     $.ajax({
      'url' : message.action,
      'data' : parameterMap,
      'dataType' : 'jsonp',
      'jsonpCallback' : 'cb',
      'cache': true
    })
    .done(function(data, textStatus, jqXHR) {
      console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
    }
  )
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
    }
  );

$(document).ready(function(){
var body = $('body');

var current = 0;
var backgrounds = [
    'url(https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=9bd244971b9cb52a8418cf2f66fce464)'
  , 'url(https://images.unsplash.com/photo-1463569643904-4fbae71ed917?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=7ba41d3ffa26c871c0211c39b53e9016)'
  , 'url(https://images.unsplash.com/photo-1464306076886-da185f6a9d05?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=1ce4e8ec4d4e2eac5b975a69a47a8211)'
  , 'url(https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=ead99b9f7e975d8cab046da524f47384)'
];

function nextBackground() {
    if (current === backgrounds.length) {current = 0
    } else {current++};
    body.css('background-image', backgrounds[current]);
}

body.css('background-image', backgrounds[0]);
setInterval(nextBackground, 5000);



});
