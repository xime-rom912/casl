module.exports = (sequelize, type ) =>{
    const Gender = sequelize.define('genders',{
        id: {type: type.INTEGER, primaryKey: true,autoIncrement: true},
        description: type.STRING,
        status: type.BOOLEAN
    });
    return Gender;
}
