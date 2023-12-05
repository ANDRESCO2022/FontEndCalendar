import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadingEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent
} from '../../../store/calendar/calendarSlice'
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState
} from '../../fixtures/calendarState'

describe('pruebas  en calebdarSlice', () => {
  test('debe de  regresar el estado por defecnto ', () => {
    const state = calendarSlice.getInitialState()
    expect(state).toEqual(initialState)
  })
  test('onSetActiveEvent debe  de  activar  el evento ', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onSetActiveEvent(events[0])
    )
    expect(state.activeEvent).toEqual(events[0])
  })
  test('onAddNewEvent debe de agregar un nuevo evento', () => {
    const newEvent = {
      id: '3',
      title: 'tercer nuevo  evento de prueba',
      notes: 'registro de horas inactivas',
      start: new Date('2020-10-21 13:00:00'),
      end: new Date('2020-10-21 16:00:00')
    }
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    )
    expect(state.events).toEqual([...events, newEvent])
  })
  test('onUpdateEvent  debe de Actualizar  un evento', () => {
    const updatedEvent = {
      _id: '1',
      title: 'tercer nuevo  evento de prueba',
      notes: 'registro de nuevas horas',
      start: new Date('2022-10-21 13:00:00'),
      end: new Date('2022-10-21 16:00:00')
    }
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    )

    // expect(state.events).not.toContain(events[0])
    expect(state.events).toContain(updatedEvent)
  })
  test(' onDeleteEvent debe de borrar el evento activo ', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    )
    expect(state.events).not.toContain(events[0])
    expect(state.activeEvent).toBe(null)
  })
  test('onLoadEvent debe de establecer los  eventos ', () => {
    const state = calendarSlice.reducer(initialState, onLoadingEvents(events))
    expect(state.isLoadingEvents).toBeFalsy()
    //expect(state.events.length).toBe(events.length)
    //expect(state.events).toEqual(events)
  })
  test('onLogoutCalendar debe de limpiar el estado', () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onLogoutCalendar()
    )
    expect(state).toEqual(initialState)
  })
})
