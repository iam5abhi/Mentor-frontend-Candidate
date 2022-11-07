import * as React from 'react';
import { v4 as uuid } from 'uuid';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import BaseUrl from '../../config/BaseUrl'
import { Breathing } from 'react-shimmer'

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height:450,
  bgcolor: 'background.paper',
  border: '2px solid whitesmoke',
  boxShadow: 24,
  p: 4,
};

const Experience_Certificate = (props) => {
  const Experience_data = props.data
  const [experienceDataShow,setExperienceDataShow]=React.useState()
  const [experienceData,setExperienceData]=React.useState({ id:uuid(), position:'', company:'', startDate:'', endDate:''})
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ExperienceHandler =(e)=>{
    setExperienceData((pre)=>({
        ...pre,
        [e.target.name]:e.target.value
  }))
 }
 console.log(experienceData,"educationData")
 const ExperienceSubmit =(event)=> {
  event.preventDefault();
  axios({
    method: 'patch',
    url: `${BaseUrl.url}/add-exprience`,
    headers:{
      'Authorization':`Bearer ${window.localStorage.getItem('token')}`
    },
    data:experienceData
  }).then((res)=>{
    console.log(res.data,"experi")
    props.ProfileSubmit()
  })
  .catch((err)=>{
    toast.error(err.response.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme:'colored'
      });
  })
  handleClose()
}
const ExperienceDelete=(id)=>{
  axios({
    method:'delete',
    url:`${BaseUrl.url}/delete-exprience?id=${id}`,
    headers:{
      'Authorization':`Bearer ${window.localStorage.getItem('token')}`
    },
  }).then((res)=>{
    props.ProfileSubmit()
  }).catch((err)=>{
    console.log(err.message)
  })
  }
  React.useEffect(()=>{
    setExperienceDataShow(Experience_data)
  },[Experience_data])
  return (
    <>
    
    <div className=" grid grid-cols-1 gap-6">
      <div className="text-sm font-medium text-slate-600 ">
        <div className="grid grid-cols-2 gap-4 bg-slate-100">
          <div>
            <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Experience</h5>
          </div>
          <div className="p-2 text-end text-slate-600 text-sm pt-2">
            <i onClick={handleOpen} className="fa-solid fa-plus border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
          </div>
        </div>
        <hr />
        <div className="ml-2 p-4 grid grid-cols-1 gap-2">
          <div>
            {!Experience_data?<Breathing width={1200} height={250} />:
            Experience_data.map((data)=>{
              return(
                <>
               <div className="grid grid-cols-5 gap-4">
                 <div className="col-span-4 ...">
                  <p className=" text-black text-base ">{data.position}</p>
                  <p className="  font-normal text-blue-800 text-base ">{data.company}</p>
                  <p className="   font-normal  text-black text-slate-600"><i className="fa-solid fa-calendar-days" /> {data.startDate}
                    - {data.endDate}</p>
                </div>
                <div className=" col  text-end text-slate-600 text-xs ">
                  <i className="fa-solid fa-pen border-solid  ring-2 ring-gray-200 p-2 rounded-full" />&nbsp;
                  <i onClick={()=>ExperienceDelete(data._id)} className="fa-solid fa-trash-can border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
                </div>
               </div>
               <br />
               </>
              )
            })}
          </div>
        </div>
      </div>
    </div>
    <hr />
   {/*------------------------------------------------------------ROW3*/}
    {/*------------------------------------------------------------ROW4*/} 
    {/* <div className=" grid grid-cols-1 gap-6">
      <div className="text-sm font-medium text-slate-600 ">
        <div className="grid grid-cols-2 gap-4 bg-slate-100">
          <div>
            <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Certification</h5>
          </div>
          <div className="p-2 text-end text-slate-600 text-sm pt-2">
            <i className="fa-solid fa-plus border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
          </div>
        </div>
        <hr />
        <div className="ml-2 p-4 grid grid-cols-1 gap-2">
          <div>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-4 ...">
                <p className="  font-normal text-base  text-black"> Lorem Ipsum has been the industry's standard dummy text
                  ever since the 1500s
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s </p>
              </div>
              <div className=" col  text-end text-slate-600 text-xs ">
                <i className="fa-solid fa-pen border-solid  ring-2 ring-gray-200 p-2 rounded-full" />&nbsp;
                <i className="fa-solid fa-trash-can border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
  {/* ------------------------------language modal-------------------------- */}
  <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
        <Fade in={open}>
        <Box sx={style}> 
          <span className="flex justify-end -mt-7 -mr-6 text-xl">
            <i onClick={handleClose} className="fa-solid fa-xmark"></i>
          </span>
        {/* ----------------------------------Experience------------------- */}
      <div>
       <div className="container w-11/15 mx-auto border border-slate-300 bg-white rounded mt-1">
        <div className="flex min-h-full items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <form className="space-y-6" onSubmit={ExperienceSubmit}>
              <div>
                <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Add Position</label>
                <select id="large" onChange={ExperienceHandler} name="position" className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a position</option>
                  <option value="React Developer">React Developer</option>
                  <option value="Node Developer">Node Developer</option>
                  <option value="PHP Developerl">PHP Developer</option>
                  <option value="Java Developer">Java Developer</option>
                  <option value="Python Develope">Python Developer</option>
                  <option value="MERN Stack Developer">MERN Stack Developer</option>
                  <option value="MEAN Stack Developer">MEAN Stack Developer</option>
                  <option value="Go lang Developer">Go lang Developer</option>
                  <option value="Laravel Developer">Laravel Developer</option>
                </select>
              </div>
              <div>
                <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Add Company</label>
                <select id="large" onChange={ExperienceHandler} name="company" className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a company</option>
                  <option value="Web Designing And Web Development">Codesoftic Tech Private Limited</option>
                  <option value="TMotions Global Limited">TMotions Global Limited</option>
                  <option value="DevelopTech IT Solutions">DevelopTech IT Solutions</option>
                  <option value="NextPage IT Solutions Pvt Ltd">NextPage IT Solutions Pvt Ltd</option>
                  <option value="Enzoo IT Services Pvt. Ltd.">Enzoo IT Services Pvt. Ltd.</option>
                  <option value="Fortec Web Solutions Pvt. Ltd.">Fortec Web Solutions Pvt. Ltd.</option>
                </select>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Joining Year</label>
                  <input type="month" id="first_name" onChange={ExperienceHandler} name="startDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                </div>
                <div>
                  <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Completion Year</label>
                  <input type="month" id="last_name" onChange={ExperienceHandler} name="endDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                </div>
              </div>
              <button type="submit" className="ml-5 rounded-md border border-gray-300 bg-blue-800 text-white py-2 px-3 text-sm font-medium shadow-sm ">Submit</button>
            </form></div>
              <div>
            </div>
          </div>
         </div>
        </div> 
      </Box>
     </Fade>
    </Modal>
    </>
  )
}

export default Experience_Certificate;
