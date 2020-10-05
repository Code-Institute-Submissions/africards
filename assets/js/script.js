// Game Variables

const southAfrica = ["biltong", "bunnychow", "elephant", "gemsbok", "giraffe", "lion", "meerkat", "pap"];


var timeLeft = 60;
var flipCount = 0;


$(document).ready(function() {

  $(window).on('load',function(){
        $('#exampleModal').modal('show');
    });

$('.card').click(function() {
  $(this).toggleClass("visible");
})


/** Function for the Light-Dark Theme Toggle **/
  $("#theme-toggle").click(function() {
    var lightDarkSwitch = $("#stylesheet");
    if (lightDarkSwitch.attr("href") == "assets/css/style.css") {
      lightDarkSwitch.attr("href", "assets/css/style-dark.css");
      console.log($("#stylesheet").attr("href"));
    }  else {
      lightDarkSwitch.attr("href", "assets/css/style.css");
      console.log($("#stylesheet").attr("href"));
    }
  });

})
