"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState, ChangeEvent } from "react"
import { getSignedURL } from "@/actions/bucket"
import { useToast } from "@/components/ui/use-toast"
import { computeSHA256 } from "@/lib/encrypt"
import { requestDeposite } from "@/actions/requestDeposite"
import Loader from "@/components/custom/loader"

const Deposit = () => {
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        date: '',
        bankAccount: '',
        amount: '',
        bankRef: '',
        depositorName: '',
    })
    const [image, setImage] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)



    const putFile = async(file:File, url: string) => {
        try {
          await fetch(url, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          })    
          return url.split('?')[0]
        } catch (error) {
          console.log(error);
          throw new Error("Failed to upload file");
        }
      }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, bankAccount: value }))
    }

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }


    const handleSubmit = async () => {
    setLoading(true)        
        if(!image){
            return toast({
                title: "⚠ Receipt not selected",
            })
        }

        let reciptUrl
        try {
            // TODO: upload image
            reciptUrl = await getSignedURL(image.type, image.size, await computeSHA256(image))

            const form = new FormData()
            form.append("receipt", await putFile(image, reciptUrl.success.url))
            form.append("date", formData.date)
            form.append("bankAccount", formData.bankAccount)
            form.append("bankRef", formData.bankRef)
            form.append("amount", formData.amount)
            form.append("depositorName", formData.depositorName)

            const res = await requestDeposite(form)
            if(!res.success){
                throw res
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
           return toast({
                title: "💥 Request Failed",
                description: "something went wrong please try again later"
            })
        }

    }

    const handleImageDelete = () => {
        setImage(null)
    }

    return(
        <>
        {!loading && <Card className="max-w-2xl mx-auto p-6 sm:p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Request Deposit</CardTitle>
          <CardDescription>Fill out the form below to request a deposit to your wallet.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={formData.date} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bank-account">Destination Bank Account</Label>
                <Select onValueChange={handleSelectChange} value={formData.bankAccount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account1">Account 1</SelectItem>
                    <SelectItem value="account2">Account 2</SelectItem>
                    <SelectItem value="account3">Account 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" placeholder="0.00" value={formData.amount} onChange={handleInputChange} />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="bankRef">Bank Reference</Label>
                <Input id="bankRef" type="text" placeholder="Enter bank reference" value={formData.bankRef} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="depositorName">Depositor Name</Label>
                <Input id="depositorName" type="text" placeholder="Enter depositor name" value={formData.depositorName} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="receipt">Receipt Upload</Label>
                <div className="flex items-center gap-4">
                  {!image && (
                      <Input id="receipt" type="file" onChange={handleImageUpload} />
                    )}
                  {image && (
                      <div className="relative">
                      <img src={URL.createObjectURL(image)} alt="Receipt preview" width={128} height={128} className="rounded-md" />
                      <Button variant="ghost" size={"sm"} className="absolute top-0 right-0 rounded-full p-1 w-6 h-6" onClick={handleImageDelete}>
                        <XIcon className="w-4 h-4 stroke-red-600" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSubmit}>Submit Request</Button>
          </div>
        </CardFooter>
      </Card>}
      {loading && <Loader/>}
                  </>
    )
}

export default Deposit

function XIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
}