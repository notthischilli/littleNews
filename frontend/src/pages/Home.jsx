import React, {useEffect, useState} from 'react'
import NewsCardList from '../components/NewsCardList'

function Home() {

    const [news, setNews] = useState(null);

    useEffect(() => {
        const fetchNews = async ()=>{
            const response = await fetch('http://localhost:3000/news', {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }});
            const json = await response.json();

            if(response.ok){
                setNews(json);
            }
        }
        fetchNews();
    }, [])
    

  return (
    <div>
        {news && <NewsCardList news={news} />}
    </div>
  )
}

export default Home