"use server"


import { getCurrentUser } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

// Create a single PrismaClient instance and reuse it
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient()
  }
  prisma = (global as any).prisma
}

export const requestDeposite = async (formData: FormData) => {
    try {
        // Extract data from the FormData
        const date = new Date(formData.get('date') as string)
        const bankAccount = formData.get('bankAccount') as string
        const amount = parseFloat(formData.get('amount') as string)
        const bankRef = formData.get('bankRef') as string
        const depositorName = formData.get('depositorName') as string
        const receiptImage = formData.get('receipt')        
    
        // Validate inputs
        if (!date || isNaN(date.getTime())) {
          return { success: false, message: 'Invalid date' }
        }
        if (!bankAccount) {
          return { success: false, message: 'Bank account is required' }
        }
        if (isNaN(amount) || amount <= 0) {
          return { success: false, message: 'Invalid amount' }
        }
        if (!bankRef) {
          return { success: false, message: 'Bank reference is required' }
        }
        if (!depositorName) {
          return { success: false, message: 'Depositor name is required' }
        }

        if(!receiptImage){
            return { success: false, message: 'Recipt is required' }
        }
    
        // Get the user ID (you'll need to implement user authentication)
        const user = await getCurrentUser()
        const userId =  user?.id// Replace with actual user ID
    
        // Create the deposit request in the database
        const depositRequest = await prisma.depositRequest.create({
          data: {
            userId,
            date,
            bankAccount,
            amount,
            bankRef,
            depositorName,
            receiptImage,
            status: 'PENDING'
          } as any
        })
    
        // Revalidate the page to reflect the new data
        revalidatePath('/wallet/deposits')
    
        return { success: true, message: 'Deposit request submitted successfully', id: depositRequest.id }
      } catch (error) {
        console.error('Error submitting deposit request:', error)
        return { success: false, message: 'Failed to submit deposit request. Please try again.' }
      }
    }