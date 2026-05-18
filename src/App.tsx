import { Routes, Route } from 'react-router-dom';

import Container from './components/container/container';
import About from './pages/about/about';
import NotFound from './pages/notFound/notFound';
import ErrorBoundary from './components/errorBoundary/errorBoundary';

import DetailsPanel from './components/details/details';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route path="details/:name" element={<DetailsPanel />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
