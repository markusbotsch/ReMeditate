export default function Button({ timer, timerLength, handleClick }) {

    return (
        <button 
            className={`timer-button ${timer === timerLength ? 'active': ''}`}
            onClick={() => handleClick(timerLength)}
        >
                {timerLength}
        </button>
    )
}