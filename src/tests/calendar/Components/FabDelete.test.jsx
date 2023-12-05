import { render, screen } from '@testing-library/react'
import { FabDelete } from '../../../calendar/Components/FabDelete'
import { Provider } from 'react-redux'
import { store } from '../../../store'

describe('pruebas en elcomponente <FabDelete/>', () => {
  test('debe de mostrar el componente correctamente', () => {
    render(
      <Provider store={store}>
        <FabDelete />
      </Provider>
    )
    screen.debug()
  })
})
