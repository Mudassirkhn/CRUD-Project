let express = require('express');
const  {enquiryInsert,enquiryList, enquiryDelete, enquirysingleRow,enquiryUpdate} = require('../../controlllers/web/enquiryController');
let enquiryRouter = express.Router();

enquiryRouter.post("/insert",enquiryInsert)

enquiryRouter.get('/view', enquiryList)

enquiryRouter.delete("/delete/:id", enquiryDelete)

enquiryRouter.get("/single/:id", enquirysingleRow)

enquiryRouter.put("/update/:id", enquiryUpdate)

module.exports = enquiryRouter;