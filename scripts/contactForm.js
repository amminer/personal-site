// Initialize with public key
(() => {
  emailjs.init('idTbU1MrUkQBudGaA');
})();

// Set up event listener for submission
window.onload = () => {
  document
    .getElementById('contact-form')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      // generate a five digit number for the contact_number variable
      this.contact_number.value = (Math.random() * 100000) | 0;
      // these IDs from the previous steps
      emailjs.sendForm('contact_service', 'contact_form', this).then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED: ', error);
        }
      );
    });
};
