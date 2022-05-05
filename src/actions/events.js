import Swal from "sweetalert2";
import { fetchWithtToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types"


export const eventStartAddNew = (event) =>{
    return async(dispatch, getState) =>{

        const {uid, name} = getState().auth

        try {
            
            const resp = await fetchWithtToken('events', event, 'POST');
            const body = await resp.json();
    
            
            if (body.ok) {
                event.id = body.event.id;
                event.user = { uid, name }

                console.log(event);
                dispatch( eventAddNew( event ) );
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const eventAddNew = (event) =>({
    type: types.eventAddNew,
    payload: event
});


export const eventSetActive = (event) =>({
    type: types.eventSetActive,
    payload: event
});

export const activeEventCleaner = () =>({ type: types.activeEventCleaner});


export const startDelete = () =>{
    return async(dispatch, getState) =>{

        const {id} = getState().calendar.activeEvent;
              
        try {
            const resp = await fetchWithtToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();
            
            if (body.ok) {
                dispatch(eventDeleted())
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}


const eventDeleted = () =>({ type: types.eventDeleted});

export const eventStartLoading = () =>{
    return async(dispatch) =>{
        
        try {
            const resp = await fetchWithtToken('events');
            const body = await resp.json();

            const events = prepareEvents(body.events);
            
            dispatch(eventLoaded(events));
        } catch (error) {
            console.log(error);
        }
    }
}

const eventLoaded = (events) =>({
    type: types.eventLoaded,
    payload: events
})


export const startEventUpdate = (event) =>{
    return async(dispatch) =>{
              
        try {
            const resp = await fetchWithtToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();
            
            if (body.ok) {
                dispatch(eventUpdated(event))
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const eventUpdated = (event) =>({
    type: types.eventUpdated,
    payload: event
});