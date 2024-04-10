const express = require('express')
const router =  new express.Router()
const userController= require('../Controller/usercontroller')
const projectController=require('../Controller/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddlewares')
const multerConfig = require('../Middlewares/multerMiddleware')


//register Api
router.post('/user/register',multerConfig.single('profilePic'),userController.register)

//Login Api
router.post('/user/login',userController.login)

//addprojects
router.post('/projects/add',jwtMiddleware,projectController.addProjects)

//get single user projects
router.get('/user/allprojects',jwtMiddleware,projectController.allUserProjects)

//get all projects
router.get('/user/all',projectController.getallProjects)

// DELETE request to delete a booked detail by ID
router.delete('/projects/remove/:id', jwtMiddleware, projectController.deleteBookedDetail);

//edit userDetails
router.put('/user/edit/:id',multerConfig.single('profilePic'),userController.editUserDetails)  


//get user projects
router.get('/user/allprofile', userController.userDetailsController);






module.exports=router