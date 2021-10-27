const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _address:Map,
    _lastName:String,
    _name:String,
    _phone:String,
    _status:Boolean,
    _addressCity:String,
    _addressCountry:String,
    _addressNumber:String,
    _addressState:String,
    _addressStreet:String
});

class Member {
    constructor(address, lastName, name, phone, status, addressCity, addressCountry, addressNumber, addressState, addressStreet){
        this.name = name;
        this.lastName = lastName;

    }

    get address(){
        return this._address;
    }

    set address(v){
        this._address = v;
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

    get phone(){
        return this._phone;
    }

    set phone(v){
        this._phone = v;
    }

    get status(){
        return this._status;
    }

    set status(v){
        this._status = v;
    }

    get addressCity(){
        return this._addressCity;
    }

    set addressCity(v){
        this._addressCity = v;
    }

    get addressCountry(){
        return this._addressCountry;
    }

    set addressCountry(v){
        this._addressCountry = v;
    }

    get addressState(){
        return this._addressState;
    }

    set addressState(v){
        this._addressState = v;
    }

    get addressStreet(){
        return this._addressStreet;
    }

    set addressStreet(v){
        this._addressStreet = v;
    }
}

schema.loadClass(Member);
module.exports = mongoose.model('Member',schema);