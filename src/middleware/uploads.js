const multer = require("multer");
const fs = require("fs");
const { createSlug } = require("../utils/functions");

const fileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = {
      message: "Only image files are allowed!",
    };
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const maxSize = 1 * 1000 * 1000;

exports.uploadImage = (image, type) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const date = new Date();
      const dateNow = `${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}`;
      let path = `public/images/${dateNow}/${type}/`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const slug = createSlug(req.body.judul);
      req.body = {
        ...req.body,
        slug: slug,
      };
      const extention = file.originalname.split(".");
      cb(null, `${slug}.${extention[extention.length - 1]}`);
    },
  });

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(image);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized 1MB",
          });
        }
        return res.status(400).send(err);
      }

      // Mengubah path dengan menghapus "public/"
      if (req.file && req.file.path) {
        req.file.path = req.file.path.replace("public/", "");
      }
      return next();
    });
  };
};
