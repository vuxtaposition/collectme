$(document).ready(function() {

$('#loader_img').show();

// main image loaded ?
$('#main_img').on('load', function(){
  // hide/remove the loading image
  $('#loader_img').hide();
 
});

});