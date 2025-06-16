import './App.css'
import FormPage from './pages/FormPage'
import {Toaster} from "react-hot-toast"
import ViewPage from './pages/ViewPage'

function App() {

  return (
    <>
      <div><Toaster/></div>
      <ViewPage/>

    </>
  )
}

export default App
