export async function getRecord() {

    
    const response = await fetch(`/api/getRecords`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch  record');
    }
    return await response.json();
  }