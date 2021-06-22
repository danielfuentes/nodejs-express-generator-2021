module.exports = (sequelize, dataTypes) => {
    let alias = 'Genre';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        ranking: {
            type: dataTypes.INTEGER
        },
        active: {
            type: dataTypes.TINYINT
        }
    }
    let config = {
        tableName: 'genres',
        timestamps: false,
        underscored: true 
    }
    const Genre = sequelize.define(alias, cols, config);
    Genre.associate = function(models){
        Genre.hasMany(models.Movie,{
            as: 'movies',
            foreignKey: 'genre_id'
        })
    }
    return Genre;
}