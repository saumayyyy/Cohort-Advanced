const {User,Profile} = require("../database/db");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const signupBody = z.object({
    email: z.string().email(),
	name: z.string(),
	password: z.string().min(6),
    phone:z.string(),
    confirmPassword:z.string(),
});


async function signup(req,res){
    try {
        const body = req.body;
        const {success} = signupBody.safeParse(body);
        if(!success){
            return res.status(403).json({
                msg:"Invalid Input Format",
            });
        }
        if(body.password !== body.confirmPassword){
            return res.status(403).json({
                msg:"passwords do not match",
            });
        }

        const ExistingUser =await User.findOne({email:body.email});
        if(ExistingUser){
            return res.status(403).json({
                msg:"User already exists",
            });
        }
        const saltRounds = 10;
        //hash password
        const hashedPassword =await bcrypt.hash(body.password,saltRounds);

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:body.phone
        });

        const user = await User.create({
            name:body.name,
            email:body.email,
            password:hashedPassword,
            phone:body.phone,
            role:body.role,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${body.name}`,
        })
        return res.status(200).json({
            msg:"User created successfully",
            user
        })
        

    } catch (e) {
        console.log(e);
        return res.status(403).json({
            msg:"Some error occured",
        });
    }
}

async function login(req, res){
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        })
      }
      const user = await User.findOne({ email }).populate("additionalDetails")
      if (!user) {
        return res.status(401).json({
          success: false,
          message: `User is not Registered with Us Please SignUp to Continue`,
        })
      }
  
      // Generate JWT token and Compare Password
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
            { email: user.email, id: user._id, role:user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );
        // Save token to user document in database
        user.token = token;
        user.password = undefined;
        // Set cookie for token and return success response
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: `User Login Success`,
        });
    } else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        })
      }
    } catch (error) {
      // console.error(error)
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      })
    }
  }

  module.exports = {signup,login};