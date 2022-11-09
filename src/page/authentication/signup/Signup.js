  import React,{useState,useEffect} from 'react'
  import { NavLink, useNavigate } from 'react-router-dom';
  import { toast, ToastContainer } from 'react-toastify';
  import {Field, Form, Formik } from 'formik';
  import axios from 'axios';
  import * as yup from 'yup';
  import LoadingSpinner from '../../../more/LoadingSpinner';
  import BaseUrl from '../../../config/BaseUrl';
  import MetaData from '../../../more/MetaData';

  const validationSchema = yup.object({
        name: yup
          .string('Enter Your First Name')
          .matches(/^[a-zA-Z ]{2,}$/,'Enter vaild first name')
          .required('First Name is required'),
        email: yup
          .string('Enter your email')
          .required('Email is required')
          .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Invalid Email Format"),
        PhoneNumber: yup
        .number('Only Number Allowed')
        .required('Phone number is required'),
        password: yup
          .string('Enter your password')
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.")
          .required('Password is required'),
        confirmpassword: yup
          .string('Enter your Confirm Password')
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      });
  const Signup = () =>{
    const navigate=useNavigate()
    const [btndisabled,setBtnDisable]=useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmpassowrd,setShowConfirmpassowrd]=useState(false)
  const eye_Password=()=>{
    if(!showPassword){
      setShowPassword(true)
    }else{
      setShowPassword(false)
    }
  }
  const eye_Confirmpassowrd=()=>{
    if(!showConfirmpassowrd){
      setShowConfirmpassowrd(true)
    }else{
      setShowConfirmpassowrd(false)
    }
  }
  useEffect(() => {
    let login = window.localStorage.getItem('token');
    if(login){
      navigate(`/profile/${window.localStorage.getItem('id')}`)
    }
  })
  return (
    <>
    <MetaData title="Signup"/>
      {/* ---------------------HEADER */}
    <nav className="bg-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-end">
            <div className="flex space-x-4">  
            <NavLink to="/alluser" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">User's</NavLink>
            <NavLink to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</NavLink>
          </div>
         </div>
        </div>
      </div>
    </nav>
     {/* ---------------------HEADER */}
     {/* ------------------------------------registeration form */}
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register</h2>
      </div>
        <Formik
        initialValues={{ name:'', email:'', PhoneNumber:'',  password:'',confirmpassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          axios({
            method: 'POST',
            url: `${BaseUrl.url}/register`,
            data:{
              name:values.name,
              email:values.email,
              PhoneNumber:values.PhoneNumber,
              password:values.password,
              confirmpassword:values.confirmpassword,
            }
          }).then((res)=>{
            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme:'colored'
            });
            setTimeout(() => {
              setIsLoading(true)
              setBtnDisable(true)
              navigate('/login')
          },3000);
          })
          .catch((err)=>{
            setIsLoading(true)
            setBtnDisable(true)
            setTimeout(() => {
              setIsLoading(false)
              setBtnDisable(false)
            },3000);
            toast.error(err.response.data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme:'colored'
              });
          })
        }}
        >
        {({ errors, touched }) => (
        <Form className="mt-8 space-y-4 ">
        <div className="mt-8 space-y-4 rounded-md shadow-sm">
          <div>
            <label htmlFor="name" className="sr-only">First Name</label>
            <Field id="name" name='name' type="text" autoComplete="off" 
              className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.name ? " " : "border-red-500"}`} 
              placeholder="Name" />
              {errors.name && touched.name ? (
              <div className='text-red-700 text-xs font-bold'>{errors.name}</div>
              ) : null}
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <Field id="email-address" name="email" type="email" style={{textTransform:'lowercase'}} autoComplete="email" className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.email ? " " : "border-red-500"}`} 
             placeholder="Email address" />
            {errors.email && touched.email ? (
              <div className='text-red-700 text-xs font-bold'>{errors.email}</div>
              ) : null}
          </div>
          <div>
            <label htmlFor="PhoneNumber" className="sr-only">Phone Number</label>
            <Field id="PhoneNumber" name="PhoneNumber" type="text" maxLength="10" autoComplete="off" className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.PhoneNumber ? " " : "border-red-500"}`} 
             placeholder="Phone Number" />
            {errors.PhoneNumber && touched.PhoneNumber ? (
              <div className='text-red-700 text-xs font-bold'>{errors.PhoneNumber}</div>
              ) : null}
          </div>
          <div className='password-eye'>
            <label htmlFor="password" className="sr-only">Password</label>
            <Field id="password" name="password" type={!showPassword ? "password" : "text"}  autoComplete="current-password" className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.password ? " " : "border-red-500"}`} 
             placeholder="Password" />
             <span className="flex justify-end">{!showPassword ? <i onClick={eye_Password} className="fa-sharp fa-solid fa-eye-slash"></i> : <i onClick={eye_Password} className="fa-solid fa-eye"></i>}</span>
            {errors.password && touched.password ? (
              <div className='text-red-700 text-xs font-bold'>{errors.password}</div>
              ) : null}
          </div>
          <div className='password-eye'>
            <label htmlFor="password" className="sr-only">Confirm Password</label>
            <Field id="confirm-password" name="confirmpassword"  type={!showConfirmpassowrd ? "password" : "text"} autoComplete="current-password" className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.confirmpassword ? " " : "border-red-500"}`}
             placeholder="Confrm Password" />
             <span className="flex justify-end">{!showConfirmpassowrd ? <i onClick={eye_Confirmpassowrd} className="fa-sharp fa-solid fa-eye-slash"></i> : <i onClick={eye_Confirmpassowrd} className="fa-solid fa-eye"></i>}</span>
            {errors.confirmpassword && touched.confirmpassword ? (
              <div className='text-red-700 text-xs font-bold'>{errors.confirmpassword}</div>
              ) : null}
          </div>
        </div>
        <br />
        <div>
          <button type="submit" disabled={btndisabled} className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          {isLoading ? <LoadingSpinner /> : <> Register </>}
          </button>
          <ToastContainer />
        </div>
        <div className="flex items-center justify-center">
        <div className="text-sm">
          Allready have a account?&nbsp;<NavLink to="/login" className="font-medium text-black hover:text-gray-600">Login</NavLink>
        </div>
      </div>
      </Form>
       )}
      </Formik>
    </div>
  </div>
  </>
  )
  }
  export default Signup
