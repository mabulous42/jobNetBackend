const userRoutes = require("express").Router()
const { registerAsEmployer, registerAsUser, userLogin, employerLogin, updateUserSkill, 
    userDashboard, allUsers, allEmployer, employerDashboard, allJobs, employerInbox, 
    uploadCV, submitApplication, employerJobs, editJob, postJob } 
    = require("../controllers/userControllers")
const { userValidationSchema, employerValidationSchema } = require("../middlewares/userValidationSchema")
const { validate } = require("../middlewares/validator")


userRoutes.post("/registerAsEmployer", validate(employerValidationSchema), registerAsEmployer)
userRoutes.post("/registerAsUser", validate(userValidationSchema), registerAsUser)
userRoutes.post("/userLogin", userLogin)
userRoutes.post("/employerLogin", employerLogin)
userRoutes.post("/updateUserSkill", updateUserSkill)
userRoutes.get("/userDashboard", userDashboard)
userRoutes.get("/employerDashboard", employerDashboard)
userRoutes.get("/allUsers", allUsers)
userRoutes.get("/allEmployer", allEmployer)
userRoutes.post("/jobs", postJob)
userRoutes.get("/allJobs", allJobs)
userRoutes.post("/employerInbox", employerInbox)
userRoutes.post("/uploadCV", uploadCV)
userRoutes.post("/submitApplication", submitApplication)
userRoutes.get("/employerJobs/:email", employerJobs)
userRoutes.get("/editJob/:id", editJob)

module.exports = userRoutes