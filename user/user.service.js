import bcrypt from 'bcrypt';
import { User } from "./user.entity.js";
import { userValidschema ,loginValidationSchema} from "./user.validation.js";
import  jwt  from 'jsonwebtoken';

export const registerUser=async (req,res)=>{
    // get new user from body
    const newUser=req.body;
    console.log(newUser);
   
    // validate user data
   
    try {
        await userValidschema.validateAsync(newUser);
        
    } catch (error){
        return res.status(400).send({message:error.message})
    }

    // check if user with provided email already exist
    const user= await User.findOne({email:newUser.email})

     // if user is already exist throw error
    if(user){
        return res.status(409).send({message:"User with this email is already exist in our system"});
    }

    // password => hash using bcrypt
    const hashedPassword= await bcrypt.hash(newUser.password,8);
    console.log(newUser.password,hashedPassword);
    newUser.password=hashedPassword;

    // create user with hashed password
        await User.create(newUser);

    // send appropriate response
    res.status(200).send({message:"user sucessfully registered"});

}

export const loginUser=async (req,res)=>{
    // extract  email and password from request body 
    const loginCredentials=req.body;
   
    // validate email and password

    try {
        await loginValidationSchema.validateAsync(loginCredentials);
        
    } catch (error){
        return res.status(400).send({message:error.message})
    }

    // if not user, throw error
   const user= await User.findOne({email:loginCredentials.email});
   

     
   if(!user){
    return res.status(404).send({message:"Invalid Credentials"});
   }


  
    // compare password from req body with hashed password in database
   const passwordMatch= await bcrypt.compare(
    loginCredentials.password, // normal password
    user.password  // hashed password
    );
   console.log(passwordMatch);


    // if not password matched  throw error
    if(!passwordMatch){
        return res.status(404).send({message:"Invalid credentials"});
    }


    // generate access token
    const accessToken= jwt.sign({_id: user._id},process.env.JWT_TOKEN,
        {
            expiresIn:"1d"
        });

        // remove password from user object
        user.password=undefined;

    // send appropriate response
    res.status(200).send({
        user,accessToken    
    });


}