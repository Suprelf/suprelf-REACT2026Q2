import './App.css'
import ErrorBoundary from './components/errorBoundary/errorBoundary'
import ErrorButton from './components/errorButton/errorButton'
import SearchBar from './components/searchBar/searchBar'

function App() {

  return (
    <>
      <ErrorBoundary>
        <SearchBar></SearchBar>
      </ErrorBoundary>

    </>
  )
}

export default App
