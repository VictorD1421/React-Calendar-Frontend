import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeErrorAction, setErrorAction, startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import './login.css';
import Swal from 'sweetalert2';

export const LoginScreen = () => {
    

    const {msgError} = useSelector( state => state.auth);
    const dispatch = useDispatch();
    
    const [formLoginValues, handleLoginInputChange] = useForm({
        Lemail: '',
        Lpassword: '',
    })
    
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        nameR: '',
        emailR: '',
        passwordR: '',
        passwordR2: '',
    })

   

    const {Lemail, Lpassword} = formLoginValues;

    const {  emailR, passwordR,passwordR2, nameR} = formRegisterValues;
  

    const isFormValid = () =>{
        
        if (nameR.trim().length <= 2 ) {
            
            Swal.fire('Error','Name Required', 'error')
            dispatch(setErrorAction());
            return false;

        }else if (!validator.isEmail(emailR)) {
            
            dispatch(setErrorAction('Email is not valid'));
            return false
            
        }else if( passwordR !== passwordR2 || passwordR.length < 8){
            
            Swal.fire('Error','Password is incorrect', 'error')
            dispatch(setErrorAction());
            return false
        }
        
        dispatch(removeErrorAction())
        
        return true;
    }
    
    const handleLogin = (e) =>{
        e.preventDefault()
        
        dispatch( startLogin( Lemail, Lpassword ));
    }
   
    const handleRegister = (e) =>{
        e.preventDefault();

        if ( isFormValid()) {
            dispatch(startRegister(emailR, passwordR, nameR));
        }
    }

    
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="Lemail"
                                value={Lemail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="Lpassword"
                                value={Lpassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>

                            {
                            msgError &&
                            (
                            <div className="auth__error">
                                {msgError}
                            </div>
                            )
                            }
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="nameR"
                                value={nameR}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="emailR"
                                value={emailR}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="passwordR"
                                value={passwordR}
                                onChange={handleRegisterInputChange} 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="passwordR2"
                                value={passwordR2}
                                onChange={handleRegisterInputChange} 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}