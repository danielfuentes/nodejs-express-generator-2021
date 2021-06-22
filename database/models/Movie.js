module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        title: {
            type : dataTypes.STRING
        },
        rating: {
            type: dataTypes.DECIMAL
        },
        awards: {
            type: dataTypes.INTEGER
        },
        release_date : {
            type: dataTypes.DATE
        },
        length: {
            type: dataTypes.INTEGER
        },
        genre_id: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName : 'movies',
        timestamps: false,
        onderscore: true
    }
    const Movie = sequelize.define(alias, cols, config);
    Movie.associate = function(models){
        Movie.belongsTo(models.Genre, {
            as : 'genre',
            foreignKey: 'genre_id' 
        })
    }

    return Movie;
}