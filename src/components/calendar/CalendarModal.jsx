import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { activeEventCleaner, eventStartAddNew, startEventUpdate } from '../../actions/events';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');

const endTime = now.clone().add(1,'hours');

const initEvent ={
    title:'',
    notes: '',
    start: now.toDate(),
    end: endTime.toDate(),
}

export const CalendarModal = () => {

  const [startDate, setStartDate] = useState(now.toDate());
  const [, setEndDate] = useState(endTime.toDate());
  const [titleValid, setTitleValid] = useState(true);
  const [validNote, setValidNote] = useState(true);
  const dispatch = useDispatch();
  const {modalOpen} = useSelector(state => state.ui);
  const {activeEvent} = useSelector(state => state.calendar);
  const [formValues, setFormValues] = useState(initEvent);

  const {title, notes, start, end} = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent)
    }else{
      setFormValues(initEvent);
    }
    
  }, [activeEvent, setFormValues])
  

  const handleInputChange = ({target}) =>{
    setFormValues ({
          ...formValues,
          [target.name]: target.value
      }) 
  }

  const handleStartDateChange = (e) =>{
    setStartDate(e);
      setFormValues ({
        ...formValues,
        start: e
    })
  }

  const handleEndDate = (e) =>{
      setEndDate(e);
      setFormValues ({
        ...formValues,
        end: e
      })
    }
  
    const closeModal = () =>{
      dispatch(uiCloseModal());
      dispatch(activeEventCleaner());
      setFormValues(initEvent);
    }
  
    const handleSubmit = (e) =>{
      e.preventDefault();
    
    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire('Error','Las fechas no pueden ser iguales', 'error');
    }

    if(title.trim().length < 2){
      return setTitleValid(false);
    }

    if(notes.length <= 2){
      return setValidNote(false);
    }

    if (activeEvent) {
      dispatch(startEventUpdate(formValues));
    }else{
      dispatch(eventStartAddNew(formValues));
    }


    setTitleValid(true);
    closeModal();

  }
    
  return (
        
      <Modal
      isOpen={modalOpen}
      //onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className='modal'
      overlayClassName='modal-fondo'
      >

<h1> {(activeEvent)? 'Editar Evento': 'Nuevo Evento'} </h1>
<hr />
<form className="container" onSubmit={handleSubmit} >

    <div className="form-group">
        <label>Fecha y hora inicio</label>
        <DateTimePicker onChange={handleStartDateChange} value={start} className='form-control' />
    </div>

    <div className="form-group">
        <label>Fecha y hora fin</label>
        <DateTimePicker onChange={handleEndDate} value={end} minDate={startDate} className='form-control' />
    </div>

    <hr />
    <div className="form-group">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${ !titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group">
        <textarea 
            type="text" 
            className={`form-control ${ !validNote && 'is-invalid'}`}
            placeholder="Escriba su nota aqui..."
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

    </form>
      </Modal>
  )
}
