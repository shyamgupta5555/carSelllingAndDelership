const express = require("express")
const dotenv = require("dotenv")
const {connectDb} = require("./helpers/database")
const carRoute = require("./routes/carRoutes")
const userRoute = require("./routes/userRoutes")
const dealershipRoute = require("./routes/dealershipRoutes")
const dealRoutes = require("./routes/dealRoutes")
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/user" , userRoute)
app.use("/api/car" , carRoute)
app.use("/api/dealership" , dealershipRoute)
app.use("/api/deal" , dealRoutes)



connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });