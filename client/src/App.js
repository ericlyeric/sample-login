import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async function () {
      try {
        await fetch('/api/hello')
          .then((res) => res.json())
          .then((hello) => setData(hello));
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1> {data ? data.hello : null}</h1>
    </>
  );
}

export default App;
