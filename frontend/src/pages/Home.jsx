import React, {useEffect, useState} from 'react'
import NewsCardList from '../components/NewsCardList'
import Spinner from '../components/Spinner';

function Home() {

    const [news, setNews] = useState(null);

    useEffect(() => {
          try {
             const fetchNews = async ()=>{
               const response = await fetch('https://littlenews-api.onrender.com/news', {
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
          } catch (error) {
            console.log(error.message)
          }
    }, [])
    

  return (
    <div>
        {news ? <NewsCardList news={news}/> : <Spinner/>}
    </div>
  )
}

export default Home