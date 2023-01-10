import React from 'react'

function ScrapAction({item}) {

    const saveNews = async()=>{
      try {
           let result = await fetch('https://littlenews-api.onrender.com/news/create',{
              method: 'post',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
              item
              })
            })
      } catch (error) {
        console.log(error.message)
      }
   
    }

  return (
    <div>
        <button onClick={saveNews}>Save</button>
    </div>
  )
}

export default ScrapAction