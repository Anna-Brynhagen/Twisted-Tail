import { usersCol } from '../services/firebase';
import useStreamCollection from './useStreamCollection';

const useGetUsersInfo = () => {
  return useStreamCollection(usersCol);
};

export default useGetUsersInfo;
