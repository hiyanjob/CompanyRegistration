module.exports = (app) => {
  const TokenVerification = require('../functions/tokenverification');

  const employee = require('../controllers/employee')


  //add employees data
  //app.post('/Addemployeedetails', TokenVerification, employee.Addemployeedetails)
  
  //image uploading
  app.post('/Imageupload', TokenVerification, employee.Imageupload)

  //delete employee
  app.post('/Deleteemployees', TokenVerification, employee.Deleteemployees)

  //create authentication token
  app.post('/Generate_authentication', employee.Generate_authentication)
}