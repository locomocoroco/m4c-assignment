import React, { useState } from "react";
import "./App.css";
import CallScreen from "./Components/CallScreen/CallScreen";

const rand = () => Math.floor(Math.random() * 1000 - 1).toString();

const initState = {
  [rand()]: { status: "idle", caller: "" },
  [rand()]: { status: "idle", caller: "" },
  [rand()]: { status: "idle", caller: "" },
  [rand()]: { status: "idle", caller: "" },
};
interface stateobj {
  status: string;
  caller: string;
}
interface ChangeObjInt {
  [key: string]: stateobj;
}

function App() {
  const [partyInfo, setPartyInfo] = useState(initState);

  const stateChangeParty = (changeObj: ChangeObjInt) => {
    setPartyInfo((prev) => {
      return {
        ...prev,
        ...changeObj,
      };
    });
  };

  const handleCall = (e: any, idInput: string, num: string) => {
    if (partyInfo[idInput]) {
      if (partyInfo[idInput].status !== "idle") {
        stateChangeParty({ [num]: { status: "remote is busy", caller: "" } });
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
      stateChangeParty({ [num]: { status: "remote unknown", caller: "" } });
      setTimeout(() => {
        stateChangeParty({ [num]: { status: "idle", caller: "" } });
      }, 1000);
    }
    e.preventDefault();
  };

  const hangUp = (num: string) => {
    const caller = partyInfo[num].caller;
    stateChangeParty({
      [caller]: { status: "idle", caller: "" },
      [num]: { status: "idle", caller: "" },
    });
  };
  const answer = (num: string) => {
    const caller = partyInfo[num].caller;
    stateChangeParty({
      [caller]: { status: "talking", caller: num },
      [num]: { status: "talking", caller: caller },
    });
  };
  const reject = (num: string) => {
    const caller = partyInfo[num].caller;
    stateChangeParty({
      [caller]: { status: "remote rejected", caller: num },
      [num]: { status: "idle", caller: "" },
    });
    setTimeout(() => {
      stateChangeParty({ [caller]: { status: "idle", caller: "" } });
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
