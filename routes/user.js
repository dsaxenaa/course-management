import { login, register } from "../controllers/users.js";

import { AuthMiddleware } from "../controllers/authorization.js";
import express from "express"

//declaring the routes for login, register and user authentication 
const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/user-auth', AuthMiddleware,(req,res)=>{
    return res.status(200).send({ok:true})
})

export default router;