const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;

const schema = mongoose.Schema({
    _description:String,
    _status:Boolean,
    _permissions:{type: Schema.ObjectId, ref: "Permission"}
});

class Profile {
    constructor(description,status, permissions){
        this.description = description;
        this.status = status;
        this.permissions = permissions;
    }

    get description(){
        return this._description;
    }

    set description(v){
        this._description = v;
    }
    
    get status(){
        return this._status;
    }

    set status(v){
        this._status = v;
    }

    get permissions(){
        return this._permissions;
    }

    set permissions(v){
        this._permissions = v;
    }
}

schema.loadClass(Profile);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Profile',schema);