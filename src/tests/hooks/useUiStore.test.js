import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { uiSlice } from '../../store'
import { useUiStore } from '../../hooks'
import { configureStore } from '@reduxjs/toolkit'

const getMockStore = initialState => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloaderState: {
      ui: { ...initialState }
    }
  })
}

describe('pruebas  en useUiStore', () => {
  test('debe de regresar los valores por defecto  ', () => {
    const mockStore = getMockStore({ isDateModalOpen: false })
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function)
    })
  })
  test('openDateModal debe de cambiar el isDateModalOpen a true', () => {
    const mockStore = getMockStore({ isDateModalOpen: false })
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })
    const { openDateModal } = result.current
    act(() => {
      openDateModal()
    })
    expect(result.current.isDateModalOpen).toBeTruthy()
  })
  test('closeDateModal debe de colocar false en isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: true })
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })
    const { closeDateModal } = result.current
    act(() => {
      closeDateModal()
    })

    expect(result.current.isDateModalOpen).toBeFalsy()
  })
  test('toggleDateModal debe de cambiar el estado respectivamente ', () => {
    const mockStore = getMockStore({ isDateModalOpen: true })
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    act(() => {
      result.current.toggleDateModal()
    })

    expect(result.current.isDateModalOpen).toBeTruthy()
    act(() => {
      result.current.toggleDateModal()
    })
    expect(result.current.isDateModalOpen).toBeFalsy()
  })
})
