/**
 * POST 0.0.0.0:8888/ecomm_2/api/v2/categories
 * 
 * GET 0.0.0.0:8888/ecomm_2/api/v2/categories/find_via_name
 * 
 * GET 0.0.0.0:8888/ecomm_2/api/v2/categories
 * 
 * PUT 0.0.0.0:8888/ecomm_2/api/v2/categories/edit/66431b1d459d6f57f0ae86de
 */

const category_controller = require("../controllers/category.controller")
auth_mw = require("../middlewares/auth.mw")

module.exports = (app)=>{
    app.post("/ecomm_2/api/v2/categories", [auth_mw.verifyToken, auth_mw.isAdmin], category_controller.createNewCategory)

    app.get("/ecomm_2/api/v2/categories/find_via_name", [auth_mw.verifyToken, auth_mw.catName], category_controller.find_by_name)
    app.get("/ecomm_2/api/v2/categories/all",[auth_mw.verifyToken, auth_mw.allCategories], category_controller.categoryAll)

    app.put( "/ecomm_2/api/v2/categories/edit", [auth_mw.verifyToken, auth_mw.isAdmin], category_controller.updateCategory)
}

