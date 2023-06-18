'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class PlaylistDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlaylistDetail.belongsTo(models.Playlist, {
        foreignKey: "id_playlist",
        as: "playlist",
      });
    }

    // create default value for id using uuidv4
    static async create(data) {
      data.id = uuidv4();
      return await super.create(data);
    }
  }
  PlaylistDetail.init({
    id:{
      type: DataTypes.UUID,
      primaryKey:true
    },
    id_playlist: DataTypes.STRING,
    judul: DataTypes.STRING,
    cover_image: DataTypes.STRING,
    slug: DataTypes.STRING,
    link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'PlaylistDetail',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return PlaylistDetail;
};