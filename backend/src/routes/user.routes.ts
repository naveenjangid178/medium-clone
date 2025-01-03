import { Hono } from "hono";
import { registerUser, loginUser } from "../controllers/user.controller";

const router = new Hono();

// Define a POST route for user registration
router.post("/signup", registerUser);
router.get("/signin", loginUser);

export default router;
