import React, { useState } from 'react';
import './CallScreen.css';

interface CallSreceenProps  {
    phoneNum: String;
    callStatus: String;
    handleCall: Function;
    handleHangup: Function;
    handleAnswer: Function;
    handleReject: Function;
}

export default function CallSreceen ({ phoneNum, callStatus, handleCall, handleHangup, handleAnswer, handleReject }: CallSreceenProps) {
    const [idInput, setIdInput] = useState('');

    let intButtons;
    if (callStatus === 'talking' || callStatus === 'remote is ringing') intButtons = (<button onClick={() => handleHangup(phoneNum)}>Hang up</button>)
    else if (callStatus === 'ringing') intButtons = (<><button onClick={() => handleAnswer(phoneNum)}>Answer</button><button onClick={() => handleReject(phoneNum)}> Reject </button></>)
    else intButtons = (<button onClick={(e) => handleCall(e, idInput, phoneNum)}>Call</button>)
    
    
    return (
        <div className='callbox'>
        {phoneNum}
        {callStatus}
        <form onSubmit={(e) => handleCall(e, idInput, phoneNum)}>
            <input type="text" name="callerId" autoComplete="off" value={idInput} onChange={(e) => setIdInput(e.target.value)}></input>
        </form>
        {intButtons}
        </div>
    )
} 