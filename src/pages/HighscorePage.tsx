import { Table, Container, Card } from 'react-bootstrap';
import LoadingScreen from '../components/LoadingScreen';
import useGetUsersInfo from '../hooks/useGetUsersInfo';
import { ViewUserData } from '../types/User.types';

const HighscorePage: React.FC = () => {
  const { data: users, loading } = useGetUsersInfo();

  const highscores = users
    ?.filter(
      (user: ViewUserData) => user.highscores && user.highscores.length > 0
    )
    .map((user: ViewUserData) => ({
      name: user.name || 'Anonymous',
      highestScore: Math.max(...(user.highscores || [])),
      photo: user.photo || undefined,
    }))
    .sort((a, b) => b.highestScore - a.highestScore);

  return (
    <Container className="highscore-page mt-5">
      {loading ? (
        <LoadingScreen
          message="Fetching Highscores..."
          color="#4d0011"
          minimumDelay={1000}
        />
      ) : (
        <Card className="shadow-sm p-4 mb-4">
          <h1 className="text-center mb-4">Highscore Leaderboard</h1>
          <Table bordered hover responsive="md" className="highscore-table">
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Player</th>
                <th>Highest Score</th>
              </tr>
            </thead>
            <tbody>
              {highscores && highscores.length > 0 ? (
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
        </Card>
      )}
    </Container>
  );
};

export default HighscorePage;
