/**
 * Controller for creating the category
 * 
 * POST 0.0.0.0:8888/ecomm_2/api/v2/categories
 * {
 *  "name" : "Household",
 *  "description" : "This will have all the household items"
 * }
 * 
 * Controller for find the category by name
 * GET 0.0.0.0:8888/ecomm_2/api/v2/categories/find_via_name
 * 
 * Controller for find the all categories
 * GET 0.0.0.0:8888/ecomm_2/api/v2/categories.all
 * 
 * Controller for edit the category
 * PUT 0.0.0.0:8888/ecomm_2/api/v2/categories/edit
 */

const category_model = require("../models/category.model")


exports.createNewCategory = async (req, res)=>{

    // Read the req body
    // Create the category object
    const cat_data = {
        name : req.body.name,
        description : req.body.description
    }

    try{
        // Insert into mongodb
    const category =  await category_model.create(cat_data)
    return res.status(201).send(category)
    }catch(err){
        console.log("Error while creating the category", err)
        res.status(500).send({
            message : "Error while creating the category"
        })
    }
    
    // return the response of the created category
}


// Create the req res function
exports.find_by_name = async (req, res)=>{

    // Read the req body
    // find the query
    try{

        const category_name = await category_model.findOne({name : req.body.name})

        if(!category_name){
            return res.status(400).send({
                message : "Category not found"
            })   
        }

        return res.status(202).send(category_name)

    }catch(err){
        console.log("Getting error while finding the category by name", err)
        res.status(401).send({
            message : "Getting error while finding the category by name"
        })
    }
    // Return the response of the category based on query
}

// Create the categories function that req res function
exports.categoryAll = async (req, res)=>{
    // Read the req body
    const allCategories = req.body.categories
    // Find all the categories from database
    try{
        if(allCategories && (allCategories.toLowerCase() === "categories")){
            const all_Categories = await category_model.find()
            return res.status(200).send(all_Categories)
        }else{
            res.status(400).send({
                message : " Invalid request"
            })
        }
        
    }catch(err){
        console.log("Getting error while finding the all categories")
        return res.status(500).send({
            message : "Getting error while finding the all categories"
        })
    }

    // Send the res of all of present categories

}

exports.updateCategory = async (req, res)=>{
    // Read the request body

    // Update the category as required 
    try{    
            const id = req.params
            const catNewData = await category_model.findOneAndUpdate(id, {$set : { name : req.body.name, description : req.body.description }}, {upsert : true })
            return res.status(200).send(catNewData)
            
    }catch(err){
        return res.status(400).send({
            message : "Error while editing the category"
        })
    }

    // Send res of updated category
}




