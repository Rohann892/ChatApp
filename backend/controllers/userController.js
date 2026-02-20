import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


// register user
export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username already exists try different' });
        }

        // hashing the password 
        const hashPassword = await bcrypt.hash(password, 10);

        // profile photo
        const maleprofilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const femaleprofilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`

        await User.create({
            fullName,
            username,
            password: hashPassword,
            profilePhoto: gender === "male" ? maleprofilePhoto : femaleprofilePhoto,
            gender,
        })
        return res.status(200).json({ message: 'user created successfully', user });
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


// login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        };

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: 'Incorrect username or password',
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect username of password'
            })
        }

        const tokenData = {
            userId: user._id,
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}


// logout

export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: 'Logged out Successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// get other user who are online
export const getOtherUser = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error)
    }
}