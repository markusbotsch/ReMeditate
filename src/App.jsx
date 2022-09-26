import { useState } from 'react'
import Calender from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isSameDate, loadLocalData } from './helper/helper.jsx';
import './App.css'

import Timer from './components/Timer';
import DailyQuote from './components/DailyQuote';
import TimeSelection from './components/TimeSelection';


function App() {

  // Load stored timer length and history data
  const timerLength = loadLocalData("timerLength", 15);
  const historyData = loadLocalData("meditationHistory", [])

  // set states
  const [timer, setTimer] = useState(timerLength);
  const [value, onChange] = useState(new Date());
  const [history, setHistory] = useState(historyData);

  // set and save timer length
  function handleTimerLenghtChange(newLength) {
    localStorage.setItem("timerLength", newLength);
    setTimer(newLength);
  }

  // set and save history data
  function updateHistory(today) {
    localStorage.setItem("meditationHistory", JSON.stringify([today, ...history]));
    setHistory(prevHistory => [today, ...prevHistory]);
  }

  // determine dates to highlight in calendar
  function tileClassName({ date, view }) {
    if(!history) return;

    if(view === 'month' && history.find(hDate => isSameDate(hDate, date))) {
      return 'highlight';
    } 
  }

  return (
    <div className="App">
        <h1><span className="svg-underline">ReMeditate</span></h1>
        <DailyQuote />
        <TimeSelection 
            timer={timer} 
            changeTimer={handleTimerLenghtChange}/>
        <Timer 
            timer={timer}
            updateHistory={updateHistory} />
        <div className="journey-view">
            <h2>Your mediation journey</h2>
            <Calender 
                onChange={onChange} 
                value={value} 
                tileClassName={tileClassName} 
                showNeighboringMonth={false}/>
        </div>
        
    </div>
  )
}

export default App
