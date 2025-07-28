import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react"
import { validateResetToken } from "../../../../service/password.service.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ResetPasswordForm from "../Resetpassword/ResetpasswordForm.jsx";

const ForgotpasswordPage = () => {

   const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false)
    const [isTokenValid, setIsTokenValid] = useState(false)

  const resetTokenToBeChecked = searchParams.get('token');
 
    const validationCheck = async (resetToken) => {
        setIsLoading(true)
 
    try {
        const checkedToken = await validateResetToken({ token: resetToken })
 
        if (checkedToken?.valid) {
            setIsTokenValid(true)
        }
    } catch (error) {
        console.error("Errore nella validazione:", error)
    } finally {
        setIsLoading(false)
    }
    }
 
    useEffect(() => {
        validationCheck(resetTokenToBeChecked)
    }, [])
    
return <>
 
        {isLoading? <p>ATTENDERE</p> : null}
        {isTokenValid? <ResetPasswordForm resetToken={resetTokenToBeChecked}/> : <p>TOKEN NON VALIDO</p>}
    
    </>
}
 
export default ForgotpasswordPage;
