var express = require("express");
var router = express.Router();
var playlistRouter = require("../controllers/playlist");
const { uploadImage } = require("../middleware/uploads");

router.get("/playlists", playlistRouter.getAllPlaylist);

// contoh penggunaan multer
// router.post("/playlists", [uploadImage('cover_image', 'novel')], playlistRouter.createPlaylist);

module.exports = router;