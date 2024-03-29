const Income = require("../models/Income.js");
const asyncHandler = require("express-async-handler");
//@desc: create income
//@method: POST
//@route: api/incomes
const createIncome = asyncHandler(async (req, res) => {
  if (!req.body.category || !req.body.amount) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const income = await Income.create({
    title: req.body.title,
    category: req.body.category,
    amount: req.body.amount,
    description: req.body.description,
    user: req.user._id,
  });
  req.user.incomes.push(income._id);
  await req.user.save();

  res.status(201).json(income);
});

//@desc: get user income by income id
//@method: GET
//@route: api/incomes/:id

const getIncome = asyncHandler(async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (!income) {
    res.status(404);
    throw new Error("Income not found");
  }
  res.status(200).json(income);
});

//@desc: get all user incomes by user id
//@method: GET
//@route: api/incomes/:id/all

const getIncomes = asyncHandler(async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id });
    res.status(200).json({ success: true, data: incomes });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

//@desc: get all incomes in general
//@method: GET
//@route: api/incomes/all

const getAllIncomes = asyncHandler(async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(201).json({ success: true, data: incomes });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc: update one of the outcome field
// @PUT method
// @route: api/incomes/:id

const updateIncome = async function (req, res) {
  const customIncome = await Income.findById(req.params.id);
  if (!customIncome) {
    res.status(404).send("Income ID wasn't found");
    return;
  }

  if (req.body.title) {
    customIncome.title = req.body.title;
  }
  if (req.body.amount) {
    customIncome.amount = req.body.amount;
  }
  if (req.body.description) {
    customIncome.description = req.body.description;
  }

  const result = await customIncome.save();
  res.status(200).json(result);
};

// @desc: Delete any outcome by income ID
// @DELETE method
// @route: api/incomes/:id

const deleteIncome = async function (req, res) {
  const customIncome = await Income.findById(req.params.id);
  if (!customIncome) {
    res.status(404).send("Income with this ID wasn't found");
    return;
  }
  const result = await Income.deleteOne({ _id: req.params.id });
  res.status(200).send(result);
};

module.exports = {
  createIncome,
  getIncome,
  getIncomes,
  getAllIncomes,
  updateIncome,
  deleteIncome,
};
