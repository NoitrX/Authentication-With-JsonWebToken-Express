const { Category } = require("../models");

exports.getAllCategories = async (req, res) => {
  try {
    const allCategory = await Category.findAll();
    return res.status(200).json({
      message: "success",
      data: allCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

exports.storeCategory = async (req, res) => {
  try {
    let { name, description } = req.body;
    const newCategory = await Category.create({
      name,
      description,
    });

    return res.status(201).json({
      msg: "success",
      data: newCategory,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.detailCategories = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryDetail = await Category.findByPk(id);

    if (!categoryDetail) {
      return res.status(404).json({
        status: "fail",
        message: "Data Not Found",
      });
    }
    return res.status(200).json({
      message: "success",
      data: categoryDetail,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.update(req.body, {
      where: {
        id: id,
      },
    });
    const newCategory = await Category.findByPk(id);

    if (!newCategory) {
      return res.status(404).json({
        status: "fail",
        message: "Data Not Found",
      });
    }

    return res.status(201)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              .json({
      msg: "success",
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const newCategory = await Category.findByPk(id);
    if (!newCategory) {
      return res.status(404).json({
        status: "fail",
        message: "Data Not Found",
      });
    }
    await Category.destroy({
      where: {
        id: id,
      },
    });
    return res.status(201).json({
      msg: "success",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};
