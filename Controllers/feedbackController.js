const feedbacks=require('../Models/feedbackModel')


exports.addFeedback=async(req,res)=>{
    try{
        const {name,email,feedback}=req.body
        const existingFeedback=await feedbacks.findOne({email})
        if(existingFeedback){
            res.status(400).json("Already Added a Feedback!")
        }
        else{
            const newFeedback=new feedbacks({
                name,email,feedback
            })
            await newFeedback.save()
            res.status(200).json(newFeedback)
        }
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}


exports.allFeedbbacks=async(req,res)=>{
    try{
        const feedbacklist=await feedbacks.find()
        res.status(200).json(feedbacklist)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

//ADMIN

exports.deleteFeedback=async(req,res)=>{
    try{
        const {fid}=req.params
        const fd=await feedbacks.findByIdAndDelete(fid)
        res.status(200).json(fd)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}