import Button from './Button';

export default function TimeSelection({ timer, changeTimer }) {

    const timerLengths = [5, 10, 15, 20, 30, 60];

    const timerButtons = timerLengths.map((timerLength, index) =>
        <Button 
            key={index} 
            timer={timer} 
            timerLength={timerLength} 
            handleClick={changeTimer}
        />
    )

    return (
        <div className="timer-selection">
            <h2>Select meditation length</h2>
            {timerButtons}
        </div>
    )
}