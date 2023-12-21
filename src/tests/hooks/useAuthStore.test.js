import { act, renderHook, waitFor } from '@testing-library/react'
import { authSlice } from '../../store'
import { initialState, logoutInitialState } from '../fixtures/authStates'
import { useAuthStore } from '../../hooks/useAuthStore'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { calendarApi } from '../../api'
import { testUserCedentials } from '../fixtures/testUser'

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
  beforeEach(() => localStorage.clear())
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
      user: { name: 'test-mern', uid: '656e8bba59e84b12c63edef6' }
    })
    expect(localStorage.getItem('token')).toEqual(expect.any(String))
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))
  })
  test('startLogin debe de fallar  la autenticación', async () => {
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
  test('StartRegister debe de crear un usuario', async () => {
    const newUser = {
      email: 'algo@gmail.com',
      password: '123455889',
      name: 'test-mern'
    }
    const mockStore = getMockStore({ ...logoutInitialState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })
    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        uid: 'XXXXXXXXXXXXXXXXXXXXXXXX',
        name: newUser.name,
        token: 'XXXXXXXXXXXXXXXXXXXXXXXX'
      }
    })
    await act(async () => {
      await result.current.startRegister(newUser)
    })
    const { errorMessage, status, user } = result.current
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'test-mern', uid: 'XXXXXXXXXXXXXXXXXXXXXXXX' }
    })
    spy.mockRestore()
  })
  test('startRegister debe de fallar  la creacíon', async () => {
    const mockStore = getMockStore({ ...logoutInitialState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    await act(async () => {
      await result.current.startRegister(testUserCedentials)
    })
    const { errorMessage, status, user } = result.current
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'El usuario ya existe',
      status: 'not-authenticated',
      user: {}
    })
  })
  test('checkAuthTokrn debe de fallar si no hay token', async () => {
    const mockStore = getMockStore({ ...initialState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    await act(async () => {
      await result.current.checkAuthToken()
    })
    const { errorMessage, status, user } = result.current
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'not-authenticated',
      user: {}
    })
  })
  test('checkAuthTokrn debe de autenticar el usuario si hay token ', async () => {
    const { data } = await calendarApi.post('/auth', testUserCedentials)
    localStorage.getItem('token', data.token)
    const mockStore = getMockStore({ ...initialState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    await act(async () => {
      await result.current.checkAuthToken()
    })
    const { errorMessage, status, user } = result.current
    expect({ errorMessage, status, user }).toEqual({
      cerrorMessage: undefined,
      status: 'not-authenticated',
      user: {}
    })
  })
})
