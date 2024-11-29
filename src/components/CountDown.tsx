import { useEffect, useState } from 'react';

interface CountdownProps {
  onCountdownComplete: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ onCountdownComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const delay = setTimeout(() => {
        onCountdownComplete();
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [count, onCountdownComplete]);

  return (
    <div className="countdown-wrapper">
      <div className="countdown-container">
        <h1>{count > 0 ? count : 'Go!'}</h1>
      </div>
    </div>
  );
};

export default Countdown;
