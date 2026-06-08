import './App.css';
import Container from './components/container/container';
import { Modal } from './components/modal/modal';

function App() {
  return (
    <>


      <Modal isOpen={true} onClose={function (): void {
        throw new Error('Function not implemented.');
      } } >
        <div>test content</div>
      </Modal>

      <Container />
    </>
  );
}

export default App;