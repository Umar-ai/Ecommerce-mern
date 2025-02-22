import React from 'react'
import { useSelector } from 'react-redux'
import Logout from '../Logout';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FaSalesforce, FaMoneyBillWave, FaUsers, FaClipboardList,FaBox } from 'react-icons/fa';
function Admin_header() {

    const navigate = useNavigate()
    const Status = useSelector((state) => state.auth.status)
    const navItems = [
        {
            name: <FaMoneyBillWave />,
            link: "/admin_sales",
        },
        {
            name: <FaBox />,
            link: "/admin_products",
        },

        {
            name: <FaUsers />,
            link: "/admin_totalusers",
        },

        {
            name: <FaClipboardList />,
            link: "/admin_orders",
        },


    ]
    return (
        <div className='bg-secondary text-Primary h-[100vh] w-[5vw] border-r-2 fixed top-0 left-0   flex items-center   '>
            <ul key={'123'} className='  ml-2 pd-4 text-3xl font-bold '>

                {navItems.map((item) =>


                    <li className='mb-6' key={item.link}>
                        <NavLink
                            to={item.link}
                            className="text-md"
                        >
                            <p>{item.name}</p>
                        </NavLink>
                    </li>


                )}

            </ul>
        </div>
    )
}

export default Admin_header