import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface GameOverModalProps {
  show: boolean;
  score: number;
  onPlayAgain: () => void;
  onGoToHighscores: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  show,
  score,
  onPlayAgain,
  onGoToHighscores,
}) => {
  return (
    <Modal show={show} centered dialogClassName="custom-modal">
      <Modal.Header>
        <Modal.Title>Game Over</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Your score: {score}</p>
        <p>Do you want to play again or check out the highscores?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={onPlayAgain}>
          Play Again
        </Button>
        <Button variant="warning" onClick={onGoToHighscores}>
          Highscores
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameOverModal;
