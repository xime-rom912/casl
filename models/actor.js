const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _name:String,
    _lastName:String
});

class Actor {
    constructor(name, lastName){
        this.name = name;
        this.lastName = lastName;

    }

    get name(){
        return this._name;
    }

    set name(v){
        this._name = v;
    }
    
    get lastName(){
        return this._lastName;
    }

    set lastName(v){
        this._lastName = v;
    }
}

schema.loadClass(Actor);
module.exports = mongoose.model('Actor',schema);