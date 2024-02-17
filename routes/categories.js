const express = require("express");
const router = express.Router();
const { getAllCategories, storeCategory, detailCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");
const { authMiddleware, permissionMiddleware } = require('../middleware/UserMiddleware');
router.get("/", authMiddleware, permissionMiddleware("admin"), getAllCategories);
router.post("/store",authMiddleware, permissionMiddleware("admin"),  storeCategory);
router.get("/:id", authMiddleware, permissionMiddleware("admin"), detailCategories);
router.put("/update/:id",authMiddleware, permissionMiddleware("admin"),  updateCategory);
router.delete("/delete/:id",authMiddleware, permissionMiddleware("admin"),  deleteCategory)

module.exports = router;
