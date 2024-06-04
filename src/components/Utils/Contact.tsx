import './Contact.scss';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'

export default function Contact() {
  // ofourneau2024@gmail.com
  // Ofourneau2024!@@
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs
      .sendForm('ofourneau', 'ofourneau_2024', form.current, {
        publicKey: 'SeEjXfqTEIqIFXYet',
      })
      .then(
        () => {
          
          if(form.current.from_name.value === '' || form.current.from_email.value === '' || form.current.message.value === ''){
            Swal.fire({
              text: "Veuillez remplir tous les champs",
              icon: "warning"
            });
            return;
          }

          console.log('SUCCESS!');
          form.current.reset();
          Swal.fire({
            text: "Email envoyé !",
            icon: "success"
          });
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };


  return (
    <div>
    <div className="contact">
      <h1 className="h1_contact">CONTACTEZ-NOUS</h1>
      <form className="cf" ref={form} onSubmit={sendEmail}>
        <div className="half top cf">
          <input
            className="input_contact"
            type="text"
            placeholder="Nom d'utilisateur"
            name="from_name"
          />
          <input
            className="input_contact"
            type="email"
            placeholder="Email"
            name="from_email"
          />
        </div>
        <div className="half bottom cf">
          <textarea
            name="message"
            type="text"
            placeholder="Message"
          ></textarea>
        </div>
        <input
          className="input_contact"
          type="submit"
          value="Envoyer"
          id="input_contact_submit"
          
        />
      </form>
    </div>
  </div>
   
)
}
