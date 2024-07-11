export const getTime = (date: Date) => {
    return date.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit',
      hour12: false
    })
  }


    // this will recive two dates and return the difference in hour and minutes by checking the two dates and times
    export const getTimeDiff = (departure: Date, arrival: Date) => {  
        // Calculate the difference in milliseconds
            const differenceMs =  arrival.getTime() - departure.getTime();
        
            // Convert milliseconds to hours
            const hours = differenceMs / (1000 * 60 * 60);
        
            // Round to 2 decimal places
            const roundedHours = Math.round(hours * 100) / 100;
        
            // Format the result
            return roundedHours.toFixed(2).split('.').join(':');
      }