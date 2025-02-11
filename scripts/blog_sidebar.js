let button_container = document.getElementById('sidebar_expander');
let sidebar = document.getElementById('sidebar');
let post_container = document.getElementById('post_container');
const sidebar_movement = '40%';

function sidebar_is_expanded() {
  let leftpad = getComputedStyle(button_container).left;
  let expanded = true;
  if (leftpad == '0px') {
    expanded = false;
  }
  return expanded;
}

function expand_sidebar() {
  button_container.style.setProperty('left', '200px');
  sidebar.style.setProperty('display', 'flex');
  sidebar.style.setProperty('flex-direction', 'column');
  sidebar.style.setProperty('position', 'fixed');
  sidebar.style.setProperty('width', sidebar_movement);
  sidebar.style.setProperty('max-width', '400px');
  sidebar.style.setProperty('max-height', '90%');
  sidebar.style.setProperty('top', '10px');
  sidebar.style.setProperty('background-color', '#112');
}

function expand_sidebar_large() {
  expand_sidebar();
  sidebar.style.setProperty('width', '25%');
}

function collapse_sidebar() {
  button_container.style.setProperty('left', '0px');
  sidebar.style.setProperty('display', 'none');
}

$('#expand_sidebar_button').click((event) => {
  let expanded = sidebar_is_expanded();

  if (expanded) { // then collapse
    collapse_sidebar();
  } else { // expand
    expand_sidebar();
  }
});

let pvw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
window.addEventListener('resize', function() {
  let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  if (vw > 992 && pvw < 992) {
    expand_sidebar_large();
  } else if (vw < 992 && pvw > 992) {
    collapse_sidebar();
  }
  pvw = vw;
});

window.addEventListener('scroll', function() {
    button_container.style.setProperty('opacity', 1 - window.scrollY / 200);
});
