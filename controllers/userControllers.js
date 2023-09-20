const { employerModel, userModel, postedJobsModel, jobApplicationsModel } = require("../models/user.models")
const bcryptjs = require("bcryptjs")
const { generateToken, verifyToken } = require("../services/sessions")
const { sendMessage } = require("../utilities/mailer")
const { DateTimeDisplay } = require("../utilities/dateAndTime")
const { cloudinary } = require("../config/cloudinaryConfig")



const registerAsEmployer = async (req, res, next) => {
    let { employerName, email, password } = req.body
    // let date = DateTimeDisplay()
    try {
        const newUser = new employerModel({
            employerName,
            email,
            password,
            timestamp: new Date()
        })
        const result = await newUser.save()
        console.log(result)
        sendMessage(email)
        return res.status(201).send({ message: "Registration Successful", status: true })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const registerAsUser = async (req, res, next) => {
    let { userName, email, password, skills, jobID } = req.body
    let date = DateTimeDisplay()
    try {
        const newUser = new userModel({
            userName,
            email,
            password,
            timestamp: new Date(),
            skills,
            jobID
        })
        const result = await newUser.save()
        console.log(result)
        sendMessage(email)
        return res.status(201).send({ message: "Registration Successful", status: true })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        const user = await userModel.findOne({ email })
        console.log(user)
        if (!user) {
            return res.status(404).send({ message: "User credentials is incorrect", status: false })
        }
        const isMatch = await bcryptjs.compare(password, user.password)
        console.log(isMatch);
        if (!isMatch) {
            return res.status(401).send({ message: "User credentials is incorrect", status: false })
        }
        const token = generateToken(email);
        return res.status(200).send({ message: `Welcome ${user.userName}`, status: true, token })
    } catch (error) {
        next(error)
    }
}

const employerLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        const user = await employerModel.findOne({ email })
        console.log(user)
        if (!user) {
            return res.status(404).send({ message: "You do not have an account with us", status: false })
        }
        const isMatch = await bcryptjs.compare(password, user.password)
        console.log(isMatch);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid password", status: false })
        }
        const token = generateToken(email);
        return res.status(200).send({ message: `Welcome ${user.employerName}`, status: true, token })
    } catch (error) {
        next(error)
    }
}

const updateUserSkill = async (req, res, next) => {
    console.log(req.body);
    try {
        const { skills, email } = req.body;
        console.log(skills, email);
        const update = await userModel.findOneAndUpdate({ email: email }, { $set: { skills: skills } });
        console.log("updated: " + update);
        return res.status(201).send({ message: "Items Updated Successful", status: true })
    } catch (error) {
        next(error)
    }
}


const userDashboard = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const email = verifyToken(token)
        console.log(email)
        const user = await userModel.findOne({ email: email })
        if (!user) return res.status(404).send({ message: "User not found", status: false })
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}

const employerDashboard = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const email = verifyToken(token)
        console.log(email)
        const user = await employerModel.findOne({ email: email })
        if (!user) return res.status(404).send({ message: "User not found", status: false })
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}

const allUsers = async (req, res, next) => {
    try {
        const users = await userModel.find({}, { email: 1, password: 1 })
        console.log(users)
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}

const allEmployer = async (req, res, next) => {
    try {
        const users = await employerModel.find({}, { email: 1, password: 1 })
        console.log(users)
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}

const jobs = async (req, res, next) => {
    const { jobTitle, jobDescription, salaryType, min_salary, max_salary, jobType, requiredSkills, author, email } = req.body;
    // let date = DateTimeDisplay()
    console.log(jobTitle, jobDescription, salaryType, min_salary, max_salary, jobType, requiredSkills, email, author);
    try {
        const newPostedJobs = new postedJobsModel({
            jobTitle,
            email,
            jobDescription,
            timestamp: new Date(),
            salaryType,
            min_salary,
            max_salary,
            jobType,
            requiredSkills,
            author
        })
        const result = await newPostedJobs.save()
        console.log(result)
        return res.status(201).send({ message: "Your Job has been posted Successfully", status: true })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// this controller fetch (get request) all the posted job and send 
// to the frontend whenever it is being requested for
const allJobs = async (req, res, next) => {
    try {
        const jobs = await postedJobsModel.find({})
        console.log(jobs)
        res.status(200).send(jobs)
    } catch (error) {
        next(error)
    }
}

// this controller notifies (post request) the employer each time there 
// is a response regarding its Job post from the job seeker
const employerInbox = async (req, res, next) => {
    console.log(req.body);
    try {
        const { sender, message, _id } = req.body;
        console.log(sender, message, _id);

        const employer = await employerModel.findById({ _id: _id });
        if (!employer) {
            return res.status(404).json({ error: 'Employer not found' });
        }

        // Initialize the inbox field correctly
        employer.inbox = {
            readMsg: [],
            unreadMsg: [],
        };

        // Add the message to the inbox
        employer.inbox.unreadMsg.push({
            sender,
            message,
            timestamp: new Date(),
        });

        // Save the updated employer document
        await employer.save();
        return res.status(201).send({ message: "Application Submitted Successfully", status: true });
    } catch (error) {
        next(error);
    }
}

// this controller saves (post request) the job seeker CV to cloudinary
// and return to the user a link in which the CV can be accessed
const uploadCV = async (req, res, next) => {
    try {
        const { cv } = req.body;
        const result = await cloudinary.uploader.upload(cv)
        const publicId = result.public_id
        const cvUrl = result.secure_url
        return res.status(201).send({ message: "CV uploaded successfully...", url: cvUrl })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// this controller saves (post request) all the submitted job application by 
// the job seeker in a new table
const submitApplication = async (req, res, next) => {
    console.log(req.body);
    try {
        const { firstName, lastName, userEmail, cv_url, jobID } = req.body
        console.log(firstName, lastName, userEmail, cv_url, jobID);

        //creating new submitted application
        const newApplication = new jobApplicationsModel({
            firstName,
            lastName,
            userEmail,
            cv_url,
            timestamp: new Date(),
            jobID
        })

        //saving the submitted application
        const result = await newApplication.save();
        console.log(result);

        return res.status(201).send({ message: "Your Application has been submitted successfully", status: true })

    } catch (error) {
        console.log(error);
        next(error)
    }
}

// this controller checks all the posted jobs and returns all
// jobs posted by a particular employer using the email to find
const employerJobs = async (req, res, next) => {
    try {
        const email = req.params.email;
        console.log(email);
        const jobs = await postedJobsModel.find({email: email});
        res.status(200).send(jobs);
    } catch (error) {
        console.log(error);
        next(error)
    }
}


module.exports = {
    registerAsEmployer, registerAsUser, userLogin,
    employerLogin, updateUserSkill, userDashboard, allUsers, allEmployer,
    employerDashboard, jobs, allJobs, employerInbox, uploadCV, submitApplication,
    employerJobs
}