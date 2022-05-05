import Swal from "sweetalert2";
import { fetchWithOutToken, fetchWithtToken } from "../helpers/fetch";
import { types } from "../types/types";


export const startLogin = (email, password) =>{
    return async (dispatch) =>{

        const resp = await fetchWithOutToken('auth', {email, password}, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-time', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}
export const startRegister = (email, password, name) =>{
    return async (dispatch) =>{

        
        const resp = await fetchWithOutToken('auth/register', {email, password, name}, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-time', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchWithtToken( 'auth/renew' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            dispatch( endChecking() );
        }
    }
}

const endChecking = () =>({ type: types.authCheckingFinished})

const login = (user) =>({
    type: types.authLogin,
    payload: user
});


export const startLogout = () =>{
    return(dispatch) =>{

        localStorage.clear();
        dispatch(logout());

    }
}

const logout = () =>({ type: types.authLogout})

export const setErrorAction = (err) =>({
    type: types.uiSetError,
    payload: err
});

export const removeErrorAction = () =>({
    type: types.uiRemoveError
});