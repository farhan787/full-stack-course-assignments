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

export default App;
