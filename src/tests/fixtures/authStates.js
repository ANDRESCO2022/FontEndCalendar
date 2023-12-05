export const initialState = {
  status: 'checking', // 'not-authenticated', 'authenticated'
  user: {},
  errorMessage: undefined
}
export const authInitialState = {
  status: 'authenticated', // 'not-authenticated', 'authenticated'
  user: {
    uid: 'qwrer11',
    name: 'andres'
  },
  errorMessage: undefined
}
export const logoutInitialState = {
  status: 'not-authenticated', // 'not-authenticated', 'authenticated'
  user: {},
  errorMessage: undefined
}
