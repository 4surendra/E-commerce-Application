/**
 *  POST 0.0.0.0:8888/ecomm_2/api/v2/auth/signup
 * 
 * I need to intercept this
 */
const authController = require("../controllers/auth.controller")
const authMW = require("../middlewares/auth.mw")

module.exports = (app)=>{
    app.post("/ecomm_2/api/v2/auth/signup",[authMW.verifySignUpBody], authController.signup )

    /**
     * route for
     *  POST 0.0.0.0:8888/ecomm_2/api/v2/auth/signin
     */

    app.post("/ecomm_2/api/v2/auth/signin",[authMW.verifySignInBody], authController.signin)
}

