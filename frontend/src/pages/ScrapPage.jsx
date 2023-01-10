import React, { useEffect, useState} from 'react';
import NewsCardList from '../components/NewsCardList';
import Spinner from '../components/Spinner';

function ScrapPage() {

    const [newsData, setNewsData] = useState(null);

    useEffect(() => {
       const scrapWeb = async(req, res)=>{

        let response = await fetch('http://localhost:3000/news/scrap',{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }});
        let json = await response.json();
        
        if(response.ok){
           setNewsData(json);
        }

       }
       scrapWeb();
    }, [])
    

  return (
    <div>
        {newsData ? 
        <NewsCardList news={newsData} action={true}/>:
        <p>
         Fetching from source ...
          <Spinner/>
        </p>
        }
    </div>
  )
}

export default ScrapPage