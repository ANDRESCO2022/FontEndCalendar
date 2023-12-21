import { useCalendarStorte } from '../../hooks'

export const FabDelete = () => {
  const { startDeleteEvent, hasEventSelected } = useCalendarStorte()
  const handleDelete = () => {
    startDeleteEvent()
  }
  return (
    <button
      aria-label="delete"
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{ display: hasEventSelected ? '' : 'none' }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}
