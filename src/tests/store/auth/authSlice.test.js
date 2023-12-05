import {
  authSlice,
  onLogout,
  onLogin,
  clearErrorMessage
} from '../../../store/auth/authSlice'
import { authInitialState, initialState } from '../../fixtures/authStates'
import { testUserCedentials } from '../../fixtures/testUser'

describe('pruebas en auhSlice', () => {
  test('debe de regresar el estado inicial  ', () => {
    expect(authSlice.getInitialState()).toEqual(initialState)
  })
  test('debe de  realizar  un login ', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCedentials))
    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCedentials,
      errorMessage: undefined
    })
  })
  test('debe de realizar un logout', () => {
    const state = authSlice.reducer(authInitialState, onLogout())
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined
    })
  })
  test('debe de realizar un logout', () => {
    const error = 'credenciales no  válidas'
    const state = authSlice.reducer(authInitialState, onLogout(error))
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: error
    })
  })
  test('debe de limpiar  el mensaje  de  error', () => {
    const error = 'credenciales no  válidas'
    const state = authSlice.reducer(authInitialState, onLogout(error))
    const newState = authSlice.reducer(state, clearErrorMessage())
    expect(newState.errorMessage).toEqual(undefined)
  })
})
