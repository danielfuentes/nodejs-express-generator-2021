module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        avatar :{
            type: dataTypes.STRING
        },
        role : {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: 'users',
        timestamps: false,
        underscored: true 
    }
    const User = sequelize.define(alias, cols, config);
    return User;
}