import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {
    
    const dispatch = useDispatch();

    const createNewEvent = () =>{
        dispatch(uiOpenModal());
    }

    return (
        <button onClick={createNewEvent} className='btn btn-primary fab'>
            <i className='fas fa-plus'></i>
        </button>
  )
}
