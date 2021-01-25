if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
console.log(process.env.SECRET);
const express = require("express");
const path = require("path");
const joi = require("joi");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const catchAsync = require("./utilities/catchAsync");
const ExpressError = require("./utilities/expressError");
const Event = require("./models/event");
const eventRoutes = require("./routes/events");
const session = require("express-session");
const User = require("./models/user");
const Comment = require("./models/comments");
const { eventSchema, commentSchema } = require("./schemas.js");
const userRoutes = require("./routes/user");
const communityRoutes = require("./routes/community");
const passport = require("passport");
const commentRoutes = require("./routes/comments");
const multer = require("multer");
const parser = require("body-parser");
const LocalStrategy = require("passport-local");
const mongoosePaginate = require("mongoose-paginate");
const MongoDBStore = require("connect-mongo")(session);

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/BUSCKR";

mongoose.connect("mongodb://localhost:27017/busckr", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(parser.urlencoded({ extended: false }));

const secret = process.env.SECRET || "thisworks";

const store = new MongoDBStore({
	url: dbUrl,
	secret,
	touchAfter: 24 * 60 * 60,
});
store.on("error", function (e) {
	console.log("session store error");
});

const sessionConfig = {
	secret,
	store,
	resave: false,
	saveUninitialized: true,
	cookie: {
		store,
		name: "session",
		httpOnly: true.valueOf,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
		httpOnly: true,
	},
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;

	next();
});
app.use("/", userRoutes);
app.use("/events", eventRoutes);
app.use("/events/:id/comments", commentRoutes);
app.use("/", communityRoutes);
app.use("/community", communityRoutes);

app.post(
	"/",
	catchAsync(async (req, res, next) => {
		const d = req.params.date;
		const data = await Event.find({ date: d });
		req.query = d;
		console.log("THERE IS NO DATA");
		res.render(`./events/eventByDate`, { data });
		res.redirect(`/eventByDate/:date`);
	})
);

app.post(
	"/eventByDate",
	catchAsync(async (req, res, next) => {
		const d = req.body.date;
		const data = await Event.find({ date: d });

		res.render(`./events/eventByDate`, { data });
		res.redirect(`/eventByDate/${d}`);
	})
);
app.get("/", (req, res) => {
	res.render("home");
});

/////
app.all("*", (req, res, next) => {
	next(new ExpressError("page not found", 404));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "Turn Back!";
	res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
	console.log("serving on port 3000");
});
