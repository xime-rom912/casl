module.exports = (sequelize, type ) =>{
    const MovieActor = sequelize.define('moviesActors',{
        movieId: type.INTEGER,
        actorId: type.INTEGER
    });
    return MovieActor;
}
