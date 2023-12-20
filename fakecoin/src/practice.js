import  { useState } from 'react';

function App() {
  const [numCoins, setNumCoins] = useState(0);
  const [fakeCoinIndex, setFakeCoinIndex] = useState(null);

  const handleNumCoinsChange = (event) => {
    setNumCoins(event.target.value);
  };

  const handleFindFakeCoin = () => {
    const coins = randomizeCoins(numCoins);
    setFakeCoinIndex(testingFakeOne(coins, 0, coins.length));
  };

  return (
    <div>
      <input type="number" value={numCoins} onChange={handleNumCoinsChange} />
      <button onClick={handleFindFakeCoin}>Find Fake Coin</button>
      {fakeCoinIndex !== null && <p>The fake coin is at position: {fakeCoinIndex}</p>}
    </div>
  );
}

function randomizeCoins(n) {
  let coins = Array(n - 1).fill(1).concat(0);
  for (let i = coins.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [coins[i], coins[j]] = [coins[j], coins[i]];
  }
  return coins;
}

function testingFakeOne(coins, x, y) {
  let n = y - x;
  if (n === 1) {
    return x; // The index of the fake coin
  } else {
    if (n % 3 === 0 || n % 3 === 1) {
      let third = Math.floor((y - x) / 3);
      let A = coins.slice(x, x + third);
      let B = coins.slice(x + third, x + 2 * third);
      // let C = coins.slice(x + 2 * third, y);

      if (sumArray(A) < sumArray(B)) {
        return testingFakeOne(coins, x, x + third);
      } else if (sumArray(A) > sumArray(B)) {
        return testingFakeOne(coins, x + third, x + 2 * third);
      } else {
        return testingFakeOne(coins, x + 2 * third, y);
      }
    } else {
      let thirdPlusOne = Math.floor((y - x) / 3) + 1;
      let A = coins.slice(x, x + thirdPlusOne);
      let B = coins.slice(x + thirdPlusOne, x + 2 * thirdPlusOne);
      // let C = coins.slice(x + 2 * thirdPlusOne, y);

      if (sumArray(A) < sumArray(B)) {
        return testingFakeOne(coins, x, x + thirdPlusOne);
      } else if (sumArray(A) > sumArray(B)) {
        return testingFakeOne(coins, x + thirdPlusOne, x + 2 * thirdPlusOne);
      } else {
        return testingFakeOne(coins, x + 2 * thirdPlusOne, y);
      }
    }
  }
}

function sumArray(arr) {
  return arr.reduce((acc, val) => acc + val, 0);
}


export default App;
