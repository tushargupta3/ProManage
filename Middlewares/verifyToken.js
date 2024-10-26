const jwt =require("jsonwebtoken");
const verifyToken = async (req,res,next)=>{
    try{
        const token = req.header["authorization"];
        if(!token){
            return res.status(401).json({message:"No token provided"});
        }
        const decodeToken = jwt.verify(token,process.env.SECRET_CODE);
        req.userId = decodeToken.userId;
        req.email = decodeToken.email;
        req.name = decodeToken.name;

        next();
    }catch (error){
        console.log(error);
        res.status(401).json({message:"Token is not valid"});
    }
};

module.exports = verifyToken;