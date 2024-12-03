import { useEffect, useState } from 'react';
import { Table, Container, Card } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import { PlayerHighscore } from '../types/User.types';
import LoadingScreen from '../components/LoadingScreen';

const HighscorePage: React.FC = () => {
  const [highscores, setHighscores] = useState<PlayerHighscore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { fetchHighestHighscores } = useAuth();

  useEffect(() => {
    const loadHighscores = async () => {
      setLoading(true);
      try {
        const scores = await fetchHighestHighscores();
        setHighscores(scores);
      } catch (error) {
        console.error('Failed to load highscores:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHighscores();
  }, [fetchHighestHighscores]);

  return (
    <Container className="highscore-page mt-5">
      <Card className="shadow-sm p-4 mb-4">
        <h1 className="text-center mb-4">Highscore Leaderboard</h1>
        {loading ? (
          <LoadingScreen
            message="Fetching Highscores..."
            color="#4d0011"
            minimumDelay={1000}
            onComplete={() => setLoading(false)}
          />
        ) : (
          <Table bordered hover responsive="md" className="highscore-table">
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Player</th>
                <th>Highest Score</th>
              </tr>
            </thead>
            <tbody>
              {highscores.length > 0 ? (
                highscores.map((player, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">
                      <div className="d-flex align-items-center justify-content-left">
                        {player.photo ? (
                          <img
                            src={player.photo}
                            alt={`${player.name}'s profile`}
                            className="thumbnail"
                          />
                        ) : (
                          <div className="default-avatar">
                            {player.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="ms-2">{player.name}</span>
                      </div>
                    </td>
                    <td className="text-center">{player.highestScore}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">
                    No highscores available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

export default HighscorePage;
