const Deal = require("../models/dealSchema")
const Car = require("../models/carModel")
const DealershipSchema = require("../models/dealershipModel")

exports.dealOnCar = async (req ,res)=>{
  try{
    const {car_id ,dealership_id ,deal_info } = req.body
    if(!car_id)return res.status(400).send({message:'car_id is required'})
    if(!dealership_id)return res.status(400).send({message:'dealership_id is required'})

    const checkDealership = await DealershipSchema.findById(dealership_id)
    if(!checkDealership)return res.status(400).send({message:'dealership_id not valid'})

    const checkCar = await Car.findById(car_id)
    if(!checkCar)return res.status(400).send({message:'carId not valid'})

    const obj = {
      car_id :car_id,
      dealership_id :car_id,
      deal_info :[deal_info]
    }
   let data = await  Deal.save(obj)
 let dealAdd =  await DealershipSchema.addDealToDealership(dealership_id,car_id , data)
   console.log(dealAdd)
   res.status(201).send({"message": "Deal created successfully",data})
    
  }catch(error){
    return res.status(500).send({message :error.message})
  }
}

