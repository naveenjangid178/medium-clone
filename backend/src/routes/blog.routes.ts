import { Hono } from "hono";
import { blog, getBlog, updateBlog } from "../controllers/blog.controller";

const router = new Hono();

router.post("/", blog)
router.put("/blog", updateBlog)
router.post("/blog/:id", getBlog)

export default router;