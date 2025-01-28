import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LineChart from './userChart'
function CHart() {
const [label,setLabel]=useState([])
const [data,setdata]=useState([])

    useEffect(()=>{
   async function findDesign(){
       const response=await axios.post('http://localhost:8000/api/v1/design/find')
       console.log(response)
       
     setLabel(response.data.data.map((item)=>item.month))
     setdata(response.data.data.map((item)=>item.Count))
   }
   findDesign()




    },[])

  return (
    <div>
     <LineChart label={label} datas={data}/>
    </div>
  )
}

export default CHart
