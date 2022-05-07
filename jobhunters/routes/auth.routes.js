const authController  = require('../controllers/auth.controller');

module.exports = (app)=>{

    app.post('/jobhunter/api/v1/signup',authController.signup);
    app.post('/jobhunter/api/v1/signin',authController.signin);
}