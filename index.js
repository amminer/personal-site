//Collapse hamburger on selection
$(document).click(function (event) {
  var toggle = $('.navbar-collapse').hasClass('show');
  if (toggle) {
    $('.navbar-toggler').click();
  }
});
