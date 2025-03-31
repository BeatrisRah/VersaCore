import jwt from "jsonwebtoken";


export const isAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json('Not authorized!')
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET); 
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or Expired Token' });
    }
};