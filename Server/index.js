let enquiryRouter = require('./App/routes/web/enquiryRoutes');
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
require('dotenv').config();
let app = express();
app.use(cors())


app.use(express.json());

// Routes
app.use('/api/website/enquiry',enquiryRouter);




// Connect to MongoDB
// mongoose.connect(process.env.DBURL).then(() =>{
//     console.log('Connected to MongoDB');
//     app.listen(process.env.PORT || 3000, () => {
//         console.log(`Server is running on port ${process.env.PORT}`);
//     });
// }). catch((err) => { console.log(err) });


mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        
        app.listen(process.env.PORT|| 4000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => { 
        console.log('Database connection error:', err); 
    });



