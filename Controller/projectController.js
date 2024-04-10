const Projects = require('../Models/projectSchema');

exports.addProjects = (req, res) => {
    console.log("Inside Add project function");
    const userId = req.payload;
    const { theaterId, theaterName, movieName, bookedSeats, theaterTime, date } = req.body;
    
    // Create a new project instance with the received data
    const newProject = new Projects({
        theaterId,
        theaterName,
        movieName,
        bookedSeats,
        theaterTime,
        date,
        userId
    });

    // Save the new project to the database
    newProject.save()
        .then(savedProject => {
            console.log("New project saved:", savedProject);
            res.status(200).json(savedProject); // Send the saved project as response
        })
        .catch(error => {
            console.error("Error saving project:", error);
            res.status(500).json({ error: "Error saving project" });
        });
};


//get single user projects
exports.allUserProjects=async(req,res)=>{
    const userId=req.payload
    try{
        const userProjects = await Projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

//get all projects
exports.getallProjects=async(req,res)=>{
    try{
        const allProjects=await Projects.find()
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}


// DeleteBookedseats controller
exports.deleteBookedDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const removedDetail = await Projects.findByIdAndDelete(id);
        if (!removedDetail) {
            return res.status(404).json({ error: "Booking detail not found" });
        }
        res.status(200).json({ message: "Booking detail deleted successfully" });
    } catch (error) {
        console.error("Error deleting booking detail:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

