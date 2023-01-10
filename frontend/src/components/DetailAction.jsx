import React from 'react'

function DetailAction({id}) {

    const deleteNews = async()=>{
        let result = await fetch(`https://littlenews-api.onrender.com/news/${id}/delete`,{
          method: 'delete',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
          id
          })
        })
      }

  return (
    <button onClick={deleteNews}>Delete</button>
  )
}

export default DetailAction