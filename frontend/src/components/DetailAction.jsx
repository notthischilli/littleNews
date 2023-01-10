import React from 'react'

function DetailAction({id}) {

    const deleteNews = async()=>{

      try {
        let result = await fetch(`https://littlenews-api.onrender.com/news/${id}/delete`,{
          method: 'delete',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
          id
          })
        })
        console.log('deleted')
      } catch (error) {
        console.log(error.message)
      }
        
      }

  return (
    <button onClick={deleteNews}>Delete</button>
  )
}

export default DetailAction