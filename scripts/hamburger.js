// Collapse hamburger on next click
$(document).click((event) => {
  if ($('.navbar-collapse').hasClass('show')) {
    $('.navbar-toggler').click();
  }
});

// Credit to Eric Olson on SO for this solution to my navbar troubles
// https://stackoverflow.com/questions/17534661/make-anchor-link-go-some-pixels-above-where-its-linked-to
function offsetAnchor() {
  if (
    location.hash.length !== 0 &&
    window.innerWidth >= 992 &&
    window.innerWidth < 1650
  ) {
    window.scrollTo(window.scrollX, window.scrollY - 65);
  }
}

// Captures click events of all <a> elements with href starting with #
$(document).on('click', 'a[href^="#"]', (event) => {
  // Click events are captured before hash changes
  // Timeout causes offsetAnchor to be called after jump
  window.setTimeout(() => {
    offsetAnchor();
  }, 0);
});

// Set the offset when entering page with hash present in the url
window.setTimeout(offsetAnchor, 0);
