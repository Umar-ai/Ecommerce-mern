import React from 'react'
import Allproducts from '../components/Allproducts'
import Filter from '../components/Filter'
function Producwithfilter() {
  return (
    <div className='bg-[#FAF0E6]'>
      <div className='flex'>
        <div  >
        <Filter/>
        </div>
        <div >
        <Allproducts/>
        </div>
      </div>
    </div>
  )
}

export default Producwithfilter
