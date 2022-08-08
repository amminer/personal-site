// This code closely follows EmailJS's setup tutorial by necessity
(function () {
  // https://dashboard.emailjs.com/admin/account
  return emailjs.init('idTbU1MrUkQBudGaA');
})();
window.onload = function () {
  document
    .getElementById('contact-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      emailjs.sendForm('personal-site', 'template_x62c35i', this).then(
        function () {
          console.log('SUCCESS!');
        },
        function (error) {
          console.log('FAILED...', error);
        }
      );
    });
};
