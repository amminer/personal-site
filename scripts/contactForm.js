// This code closely follows EmailJS's setup tutorial by necessity
(function () {
  // https://dashboard.emailjs.com/admin/account
  return emailjs.init('idTbU1MrUkQBudGaA');
})();

// Initialize API
(function () {
  // https://dashboard.emailjs.com/admin/account
  return emailjs.init('idTbU1MrUkQBudGaA');
})();

function formError(error) {
  console.log('FAILED...', error);
  window.alert('Something went wrong, please try again.');
}

function formSuccess() {
  console.log('SUCCESS!');
  window.alert('Your message was sent!');
}

function formValidate() {
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let message = document.getElementById('message');
  if (name.value === '' || email.value === '' || message.value === '') {
    window.alert('Message could not be sent - please fill all fields.');
    return false;
  }
  return true;
}

function formSubmit(event) {
  event.preventDefault();
  if (formValidate()) {
    emailjs
      .sendForm('personal-site', 'template_x62c35i', this)
      .then(formSuccess, formError);
  }
}

window.onload = function () {
  document
    .getElementById('contact-form')
    .addEventListener('submit', formSubmit);
};
