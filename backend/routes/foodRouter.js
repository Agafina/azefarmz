const express = require('express')

const {
    addFood,
    listFood,
    removeFood
} = require('../controllers/foodContoller')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const uploads = multer({storage:storage})
const foodRouter = express.Router()
// Add foods to the database
foodRouter.post("/add",uploads.single('image'), addFood );
// get foods from the database
foodRouter.get("/list",listFood)
// removeFood from the database
foodRouter.post('/remove', removeFood)
module.exports = foodRouter;
