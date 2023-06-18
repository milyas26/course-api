var express = require("express");
var router = express.Router();
const PlaylistRouter = require("./playlist");
const PlaylistDetailRouter = require("./playlist_detail");

// exports all
router.use("/", PlaylistRouter);
router.use("/", PlaylistDetailRouter);

module.exports = router;
