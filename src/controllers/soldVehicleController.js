const Car = require("../models/carModel")
const DealershipSchema = require("../models/dealershipModel")
const User = require("../models/userModel")
const  SoldVehicles   =require("../models/soldVehicleSchema")


exports.soldCarUser = async (req,res)=>{
  try{

    const {car_id ,user_id} =req.body
    if(!car_id)return res.status(400).send({message:'car_id is required'})
    if(!user_id)return res.status(400).send({message:'user_id is required'})

    const checkCar = await Car.findById(car_id)
    if(!checkCar)return res.status(400).send({message:'carId not valid'})
    const checkUser = await User.findById(user_id)
    if(!checkUser)return res.status(400).send({message:' user id not valid'})

   const SoldVehicleId = await SoldVehicles.save(car_id , user_id )
   const addCar = await User.updateUserVehicles(user_id)


  res.status(400).send({"message": "Deal created successfully" ,SoldVehicleId })


  }catch(error){
    return res.status(500).send({message :error.message})
  }
}
