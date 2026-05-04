import './App.css'
import ErrorBoundary from './components/errorBoundary/errorBoundary'
import ErrorButton from './components/errorButton/errorButton'

function App() {

  return (
    <>
      <ErrorBoundary>
        <ErrorButton></ErrorButton>
      </ErrorBoundary>

    </>
  )
}

export default App
