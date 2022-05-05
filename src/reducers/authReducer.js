import { types } from "../types/types";


const initialState = {
    checking: true,
    msgError: null

}

export const authReducer = (state = initialState, action) =>{

    switch (action.type) {
        
        case types.authLogin:
            return{
                ...state,
                ...action.payload,
                checking: false
            }
        case types.authCheckingFinished:
            return{
                ...state,
                checking: false
            }

        case types.authLogout:
            return{
                checking: false

            }

        case types.uiSetError:
            return{
                ...state,
                msgError: action.payload
            }
        case types.uiRemoveError:
        return{
            ...state,
            msgError: null
        }

        default:
            return state;
    }
}
