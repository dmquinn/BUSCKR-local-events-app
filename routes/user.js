const express = require("express");
const router = express.Router();
const { isLoggedIn, isAuthor, validateEvent } = require("../middleware");
const { storage } = require("../cloudinary");
const User = require("../models/user");
const catchAsync = require("../utilities/catchAsync");
const multer = require("multer");
const upload = multer({ storage });

const passport = require("passport");

router.get("/register", (req, res) => {
	res.render("users/register");
});

router.post(
	"/register",
	upload.single("image"),
	catchAsync(async (req, res, next) => {
		try {
			const { email, username, password } = req.body;
			const user = new User({ email, username });
			user.images.url = req.file.path;
			console.log("user Image", req.file.path);
			const registeredUser = await User.register(user, password);
			req.login(registeredUser, (err) => {
				if (err) return next(err);
			});
			res.redirect("/");
		} catch (e) {
			res.redirect("/register");
		}
	})
);
router.get("/login", (req, res) => {
	res.render("users/login");
});
router.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/login",
	}),
	(req, res) => {
		const redirectUrl = req.session.returnTo || "/events";
		delete req.session.returnTo;
		res.redirect("/");
	}
);

router.post(
	"/addInfo/:id",
	isLoggedIn,
	// validateComment,
	catchAsync(async (req, res) => {
		const user = await User.findById(req.params.id);
		const soundcloudLinks = [];
		user.description = req.body.description;
		user.soundcloudLink = req.body.soundcloudLink;
		await soundcloudLinks.push[user.soundcloudLink];
		console.log(soundcloudLinks);

		await user.save();
		res.redirect(`/community/${user._id}`);
	})
);
router.get("/addInfo/:id", (req, res) => {
	const id = req.params.id;
	res.render("users/addInfo", { id });
});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});
module.exports = router;
