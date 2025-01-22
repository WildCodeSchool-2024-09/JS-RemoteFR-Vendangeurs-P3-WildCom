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
// Define auth-related routes
import authActions from "./modules/auth/authActions";

router.post("/api/auth/login", authActions.login);

/* ************************************************************************* */

// Define profiles-related routes
import userActions from "./modules/user/userActions";
import userPostAction from "./modules/user/userPost/userPostAction";

router.get("/api/user/:id", userActions.read);
router.get("/api/user/:id/posts", userPostAction.browse);

/* ************************************************************************* */

// Define posts-related routes
import postActions from "./modules/post/postActions";
import postCommentsActions from "./modules/post/postComment/postCommentsActions";

router.get("/api/posts", postActions.browse);

router.get("/api/posts/:id/comments", postCommentsActions.browse);

/* ************************************************************************* */

// Define events-related routes
import eventActions from "./modules/event/eventActions";
import eventCommentActions from "./modules/event/eventComment/eventCommentActions";

router.get("/api/events", eventActions.browse);
router.put("/api/events/:id", eventActions.edit);
router.post("/api/events", eventActions.add);
router.delete("/api/events/:id", eventActions.destroy);

router.get("/api/events/:id/comments", eventCommentActions.browse);

export default router;
