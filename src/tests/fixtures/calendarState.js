export const events = [
  {
    _id: '1',
    title: 'nuevo evento de prueba',
    notes: 'registro de horas',
    start: new Date('2020-10-21 13:00:00'),
    end: new Date('2020-10-21 16:00:00')
  },
  {
    _id: '2',
    title: 'segundo nuevo  evento de prueba',
    notes: 'registro de horas activas',
    start: new Date('2020-10-21 13:00:00'),
    end: new Date('2020-10-21 16:00:00')
  }
]
export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null
}
export const calendarWithEventsState = {
  isLoadingEvents: true,
  events: [...events],
  activeEvent: null
}
export const calendarWithActiveEventState = {
  isLoadingEvents: true,
  events: [...events],
  activeEvent: { ...events[0] }
}
