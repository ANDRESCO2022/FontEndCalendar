import { fireEvent, render, screen } from '@testing-library/react'
import { FabDelete } from '../../../calendar/Components/FabDelete'
import { useCalendarStorte } from '../../../hooks'

jest.mock('../../../hooks')
describe('pruebas en elcomponente <FabDelete/>', () => {
  const mockStartDeletingEvent = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })
  test('debe de mostrar el componente correctamente', () => {
    useCalendarStorte.mockReturnValue({
      hasEventSelected: false
    })
    render(<FabDelete />)
    const btn = screen.getByLabelText('delete')
    expect(btn.classList).toContain('btn')
    expect(btn.classList).toContain('btn-danger')
    expect(btn.classList).toContain('fab-danger')
    expect(btn.style.display).toBe('none')
  })
  test('debe de mostrarel boton si hay un evento activo', () => {
    useCalendarStorte.mockReturnValue({
      hasEventSelected: true
    })
    render(<FabDelete />)
    const btn = screen.getByLabelText('delete')
    expect(btn.style.display).toBe('')
  })
  test('debe de llamar startDeletingEevent si hay evento activo', () => {
    useCalendarStorte.mockReturnValue({
      hasEventSelected: true,
      startDeleteEvent: mockStartDeletingEvent
    })
    render(<FabDelete />)
    const btn = screen.getByLabelText('delete')
    fireEvent.click(btn)
    expect(mockStartDeletingEvent).toHaveBeenCalled()
  })
})
