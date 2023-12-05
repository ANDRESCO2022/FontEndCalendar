import {
  onOpenDateModal,
  onCloseDateModal,
  uiSlice
} from '../../../store/ui/uiSlice'

describe('pruebas eb uiSlice ', () => {
  test('ebe de regresar el estado por defecto', () => {
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy()
    expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false })
  })
  test('debe de cambiar el isDateModalOpen correctamente ', () => {
    let state = uiSlice.getInitialState()
    state = uiSlice.reducer(state, onOpenDateModal())
    expect(state.isDateModalOpen).toBeTruthy()
    expect(state.onCloseDateModal).toBeFalsy()
  })
})
