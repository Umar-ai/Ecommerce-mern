import React, { useEffect } from 'react'
import CcHart from './Cchart.jsx'
import axios from 'axios'



function AdminPanel_product() {
useEffect(()=>{},[])



  return (
    <>
    <div className='mt-10'>
<div className='md:flex grid grid-cols-2 gap-6  md:justify-around md:ml-12 md:mr-12 md:items-center md:mt-8'>
  <p className='md:border-4 w-[11rem] pl-3 rounded-md ml-2 h-[3.5rem] pt-4 font-bold   bg-secondary text-Primary md:h-[3rem]  md:pt-2 md:w-[12rem] md:pl-6'>Total-Sales:1000$</p>
  <button className='md:border-4 w-[11rem] pl-3 rounded-md ml-2 h-[3.5rem] pt-4 font-bold   bg-secondary text-Primary md:h-[3rem]  md:pt-2 md:w-[12rem] md:pl-6'>Add product</button>
  <button className='md:border-4 w-[11rem] pl-3 rounded-md ml-2 h-[3.5rem] pt-4 font-bold   bg-secondary text-Primary md:h-[3rem]  md:pt-2 md:w-[12rem] md:pl-6'>Delete Product</button>
  <button className='md:border-4 w-[11rem] pl-3 rounded-md ml-2 h-[3.5rem] pt-4 font-bold   bg-secondary text-Primary md:h-[3rem]  md:pt-2 md:w-[12rem] md:pl-6'>Update Product</button>
  
</div>
<div className='md:ml-[14rem] ml-[4rem] mt-[4rem]'>
  <CcHart/>
</div>

    </div>
    </>
  )
}

export default AdminPanel_product
