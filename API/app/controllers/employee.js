//functions
const checkerrors = require('../functions/checkerrors');
const upload = require("../functions/imageupload");
const checkparams = require('../functions/paramscheck');

//model
const employee = require('../models/employee');

//packages
const jwt = require('jsonwebtoken');

const { ObjectID } = require('mongodb')

//handling image to upload the server & add employee details
exports.Imageupload = async (req, res) => {
    try {
        await upload(req, res);
        if (req.files.length <= 0) {
            return res.send(`You must select at least 1 file.`);
        }
        let companyname = req.body.companyname, country = req.body.country;
        let images = req.files;
        let img_names = images.map(({ filename }) => ({ img_name: filename }));
        let arraydet = JSON.parse(req.body.emp_details);
        let finalarray = arraydet.map(a=>{
            img_names.map(img =>
                {
                    a.pic = img.img_name
                })
            return a;
        })
        employee.insertMany({ 
            companyname : companyname,
            country : country,
            emp_details : finalarray}).then(result =>
            {
                return res.send({ status: "True", message: "Added successfully" });
            }).catch(err => console.log(err))
        
    } catch (error) {
        console.log(error);

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${error}`);
    }

};

//delete
exports.Deleteemployees = (req, res) => {
    let { ids } = req.body;
    if (!checkparams(ids))
        return res.send({ status: "False", message: "Parameter missing" });
    employee.deleteMany({ _id : { $in: ids.map(x => x) } }).then(deleted => {
        return res.send({ status: "True", message: "Deleted successfully" });
    }).catch(err => {
        console.log(err);
        res.send({ status: 'False', message: "Something wrong" });
    })
}

exports.Generate_authentication = (req, res) => {
    const user = {
        username: 'test', email: 'testid@gmail.com'
    }

    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({ " Token": token });
    });
}