var mongoose = require("mongoose");
const db = require('../../config/database_config');
mongoose.connect(db.url, db.connection_management);

var userSchema = {
    "companyname": { type: String },
    "country": { type: String },
    "emp_details": [{
            emp_name: {type : String},
            emp_id: {type : String},
            salary: {type : String},
            pic: {type : String},
        }],
    "CreatedAt": { type: Date, default: new Date() }
};
module.exports = mongoose.model(db.collection1, userSchema);
