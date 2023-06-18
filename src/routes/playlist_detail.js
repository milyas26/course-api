var express = require("express");
var router = express.Router();
var playlistDetailRouter = require("../controllers/playlist_detail");
const { uploadImage } = require("../middleware/uploads");

router.get("/playlists/:slug/details", playlistDetailRouter.getPlaylistDetailBySlug);

module.exports = router;