import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface GameOverModalProps {
  show: boolean;
  score: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  show,
  score,
  onPlayAgain,
  onGoHome,
}) => {
  return (
    <Modal
      show={show}
      onHide={onGoHome}
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Header>
        <Modal.Title>Game Over</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Your score: {score}</p>
        <p>Do you want to play again or go home?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={onPlayAgain}>
          Play Again
        </Button>
        <Button variant="warning" onClick={onGoHome}>
          Go Home
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameOverModal;
