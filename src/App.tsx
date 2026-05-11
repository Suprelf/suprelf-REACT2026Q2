import './App.css';
import Container from './components/container/container';
import ErrorBoundary from './components/errorBoundary/errorBoundary';

function App() {
  return (
    <>
      <ErrorBoundary>
        <Container></Container>
      </ErrorBoundary>
    </>
  );
}

export default App;
