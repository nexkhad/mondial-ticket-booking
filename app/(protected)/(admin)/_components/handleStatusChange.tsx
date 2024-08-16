"use client"

import Image from "next/image";
import React, { useState, useEffect } from 'react';

function HandleStatusChange({ depRequest }) {
  const [status, setStatus] = useState(depRequest.status);
  
  const statusOptions = ["PENDING", "APPROVED", "REJECTED", "SENT_BACK"];

  const handleStatusChange = (e) => {
      setStatus(e.target.value)
  }


  return (
    <>

    <p className="text-md"><strong>Status:</strong> &nbsp; 

      <select 
        onChange={handleStatusChange}
        value={status}
        className="p-1 border border-gray-300 rounded-sm"
      >
        {statusOptions.map((options) => (
          <option key={options} value={options}>
          {options.charAt(0) + options.slice(1).toLowerCase().replace('_', ' ')}
          </option>
                ))}
                
        </select>
     </p>

     <div className=" mt-5 flex ">
          <strong>Receipt:</strong>
          <div className="p-3">
            <Image
              src={depRequest.receiptImage}
              alt="Receipt"
              width={500}
              height={300}
              className="rounded-sm shadow-sm"
            />
          </div>
      </div>
  </>
  );
}

export default HandleStatusChange;
