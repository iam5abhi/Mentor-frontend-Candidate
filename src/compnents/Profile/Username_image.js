import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Breathing } from 'react-shimmer';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height:250,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Username_image = (props) => {
  const data =props.data;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  return (
    <>
     <div className="container w-11/15 mx-auto px-4  mt-4 border border-slate-300 bg-white rounded ">
  <div className="relative flex flex-col flex-auto min-w-0 mt-4 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
    <div className="flex flex-wrap -mx-3">
      <div className="flex-none w-auto max-w-full px-3">
        <div  onClick={handleOpen} className="relative">
        <img className=" w-32 h-32 rounded-full" src={data?data.avatar:"null"}
          fallback={<Breathing  />}/>
          <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
          <div className="relative">
            <i className="fa-solid fa-pencil text-slate-600 text-lg bottom-24 left-24 absolute p-2 w-12 h-12 bg-slate-100 border-4 border-slate-100 dark:border-gray-800 rounded-full" />
          </div>
      </div>
      </div>
      <div className="flex-none w-auto max-w-full px-3 my-auto">
        <div className="h-full">
          <h5 className="mb-1 text-2xl font-semibold">{data?data.name:"Abhinandan Jhamb"}</h5>
          <p className="mb-0  leading-normal text-slate-600 text-size-sm"><i className="fa-solid fa-location-dot" /> Mohali,
            Sector 66</p>
        </div>
        </div>
      </div>
      {/* })} */}
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
               <h1 className='text-center text-xl font-medium text-black'>Upload Profile Picture</h1>
                <div className="container w-11/15 mx-auto px-4 py-4 mt-8 border border-slate-300 bg-white rounded ">
                <div>
                    <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Photo</h5>
                </div>
                <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    </span>
                    <input type="file" className="ml-3 rounded-md border border-gray-300 bg-white text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" />
                </div>
                {/* <button type="button" className="flex justify-end ml-5 rounded-md border border-gray-300 bg-blue-800 text-white py-2 px-3 text-sm font-medium shadow-sm">Submit</button> */}
                </div> 
                </Box>
               </Fade>
              </Modal>
     </div>
  </div>
    </>
  )
}

export default Username_image;
