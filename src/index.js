const express = require("express")
const dotenv = require("dotenv")
const {connectDb} = require("./helpers/database")
const authRoutes = require('./routes/authRoutes');
const carRoute = require("./routes/carRoutes")
const userRoute = require("./routes/userRoutes")
const dealershipRoute = require("./routes/dealershipRoutes")
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/user" , userRoute)
app.use("/api/car" , carRoute)
app.use("/api/dealership" , dealershipRoute)


connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });