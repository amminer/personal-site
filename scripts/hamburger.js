// Collapse hamburger on next click
$(document).click((event) => {
  if ($('.navbar-collapse').hasClass('show')) {
    $('.navbar-toggler').click();
  }
});

function offsetJumpForNav() {
  if (
    window.innerWidth >= 992 && // breakpts where nav is likely to cover titles
    window.innerWidth < 1350 // see above ^
  ) {
    window.scrollTo(window.scrollX, window.scrollY - 65); // nav height
  }
}

// for the whole document, if a click is on a link that jumps to a tag,
$(document).on('click', 'a[href^="#"]', (event) => {
  // Timeout waits until the jump is complete, then we call the offset function
  window.setTimeout(() => {
    offsetJumpForNav();
  }, 0);
});
