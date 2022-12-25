import React from 'react'

function ScrapAction({item}) {

    const saveNews = async()=>{
      let result = await fetch('/news/create',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
        item
        })
      })
    }

  return (
    <div>
        <button onClick={saveNews}>Save</button>
    </div>
  )
}

export default ScrapAction