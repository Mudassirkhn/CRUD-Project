import React from "react";
import { Table, Button, Alert } from "flowbite-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
export function EnquiryList({ data, getAllenquiry, Swal , setFormData }) {
  let deleteRow = (delid) => {
    Swal.fire({
      title: "Do you want to delete the Enquiry?",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
          .then((res) => {
            toast.success("Enquiry Deleted Sucessfully");
            getAllenquiry();
          });
      } 
    });
  };

  let editRow=(edited)=>{
    axios.get (`http://localhost:8020/api/website/enquiry/single/${edited}`)
    .then((res)=>{
      let data = res.data
      setFormData(data.enquiry)
    })
  }


  return (
    <div className="bg-gray-400 p-4 rounded-lg shadow-md ">
      <h2 className="text-[20px] font-bold mb-4">Enquiry List</h2>

      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Sr No</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Number</Table.HeadCell>
            <Table.HeadCell>Message</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {data.length >= 1 ? (
              data.map((item, index) => {
                return (
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>{item.phone}</Table.Cell>
                    <Table.Cell>{item.message}</Table.Cell>
                    <Table.Cell>
                      <Button
                        onClick={() => deleteRow(item._id)}
                        className="bg-red-700 text-white rounded-md"
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={()=> editRow(item._id)} className="bg-green-500 text-white rounded-md">
                        Edit
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell
                  colSpan={7}
                  className="text-center py-4 text-gray-500"
                >
                  No enquiries found.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
