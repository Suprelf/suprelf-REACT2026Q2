import { useState } from 'react';
import './App.css';

import { Modal } from './components/modal/modal';
import { ControlledForm } from './components/controledForm/controledForm';
import { UncontrolledForm } from './components/uncontroledForm/uncontroledForm';
import Container from './components/container/container';

import type { Submission, SubmissionInput } from './types/types';
import { useFormStore } from './store/useStore';

type Mode = 'controlled' | 'uncontrolled' | null;

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(null);

  const addSubmission = useFormStore((s) => s.addSubmission);
  const setNewSubmissionId = useFormStore((s) => s.setNewSubmissionId);

  const openControlled = () => {
    setMode('controlled');
    setIsOpen(true);
  };

  const openUncontrolled = () => {
    setMode('uncontrolled');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMode(null);
  };

  const handleSubmit = (data: SubmissionInput) => {
    const submission: Submission = {
      id: crypto.randomUUID(),
      ...data,
    };

    addSubmission(submission);
    setNewSubmissionId(submission.id);

    setTimeout(() => {
      setNewSubmissionId(null);
    }, 3000);

    closeModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {mode === 'controlled' && (
          <ControlledForm onSubmit={handleSubmit} />
        )}

        {mode === 'uncontrolled' && (
          <UncontrolledForm onSubmit={handleSubmit} />
        )}
      </Modal>

      <Container
        onOpenControlled={openControlled}
        onOpenUncontrolled={openUncontrolled}
      />
    </>
  );
}

export default App;