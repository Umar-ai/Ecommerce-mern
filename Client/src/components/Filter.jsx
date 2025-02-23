import React from 'react'
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { ProductMang } from '../ReduxToolkit/productreducer.js'
import { useState } from 'react'

function Filter() {
    // const {filter,setfilter}=useContext(context)
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [Selectedsort, Selectedsetsort] = useState(null);
    const [SelectedRam, setSelectedRam] = useState(null);
    const [selectedStorage, setselectedStorage] = useState(null);



    const dispatch = useDispatch()
    const products = useSelector((state) => state.product?.productsData)
    const reset_products = useSelector((state) => state.product?.resetData)






    const filterByprice = (val) => {
        setSelectedPrice(val)
        if (val == 1) {
            console.log("valcoming", val)
            const filterdata = products.filter((data) => data.price <= 150)
            console.log("filterdata", filterdata)
            dispatch(ProductMang(filterdata))
        }
        else if (val == 1) {
            const filterdata = products.filter((data) => data.price >= 150 && data.price <= 250)
            dispatch(ProductMang(filterdata))
        }
        else if (val == 1) {
            const filterdata = products.filter((data) => data.price >= 250 && data.price <= 400)
            dispatch(ProductMang(filterdata))
        }
        else if (val == 1) {
            const filterdata = products.filter((data) => data.price >= 400 && data.price <= 600)
            dispatch(ProductMang(filterdata))
        }
        else if (val == 1) {
            const filterdata = products.filter((data) => data.price >= 600 && data.price <= 800)
            dispatch(ProductMang(filterdata))
        }
        else if (val == 1) {
            const filterdata = products.filter((data) => data.price >= 800 && data.price <= 1000)
            dispatch(ProductMang(filterdata))
        }
        else {
            const filterdata = products.filter((data) => data.price >= 1000)
            dispatch(ProductMang(filterdata))
        }
    }
    const filterbybrand = (val) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // This makes the scroll smooth
          });
        setSelectedBrand(val)
        if (val == "samsung") {
            const filterdata = products.filter((data) => data.brand == val)
            dispatch(ProductMang(filterdata))
        }
        else if (val == "tecno") {
            const filterdata = products.filter((data) => data.brand == val)
            dispatch(ProductMang(filterdata))
        }
        else if (val == "apple") {
            const filterdata = products.filter((data) => data.brand == val)
            dispatch(ProductMang(filterdata))
        }
        else if (val == "realme") {
            const filterdata = products.filter((data) => data.brand == val)
            dispatch(ProductMang(filterdata))
        }
        else if (val == "infinix") {
            const filterdata = products.filter((data) => data.brand == val)
            dispatch(ProductMang(filterdata))
        }
        else if (val == "xiaomi") {
            const filterdata = products.filter((data) => data.brand == val)
            dispatch(ProductMang(filterdata))
        }
        else {
            const filterdata = products.filter((data) => data.brand == val)
            dispatch(ProductMang(filterdata))
        }
    }
    const filterByRam = (val) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", 
        });
        setSelectedRam(val)
        if (val == 1) {
            const filterdata = products.filter((data) => data.ram == 2)
            dispatch(ProductMang(filterdata))
        }
        else if (val == 2) {
            const filterdata = products.filter((data) => data.ram == 4)
            dispatch(ProductMang(filterdata))
        }
        else if (val == 3) {
            const filterdata = products.filter((data) => data.ram == 6)
            dispatch(ProductMang(filterdata))
        }
        else if (val == 4) {
            const filterdata = products.filter((data) => data.ram == 8)
            dispatch(ProductMang(filterdata))
        }
        else {
            const filterdata = products.filter((data) => data.ram >= 8)
            dispatch(ProductMang(filterdata))
        }
    }
    const filterByStorage = (val) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", 
        });
        setselectedStorage(val)
        if (val == 1) {
            const filterdata = products.filter((data) => data.storage == 32)
            dispatch(ProductMang(filterdata))
        }
        else if (val == 2) {
            const filterdata = products.filter((data) => data.storage == 64)
            dispatch(ProductMang(filterdata))
        }
        else if (val == 3) {
            const filterdata = products.filter((data) => data.storage == 128)
            dispatch(ProductMang(filterdata))
        }
        else if (val == 4) {
            const filterdata = products.filter((data) => data.storage == 256)
            dispatch(ProductMang(filterdata))
        }

        else {
            const filterdata = products.filter((data) => data.storage >= 256)
            dispatch(ProductMang(filterdata))
        }
    }
    const sorting = (val) => {
        Selectedsetsort(val)
        if (val == 1) {
            console.log(" val in sorting", val)
            const copyproducts = [...products]
            const filterData = copyproducts.sort((a, b) => a.price - b.price)

            dispatch(ProductMang(filterData))
        }
        else {
            const copyproducts = [...products]
            const filterData = copyproducts.sort((a, b) => b.price - a.price)
            dispatch(ProductMang(filterData))
        }
    }
    const clearFilter = () => {

        // window.location.reload()
        setSelectedPrice(null)
        setSelectedBrand(null)
        Selectedsetsort(null)
        setSelectedRam(null)
        setselectedStorage(null)
        dispatch(ProductMang(reset_products))
    }



    return (
        <div className='bg-[#FAFAFA] md:mt-4 rounded-md md:h-[205vh] pl-5 w-[60vw] md:w-[22vw]   '>
            <div>
                <button onClick={clearFilter}><h1 className='text-xl bg-accent py-1 text-Primary hover:text-accent hover:border hover:border-accent hover:bg-Primary px-2 rounded-lg mt-3 font-semibold'>Clear Filters</h1></button>

            </div>
            {/* Sorting -->Asceding &Descending */}
            <div className='mt-2'>
                <h1 className='text-2xl font-semibold'>Sort</h1>
                <div className='flex-col flex gap-2 mt-2'>
                    <label htmlFor="">
                        <input type="radio" checked={Selectedsort === 1} onClick={() => sorting(1)} className='w-5 h-5' name='sorting' /> {"Prices (Low to High)"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={Selectedsort === 2} onClick={() => sorting(2)} className='w-5 h-5' name='sorting' /> {"Prices (High to Low)"}
                    </label>
                </div>
            </div>

            {/* filter by price */}
            <div className='mt-3'>
                <h1 className='text-2xl font-semibold'>Set your price range</h1>
                <div className='flex-col flex gap-2 mt-2'>
                    <label htmlFor="">
                        <input type="radio" checked={selectedPrice === 1} onClick={() => filterByprice(1)} name='price' className='w-5 h-5' /> {"Below Rs. 150$"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={selectedPrice === 2} name='price' onClick={() => filterByprice(2)} className='w-5 h-5' /> {"Rs. 150$ - Rs. 250$"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={selectedPrice === 3} name='price' onClick={() => filterByprice(3)} className='w-5 h-5' /> {"Rs. 250$ - Rs. 400$"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={selectedPrice === 4} name='price' onClick={() => filterByprice(4)} className='w-5 h-5' /> {"Rs. 400$ - Rs. 600$"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={selectedPrice === 5} name='price' onClick={() => filterByprice(5)} className='w-5 h-5' /> {"Rs. 800$ - Rs. 1000$"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={selectedPrice === 6} name='price' onClick={() => filterByprice(6)} className='w-5 h-5' /> {"Above Rs.  1000$"}
                    </label>
                </div>
            </div>

            {/* filter by brand */}
            <div className='mt-3'>
                <h1 className='text-2xl font-semibold'>Brand</h1>
                <div className='flex-col flex gap-2 mt-2'>
                    <label htmlFor="">
                        <input type="radio" onClick={() => filterbybrand("infinix")} className='w-5 h-5' name='brand' /> {"Infinix"}
                    </label>

                    <label htmlFor="">
                        <input type="radio" checked={selectedBrand === "oppo"} onClick={() => filterbybrand("oppo")} className='w-5 h-5' name='brand' /> {"Oppo"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={selectedBrand === "realme"} onClick={() => filterbybrand("realme")} className='w-5 h-5' name='brand' /> {"Realme"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={selectedBrand === "samsung"} onClick={() => filterbybrand("samsung")} className='w-5 h-5' name='brand' /> {"Samsung"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={selectedBrand === "tecno"} onClick={() => filterbybrand("tecno")} className='w-5 h-5' name='brand' /> {"Tecno"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={selectedBrand === "vivo"} onClick={() => filterbybrand("vivo")} className='w-5 h-5' name='brand' /> {"Vivo"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={selectedBrand === "xiaomi"} onClick={() => filterbybrand("xiaomi")} className='w-5 h-5' name='brand' /> {"Xiaomi"}
                    </label>
                </div>
            </div>
            <div className='mt-3'>
                <div className='mt-3'>
                    <h1 className='text-2xl font-semibold'>Ram</h1>
                    <div className='flex-col flex gap-2 mt-2'>
                        <label htmlFor="">
                            <input type="radio" checked={SelectedRam === "1"} onClick={() => filterByRam("1")} className='w-5 h-5' name='ram' /> {"2 GB"}
                        </label>
                        <label htmlFor="">
                            <input type="radio" checked={SelectedRam === "2"} onClick={() => filterByRam("2")} className='w-5 h-5' name='ram' /> {"4 GB"}
                        </label>
                        <label htmlFor="">
                            <input type="radio" checked={SelectedRam === "3"} onClick={() => filterByRam("3")} className='w-5 h-5' name='ram' /> {"6 GB"}
                        </label>
                        <label htmlFor="">
                            <input type="radio" checked={SelectedRam === "4"} onClick={() => filterByRam("4")} className='w-5 h-5' name='ram' /> {"8 GB"}
                        </label>
                        <label htmlFor="">
                            <input type="radio" checked={SelectedRam === "5"} onClick={() => filterByRam("5")} className='w-5 h-5' name='ram' /> {"Above 8 GB"}
                        </label>

                    </div>
                </div>
                <h1 className='text-2xl font-semibold'>Storage</h1>
                <div className='flex-col flex gap-2 mt-2'>

                    <label htmlFor="">
                        <input type="radio" checked={selectedStorage === "1"} onClick={() => filterByStorage("1")} className='w-5 h-5' name='storage' /> {"32 GB"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={selectedStorage === "2"} onClick={() => filterByStorage("2")} className='w-5 h-5' name='storage' /> {"64 GB"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={selectedStorage === "3"} onClick={() => filterByStorage("3")} className='w-5 h-5' name='storage' /> {"128 GB"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={selectedStorage === "4"} onClick={() => filterByStorage("4")} className='w-5 h-5' name='storage' /> {"256 GB"}
                    </label>
                    <label htmlFor="">
                        <input type="radio" checked={selectedStorage === "5"} onClick={() => filterByStorage("5")} className='w-5 h-5' name='storage' /> {"Above 256 GB"}
                    </label>

                </div>
            </div>


        </div>
    )
}

export default Filter
