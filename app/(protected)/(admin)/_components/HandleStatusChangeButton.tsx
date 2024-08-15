"use client"

import React, { useState } from 'react';

function HandleStatusChangeButton({ id, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  
  const statusOptions = ["Pending", "Approved", "Rejected", "Sent back"];


  async function handleStatusChange(newStatus) {
    try {
      const response = await fetch('/api/updateStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, newStatus }),
      });

      if (response.ok) {
        const result = await response.json();
        setStatus(newStatus);
        console.log('Update Successful', result);
      } else {
        const error = await response.text();
        console.error('Update Failed', error);
      }
    } catch (error) {
      console.error('Request Failed', error);
    }
  }

  return (
    // <button >
    //   Change Status
    // </button>
    <select 
    onClick={() => handleStatusChange('APPROVED')}
    // value={depRequest.status}
    className="p-1 border border-gray-300 rounded-sm"
    >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
          {status}
        </option>
                ))}
  </select>
  );
}

export default HandleStatusChangeButton;
