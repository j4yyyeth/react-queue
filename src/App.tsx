import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  const [items, setItems] = useState<number | undefined>(0);
  const [queues, setQueues] = useState([[], [], [], [], []]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items === undefined || items <= 0) { return; }
    let infinityLine = 1e9;
    let lowestLine: any;

    for (let queue of queues) {
      const lineValue = queue.reduce(
        (accumulator: number, value: number) => accumulator + value,
        0
      );
      if (lineValue < infinityLine) {
        infinityLine = lineValue;
        lowestLine = queue;
      }
    }

    //@ts-ignore
    setQueues((otherQueues) => 
      otherQueues.map((line) => 
        line === lowestLine ? [...line, items] : line
      )
    )
    setItems(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("QUEUES: ", queues);
      //@ts-ignore
      setQueues((otherQueues) => 
        otherQueues.map((line) => 
          [line[0] - 1, ...line.slice(1)].filter((value) => value > 0)
        )
      )
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>Add # of Items</label>
        <input
          type="number"
          value={items}
          onChange={(e) => setItems(+e.target.value)}
        ></input>
        <button type="submit">Checkout</button>
      </form>
      <br></br>
      <br></br>
      <br></br>

      <div className="queue">
        <div className="line">
          <div className="queue-box">Line 1</div>
          {queues[0].map((e, i) => {
            return <h3 key={i}>{e}</h3>;
          })}
        </div>
        <div className="line">
          <div className="queue-box">Line 2</div>
          {queues[1].map((e, i) => {
            return <h3 key={i}>{e}</h3>;
          })}
        </div>
        <div className="line">
          <div className="queue-box">Line 3</div>
          {queues[2].map((e, i) => {
            return <h3 key={i}>{e}</h3>;
          })}
        </div>
        <div className="line">
          <div className="queue-box">Line 4</div>
          {queues[3].map((e, i) => {
            return <h3 key={i}>{e}</h3>;
          })}
        </div>
        <div className="line">
          <div className="queue-box">Line 5</div>
          {queues[4].map((e, i) => {
            return <h3 key={i}>{e}</h3>;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
