import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

/* ************************************************************************* */
// Define auth-related routes
import { checkAuthDatas } from "./middlewares/checkAuthDatas";
import { checkRegister } from "./middlewares/checkRegister";
import authActions from "./modules/auth/authActions";

router.post("/api/auth/login", checkAuthDatas, authActions.login);
router.get("/api/auth/find/:id", authActions.findCurrentUser);
router.post("/api/auth/logout", authActions.logout);
router.post("/api/auth/register", checkRegister, authActions.register);

/* ************************************************************************* */

// Define profiles-related routes
import { checkUserDatas } from "./middlewares/checkUserDatas";
import userActions from "./modules/user/userActions";

router.get("/api/users", userActions.browse);
router.get("/api/user/:id", userActions.read);
router.put("/api/user/:id", checkUserDatas, userActions.update);
router.get("/api/user/:id/edit", userActions.readUserInfos);
router.delete("/api/user/:id", userActions.destroy);

import userPostAction from "./modules/user/userPost/userPostAction";

router.get("/api/user/:id/posts", userPostAction.browse);

import userEventActions from "./modules/user/userEvent/userEventActions";

router.get("/api/user/:id/events", userEventActions.browse);

/* ************************************************************************* */

// Define posts-related routes
import { validatePost } from "./middlewares/checkPostDatas";
import postActions from "./modules/post/postActions";

router.get("/api/posts", postActions.browse);
router.get("/api/post/:id", postActions.read);
router.post("/api/posts", validatePost, postActions.add);
router.put("/api/posts/:id", validatePost, postActions.edit);
router.delete("/api/posts/:id", postActions.destroy);

import postCommentsActions from "./modules/post/postComment/postCommentsActions";

router.get("/api/posts/:id/comments", postCommentsActions.browse);
router.post(
  "/api/posts/:id/comments",
  validateComment,
  postCommentsActions.add,
);
router.put(
  "/api/posts/comments/:id",
  validateComment,
  postCommentsActions.edit,
);
router.delete("/api/posts/comments/:id", postCommentsActions.destroy);

import postLikesActions from "./modules/post/postLike/postLikesActions";

router.post("/api/users/posts-likes", postLikesActions.readLikesByUserId);
router.post("/api/posts/:id/likes", postLikesActions.add);
router.delete("/api/posts/:id/likes", postLikesActions.destroy);

/* ************************************************************************* */

// Define events-related routes
import { validateEvent } from "./middlewares/checkEventDatas";
import eventActions from "./modules/event/eventActions";

router.get("/api/events", eventActions.browse);
router.get("/api/events/:id", eventActions.read);
router.put("/api/events/:id", validateEvent, eventActions.edit);
router.post("/api/events", validateEvent, eventActions.add);
router.delete("/api/events/:id", eventActions.destroy);

import { validateComment } from "./middlewares/checkCommentDatas";
import eventCommentActions from "./modules/event/eventComment/eventCommentActions";

router.post(
  "/api/events/:id/comments",
  validateComment,
  eventCommentActions.add,
);
router.get("/api/events/:id/comments", eventCommentActions.browse);
router.put(
  "/api/events/comments/:id",
  validateComment,
  eventCommentActions.edit,
);
router.delete("/api/events/comments/:id", eventCommentActions.destroy);

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

/* ************************************************************************* */

// Define categories-related routes
import categoryActions from "./modules/category/categoryActions";

router.get("/api/categories/posts", categoryActions.readByTypePost);
router.get("/api/categories/events", categoryActions.readByTypeEvent);
router.get("/api/categories/:id", categoryActions.readById);
router.put("/api/categories/:id", categoryActions.edit);
router.post("/api/categories", categoryActions.add);
router.delete("/api/categories/:id", categoryActions.destroy);

/* ************************************************************************* */

// Define uploads-related routes
import {
  adjustAvatarPath,
  adjustPicturePath,
  uploadImage,
} from "./middlewares/multerUpload.";
import { verifyUser } from "./middlewares/verifyUser";
import uploadActions from "./modules/upload/uploadActions";

router.post(
  "/api/uploads/avatars",
  verifyUser,
  uploadImage.single("avatar"),
  adjustAvatarPath,
  uploadActions.uploadAvatar,
);
router.post(
  "/api/uploads/pictures/:id",
  verifyUser,
  uploadImage.single("picture"),
  adjustPicturePath,
  uploadActions.uploadPicture,
);

export default router;
