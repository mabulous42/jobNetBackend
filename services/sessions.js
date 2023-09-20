const jsonwebtoken = require("jsonwebtoken");

const SECRET = "testRam"

const generateToken = (email) => {
    try {
        let token = jsonwebtoken.sign({email},  SECRET, {expiresIn: "30m"})
        return token;
    } catch (error) {
        console.log(error);
        throw {
            name: "AuthenticationError",
            message: "Error generating token",
            error
        }
    }
}

const verifyToken = (token) => {
    try {
        if (!token) throw {name: "AuthenticationError", message:"Invalid token"}
        const decoded = jsonwebtoken.verify(token, SECRET)
        console.log(decoded);
        let email = decoded.email
        return email;
    } catch (error) {
        console.log(error);
        throw {
            name: "AuthenticationError",
            message: `Error verifying token`,
            error: error
        }
    }
}

module.exports = {generateToken, verifyToken}

