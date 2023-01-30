const express=require("express");
const router=express.Router();
//controller
const userController=require("../controllers/usercontroller");
const authController=require("../controllers/authController");

//authroutes
router.route("/signup").post(authController.signup);


router.route("/").post(userController.createUser)
router.route("/:id").get(userController.getUser)

module.exports=router;