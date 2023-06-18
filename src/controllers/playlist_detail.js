var Joi = require("joi");
var {
  Playlist,
  PlaylistDetail,
} = require("../../models");
const { Op } = require("sequelize");
const { createSlug, unlinkImages } = require("../utils/functions");
const fs = require("node:fs");
const path = require("node:path");
const moment = require("moment");

exports.getPlaylistDetailBySlug = async (req, res) => {
  try {
    const fields = ["judul"];
    const { slug } = req.params;

    const playlist = await Playlist.findOne({
      where: {
        slug,
      },
    });

    if (!playlist) {
      return res.status(404).send({
        status: "error",
        message: "Playlist not found",
      });
    }

    let {
      page = 1,
      page_size = 10,
      search = "",
      sort_by = "created_at",
      sort_direction = "ASC",
      status,
    } = req.query;

    page_size = parseInt(page_size);
    page = parseInt(page);

    const offset = (page - 1) * page_size;

    const where = {
      [Op.or]: fields.map((field) => {
        return {
          [field]: { [Op.like]: `%${search}%` },
          id_playlist: playlist.id,
          status,
        };
      }),
    };

    const playlistDetail = await PlaylistDetail.findAndCountAll({
      where,
      order: [[sort_by, sort_direction]],
      limit: page_size,
      offset,
      include: [
        {
          model: Playlist,
          as: "playlist",
          attributes: {
            exclude: ["updated_at"],
          },
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "judul", "short_desc", "youtuber"],
            },
          ],
        },
      ],
    });

    const total_count = await PlaylistDetail.count({
      where,
    });
    const total_page = Math.ceil(total_count / page_size);
    const current_page = parseInt(page, 10);
    const from = offset + 1;
    const to = offset + playlistDetail.rows.length;

    const detPlaylist = await Playlist.findOne({
      where: {
        slug,
      },
      attributes: ["id", "judul", "youtuber", "short_desc"],
    });

    res.json({
      data: {
        detail: playlistDetail.rows,
        playlist: detPlaylist,
      },
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
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server Error",
    });
  }
};