import {Field, Form, Formik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import BaseUrl from '../config/BaseUrl';
import axios from 'axios';
import '../App.css';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import MetaData from '../more/MetaData';
import Navbar from './Navbar';


const validationSchema = yup.object({
    old_password: yup
        .string('old_password is required')
        .required('old_password is required'),
    new_password: yup
        .string('New Password is required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.")
        .required('New Password is required'),
    new_confirmpassword: yup
        .string('Confirm Password is required')
        .oneOf([yup.ref('new_password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    });
const ChangePassword = () =>{
  const navigate=useNavigate() 
return (
  <>
   <Navbar />
  <MetaData title='Changepassword'/>
    {/* ---------------------HEADER */}
   {/* ---------------------HEADER */}
   {/* ------------------------------------registeration form */}
  <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Change Password</h2>
    </div>
      <Formik
      initialValues={{ old_password:'', new_password:'', new_confirmpassword:'' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        axios({
          method: 'PATCH',
          url: `${BaseUrl.url}/change-password`,
          headers:{
            'Authorization':`Bearer ${window.localStorage.getItem('token')}`
          },
          data:{
            old_password:values.old_password,
            new_password:values.new_password,
            new_confirmpassword:values.new_confirmpassword,
          }
        }).then((res)=>{  
          localStorage.removeItem('token')
          localStorage.removeItem('id')
          setTimeout(() => {
            navigate('/login')
          },3000);
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
        })
        .catch((err)=>{
            setTimeout(() => {
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
          <label htmlFor="old_password" className="sr-only">Password</label>
          <Field id="old_password" name="old_password"  type="text" className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.old_password ? " " : "border-red-500"}`}  
          placeholder="enter old password" />
          {errors.old_password && touched.old_password ? (
            <div className='text-red-700 text-xs font-bold'>{errors.old_password}</div>
            ) : null}
        </div>
        <div>
          <label htmlFor="new_password" className="sr-only">Password</label>
          <Field id="new_password" name="new_password"  type="text" className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.new_password ? " " : "border-red-500"}`} 
          placeholder="enter new password" />
          {errors.new_password && touched.new_password ? (
            <div className='text-red-700 text-xs font-bold'>{errors.new_password}</div>
            ) : null}
        </div>
        <div>
          <label htmlFor="new_confirmpassword" className="sr-only">Confirm Password</label>
          <Field id="new_confirmpassword" name="new_confirmpassword"  type="text" className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.new_confirmpassword ? " " : "border-red-500"}`} 
          placeholder="enter confirm password" />
          {errors.new_confirmpassword && touched.new_confirmpassword ? (
            <div className='text-red-700 text-xs font-bold'>{errors.new_confirmpassword}</div>
            ) : null}
        </div>
      </div>
      <div>
        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2">
        Upadate Password
        </button>
        <ToastContainer />
      </div>
    </Form>
     )}
    </Formik>
  </div>
</div>
</>
)
}
export default ChangePassword
