const enquiryModel = require("../../models/enquiry.models");

let enquiryInsert = (req, res) => {
  let { name, email, phone, message } = req.body;

  let enquiry = new enquiryModel({
    name,
    email,
    phone,
    message,
  });
  enquiry
    .save()
    .then(() => {
      res.send({ status: 1, message: "Enquiry saved sucessfully" });
    })
    .catch((err) => {
      res.send({
        status: 0,
        message: "Error while saving enquiry",
        error: err,
      });
    });
};

let enquiryList = async(req, res) => {
  let enquiry = await enquiryModel.find();
  res.send({ status: 1, enquiryList: enquiry });
};

let enquiryDelete = async(req, res) => {
  let enId = req.params.id;
  let enquiry = await enquiryModel.deleteOne({_id:enId});
  res.send({ status: 1, message: "Enquiry deleted sucessfully", enquiry });
};

let enquirysingleRow = async(req, res) => {
  let enId = req.params.id;
  let enquiry = await enquiryModel.findOne({_id:enId});
  res.send({ status:1, enquiry });
};

let enquiryUpdate = async(req, res) => {
  let enquiryId = req.params.id;

  let { name, email, phone, message } = req.body;
  let UpdateObj ={
    name,
    email,
    phone,
    message,
  };


  let updateRes = await enquiryModel.updateOne({_id:enquiryId}, UpdateObj);
  res.send({ status:1, message: "Enquiry updated successfully", updateRes});
};

module.exports = { enquiryInsert, enquiryList,enquiryDelete ,enquiryUpdate,enquirysingleRow };
