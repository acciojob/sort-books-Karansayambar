
import { Provider } from 'react-redux'
import './App.css'
import BooksList from './components/BooksList'
import store from './redux/store'

function App() {

  return (
    <>
    <Provider store={store}>
      <BooksList/>
    </Provider>
    </>
  )
}

export default App
