import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesES } from '../../helpers'
import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../'
import { useUiStore, useCalendarStorte, useAuthStore } from '../../hooks'

export const CalendarPages = () => {
  const { user } = useAuthStore()
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStorte()
  const [lastView, setLastView] = useState(
    localStorage.getItem('lasView') || 'week'
  )

  const eventStyleGetter = event => {
    const isMyEvent = user.uid === event.user._id || user.uid === event.user.uid

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#492fbc',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
  }
  const onDobleClick = () => {
    // console.log({ onDobleClick: event })
    openDateModal()
  }
  const onSelect = event => {
    setActiveEvent(event)
    openDateModal()
  }
  const onViewChange = event => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }
  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh-80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDobleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
