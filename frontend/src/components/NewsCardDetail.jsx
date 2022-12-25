import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import DetailAction from './DetailAction';
import Spinner from './Spinner';

function NewsCardDetail() {

    let {id} = useParams();
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        const getNewsDetail = async()=>{

            let response = await fetch(`/news/${id}`);
            let json = await response.json();
            if(response.ok){
                setNewsItem(json);
            }
            else{
                console.log(`error`)
            }
        }
     
        if(id){
            getNewsDetail();    
        }
    }, [id]);
    

    const formatDate = (dateString) => {
        return new Date(dateString).toDateString()
      }

  return (
    <>
    {newsItem?
     <article className="newsCard">
    {
        newsItem.title &&
        <h3>
        {newsItem.title}
        </h3>
    }
    {newsItem.image &&
        <figure>
            <img src={newsItem.image} alt={newsItem.img} />
        </figure>
    }
    {
        newsItem.body &&
        <summary>
            {newsItem.body}
        </summary>
    }
    {
        newsItem.detailLink && 
        <a rel="noreferrer" href={newsItem.detailLink} target="_blank">{newsItem.detailLink}</a> 
    }
    <footer>
        {formatDate(newsItem.createdAt)}
        <DetailAction id={id}/>
    </footer>
    </article>
    : (<>
        <p>Fetching from source ...</p>
        <Spinner/>
        </>
       )
    }
    </>
   
  )
}

export default NewsCardDetail