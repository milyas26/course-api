var Joi = require("joi");
var {
  Playlist
} = require("../../models");
const { Op } = require("sequelize");
const { unlinkImages, createSlug } = require("../utils/functions");
const moment = require("moment");

// GET ALL playlist
exports.getAllPlaylist = async (req, res, next) => {
  try {
    const fields = ["judul", "youtuber", "short_desc"];

    let {
      page = 1,
      page_size = 10,
      search = "",
      sort_by = "created_at",
      sort_direction = "DESC",
    } = req.query;

    page_size = parseInt(page_size);
    page = parseInt(page);

    const offset = (page - 1) * page_size;

    const where = {
      [Op.or]: fields.map((field) => {
        return {
          [field]: { [Op.like]: `%${search}%` },
        };
      }),
    };

    const playlist = await Playlist.findAndCountAll({
      where,
      offset,
      limit: page_size,
      order: [[sort_by, sort_direction]],
    });

    const total_count = await Playlist.count({
      where,
    });
    const total_page = Math.ceil(total_count / page_size);
    const current_page = parseInt(page, 10);
    const from = offset + 1;
    const to = offset + playlist.rows.length;

    res.json({
      data: playlist.rows,
      pagination: {
        page,
        page_size,
        current_page,
        total_page,
        total_count,
        sort_by,
        sort_direction,
        from,
        to,
      },
    });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};