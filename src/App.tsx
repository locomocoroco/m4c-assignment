import React, { useState } from "react";
import "./App.css";
import CallScreen from "./Components/CallScreen/CallScreen";

const rand = () => Math.floor(Math.random() * 1000 - 1).toString(); //memoize

const initState = {
  [rand()]: { status: "idle", caller: "" },
  [rand()]: { status: "idle", caller: "" },
  [rand()]: { status: "idle", caller: "" },
  [rand()]: { status: "idle", caller: "" },
};

function App() {
  const [partyInfo, setPartyInfo] = useState(initState);

  const stateChangeParty = (changeObj: any) => {
    setPartyInfo((prev) => {
      return {
        ...prev,
        ...changeObj,
      };
    });
  };

  const handleCall = (e: any, idInput: string, num: string) => {
    console.log(idInput, num);
    if (partyInfo[idInput]) {
      if (partyInfo[idInput].status !== "idle") {
        stateChangeParty({ [num]: { status: "remote is busy", caller: "" } }); //settimeout
        setTimeout(() => {
          stateChangeParty({ [num]: { status: "idle", caller: "" } });
        }, 1000);
      } else {
        stateChangeParty({
          [num]: { status: "remote is ringing", caller: idInput },
          [idInput]: { status: "ringing", caller: num },
        });
      }
    } else {
      stateChangeParty( {[num]: { status: "remote unknown", caller: "" }}) //settimeout
      setTimeout(() => {
        stateChangeParty({[num]: { status: "idle", caller: "" }}) 
      }, 1000);
    }
    e.preventDefault();
  };

  const hangUp = (num: string) => {
    setPartyInfo((prev) => {
      return {
        ...prev,
        [prev[num].caller]: { status: "idle", caller: "" },
        [num]: { status: "idle", caller: "" },
      };
    });
  };
  const answer = (num: string) => {
    setPartyInfo((prev) => {
      return {
        ...prev,
        [prev[num].caller]: { status: "talking", caller: num },
        [num]: { status: "talking", caller: prev[num].caller },
      };
    });
  };
  const reject = (num: string) => {
    const caller = partyInfo[num].caller;
    setPartyInfo((prev) => {
      return {
        ...prev,
        [caller]: { status: "remote rejected", caller: num }, //settimout
        [num]: { status: "idle", caller: "" },
      };
    });
    setTimeout(() => {
      setPartyInfo((prev) => {
        return {
          ...prev,
          [caller]: { status: "idle", caller: "" },
        };
      });
    }, 1000);
  };
  return (
    <div className="App">
      {Object.keys(partyInfo).map((partyNum) => (
        <CallScreen
          key={partyNum}
          phoneNum={partyNum}
          callStatus={partyInfo[partyNum].status}
          handleCall={handleCall}
          handleHangup={hangUp}
          handleAnswer={answer}
          handleReject={reject}
        />
      ))}
    </div>
  );
}

export default App;
