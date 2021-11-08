const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;

const schema = mongoose.Schema({
    _email:String,
    _name:String,
    _lastName:String,
    _password:String,
    _salt:String,
    _profiles:{type: Schema.ObjectId, ref: "Profile" }
});

class User {
    constructor(name, lastName, email, password, salt){
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password
        this.salt = salt
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

    get email(){
        return this._email;
    }

    set email(v){
        this._email = v;
    }

    get password(){
        return this._password;
    }

    set password(v){
        this._password = v;
    }

    get salt(){
        return this._salt;
    }

    set salt(v){
        this._salt = v;
    }
}

schema.loadClass(User);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('User',schema);