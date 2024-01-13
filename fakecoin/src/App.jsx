import  { useState } from 'react';
import './App.css';
function App() {
  const [numCoins, setNumCoins] = useState('');
  const [fakeCoinIndex, setFakeCoinIndex] = useState(null);
          
  const randomizeCoins = (n) => {
    const realCoin = 1;
    const fakeCoin = 0;
    const coins = new Array(n - 1).fill(realCoin).concat(fakeCoin);
    for (let i = coins.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [coins[i], coins[j]] = [coins[j], coins[i]];
    }
    return coins; 
  };

  const findFakeCoin = (coins, start, end) => {
    if (start === end) {
      return start;
    }

    const mid = start + Math.floor((end - start) / 2);
    const leftGroup = coins.slice(start, mid);
    const rightGroup = coins.slice(mid, end);

    if (leftGroup.reduce((a, b) => a + b, 0) < rightGroup.reduce((a, b) => a + b, 0)) {
      return findFakeCoin(coins, start, mid);
    } else {
      return findFakeCoin(coins, mid + 1, end);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const coins = randomizeCoins(Number(numCoins));
    const index = findFakeCoin(coins, 0, coins.length);
    setFakeCoinIndex(index + 1); // Adjusting for 1-based index
  };

  return (
    <div className="app-container">
      <div className='top'>
       <div className='name'>
        <p>Sameer ALi Butt</p>
        <p>Hassan Baig</p>
       </div>
       <div className='enroll'>
        <p>01-134202-095</p>
        <p>01-134202-106</p>
       </div>
       
      </div>
    <header>

      <h1>Fake Coin Detector</h1>
      <p>
        This tool uses a binary search algorithm to detect a single fake coin in a set of otherwise identical coins. 
        The fake coin is slightly lighter than the others. Enter the total number of coins, and the app will determine 
        the position of the fake coin. The algorithm efficiently narrows down the fake coin position by dividing the 
        set into two groups and comparing their weights in each iteration.
      </p> 
    </header>         
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input  
          type="number"
          min="1" 
          value={numCoins}
          onChange={(e) => setNumCoins(e.target.value)}
          placeholder="Enter number of coin"
        />
        <button type="submit">Find Fake Coin</button>
      </form>
      {fakeCoinIndex !== null && (
        <p className="result">The {fakeCoinIndex}th coin is the fake one.</p>
      )}
    </div>
  </div>
  );
}

export default App;
