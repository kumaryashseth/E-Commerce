import { hashedPassword } from "../helpers/authHelpers.js";
import userModel from "../models/userModel.js";

const registerController = async (req, res) => {
    try {
        const { name, password, email } = req.body;

        if (!name) {
            return res.send("Enter the Name");
        }
        if (!password) {
            return res.send("Enter the Password");
        }
        if (!email) {
            return res.send("Enter the Email");
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.send("Already Registered User");
        }

        const hashedPass = await hashedPassword(password);

        const registerUser = await userModel.create({
            name,
            email,
            password: hashedPass
        });

        return res.send("Register Success");

    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong");
    }
};

export default registerController;