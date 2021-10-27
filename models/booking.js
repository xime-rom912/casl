const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Copy = mongoose.model('Copy');
var Member = mongoose.model('Member');


const schema = mongoose.Schema({ 
    _copy:{type: Schema.ObjectId, ref: "Copy" },
    _member:{type: Schema.ObjectId, ref: "Member" },
    _date:Date
});

class Booking {
    constructor(copy, member,date){
        this.copy = copy;
        this.member = member;
        this.date =  date;

    }

    get copy(){
        return this._copy;
    }

    set copy(v){
        this._copy = v;
    }
    
    get member(){
        return this._member;
    }

    set member(v){
        this._member = v;
    }

    get date(){
        return this._date;
    }

    set date(v){
        this._date = v;
    }
}

schema.loadClass(Booking);
module.exports = mongoose.model('Booking',schema);