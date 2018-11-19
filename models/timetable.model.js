let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TimetableSchema = new Schema({
    name: {
        type: String,
        required: true,
        uppercase: true
    },
    time: {
        type: String,
        required: true,
        uppercase: true
    },
    day: {
        type: string,
        default: true
    },
    class: [{
        type: Schema.Types.ObjectId,
        ref: 'classes'
    }]
});

module.exports = mongoose.model('timetable', TimetableSchema);