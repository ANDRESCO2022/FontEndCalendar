import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { store } from './store'

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <h1>CalendarApp</h1>
      <hr />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
