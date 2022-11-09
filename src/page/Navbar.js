import React, {useState} from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { toast, ToastContainer } from 'react-toastify';
import {NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
    const [btnDisable,setBtnDisable]=useState(false)
    const LogoutHandler=()=>{
        setBtnDisable(true)
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        toast.error('logout SuccessFully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme:'colored'
          });
          setTimeout(() => {
              navigate('/alluser')
          }, 2000);
      }
  return (
    <>
      <div className=" max-w-screen px-2 sm:px-6 lg:px-8 bg-white fixed top-0 w-full z-50 shadow-sm ">
      <div className="relative flex h-16 items-center justify-end mx-10">
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"leaveTo="transform opacity-0 scale-95"
            >
              <ul className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <li><NavLink to="/getprofile" className='block px-4 py-2 text-sm text-gray-700'>Your Profile</NavLink></li>
                <li><NavLink to="/changepassword" className= 'block px-4 py-2 text-sm text-gray-700' >Change Password</NavLink></li>
                <li disabled={btnDisable} onClick={LogoutHandler} className= 'block px-4 py-2 text-sm text-gray-700 cursor-pointer'>Logout</li>
              </ul>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar
