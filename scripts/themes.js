// DARK (default):
let darkPrimaryText = '#eee';
let darkSecondaryText = '#ddd';
let darkPrimaryBackground = '#112';
let darkSecondaryBackground = '#223';
let darkTertiaryBackground = '#334';
let darkPrimaryColor = '#e0728c';
let darkSecondaryColor = '#89befd';
let darkSuccessColor = '#69da9c';
let darkWarningColor = '#ddc77e';

// LIGHT:
let lightPrimaryText = '#111';
let lightSecondaryText = '#222';
let lightPrimaryBackground = '#ddd2d5';
let lightSecondaryBackground = '#faf0fa';
let lightTertiaryBackground = '#dfc9c9';
let lightPrimaryColor = '#c0526c';
let lightSecondaryColor = '#5f9284';
let lightSuccessColor = '#1c9643';
let lightWarningColor = '#c78221';

let darkTheme = true;

function toggleTheme() {
  const root = document.documentElement;
  let icons = document.getElementsByClassName('themed-icon');
  let themeBtn = document.getElementById('theme-btn');

  if (darkTheme) {
    // toggle colors to light
    root.style.setProperty('--primaryText', lightPrimaryText);
    root.style.setProperty('--secondaryText', lightSecondaryText);
    root.style.setProperty('--primaryBackground', lightPrimaryBackground);
    root.style.setProperty('--secondaryBackground', lightSecondaryBackground);
    root.style.setProperty('--tertiaryBackground', lightTertiaryBackground);
    root.style.setProperty('--primaryColor', lightPrimaryColor);
    root.style.setProperty('--secondaryColor', lightSecondaryColor);
    root.style.setProperty('--successColor', lightSuccessColor);
    root.style.setProperty('--warningColor', lightWarningColor);
    // invert icons
    for (item of icons) {
      item.style.filter = 'invert(1)';
    }
    darkTheme = false;
  } else {
    // toggle colors to dark
    root.style.setProperty('--primaryText', darkPrimaryText);
    root.style.setProperty('--secondaryText', darkSecondaryText);
    root.style.setProperty('--primaryBackground', darkPrimaryBackground);
    root.style.setProperty('--secondaryBackground', darkSecondaryBackground);
    root.style.setProperty('--tertiaryBackground', darkTertiaryBackground);
    root.style.setProperty('--primaryColor', darkPrimaryColor);
    root.style.setProperty('--secondaryColor', darkSecondaryColor);
    root.style.setProperty('--successColor', darkSuccessColor);
    root.style.setProperty('--warningColor', darkWarningColor);
    // invert icons
    for (item of icons) {
      item.style.filter = '';
    }
    darkTheme = true;
  }
  if (darkTheme) {
    themeBtn.textContent = 'lights on';
  } else {
    themeBtn.textContent = 'lights off';
  }
  // https://stackoverflow.com/questions/4210798/how-to-scroll-to-top-of-page-with-javascript-jquery
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

let themeBtn = $('#theme-btn');
themeBtn.click(toggleTheme);
