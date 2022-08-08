// Collapse hamburger on next click
$(document).click((event) => {
  if ($('.navbar-collapse').hasClass('show')) {
    $('.navbar-toggler').click();
  }
});

// Code inspired by a similar solution at
// https://stackoverflow.com/questions/17534661/make-anchor-link-go-some-pixels-above-where-its-linked-to
// additionally takes window size into account
function offsetJumpForNav() {
  if (
    location.hash.length > 0 && // catches page loads; redundant for click events
    window.innerWidth >= 992 && // breakpts where nav is likely to cover titles
    window.innerWidth < 1650 // see above ^
  ) {
    window.scrollTo(window.scrollX, window.scrollY - 65); // hard coded offset for nav height
  }
}

// for the whole document, if a click is on a link that jumps to a tag,
$(document).on('click', 'a[href^="#"]', (event) => {
  // Timeout waits until the jump is complete, then we call the offset function
  window.setTimeout(() => {
    offsetJumpForNav();
  }, 0);
});

// Set the offset when entering page with hash present in the url
window.setTimeout(offsetJumpForNav, 0);
