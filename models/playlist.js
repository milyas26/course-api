"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // create default value for id using uuidv4
    static async create(data) {
      data.id = uuidv4();
      return await super.create(data);
    }

  }
  Playlist.init(
    {
      id:{
        type: DataTypes.UUID,
        primaryKey:true
      },
      judul: DataTypes.STRING,
      slug: DataTypes.STRING,
      youtuber: DataTypes.STRING,
      short_desc: DataTypes.TEXT,
      cover_image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Playlist",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Playlist;
};
