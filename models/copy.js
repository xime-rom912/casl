const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Movie = mongoose.model('Movie');

const schema = mongoose.Schema({
    _format:String,
    _movie:{type: Schema.ObjectId, ref: "Movie" },
    _number:Number,
    _status:Boolean
});

class Copy {
    constructor(format, movie,number,status){
        this.format = format;
        this.movie = movie;
        this.number = number;
        this.status = status;
    }

    get format(){
        return this._format;
    }

    set format(v){
        this._format = v;
    }
    
    get movie(){
        return this._movie;
    }

    set movie(v){
        this._movie = v;
    }

    get number(){
        return this._number;
    }

    set number(v){
        this._number = v;
    }

    get status(){
        return this._status;
    }

    set status(v){
        this._status = v;
    }
}

schema.loadClass(Copy);
module.exports = mongoose.model('Copy',schema);