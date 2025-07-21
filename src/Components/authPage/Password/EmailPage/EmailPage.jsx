import { useState } from 'react';
/*import { HiOutlineMail } from "react-icons/hi";*/
import { Link } from "react-router";
import { isNotEmpty, isEmail } from "../../../../validators/validators.js"; 
import { requestNewPassword } from '../../../../service/password.service.js';

function ResetPasswordEmailForm() {
  const [email, setEmail] = useState('');


  const isEmailValid = isNotEmpty(email) && isEmail(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Inserisci un indirizzo email valido.')
    }
    if (!isEmailValid) {
      return;
    }

    try { const response = await requestNewPassword ({ email });

      if (response) { 
        alert(' Email di reset inviata! Controlla la tua casella di posta per le istruzioni.')
        const payload = {
        email: email,
        }
        await requestNewPassword (payload);


    } else { alert('Errore nell invio dell email. Riprova più tardi.')
    }
    } catch (error) {
      alert("Errore nell'invio dell'email di reset:", error);
    }
  };

  return (
    <div>
      <div>
        <form id="resetpasswordemailform" onSubmit={handleSubmit}>
          <h3>Reset Password</h3>
          <div> 
            <label> Inserisci Email{/*<HiOutlineMail/>*/}</label>
            <input type="text" required value={email} onChange={e => setEmail(e.target.value)}/> 
          </div>
          <button style={{marginTop: '10px', padding:'8px 8px' }} type="submit">Invia email</button>
          <div>
            <p>Ricordi la password?</p> 
            <Link to="/login">Accedi</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordEmailForm;