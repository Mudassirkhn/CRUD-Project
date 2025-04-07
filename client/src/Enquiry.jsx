// import React, { useEffect, useState } from "react";
// import { Button, Label, TextInput, Textarea } from "flowbite-react";
// import { ToastContainer, toast } from "react-toastify";
// import { EnquiryList } from "./enquiry/EnquiryList";
// import Swal, { swal } from "sweetalert2/dist/sweetalert2.js";
// import axios from "axios";
// import { data } from "autoprefixer";

// export default function Enquiry() {
//   let [enquiryList, setEnquiryList] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//     _id: "",
//   });

//   if (formData._id) {
//     axios
//       .put(
//         `http://localhost:8020/api/website/enquiry/update/$ {formData._id}`,
//         FormData
//       )
//       .then((res) => {
        
//         toast.success("Enquiry saved successfully!");
//         setFormData({
//           name: "",
//           email: "",
//           phone: "",
//           message: "",
//           _id:''
//         });
//         getAllenquiry();
//       });
//   } else {
//     axios
//       .post(`http://localhost:8020/api/website/enquiry/insert`, formData)
//       .then((res) => {
//         console.log("Enquiry saved:", res.data);
//         toast.success("Enquiry saved successfully!");

//         // Reset form after successful submission
//         setFormData({
//           name: "",
//           email: "",
//           phone: "",
//           message: "",
//         });
//         getAllenquiry();
//       })
//       .catch((err) => {
//         console.error("Error saving enquiry:", err);
//       });
//   }

//   const saveEnquiry = (e) => {
//     e.preventDefault();
//   };

//   let getAllenquiry = (e) => {
//     axios
//       .get("http://localhost:8020/api/website/enquiry/view")
//       .then((res) => {
//         return res.data;
//       })
//       .then((finalData) => {
//         if (finalData.status) {
//           setEnquiryList(finalData.enquiryList);
//         }
//       });
//   };

//   const getvalue = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   console.log(enquiryList);

//   useEffect(() => {
//     getAllenquiry();
//   }, []);

//   return (
//     <div>
//       <ToastContainer />
//       <h1 className="text-[40px] text-center py-6 font-bold">User Enquiry</h1>

//       {/* Grid Layout for Left Form & Right Table */}
//       <div className="grid grid-cols-[30%_70%] gap-10 px-10">
//         {/* Left Side: Enquiry Form */}
//         <div className="bg-gray-200 p-4 rounded-lg shadow-md">
//           <h2 className="text-[20px] font-bold mb-4">Enquiry Form</h2>

//           <form onSubmit={saveEnquiry}>
//             <div className="py-3">
//               <Label htmlFor="name" value="Your Name" />
//               <TextInput
//                 type="text"
//                 value={formData.name}
//                 onChange={getvalue}
//                 name="name"
//                 placeholder="Enter your Name"
//                 required
//               />
//             </div>

//             <div className="py-3">
//               <Label htmlFor="email" value="Your Email" />
//               <TextInput
//                 type="email"
//                 value={formData.email}
//                 onChange={getvalue}
//                 name="email"
//                 placeholder="Enter your Email"
//                 required
//               />
//             </div>

//             <div className="py-3">
//               <Label htmlFor="phone" value="Your Phone" />
//               <TextInput
//                 type="tel"
//                 value={formData.phone}
//                 onChange={getvalue}
//                 name="phone"
//                 placeholder="Enter your Phone"
//                 required
//               />
//             </div>

//             <div className="py-3">
//               <Label htmlFor="message" value="Your Message" />
//               <Textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={getvalue}
//                 placeholder="Message..."
//                 required
//                 rows={4}
//               />
//             </div>

//             <div className="py-3">
//               <Button type="submit" className="w-full">
//                 {formData._id ? "Update" : "Save"}
//               </Button>
//             </div>
//           </form>
//         </div>

//         <EnquiryList
//           data={enquiryList}
//           getAllenquiry={getAllenquiry}
//           Swal={Swal}
//           setFormData={setFormData}
//         />
//       </div>
//     </div>
//   );
// }













import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import { EnquiryList } from "./enquiry/EnquiryList";
import Swal from "sweetalert2";
import axios from "axios";

export default function Enquiry() {
  let [enquiryList, setEnquiryList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  const saveEnquiry = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    if (formData._id) {
      // Update existing enquiry
      axios
        .put(
          `http://localhost:8020/api/website/enquiry/update/${formData._id}`,
          formData
        )
        .then((res) => {
          toast.success("Enquiry updated successfully!");
          resetForm();
          getAllenquiry();
        })
        .catch((err) => {
          console.error("Error updating enquiry:", err);
        });
    } else {
      // Insert new enquiry
      axios
        .post("http://localhost:8020/api/website/enquiry/insert", formData)
        .then((res) => {
          toast.success("Enquiry saved successfully!");
          resetForm();
          getAllenquiry();
        })
        .catch((err) => {
          console.error("Error saving enquiry:", err);
        });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      _id: "",
    });
  };

  const getAllenquiry = () => {
    axios
      .get("http://localhost:8020/api/website/enquiry/view")
      .then((res) => {
        if (res.data.status) {
          setEnquiryList(res.data.enquiryList);
        }
      })
      .catch((err) => {
        console.error("Error fetching enquiries:", err);
      });
  };

  const getvalue = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getAllenquiry();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1 className="text-[40px] text-center py-6 font-bold">User Enquiry</h1>

      <div className="grid grid-cols-[30%_70%] gap-10 px-10">
        <div className="bg-gray-400 p-4 rounded-lg shadow-md">
          <h2 className="text-[20px] font-bold mb-4">Enquiry Form</h2>

          <form onSubmit={saveEnquiry}>
            <div className="py-3">
              <Label htmlFor="name" value="Your Name" />
              <TextInput
                type="text"
                value={formData.name}
                onChange={getvalue}
                name="name"
                placeholder="Enter your Name"
                required
              />
            </div>

            <div className="py-3">
              <Label htmlFor="email" value="Your Email" />
              <TextInput
                type="email"
                value={formData.email}
                onChange={getvalue}
                name="email"
                placeholder="Enter your Email"
                required
              />
            </div>

            <div className="py-3">
              <Label htmlFor="phone" value="Your Phone" />
              <TextInput
                type="tel"
                value={formData.phone}
                onChange={getvalue}
                name="phone"
                placeholder="Enter your Phone"
                required
              />
            </div>

            <div className="py-3">
              <Label htmlFor="message" value="Your Message" />
              <Textarea
                name="message"
                value={formData.message}
                onChange={getvalue}
                placeholder="Message..."
                required
                rows={4}
              />
            </div>

            <div className="py-3">
              <Button type="submit" className="w-full">
                {formData._id ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </div>

        <EnquiryList
          data={enquiryList}
          getAllenquiry={getAllenquiry}
          Swal={Swal}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
