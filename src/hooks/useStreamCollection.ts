import { useState, useEffect } from 'react';
import {
  CollectionReference,
  onSnapshot,
  query,
  QueryConstraint,
} from 'firebase/firestore';

const useStreamCollection = <T>(
  colRef: CollectionReference<T>,
  ...queryConstraints: QueryConstraint[]
) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const queryRef = query(colRef, ...queryConstraints);

    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          uid: doc.id,
        })) as T[];

        setData(fetchedData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching collection:', error);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colRef]);

  return { data, loading };
};

export default useStreamCollection;
