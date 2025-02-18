import React, { Suspense } from 'react';
import { ClipLoader } from 'react-spinners';

const LazyLoadWrapper = ({ children }) => {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
            <ClipLoader color="#2d3142" size={100} />
        </div>}>
            {children}
        </Suspense>
    );
};

export default LazyLoadWrapper;
