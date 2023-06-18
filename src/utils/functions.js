const fs = require("node:fs");
const path = require("node:path");

exports.createSlug = (title) => {
  // create random string like sXQcUpK
  const randomString = Math.random().toString(36).substring(2, 8);
  const slug = title
    .toLowerCase() // convert to lowercase
    .replace(/[^\w\s]/gi, "") // remove punctuation
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .trim(); // remove leading/trailing white space

  return `${slug}-${randomString}`;
};

exports.unlinkImages = (image, type = 'new') => {
  if (image) {
    fs.unlink(path.join(type == 'new' ? image.path : `public/${image}`), (err) => {
      if (err) throw err;
    });
  }
};
