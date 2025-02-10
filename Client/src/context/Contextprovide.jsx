import {context} from './context.js'

import React, { useState } from 'react'

function Contextprovide({children}) {
    const[filter,setfilter]=useState(["umer","ali"])
  return (
    <div>
        <context.Provider value={{filter,setfilter}}>
            {children}
        </context.Provider>
      
    </div>
  )
}

export default Contextprovide

