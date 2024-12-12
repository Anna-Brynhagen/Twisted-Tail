import { Table, Container, Card } from 'react-bootstrap';
import LoadingScreen from '../components/LoadingScreen';
import useGetUsersInfo from '../hooks/useGetUsersInfo';
import { ViewUserData } from '../types/User.types';
import useAuth from '../hooks/useAuth';

const HighscorePage: React.FC = () => {
  const { data: users, loading } = useGetUsersInfo();
  const { currentUser } = useAuth();

  const highscores = users
    ?.filter(
      (user: ViewUserData) =>
        user.highscores && user.highscores.some((score) => score > 10)
    )
    .map((user: ViewUserData) => ({
      name: user.name || 'Anonymous',
      highestScore: Math.max(...user.highscores.filter((score) => score > 10)),
      photo: user.photo || undefined,
      uid: user.uid,
    }))
    .sort((a, b) => b.highestScore - a.highestScore);

  const currentUserHighscore = currentUser
    ? users
        ?.find((user) => user.uid === currentUser.uid)
        ?.highscores?.reduce((max, score) => Math.max(max, score), 0) || null
    : null;

  return (
    <Container className="highscore-page mt-4 mb-4">
      {loading ? (
        <LoadingScreen
          message="Fetching Highscores..."
          color="#4d0011"
          minimumDelay={1000}
        />
      ) : (
        <>
          {currentUser && currentUserHighscore !== null && (
            <Card className="p-3 mb-3">
              <div className="current-user-highscore text-center">
                <h3 className="mb-2">Your Highest Highscore:</h3>
                <span className="display-4 fw-bold user-score">
                  {currentUserHighscore}
                </span>
              </div>
            </Card>
          )}

          <Card className="shadow-sm p-3">
            <h1 className="text-center mb-3">Highscore Leaderboard</h1>
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
        </>
      )}
    </Container>
  );
};

export default HighscorePage;
