export async function deleteRecord(id: string) {
  console.log(id);
  
  const response = await fetch(`/api/deletePaymentReq/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete record');
  }
  return;
}