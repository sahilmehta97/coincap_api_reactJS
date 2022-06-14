import { useState, useEffect } from "react";

// https://api.coincap.io/v2/assets?limit=20

function App() {
  const [coins, setCoins] = useState([]);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch(
        `https://api.coincap.io/v2/assets?limit=${limit}`
      );
      const data = await res.json();
      console.log(data.data);
      setCoins(data.data);
    };

    fetchCoins();
  }, [limit]);

  const handleRefresh = () => {
    setLimit(50);
    window.scrollTo(0, 0);
  };

  return (
    <section className="coins">
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        ReactJS assignment <a href="https://coincap.io">CoinCap API</a>
      </h1>
      <article>
        <p>Showing {coins.length} coins</p>
      </article>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price (USD)</th>
            <th>Symbol</th>
            <th>Explorer</th>
            <th>marketCapUsd</th>
            <th>volumeUsd24Hr</th>
          </tr>
        </thead>

        <tbody>
          {coins.map(
            ({
              id,
              name,
              rank,
              priceUsd,
              symbol,
              explorer,
              volumeUsd24Hr,
              marketCapUsd,
            }) => (
              <tr key={id}>
                <td>{rank}</td>
                <td>{name}</td>
                <td>${parseFloat(priceUsd).toFixed(2)}</td>
                <td>{symbol}</td>
                <td>{explorer}</td>
                <td>{marketCapUsd}</td>
                <td>{volumeUsd24Hr}</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="buttons">
        <button onClick={() => setLimit(limit + 50)}>Next</button>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
    </section>
  );
}

export default App;
