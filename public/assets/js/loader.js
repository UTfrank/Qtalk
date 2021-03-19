// Preloader
function preloader() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
}
  
// $(window).on('load', preloader());
$( window ).load(preloader());