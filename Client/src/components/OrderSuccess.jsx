import React from "react";

const OrderSuccess = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EBF0F5] py-[40px]">
            <div className="bg-white p-[60px] rounded shadow-[0_2px_3px_#C8D0D8] inline-block text-center">
                <div className="w-[200px] h-[200px] rounded-full bg-[#F8FAF5] flex items-center justify-center mx-auto">
                    <span className="text-accent text-[100px] leading-[200px] ml-[-15px]">
                        ✓
                    </span>
                </div>
                <h1 className="text-accent font-black text-[40px] mt-4 mb-2 font-sans">
                    Order Successfull
                </h1>
                <p className="text-[#404F5E] font-bold  text-[20px]">
                    We received your purchase request;
                    <br /> we'll be in touch shortly!
                </p>
            </div>
        </div>
    );
};

export default OrderSuccess;
