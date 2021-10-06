const Sequelize = require('sequelize');

const directorModel = require('./models/director');
const genderModel = require('./models/gender');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const movieActorModel = require('./models/movieActor');
const copyModel = require('./models/copy');
const bookingModel = require('./models/booking');
const memberModel = require('./models/member');


const sequelize = new Sequelize('video-club','root','ABCD1234',{
    host: 'localhost',//direccion de nuestro RDBMS 
    dialect: 'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Gender = genderModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);
const Copy = copyModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);

//un genero puedo tener muchas pelicuals
Gender.hasMany(Movie, {as:'movie'});
//Una pelicula puede tener un genero
Movie.belongsTo(Gender, {as: 'gender'});
//Un director puede tener muchas peliculas
Director.hasMany(Movie, {as: 'movie'})
//una pelicula puede tener un director
Movie.belongsTo(Director, {as: 'director'});

// Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie, {foreingKey:'movieId'});
// En una pelciula participan muchos actores 
MovieActor.belongsTo(Actor, {foreingKey:'actorId'});

Movie.belongsToMany(Actor,{
    foreingKey: 'actorId',
    as: 'actors',
    through: 'moviesActors'
})

Actor.belongsToMany(Movie,{
    foreingKey: 'movieId',
    as: 'movies',
    through: 'moviesActors'
})

//Una pelicula puede tener muchas copias 
Movie.hasMany(Copy, {as:'copy'});
//Una copia puede tener una pelicula
Copy.belongsTo(Movie, {as: 'movie'});
//Una copia puede tener muchas reservaciones
Copy.hasMany(Booking, {as:'booking'});
//Una reservacion puede tener una copa
Booking.belongsTo(Copy, {as:'copy'});
//Un miembro puede tener muchas reservaciones 
Member.hasMany(Booking, {as:'booking'});
//Una reservacion puede tener un miembro
Booking.belongsTo(Member, {as:'member'});

sequelize.sync({
    force: true
}).then(()=>{
    console.log("Base de datos actualizada corectamente");
});

module.exports = { Director, Gender, Movie, Actor, MovieActor, Copy, Booking, Member }