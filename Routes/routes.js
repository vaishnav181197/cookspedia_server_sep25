const recipeController=require('../Controllers/recipeController')
const userController=require('../Controllers/userController')
const downloadController=require('../Controllers/downloadController')
const savedRecipeController=require('../Controllers/savedRecipeController')
const feedbackController=require('../Controllers/feedbackController')

const jwtmiddle=require('../Middlewares/jwtMiddleware')
const adminjwtmiddle=require('../Middlewares/adminJwtMiddleware')

const express=require('express')

const router=express.Router()


// Authentication
router.post('/signup',userController.userSignUp)
router.post('/signin',userController.signIn)

//Feedbacks
router.post('/addfeedback',feedbackController.addFeedback)
router.get('/getfeedbacks',feedbackController.allFeedbbacks)
//USER
router.patch('/profile-update',jwtmiddle,userController.profileUpdate)
//recipes
router.get('/all-recipes',recipeController.getAllRecipes)
router.get('/get-recipe/:id',jwtmiddle,recipeController.getRecipeById)
//downloads
router.post('/add-download/:rid',jwtmiddle,downloadController.addRecipeDownload)
router.get('/get-downloads',jwtmiddle,downloadController.getDownloadedRecipes)
//saved recipes
router.post('/save-recipe/:rid',jwtmiddle,savedRecipeController.addSavedRecipe)
router.get('/get-savedrecipe',jwtmiddle,savedRecipeController.getSavedRecipes)
router.delete('/delete-savedrecipe/:srid',jwtmiddle,savedRecipeController.deleteSavedRecipe)

//ADMIN
router.post('/admin/addrecipe',adminjwtmiddle,recipeController.addRecipe)
router.put('/admin/update-recipe/:rid',adminjwtmiddle,recipeController.editRecipe)
router.delete('/admin/delete-recipe/:rid',adminjwtmiddle,recipeController.deleteRecipe)

router.get('/admin/allrecipes',adminjwtmiddle,recipeController.getAllRecipes)

router.get('/admin/allfeedbacks',adminjwtmiddle,feedbackController.allFeedbbacks)
router.delete('/admin/deletefeedback/:fid',adminjwtmiddle,feedbackController.deleteFeedback)

router.get('/admin/users',adminjwtmiddle,userController.allUsers)




module.exports=router