const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _genre:String,
    _title:String,
    _director:Map,
    _actors:Array,
    _directorLastName:String,
    _actorsLastName:String,
    _directorName:String,
    _actorsName:String
});

class Movie {
    constructor(genre, title, director, actors, directorLastName, actorsLastName, directorName, actorsName){
        this.genre = genre;
        this.title = title;
        this.director = director;
        this.actors = actors;
        this.directorLastName = directorLastName;
        this.actorsLastName = actorsLastName;
        this.directorLastName = directorLastName;
        this.actorsName = actorsName;
    }

    get genre(){
        return this._genre;
    }

    set genre(v){
        this._genre = v;
    }
    
    get title(){
        return this._title;
    }

    set title(v){
        this._title = v;
    }

    get director(){
        return this._director;
    }

    set director(v){
        this._director = v;
    }

    get actors(){
        return this._actors;
    }

    set actors(v){
        this._actors = v;
    }

    get directorLastName(){
        return this._directorLastName;
    }

    set directorLastName(v){
        this._directorLastName = v;
    }

    get directorName(){
        return this._directorName;
    }

    set directorName(v){
        this._directorName = v;
    }

    get actorsLastName(){
        return this._actorsLastName;
    }

    set actorsLastName(v){
        this._actorsLastName = v;
    }

    get actorsName(){
        return this._actorsName;
    }

    set actorsName(v){
        this._actorsName = v;
    }
}

schema.loadClass(Movie);
module.exports = mongoose.model('Movie',schema);