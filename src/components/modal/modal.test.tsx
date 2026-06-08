import { describe, it, vi, expect, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './modal';

beforeAll(() => {
  const root = document.createElement('div');
  root.setAttribute('id', 'modal-root');
  document.body.appendChild(root);
});

describe('Modal', () => {
  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <div>content</div>
      </Modal>
    );

    expect(screen.queryByText('content')).not.toBeInTheDocument();
  });

  it('renders content when open', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>content</div>
      </Modal>
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('calls onClose on ESC key', () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>content</div>
      </Modal>
    );

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on overlay click', () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>content</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');

    fireEvent.click(dialog);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
