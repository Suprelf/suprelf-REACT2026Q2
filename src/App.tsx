import './App.css';
import Container from './components/container/container';
import { Modal } from './components/modal/modal';
import { UncontrolledForm } from './components/uncontroledForm/uncontroledForm';
import type { Submission } from './types/types';

function App() {
  return (
    <>


      <Modal isOpen={true} onClose={function (): void {
        throw new Error('Function not implemented.');
      } } >
        <UncontrolledForm onSubmit={function (data: Submission): void {
          throw new Error('Function not implemented.');
        } }></UncontrolledForm>
      </Modal>

      <Container />
    </>
  );
}

export default App;