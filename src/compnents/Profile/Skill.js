import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { v4 as uuid } from 'uuid';
import BaseUrl from '../../config/BaseUrl';
import axios from 'axios';
import { Breathing } from 'react-shimmer'

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height:390,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const skillsData = [{skills:'Graphic Design', id:uuid()},
                        {skills:'Logo Design', id:uuid()},
                        {skills:'Brand Identity', id:uuid()},
                        {skills:'Adobe Illustrator', id:uuid()},
                        {skills:'3D Mockup', id:uuid()}
                        ]
const Skill = (props) => {
  const skillData = props.data
  let skills_arr = [];
  const [skillsShow, setSkillsShow] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const skillsHandler =(event)=>{
    let filtered = skillsData.filter(lang => {
      return lang.id === event.target.id;
    });
    if (skills_arr.includes(filtered[0])){
      let myIndex = skills_arr.indexOf(filtered[0]);
      skills_arr.splice(myIndex, 1);
    }
    else{
      skills_arr.push(filtered[0]);
    }
    console.log(skills_arr,"skills_arr")
  }
  const skillsSubmitHandler =()=> {
    console.log(skills_arr,"temp")
    axios({
      method: 'patch',
      url: `${BaseUrl.url}/add-skills`,
      headers:{
        'Authorization':`Bearer ${window.localStorage.getItem('token')}`
      },
      data:skills_arr
    }).then((res)=>{
      console.log(res,"res")
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
  React.useEffect(()=>{
    setSkillsShow(skillData)
  },[skillData])
  return (
    <>
      <div className=" col text-sm font-medium text-slate-600">
      <div className="grid grid-cols-2 gap-4 bg-slate-100">
          <div>
            <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Skills</h5>
          </div>
          <div className="p-2 text-end text-slate-600 text-sm pt-2">
          <i onClick={handleOpen} className="fa-solid fa-plus border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
          </div>
        </div>
        <hr />
        <div className="ml-2 p-4 grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {!skillsShow?<Breathing width={340} height={250} />:
            skillsShow.map((skill)=>{
              return(
                <ul key={skill.id} className="list-none font-normal  text-base text-black" >
              <li className="rounded-full  text-center bg-blue-100 text-blue-800 my-2">
                <span><a href className>
                    {skill.skills}</a></span>
              </li>
            </ul>
              )
            })}
          </div>
        </div>
      </div>
        {/* ------------------------------Skills modal-------------------------- */}
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
        {/* ----------------------------------Languages */}
        <div>
    <div className="container w-11/15 mx-auto px-4  border border-slate-300 bg-white rounded ">
      <div>
        <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Add Skills</h5>
      </div>
      <div className="p-3">
        <label htmlFor="input-group-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
          </div>
          <input type="text" id="input-group-search" className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user" />
        </div>
      </div>
      
      <ul className="overflow-y-auto px-3 pb-3 h-48 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
      {skillsData.map((skill)=>{
       return(
        <li key={skill.id}>
          <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <input id={skill.id} onChange={(e)=>skillsHandler(e)} type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
            <label htmlFor="checkbox-item-11" className="py-2 ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">{skill.skills}</label>
          </div>
        </li>
         )})} 
      </ul> 
    </div>
    <button type="button" onClick={skillsSubmitHandler} className="ml-5 mt-2 rounded-md border border-gray-300 bg-blue-800 text-white py-2 px-3 text-sm font-medium shadow-sm ">Save</button>
    </div>
      </Box>
     </Fade>
    </Modal>
    </>
  )
}

export default Skill;