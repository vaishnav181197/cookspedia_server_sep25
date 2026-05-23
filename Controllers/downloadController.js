const downloads=require('../Models/downloadModel')




exports.addRecipeDownload=async(req,res)=>{
    try{
        const {rid}=req.params
        const {recipeName,recipeCuisine,recipeImage}=req.body
        const userId=req.payload

        const existingDowload=await downloads.findOne({userId,recipeId:rid})
        if(existingDowload){
            existingDowload.count+=1
            await existingDowload.save()
            res.status(200).json(existingDowload)
        }
        else{
            const newDowload=new downloads({
                recipeId:rid,recipeName,recipeCuisine,recipeImage,userId,count:1
            })
            await newDowload.save()
            res.status(200).json(newDowload)
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.getDownloadedRecipes=async(req,res)=>{
    try{
        const userId=req.payload
        const downloadedList=await downloads.find({userId})
        res.status(200).json(downloadedList)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}