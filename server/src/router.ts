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
import { checkAuthDatas } from "./middlewares/checkAuthDatas";
import authActions from "./modules/auth/authActions";

router.post("/api/auth/login", checkAuthDatas, authActions.login);
router.get("/api/auth/find/:id", authActions.findCurrentUser);
router.post("/api/auth/logout", authActions.logout);

/* ************************************************************************* */

// Define profiles-related routes
import userActions from "./modules/user/userActions";
import userPostAction from "./modules/user/userPost/userPostAction";

router.get("/api/user/:id", userActions.read);
router.get("/api/user/:id/posts", userPostAction.browse);
router.put("/api/user/:id", userActions.update);

/* ************************************************************************* */

// Define posts-related routes
import postActions from "./modules/post/postActions";
import postCommentsActions from "./modules/post/postComment/postCommentsActions";

router.get("/api/posts", postActions.browse);
router.post("/api/posts", postActions.add);

router.get("/api/posts/:id/comments", postCommentsActions.browse);
router.post("/api/posts/:id/comments", postCommentsActions.add);
router.delete("/api/posts/:id", postActions.destroy);

import postLikesActions from "./modules/post/postLike/postLikesActions";
router.post("/api/users/posts-likes", postLikesActions.readLikesByUserId);
router.post("/api/posts/:id/likes", postLikesActions.add);
router.delete("/api/posts/:id/likes", postLikesActions.destroy);

/* ************************************************************************* */

// Define events-related routes
import eventActions from "./modules/event/eventActions";

router.get("/api/events", eventActions.browse);
router.put("/api/events/:id", eventActions.edit);
router.post("/api/events", eventActions.add);
router.post("/api/events/:id/comments", eventCommentActions.add);
router.delete("/api/events/:id", eventActions.destroy);

import eventCommentActions from "./modules/event/eventComment/eventCommentActions";
router.get("/api/events/:id/comments", eventCommentActions.browse);
router.put("/api/events/comments/:id", eventCommentActions.edit);

import eventParticipationActions from "./modules/event/eventParticipation/eventParticipationActions";
router.post(
  "/api/users/events-participations",
  eventParticipationActions.readParticipationsByUserId,
);
router.post("/api/events/:id/participations", eventParticipationActions.add);
router.delete(
  "/api/events/:id/participations",
  eventParticipationActions.destroy,
);

export default router;
