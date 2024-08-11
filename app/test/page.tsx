"use client";
import "./invoice.css";
import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { InvoiceApiRespose, InvoiceData } from "@/components/types/invoice";
import { InvoiceInfo } from "./types/invoice";
import { Printer } from "lucide-react";
import Image from "next/image";

const Invoice = () => {
  const [data, setData] = useState<InvoiceInfo>();
  const component = useRef(null);

  async function getData(id: string) {
    try {
      const res = await axios.get<InvoiceApiRespose>(
        `/api/v1/accounts/invoice/${id}`
      );
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function formatPrice(price: number, locale = "en-IN") {
    return new Intl.NumberFormat(locale, {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }

  return (
    <div className="invoice tracking-wide mx-auto border-2 my-5">
      <main className="m-2" ref={component}>
        <header className="header w-full flex justify-between items-start">
          <Image 
            src={'https://1000logos.net/wp-content/uploads/2020/09/Air-India-Logo.png'} 
            alt="flight logo" 
            height={100} 
            width={100} 
            className="rounded-lg bg-white"
          />
          <div className="details flex flex-col items-end">
            <p className="text-sm mb-1">Booking Id: <span className="font-bold text-black">FS-24543</span></p>
            <p className="text-sm mb-1">Booked On: <span className="font-bold text-black">Jul 02, 2024 21:20</span></p>
            <QRCodeSVG className="h-24 w-24 mt-2" value={window.location.href} />
          </div>
        </header>
        
        <hr className="my-4" />
        
        <section className="flight-details">
          <div className="bg-sky-700 flex justify-between p-3">
            <p className="font-semibold text-sm text-white">Flight Details</p>
            <p className="font-thin text-sm text-white">Travel Date: <span className="font-semibold">Jun 17, 2024</span></p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <p className="font-semibold mr-4">SpiceJet SG 54</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">Airline PNR: XF29VW</p>
              <p className="text-red-600 font-bold">NON REFUNDABLE</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold">DXB</h3>
              <p>Dubai City</p>
              <p className="font-semibold">12:55 hrs</p>
            </div>
            <div className="text-center">
              <p className="font-bold">4hrs 10mins</p>
              <p>nonstop</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">CCJ</h3>
              <p>Kozhikode</p>
              <p className="font-semibold">18:35 hrs</p>
            </div>
          </div>
        </section>

        <hr className="my-6" />

        <section className="passenger-details">
          <h2 className="text-xl font-bold mb-4">Passenger(s) Details</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-2">Passenger Name</th>
                <th className="p-2">Type</th>
                <th className="p-2">PNR Barcode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Ms. FATHIMA ZARA</td>
                <td className="p-2">Adult</td>
                <td className="p-2">XF29VW</td>
              </tr>
              <tr>
                <td className="p-2">Mr. ABDUL GAFOOR KONNASSERI KUNIYIL</td>
                <td className="p-2">Adult</td>
                <td className="p-2">XF29VW</td>
              </tr>
              <tr>
                <td className="p-2">Mrs. FAMILA ABDUL GAFOOR</td>
                <td className="p-2">Adult</td>
                <td className="p-2">XF29VW</td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr className="my-6" />

        <section className="terms-conditions">
          <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
          <ul className="list-disc pl-5 text-sm">
            <li>Names will be updated on D-1 till 20:00 hrs.</li>
            <li>Group tickets are 100% non-refundable, non-changeable, and non-cancellable.</li>
            <li>All guests, including children and infants, must present valid identification at check-in.</li>
            <li>Please verify flight times with the airlines prior to departure.</li>
            <li>For any schedule change, flight cancellation, and terminal-related issues, contact the airline directly.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Invoice;






// "use client";
// import "./invoice.css";
// import { useEffect, useRef, useState } from "react";
// import { QRCodeSVG } from "qrcode.react";
// import { InvoiceApiRespose, InvoiceData } from "@/components/types/invoice";
// import { InvoiceInfo } from "./types/invoice";
// import { InfoIcon, PlaneIcon, Printer } from "lucide-react";
// import Image from "next/image";

// const Invoice = () => {
//   const [data, setData] = useState<InvoiceInfo>();
//   const component = useRef(null);

//   async function getData(id: string) {
//     try {
//       const res = await axios.get<InvoiceApiRespose>(
//         `/api/v1/accounts/invoice/${id}`
//       );
//       setData(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   function formatPrice(price: number, locale = "en-IN") {
//     return new Intl.NumberFormat(locale, {
//       style: "decimal",
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(price);
//   }

//   return (
//     <div className="invoice tracking-wide mx-auto border-2 my-5">
//       <main className="m-2" ref={component}>
//         <header className="header w-full flex justify-between items-start">
//           <div className="details flex flex-col items-end ml-auto">
//             <p className="text-sm mb-1">
//               Booking Id: <span className="font-bold text-black">FS-24543</span>
//             </p>
//             <p className="text-sm mb-1">
//               Booked On:{" "}
//               <span className="font-bold text-black">Jul 02, 2024 21:20</span>
//             </p>
//             <QRCodeSVG
//               className="h-24 w-24 mt-2"
//               value={window.location.href}
//             />
//           </div>
//         </header>

//         <hr className="my-4" />

//         <section className="flight-details">
//           <div className="bg-sky-700 flex justify-between p-3">
//             <p className="font-semibold text-sm text-white">Flight Details</p>
//             <p className="font-thin text-sm text-white">
//               Travel Date: <span className="font-semibold">Jun 17, 2024</span>
//             </p>
//           </div>

//           {/* <div className="flex justify-between items-center mt-4">
//             <div className="flex flex-col items-center bg-slate-200 h-[200px] w-[200px] rounded-xl">
//             <div className="flex my-auto">
//             <Image 
//             src={'https://scontent.fccj5-1.fna.fbcdn.net/v/t39.30808-1/410991562_780654767438679_7093682091605906667_n.jpg?stp=dst-jpg_p200x200&_nc_cat=1&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=idqaChsoOYoQ7kNvgG56vgG&_nc_ht=scontent.fccj5-1.fna&oh=00_AYDhDSf3E3Cq6BmcUeFlGtuHEjzFRzWqe58uwkN1OAU_vA&oe=669D99A0'} 
//             alt="flight logo"
//             height={80}
//             width={80} 
//             sizes="3"
//             className="rounded-lg bg-white mx-2"
//           />
//               <p className="font-semibold my-auto">SpiceJet SG 54</p>
//             </div>
//             <p className="font-thin my-auto">Airline: <span className="font-semibold">0123 456 788</span></p>
//             </div>
//             <div className="text-right">
//               <p className="font-semibold">Airline PNR: XF29VW</p>
//               <p className="text-red-600 font-bold">NON REFUNDABLE</p>
//             </div>
//           </div> 
//           */}

//           <div className="flex justify-between items-center">
//             <div className="flex flex-col items-center bg-slate-200 h-[150px] w-[180px] p-2 rounded-sm">
//               <div className="flex my-auto p-1">
//                 <Image
//                   src={
//                     "https://scontent.fccj5-1.fna.fbcdn.net/v/t39.30808-1/410991562_780654767438679_7093682091605906667_n.jpg?stp=dst-jpg_p200x200&_nc_cat=1&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=idqaChsoOYoQ7kNvgG56vgG&_nc_ht=scontent.fccj5-1.fna&oh=00_AYDhDSf3E3Cq6BmcUeFlGtuHEjzFRzWqe58uwkN1OAU_vA&oe=669D99A0"
//                   }
//                   alt="flight logo"
//                   height={70}
//                   width={70}
//                   sizes="3"
//                   className="rounded-lg bg-white mx-2"
//                 />
//                 <p className="font-semibold text-xm my-auto">SpiceJet SG 54</p>
//               </div>
//               <p className="font-thin my-auto">
//                 Airline: <span className="font-semibold">0123 456 788</span>
//               </p>
//             </div>
//             <div className="text-center">
//               <h3 className="text-2xl font-bold text-sky-700">DXB</h3>
//               <p className="text-sm">Dubai City</p>
//               <p className="font-semibold">12:55 hrs</p>
//             </div>
//             <div className="text-center">
//               <h3 className="text-2xl font-bold">
//                 <PlaneIcon className="mx-auto" />
//               </h3>
//               <p className="font-bold text-sm">4hrs 10mins</p>
//               <p className="text-sky-700 font-bold">nonstop</p>
//             </div>
//             <div className="text-center">
//               <h3 className="text-2xl font-bold text-sky-700">CCJ</h3>
//               <p>Kozhikode</p>
//               <p className="font-semibold">18:35 hrs</p>
//             </div>

//             <div className="border-2 text-center p-3">
//               <p className="font-semibold">Airline PNR</p>
//               <p className="text-sky-700 font-black text-2xl">XF29VW</p>
//               <p className="text-red-600 bg-red-200 p-1 font-bold">NON REFUNDABLE</p>
//             </div>
//           </div>

//           <div className="mt-3 bg-orange-200 p-1 rounded">
//             <p className="flex gap-2 my-auto text-xs text-orange-400"><InfoIcon className="w-3 h-3 stroke-orange-400 my-auto"/> Please verify flight times with the airlines prior to departure</p>
//           </div>
//         </section>

//         <hr className="my-6" />

//         <section className="passenger-details">
//           <div className="bg-sky-700 flex justify-between p-3 mb-9">
//             <p className="font-semibold text-sm text-white">Passenger(s) Details</p>
//           </div>
//           <table className="w-full border bg-gray-100">
//             <thead>
//               <tr className="text-left">
//                 <th className="p-2 ">Passenger Name</th>
//                 <th className="p-2 ">Type</th>
//                 <th className="p-2 ">PNR Barcode</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border">
//                 <td className="p-2 ">Ms. FATHIMA ZARA</td>
//                 <td className="p-2 ">Adult</td>
//                 <td className="p-2 ">XF29VW</td>
//               </tr>
//               <tr className="border">
//                 <td className="p-2 ">Mr. ABDUL GAFOOR KONNASSERI KUNIYIL</td>
//                 <td className="p-2 ">Adult</td>
//                 <td className="p-2 ">XF29VW</td>
//               </tr>
//               <tr className="border">
//                 <td className="p-2 ">Mrs. FAMILA ABDUL GAFOOR</td>
//                 <td className="p-2 ">Adult</td>
//                 <td className="p-2 ">XF29VW</td>
//               </tr>
//             </tbody>
//           </table>
//         </section>

//         <hr className="my-6" />

//         <section className="terms-conditions">
//           <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
//           <ul className="list-disc pl-5 text-sm">
//             <li>Names will be updated on D-1 till 20:00 hrs.</li>
//             <li>
//               Group tickets are 100% non-refundable, non-changeable, and
//               non-cancellable.
//             </li>
//             <li>
//               All guests, including children and infants, must present valid
//               identification at check-in.
//             </li>
//             <li>
//               Please verify flight times with the airlines prior to departure.
//             </li>
//             <li>
//               For any schedule change, flight cancellation, and terminal-related
//               issues, contact the airline directly.
//             </li>
//           </ul>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Invoice;
