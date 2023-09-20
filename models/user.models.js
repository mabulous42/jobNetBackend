const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")

// Employer Schema
const employerSchema = new mongoose.Schema({
    employerName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    timestamp: { type: String, required: true },
    inbox: {
        readMsg: [
            {
                sender: { type: String }, // Sender's name or ID
                message: { type: String },
                timestamp: Date,
            }
        ],
        unreadMsg: [
            {
                sender: { type: String }, // Sender's name or ID
                message: { type: String },
                timestamp: Date,
            }
        ]
    }
})


// User schema
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    timestamp: { type: String, required: true },
    skills: { type: [] }
})

// Employer password encrypt
let saltRound = 10
employerSchema.pre("save", function (next) {
    if (this.password != undefined) {
        bcryptjs.hash(this.password, saltRound).then((hashed) => {
            this.password = hashed
            next()
        }).catch((error) => {
            console.log(error, 33);
        })
    }
})

// User password encrypt
userSchema.pre("save", function (next) {
    if (this.password != undefined) {
        bcryptjs.hash(this.password, saltRound).then((hashed) => {
            this.password = hashed
            next()
        }).catch((error) => {
            console.log(error, 33);
        })
    }
})

// Employer Posted Jobs Schema
const postedJobsSchema = new mongoose.Schema({
    jobTitle: { type: String },
    email: { type: String },
    jobDescription: { type: String },
    timestamp: { type: String },
    salaryType: { type: String },
    min_salary: { type: Number, trim: true },
    max_salary: { type: Number, trim: true },
    jobType: { type: String },
    requiredSkills: { type: [] },
    author: { type: String }
})

// Submitted Application for Job Schema
const jobApplicationsSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    userEmail: { type: String, unique: true },
    cv_url: { type: String },
    timestamp: { type: String },
    jobID: {type: String}
})

const employerModel = mongoose.models.employer_tbs || mongoose.model("employer_tbs", employerSchema)//creating an employer table with an instance of the schema

const userModel = mongoose.models.user_tbs || mongoose.model("user_tbs", userSchema)//creating a user table with an instance of the schema

const postedJobsModel = mongoose.models.jobs_tbs || mongoose.model("postedjobs_tbs", postedJobsSchema)//creating a Posted Jobs table with an instance of the schema

const jobApplicationsModel = mongoose.models.submittedApplication_tbs || mongoose.model("jobApplication_tbs", jobApplicationsSchema)//creating a submitted application table with an instance of the schema


module.exports = { userModel, employerModel, postedJobsModel, jobApplicationsModel }