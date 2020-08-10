import React, { useState } from "react";
import "./CallScreen.css";

interface CallSreceenProps {
  phoneNum: String;
  callStatus: String;
  handleCall: Function;
  handleHangup: Function;
  handleAnswer: Function;
  handleReject: Function;
}

export default function CallSreceen({
  phoneNum,
  callStatus,
  handleCall,
  handleHangup,
  handleAnswer,
  handleReject,
}: CallSreceenProps) {
  const [idInput, setIdInput] = useState("");

  let intButtons;
  if (callStatus === "talking" || callStatus === "remote is ringing")
    intButtons = (
      <button
        className="button buttonRed"
        onClick={() => handleHangup(phoneNum)}
      >
        Hang up
      </button>
    );
  else if (callStatus === "ringing")
    intButtons = (
      <>
        <button
          className="button buttonGreen"
          onClick={() => handleAnswer(phoneNum)}
        >
          Answer
        </button>
        <button
          className="button buttonRed"
          onClick={() => {
            handleReject(phoneNum);
          }}
        >
          Reject
        </button>
      </>
    );
  else
    intButtons = (
      <button
        className="button buttonGreen"
        onClick={(e) => {
          handleCall(e, idInput, phoneNum);
          setIdInput("");
        }}
      >
        Call
      </button>
    );

  return (
    <div className="callbox">
      <div>Phone Nr.: {phoneNum}</div>
      <div>Status: {callStatus}</div>
      <form
        onSubmit={(e) => {
          setIdInput("");
          handleCall(e, idInput, phoneNum);
        }}
      >
        <input
          type="text"
          name="callerId"
          autoComplete="off"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
        ></input>
      </form>
      <div>{intButtons}</div>
    </div>
  );
}
