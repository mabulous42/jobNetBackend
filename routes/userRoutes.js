const userRoutes = require("express").Router()
const { registerAsEmployer, registerAsUser, userLogin, employerLogin, updateUserSkill, 
    userDashboard, allUsers, allEmployer, employerDashboard, jobs, allJobs, employerInbox, uploadCV, submitApplication, employerJobs } = require("../controllers/userControllers")
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
userRoutes.post("/jobs", jobs)
userRoutes.get("/allJobs", allJobs)
userRoutes.post("/employerInbox", employerInbox)
userRoutes.post("/uploadCV", uploadCV)
userRoutes.post("/submitApplication", submitApplication)
userRoutes.get("/employerJobs/:email", employerJobs)

module.exports = userRoutes