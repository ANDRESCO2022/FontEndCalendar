import calendarApi from '../../api/calendarApi'

describe('pruebas en el calendaApi', () => {
  test('debe de tener la  configuración por defecto', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
  })
  test('debe de  tener el x-token en las peticiones  al backend', async () => {
    localStorage.setItem('token', 'ABC-111-TTA')
    const res = await calendarApi.get('/auth ')
    expect(res.config.headers['x-token']).toBe('ABC-111-TTA')
  })
})
