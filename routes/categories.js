const express = require("express");
const router = express.Router();
const { getAllCategories, storeCategory, detailCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");
const { authMiddleware } = require('../middleware/UserMiddleware');
router.get("/", getAllCategories);
router.post("/store", storeCategory);
router.get("/:id", authMiddleware, detailCategories);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory)

module.exports = router;
