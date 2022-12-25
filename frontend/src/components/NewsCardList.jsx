import React from 'react'
import NewsCard from './NewsCard'

function NewsCardList({news, action}) {
  return (
    <div>
        {news.map((item)=>{
             return <NewsCard key={item._id} item={item} action={action}/>
        })}
      
    </div>
  )
}

export default NewsCardList