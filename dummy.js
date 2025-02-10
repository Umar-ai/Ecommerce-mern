import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ProductMang } from '../ReduxToolkit/productreducer.js';

function Filter() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product?.productsData);
    const resetproducts = useSelector((state) => state.product?.resetData);
    
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    
    let copydata = null;
    if (copydata == null) {
        copydata = products;
    }

    const filterByprice = (val) => {
        setSelectedPrice(val);  // Update selected price state
        if (val == 1) {
            console.log('valcoming', val);
            const filterdata = products.filter((data) => data.price <= 150);
            console.log('filterdata', filterdata);
            dispatch(ProductMang(filterdata));
        } else if (val == 2) {
            const filterdata = products.filter((data) => data.price >= 150 && data.price <= 250);
            dispatch(ProductMang(filterdata));
        } else if (val == 3) {
            const filterdata = products.filter((data) => data.price >= 250 && data.price <= 400);
            dispatch(ProductMang(filterdata));
        } else if (val == 4) {
            const filterdata = products.filter((data) => data.price >= 400 && data.price <= 600);
            dispatch(ProductMang(filterdata));
        } else if (val == 5) {
            const filterdata = products.filter((data) => data.price >= 600 && data price <= 800);
            dispatch(ProductMang(filterdata));
        } else if (val == 6) {
            const filterdata = products.filter((data) => data.price >= 800 && data.price <= 1000);
            dispatch(ProductMang(filterdata));
        } else {
            const filterdata = products.filter((data) => data price >= 1000);
            dispatch(ProductMang(filterdata));
        }
    };

    const filterbybrand = (val) => {
        setSelectedBrand(val);  // Update selected brand state
        const filterdata = products.filter((data) => data.brand == val);
        dispatch(ProductMang(filterdata));
    };

    const sorting = (val) => {
        if (val == 1) {
            console.log(' val in sorting', val);
            const copyproducts = [...products];
            const filterData = copyproducts.sort((a, b) => a.price - b.price);
            dispatch(ProductMang(filterData));
        } else {
            const copyproducts = [...products];
            const filterData = copyproducts.sort((a, b) => b.price - a.price);
            dispatch(ProductMang(filterData));
        }
    };

    const clearFilter = () => {
        window.location.reload();
    };

    return (
        <div className='bg-[#FAFAFA] md:h-[130vh] pl-5 w-[60vw] md:w-[22vw]'>
            <div>
                <button onClick={clearFilter}>
                    <h1 className='text-xl bg-accent py-1 text-Primary hover:text-accent hover:border hover:border-accent hover:bg-Primary px-2 rounded-lg mt-3 font-semibold'>
                        Clear Filters
                    </h1>
                </button>
            </div>
            
            {/* Sorting -->Asceding &Descending */}
            <div className='mt-2'>
                <h1 className='text-2xl font-semibold'>Sort</h1>
                <div className='flex-col flex gap-2 mt-2'>
                    <label htmlFor=''>
                        <input type='radio' onClick={() => sorting(1)} className='w-5 h-5' name='sorting' /> Prices (Low to High)
                    </label>
                    <label htmlFor=''>
                        <input type='radio' onClick={() => sorting(2)} className='w-5 h-5' name='sorting' /> Prices (High to Low)
                    </label>
                </div>
            </div>

            {/* filter by price */}
            <div className='mt-3'>
                <h1 className='text-2xl font-semibold'>Set your price range</h1>
                <div className='flex-col flex gap-2 mt-2'>
                    <label htmlFor=''>
                        <input type='radio' onClick={() => filterByprice(1)} name='price' className='w-5 h-5' checked={selectedPrice === 1} /> Below Rs. 150$
                    </label>
                    <label htmlFor=''>
                        <input type='radio' name='price' onClick={() => filterByprice(2)} className='w-5 h-5' checked={selectedPrice === 2} /> Rs. 150$ - Rs. 250$
                    </label>
                    <label htmlFor=''>
                        <input type='radio' name='price' onClick={() => filterByprice(3)} className='w-5 h-5' checked={selectedPrice === 3} /> Rs. 250$ - Rs. 400$
                    </label>
                    <label htmlFor=''>
                        <input type='radio' name='price' onClick={() => filterByprice(4)} className='w-5 h-5' checked={selectedPrice === 4} /> Rs. 400$ - Rs. 600$
                    </label>
                    <label htmlFor=''>
                        <input type='radio' name='price' onClick={() => filterByprice(5)} className='w-5 h-5' checked={selectedPrice === 5} /> Rs. 800$ - Rs. 1000$
                    </label>
                    <label htmlFor=''>
                        <input type='radio' name='price' onClick={() => filterByprice(6)} className='w-5 h-5' checked={selectedPrice === 6} /> Above Rs. 1000$
                    </label>
                </div>
            </div>

            {/* filter by brand */}
            <div className='mt-3'>
                <h1 className='text-2xl font-semibold'>Brand</h1>
                <div className='flex-col flex gap-2 mt-2'>
                    <label htmlFor=''>
                        <input type='radio' onClick={() => filterbybrand('infinix')} className='w-5 h-5' name='brand' checked={selectedBrand === 'infinix'} /> Infinix
                    </label>
                    <label htmlFor=''>
                        <input type='radio' onClick={() => filterbybrand('oppo')} className='w-5 h-5' name='brand' checked={selectedBrand === 'oppo'} /> Oppo
                    </label>
                    <label htmlFor=''>
                        <input type='radio' onClick={() => filterbybrand('realme')} className='w-5 h-5' name='brand' checked={selectedBrand === 'realme'} /> Realme
                    </label>
                    <label htmlFor=''>
                        <input type='radio' onClick={() => filterbybrand('samsung')} className='w-5 h-5' name='brand' checked={selectedBrand === 'samsung'} /> Samsung
                    </label>
                    <label htmlFor=''>
                        <input type='radio' onClick={() => filterbybrand('tecno')} className='w-5 h-5' name='brand' checked={selectedBrand === 'tecno'} /> Tecno
                    </label>
                    <label htmlFor=''>
                        <input type='radio' onClick={() => filterbybrand('vivo')} className='w-5 h-5' name='brand' checked={selectedBrand === 'vivo'} /> Vivo
                    </label>
                    <label htmlFor=''>
                        <input type='radio' onClick={() => filterbybrand('xiaomi')} className='w-5 h-5' name='brand' checked={selectedBrand === 'xiaomi'} /> Xiaomi
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Filter;
