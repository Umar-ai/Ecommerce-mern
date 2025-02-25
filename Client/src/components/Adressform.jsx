import React from 'react'
import { useForm, } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Productform() {
    const { handleSubmit, register } = useForm()
const navigate=useNavigate()
    const Addresshandler = async (data) => {
        const response=await axios.post(`http://localhost:8000/api/v1/users/add_address`,{},{withCredentials:true})
        if(response){
            navigate('/order_page')
        }
    }
    const majorCitiesPakistan = [
      "Karachi", 
      "Lahore", 
      "Rawalpindi", 
      "Multan", 
      "Hyderabad", 
      "Peshawar", 
      "Quetta", 
      "Sargodha", 
      "Sialkot", 
      "Sukkur", 
      "Larkana", 
      "Jhang", 
      "Gujrat", 
      "Sahiwal", 
  ];
  



    return (
        <>
            <div className=' bg-Primary max-h-max'>
                <form onSubmit={handleSubmit(Addresshandler)} className='bg-secondary  mt-[5rem]    lg:mt-[1rem] rounded-md h-[60vh] 2xl:h-[80vh] w-[35vw]     mx-auto flex flex-col items-center  '>

                    <div className='pt-1'>
                        <h1 className='text-Primary  font-bold md:text-3xl text-4xl'>Address-Form</h1>
                    </div>


                    <div className='pt-6 md:pt-3 2xl:pt-6  '>
                        <input
                            className='h-10 md:h-8  2xl:h-12 pl-5 w-[22rem] rounded-md text-secondary '
                            type="text"
                            name="username"
                            placeholder='Address...'
                            {...register('one_liner', { required: true })}
                        />

                    </div>

                    <div className='pt-6 md:pt-3 2xl:pt-6 '>
                        <input
                            className='h-10 md:h-8 2xl:h-12 w-[22rem] pl-5 rounded-md'
                            type="text"
                            name="description"
                            placeholder='Postal Code'
                            {...register('postal_code', { required: true })}
                        />
                    </div>

               
                  
                    <div className='flex gap-8 '>
                        <div className="pt-6  flex  md:pt-3 ">
                            <select className=' 2xl:h-10 rounded-md md:text-lg px-1 py-2 md:h-9 text-xl font-bold'  {...register('province', { required: true })} >
                                <option value="">Province</option>
                                <option value="punjab">Punjab</option>
                                <option value="balochistan">Balochistan</option>
                                <option value="sindh">Sindh</option>
                                <option value="kpk">KPK</option>
                                
                            </select>
                        </div>
                        <div className="pt-6 flex  md:pt-3 ">
                            <select className='rounded-md 2xl:h-10 md:h-9  py-2 md:text-lg text-xl font-bold' {...register('city', { required: true })} >
                                <option value="">City</option>
                                {majorCitiesPakistan.map((val,index)=>(
                                  <option key={index} value={val}>{val}</option>
                                ))}
                            </select>
                        </div>
                    </div>


                   
                  

                    <div className='pt-8 2xl:pt-6 md:pt-6'>
                        <button type='submit' className='bg-accent text-Primary px-16 text-xl rounded-md font-bold py-3'>Submit</button>
                    </div>


                </form>
            </div>
        </>
    )
}

export default Productform

