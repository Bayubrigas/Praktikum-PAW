// src/pages/Stats/Stats.js
import useBookStats from '../../hooks/useBookStats';

const Stats = () => {
  const { owned, reading, toBuy, total } = useBookStats();

  return (
    <div>
      <h1>Book Statistics</h1>
      <p>Total Books: {total}</p>
      <p>Owned: {owned}</p>
      <p>Reading: {reading}</p>
      <p>To Buy: {toBuy}</p>
    </div>
  );
};

export default Stats;