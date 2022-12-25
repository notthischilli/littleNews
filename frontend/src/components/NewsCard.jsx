import React from 'react'
import { Link } from 'react-router-dom'
import ScrapAction from './ScrapAction'

function NewsCard({item, action}) {

  const formatDate = (dateString) => {
    return new Date(dateString).toDateString()
  }
  return (
   
      <article className="newsCard">
        {
          action?  <header>{item.title}</header>:
         <Link to={'news/'+item._id}><header>{item.title}</header></Link>
        }
           
          {item.image &&
            <figure>
              <img src={item.image} alt={item.img} />
            </figure>
          }
          {
            item.summary &&
            <summary>
              {item.summary}
            </summary>
          }
          {
            item.detailLink && 
            <p><a rel="noreferrer" href={item.detailLink} target="_blank">{item.detailLink}</a> </p> 
          }

          <footer>
            {item.createdAt && formatDate(item.createdAt)}
            {action &&
             <ScrapAction item={item}/>
            }
          </footer>
      </article>
      
  )
}

export default NewsCard