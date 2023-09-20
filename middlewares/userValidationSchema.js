const yup = require("yup")

const userValidationSchema = yup.object().shape({
    userName: yup
                .string("Username must be a string")
                .min(2, "Username is too short")
                .max(50, "Username is too long")
                .required("Username is required")
                .matches(/^[a-zA-Z0-9]+$/, "User Name should not contain special characters"),
    email: yup
            .string("Email must be a string")
            .email("Email is required"),
    password: yup
                .string("Password must be a string")
                .min(8, "Password is too short")
                .max(50, "Password is too short")
                .required("Password is required")
                .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/, "Password should contain at least an Upper case, number and a special character"),
})

const employerValidationSchema = yup.object().shape({
    employerName: yup
                .string("Username must be a string")
                .min(2, "Username is too short")
                .max(50, "Username is too long")
                .required("Username is required")
                .matches(/^[a-zA-Z0-9]+$/, "Employer Name should not contain special characters"),
    email: yup
            .string("Email must be a string")
            .email("Email is required"),
    password: yup
                .string("Password must be a string")
                .min(8, "Password is too short")
                .max(50, "Password is too short")
                .required("Password is required")
                .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/, "Password should contain at least an Upper case, number and a special character"),
})

module.exports = {userValidationSchema, employerValidationSchema}