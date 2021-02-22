import React, { useState, useEffect } from "react";
// import {
//   getPatientCountBySeverity,
//   getPatientCountByVentilator,
// } from "../../apis";
import { API } from "../../backend";
import { HomePageContainer, Circle,RectBox } from "./homepage.styles";

const HomePage = () => {
  const totalBeds = 150;
  const totalVentilators = 50;
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [ventilatorCount, setVentilatorCount] = useState(0);
  //   const [severityResult, setSeverityResult] = useState({
  //     currentStatus: "",
  //     patientCount: "",
  //   });
  //const { currentStatus, patientCount } = severityResult;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(`${API}/ptcountseverity`, { signal: signal, method: "GET" })
      .then((results) => results.json())
      .then((data) => {
        //console.log(data);
        setResult(data);
      });

    fetch(`${API}/ptcount`, { signal: signal, method: "GET" })
      .then((results) => results.json())
      .then((data) => {
        //console.log(data);
        setCount(data[0].ptCount);
      });

    fetch(`${API}/ptcountventilator`, { signal: signal, method: "GET" })
      .then((results) => results.json())
      .then((data) => {
        //console.log(data);
        setVentilatorCount(data[0].ptCount);
      });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const cards = () => {
    return result.map((item) => (
      //  color = "#ff0000",
      //  if (item._id == "Severe") {
      //   color = "#ff0000";
      //  }

      <Circle
        key={item._id}
        style={{
          backgroundColor:
            item._id === "Severe"
              ? "#ff0000"
              : item._id === "Mild"
              ? "#FFFF00"
              : "#FF8C00",
        }}
      >
        <div
          style={{
            textAlign: "center",
            margin: "auto",
            padding: "70px 30px",
          }}
        >
          <h4>{item._id}</h4>
          <p>{item.ptCount}</p>
        </div>
      </Circle>
    ));
  };

  return (
    <HomePageContainer>
      <h1 style={{position:"relative",left:"-330px"}}>Beds</h1>
      <RectBox>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "10px 40px",
          justifyContent: "space-between",
          flexWrap: "wrap",
          margin: "30px",
          gap: "20px",
        }}
      >
        {cards()}

        <Circle style={{ backgroundColor: "#008000" }}>
          <div
            style={{
              textAlign: "center",
              margin: "auto",
              padding: "70px 30px",
            }}
          >
            <h4>Free</h4>
            <p>{totalBeds - count}</p>
          </div>
        </Circle>
      </div>
      </RectBox>
      <h1 style={{position:"relative",left:"-200px"}}>Ventilators</h1>
      <RectBox style={{width:"700px"}}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "10px 40px",
          justifyContent: "space-between",
          flexWrap: "wrap",
          margin:"30px 90px 30px 90px",
          gap: "20px",
        }}
      >
        <Circle
          style={{
            backgroundColor: "#FF8C00",
          }}
        >
          <div
            style={{
              textAlign: "center",
              margin: "auto",
              padding: "70px 30px",
            }}
          >
            <h4>Used</h4>
            <p>{ventilatorCount}</p>
          </div>
        </Circle>
        <Circle
          style={{
            backgroundColor: "#008000",
          }}
        >
          <div
            style={{
              textAlign: "center",
              margin: "auto",
              padding: "70px 30px",
            }}
          >
            <h4>Free</h4>
            <p>{totalVentilators - ventilatorCount}</p>
          </div>
        </Circle>
      </div>
      </RectBox>
    </HomePageContainer>
  );
};

export default HomePage;
