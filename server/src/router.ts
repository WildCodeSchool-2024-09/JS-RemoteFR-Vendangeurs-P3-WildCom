import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

// Define posts-related routes
import postActions from "./modules/post/postActions";

router.get("/api/posts", postActions.browse);

/* ************************************************************************* */

// Define events-related routes
import eventActions from "./modules/event/eventActions";

router.get("/api/events", eventActions.browse);
router.put("/api/events/:id", eventActions.edit);
router.post("/api/events", eventActions.add);
router.delete("/api/events/:id", eventActions.destroy);

export default router;
