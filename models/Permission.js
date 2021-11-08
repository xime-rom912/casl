const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;

const schema = mongoose.Schema({
    _description:String,
    _type:{type: Schema.ObjectId, ref: "Permission"}
});

class Permission {
    constructor(description,status, permissions){
        this.description = description;
        this.permissions = permissions;
    }

    get description(){
        return this._description;
    }

    set description(v){
        this._description = v;
    }

    get permissions(){
        return this._permissions;
    }

    set permissions(v){
        this._permissions = v;
    }
}

schema.loadClass(Permission);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Permission',schema);