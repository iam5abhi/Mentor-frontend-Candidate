import * as React from 'react';
import { v4 as uuid } from 'uuid';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import BaseUrl from '../../config/BaseUrl'
import { Breathing } from 'react-shimmer'
import { useNavigate } from 'react-router-dom';

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height:480,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

const Education = (props) => {
  const data = props.data
  const [propsData,setPropsData]=React.useState([])
  const [educationOpen, setEducationOpen] = React.useState(false);
  const [educationData,setEducationData]=React.useState({ id:uuid(), degreeName:'', collegeName:'', startDate:'', endDate:''})
  const educationHandleOpen = () => setEducationOpen(true);
  const educationHandleClose = () => setEducationOpen(false);

  const EducationHandler =(e)=>{
    setEducationData((pre)=>({
        ...pre,
        [e.target.name]:e.target.value
  }))
 }
 const EducationSubmit =(event)=> {
  event.preventDefault();
  axios({
    method: 'patch',
    url: `${BaseUrl.url}/add-education`,
    headers:{
      'Authorization':`Bearer ${window.localStorage.getItem('token')}`
    },
    data:educationData
  }).then((res)=>{
    setPropsData(res.data.education)
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
  educationHandleClose()
}
const EducationDelete=(id)=>{
  var result = window.confirm("Are you sure you want to delete?");
  if(result===true){
axios({
  method:'delete',
  url:`${BaseUrl.url}/delete-education?id=${id}`,
  headers:{
    'Authorization':`Bearer ${window.localStorage.getItem('token')}`
  },
}).then((res)=>{
  props.ProfileSubmit()
}).catch((err)=>{
  console.log(err.message)
})
}else{
  return;
}
}
React.useEffect(()=>{
  setPropsData(data)
},[data])
  return (
    <>
      <div className="col-span-2 text-sm font-medium text-slate-600 ">
        <div className="grid grid-cols-2 gap-4 bg-slate-100">
          <div>
            <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Education</h5>
          </div>
          <div className="p-2 text-end text-slate-600 text-sm pt-2">
            <i onClick={educationHandleOpen} className="fa-solid fa-plus border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
          </div>
        </div>
        <hr />
        {!propsData?<Breathing width={820} height={270} />
       :propsData.map((data)=>{
           return(
           
            <div key={data._id} className="ml-2 p-4 grid grid-cols-1 gap-2" >
              <div className="grid grid-cols-5 gap-4" >
                <div className="col-span-4 ..." >
                  <p className=" text-black text-base ">{data.degreeName}</p>
                  <p className="  font-normal text-blue-800 text-base ">{data.collegeName}</p>
                  <p className="   font-normal  text-black text-slate-600"><i className="fa-solid fa-calendar-days" />{data.startDate}
                    - {data.endDate}</p>
                </div>
                <div className=" col  text-end text-slate-600 text-xs ">
                  <i onClick={()=>EducationDelete(data._id)} className="fa-solid fa-trash-can border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
                </div>
              </div>
              <br />
            </div>
           )
       })
        }
       
      </div>{/* ------------------------------Education modal-------------------------- */}
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={educationOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
        <Fade in={educationOpen}>
        <Box sx={styles}> 
          <span className="flex justify-end -mt-7 -mr-6 text-xl">
            <i onClick={educationHandleClose} className="fa-solid fa-xmark"></i>
          </span>
          <div>
      <div className="container w-11/15 mx-auto border border-slate-300 bg-white rounded ">
        <div className="flex min-h-full items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <form className="mt-8 space-y-6" onSubmit={EducationSubmit}>
              <div>
                <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Add Degree</label>
                <select id="large" onChange={EducationHandler} name="degreeName" className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a Qualification</option>
                  <option value="10th">10th</option>
                  <option value="12th">12th</option>
                  <option value="Bachelor Of Arts">Bachelor Of Arts</option>
                  <option value="Bachelor Of Science">Bachelor Of Science</option>
                  <option value="Bachelor Of Commerce">Bachelor Of Commerce</option>
                  <option value="Bachelors's in Computer Application">Bachelors's in Computer Application</option>
                  <option value="Bachelor of Technology">Bachelor of Technology</option>
                </select>
              </div>
              <div>
                <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Add College</label>
                <select id="large" onChange={EducationHandler} name="collegeName" className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a college</option>
                  <option value="Chandigarh University">Chandigarh University</option>
                  <option value="Punjab University">Punjab University</option>
                  <option value="Sri Sai University">Sri Sai University</option>
                  <option value="Lovely Professional University">Lovely Professional University</option>
                  <option value="Central University of Haryana">Central University of Haryana</option>
                  <option value="Board of Secondary Education, Rajasthan">Board of Secondary Education, Rajasthan</option>
                </select>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Joining Year</label>
                  <input type="month" id="first_name" name="startDate" onChange={EducationHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                </div>
                <div>
                  <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Completion Year</label>
                  <input type="month" id="last_name" name="endDate" onChange={EducationHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
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

export default Education;
