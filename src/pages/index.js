import React from 'react'

function index() {
  const getData = ()=>{
    fetch("/.netlify/functions/crud/todos-read-all").then(async(response)=>{
      console.log(await response.json())
    })
  }
  return (
    <div>
      project 12C
      <button onClick={()=>getData()}>get data</button>
    </div>
  )
}

export default index
