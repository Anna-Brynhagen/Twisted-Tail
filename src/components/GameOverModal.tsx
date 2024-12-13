import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
        <p className="score-text">
          You scored: <br />
          <span className="score-span">{score}</span>
        </p>
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
