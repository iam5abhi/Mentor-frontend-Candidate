import React from "react";
import { ThreeDots } from  'react-loader-spinner'
import "./LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
         <ThreeDots
          strokeColor="white"
          strokeWidth="5"
          color="#f3f3f3" 
          animationDuration="0.95"
          width="100"
          height='10'
          visible={true}
        />
    </div>
  );
}
