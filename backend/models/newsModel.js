const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
    },
    detailLink:{
        type: String
    },
    image: {
        type: String
    }
},
{timestamps: true}
)
module.exports = mongoose.model('News', newsSchema);