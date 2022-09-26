import { useEffect, useState } from "react"
import { getFullDate } from '../helper/helper.jsx';

export default function DailyQuote() {

    const [dailyQuote, setDailyQuote] = useState({ 
        quote: "Everything has already been said, but not by everyone",
        author: "Karl Valentin"
    });

    useEffect(() => {

        const today = getFullDate(new Date());

        async function loadQuote() {
            const url = 'https://zenquotes.io/api/today';
            const result= await fetch(url);
            const data = await result.json();
            setDailyQuote({
                quote: data[0].q,
                author: data[0].a
            })
            localStorage.setItem("dailyQuote", JSON.stringify(data));
            localStorage.setItem("lastUpdate", today);
        }

        const lastUpdate = localStorage.getItem("lastUpdate");

        if (today === lastUpdate) {
            const quoteData = JSON.parse(localStorage.getItem("dailyQuote"));
            setDailyQuote({
                quote: quoteData[0].q,
                author: quoteData[0].a
            })
        } else {
            loadQuote().catch(console.error);
        }
    },[])

    return(
        <div className="daily-quote">
            <p className="quote-text">{dailyQuote.quote}</p>
            <p className="quotee">{dailyQuote.author}</p>
        </div>
    )
}