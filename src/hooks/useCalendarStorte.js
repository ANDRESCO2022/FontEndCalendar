import { useSelector, useDispatch } from 'react-redux'
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadingEvents,
  onSetActiveEvent,
  onUpdateEvent
} from '../store'
import { calendarApi } from '../api'
import { convertEventsToDateEvents } from '../helpers/convertEventToDateEvents'
import Swal from 'sweetalert2'

export const useCalendarStorte = () => {
  const dispatch = useDispatch()

  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)
  const setActiveEvent = calendarEvent => {
    dispatch(onSetActiveEvent(calendarEvent))
  }
  const startSavingEvent = async calendarEvent => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }))

        return
      }
      const { data } = await calendarApi.post('/events', calendarEvent)
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))
    } catch (error) {
      console.log(error)
      Swal.fire('Error  al guardar', error.response.data.msg, 'error')
    }
  }
  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(onDeleteEvent())
    } catch (error) {
      console.log(error)
      Swal.fire('Error  al eliminar', error.response.data.msg, 'error')
    }
  }
  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      const events = convertEventsToDateEvents(data.events)
      dispatch(onLoadingEvents(events))
    } catch (error) {
      console.log(error)
      console.log('Error al cargar eventos')
    }
  }

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents
  }
}
