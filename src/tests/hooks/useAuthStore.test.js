import { act, renderHook, waitFor } from '@testing-library/react'
import { authSlice } from '../../store'
import { initialState, logoutInitialState } from '../fixtures/authStates'
import { useAuthStore } from '../../hooks/useAuthStore'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

const getMockStore = initialState => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer
    },
    preloaderState: {
      auth: { ...initialState }
    }
  })
}
describe('pruebas en useAuthStore', () => {
  test('debe de regresar los valores por defecto', () => {
    const mockStore = getMockStore({
      ...initialState
    })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    expect(result.current).toEqual({
      errorMessage: undefined,
      status: 'checking',
      user: {},
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function)
    })
  })
  test('startLogin debe de realizar el login correctamente', async () => {
    localStorage.clear()
    const mockStore = getMockStore({ ...logoutInitialState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })
    await act(async () => {
      await result.current.startLogin({
        email: 'test@gmail.com',
        password: '123456'
      })
    })

    const { errorMessage, status, user } = result.current
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'test-mern', uid: '6524b9516a813da50a5ba61b' }
    })
    expect(localStorage.getItem('token')).toEqual(expect.any(String))
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))
  })
  test('startLogin debe de fallar  la autenticación', async () => {
    localStorage.clear()
    const mockStore = getMockStore({ ...logoutInitialState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })
    await act(async () => {
      await result.current.startLogin({
        email: 'algo@gmail.com',
        password: '12345556'
      })
    })
    const { errorMessage, status, user } = result.current
    expect(localStorage.getItem('token')).toBe(null)
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'informacion incorrecta ',
      status: 'not-authenticated',
      user: {}
    })
    await waitFor(() => expect(result.current.errorMessage).toBe(undefined))
  })
})
