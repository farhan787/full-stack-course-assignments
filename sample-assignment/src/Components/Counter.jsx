import { useEffect, useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [isEven, setIsEven] = useState(true);

  useEffect(() => {
    setIsEven(count / 2 === 0 ? false : true);
  }, []);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <>
      <h1>Counter</h1>
      <h2>
        Count: <span data-testid="count">{count}</span>
      </h2>

      <h2>
        Is Even? <span data-testid="isEven">{`${isEven}`}</span>
      </h2>

      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </>
  );
}

export default Counter;
