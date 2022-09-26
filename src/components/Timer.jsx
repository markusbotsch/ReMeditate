import { useEffect, useState } from "react";
import { getFullDate } from '../helper/helper.jsx';

export default function Timer({ timer, updateHistory }) {

    const [timerActive, setTimerActive] = useState(false);

    const gong = new Audio('/soft-gong-sound-effect.mp3');

    useEffect(() => {

        const timerText = document.querySelector('.timer-text');
        const timerCircle = document.querySelector('.timer-circle');

        const timerCircleCircumference = timerCircle.getTotalLength();

        timerCircle.classList.add('notransition');
        timerCircle.style.strokeDashoffset = timerCircleCircumference;
        timerCircle.style.strokeDasharray = timerCircleCircumference;
        
        let secondsLeft = timer * 60;

        let interval;

        if(timerActive) {
            gong.play();
            timerCircle.classList.remove('notransition');
            interval = setInterval(() => {

                if(secondsLeft >= 0) {
                    
                    timerCircle.style.strokeDashoffset = timerCircleCircumference - (((timer * 60) - secondsLeft) * timerCircleCircumference / (timer * 60));
                    
                    const minutesLeftText = Math.floor(secondsLeft / 60);
                    const secondsLeftText = Math.floor(secondsLeft % 60);
                    timerText.innerHTML = `${('0' + minutesLeftText).slice(-2)}:${('0' + secondsLeftText).slice(-2)}`;
                    secondsLeft--;
                } else {
                    gong.play();

                    timerCircle.classList.add('notransition');
                    timerCircle.style.strokeDashoffset = timerCircleCircumference;
                    setTimerActive(false);
                    timerText.innerHTML = '';

                    const today = getFullDate(new Date());
                    if(today === localStorage.getItem('lastMeditated')) return;
                    updateHistory(today);
                    // saveHistory(true);
                    localStorage.setItem('lastMeditated', today);
                    
                    clearInterval(interval); 
                }
                
            }, 1000)
        }

        return () => clearInterval(interval)

    },[timerActive])

    return(
        <div className="timer">
                <svg width="380" height="380">
                <circle
                        className="timer-circle-background"
                        cx="50%" 
                        cy="50%" 
                        r="175" 
                        stroke="#292929"
                        strokeWidth="30" 
                        fill="transparent">
                 </circle>
                <circle
                        className="timer-circle"
                        cx="50%" 
                        cy="50%" 
                        r="175" 
                        stroke="#3BA04C"
                        strokeWidth="30" 
                        strokeLinecap="round"
                        fill="transparent"
                        transform="rotate(270 190 190)">
                </circle>
                </svg>
                <div className="timer-text">
                    {!timerActive && <button onClick={() => setTimerActive(true)}>Start</button>}
                </div>
        </div>
    )
}