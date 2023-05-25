import './App.css';

import Counter from './Components/Counter';

function App() {
  return (
    <>
      <div className="card">
        <Counter initialCount={0} />
      </div>
    </>
  );
}

// Test Case 1: Initial count should be 0
// console.assert(<App />.props.children[1].props.children === 0, 'Test Case 1 Failed');

// // Test Case 2: Incrementing count should increase it by 1
// <App />.props.children[2].props.onClick();
// console.assert(<BugyyComponent />.props.children[1].props.children === 1, 'Test Case 2 Failed');

// // Test Case 3: Decrementing count should decrease it by 1
// <App />.props.children[3].props.onClick();
// console.assert(<App />.props.children[1].props.children === 0, 'Test Case 3 Failed');

// // Test Case 4: Multiple increments should work correctly
// <App />.props.children[2].props.onClick();
// <App />.props.children[2].props.onClick();
// console.assert(<App />.props.children[1].props.children === 2, 'Test Case 4 Failed');

// console.log('All test cases passed!');

export default App;
