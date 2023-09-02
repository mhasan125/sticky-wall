import './App.scss'
import Routes from './pages/Routes';
import { useAuthContext } from './Context/AuthContext';



function App() {
  const { isAppLoading } = useAuthContext()

  if (isAppLoading)
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    )
  return (
    <>
      <Routes />
    </>
  )
}

export default App
