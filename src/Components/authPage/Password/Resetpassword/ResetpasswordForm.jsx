import useInput from "../../../../hooks/useInput.js";
//import TbLockPassword from "@tabler/icons-react/lock-password";
import {useState} from "react";
import { sendingANewPassword } from "../../../../service/password.service.js";
import { hasMinLength, hasMaxLength, isEqualToOtherValue } from "../../../../validators/validators.js";
 
const ResetPasswordForm = ({resetToken}) => {
 
    const {value: passwordValue, handleChange: handlePasswordChange} = useInput("");
    const {value: confirmPasswordValue, handleChange: handleConfirmPasswordChange} = useInput("");
 
 
    const [formErrors, setFormErrors] = useState({
        password: '',
    });
 
    const handleFormErrorsChange = (key, value) => {
        setFormErrors(prevState => ({...prevState, [key]: value}));
    }
 
    const submitPasswordChange = async (event) => {
    event.preventDefault();
    
    setFormErrors({
        password: '',
        })
 
    const isPasswordValid = hasMinLength(passwordValue, 8) && hasMaxLength(passwordValue, 60);
    const passwordsMatch = isEqualToOtherValue(passwordValue, confirmPasswordValue);
 
    if (!isPasswordValid) {
            handleFormErrorsChange('password', 'La password deve contenere almeno 8 caratteri');
            return
        }
 
    if (!passwordsMatch) {
            handleFormErrorsChange('confirmPassword', 'Le password devono corrispondere');
        }
    
 
    const payload = {
            token: resetToken,
            password: passwordValue,
        }
 
    const newPassword = await sendingANewPassword(payload);
        console.log(payload)
        if (newPassword) {
            alert("HA FUNZIONATO! Presto ci sarà un magnifico toast")
        }
        else {
            console.error("operazione fallita")
        }
    }
 
    return <>
    <div>
            <h3>Scegli la nuova password</h3>
            <form  onSubmit={submitPasswordChange}>
                 <label htmlFor="password" >Password{/*<TbLockPassword/>*/}</label>
                 <input type="password" value={passwordValue} onChange={handlePasswordChange}/>
                    {formErrors.password && <span >{formErrors.password}</span>}
                 <label htmlFor="confirmPassword" >Conferma Password{/*<TbLockPassword/>*/}</label>
                 <input type="password" value={confirmPasswordValue} onChange={handleConfirmPasswordChange}/>
                    {formErrors.confirmPassword && <span >{formErrors.confirmPassword}</span>}
                <button type="submit" className="submit_button">Invia la nuova password</button>
            </form>
        </div>
        </>
}
 
export default ResetPasswordForm