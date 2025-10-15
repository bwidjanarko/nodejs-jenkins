import express from "express";
import dotenv from "dotenv";
import jsonwt from "jsonwebtoken";
const app = express();

// Set up Global configuration access
dotenv.config();

let PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});

// Main Code Here //
// Generating JWT
app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token

    var jwtSecretKey = process.env.JWT_SECRET_KEY;
    console.log("jwtSecretKey:"+jwtSecretKey);
    var data = {
        time: Date(),
        userId: 12,
    }

    var token = jsonwt.sign({ data: 'foobar'}, jwtSecretKey, { expiresIn: 5 * 60 });
    res.send(token);
});

// Verification of JWT
app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.

    var tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    console.log("tokenHeaderKey:"+tokenHeaderKey);
    var jwtSecretKey = process.env.JWT_SECRET_KEY;
    console.log("jwtSecretKey:"+jwtSecretKey);

    try {
        //const token = req.header(tokenHeaderKey);

        const verified = jsonwt.verify(tokenHeaderKey, jwtSecretKey);
        console.log(verified);
        if (verified) {
            console.log("Successfully Verified");
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            console.log("Request Denied");
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        console.log("Error");
        return res.status(401).send(error);
    }
});
