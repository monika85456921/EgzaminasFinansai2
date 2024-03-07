const Outcome = require("../models/Outcome.js");
const asyncHandler = require("express-async-handler");

//@desc: create outcome
//@method: POST
//@route: api/outcomes


const createOutcome = asyncHandler(async (req, res) => {
    if (!req.body.category || !req.body.amount) {
      res.status(400);
      throw new Error("Please add all required fields");
    }
  
    const outcome = await Outcome.create({
      title: req.body.title,
      category: req.body.category,
      amount: req.body.amount,
      description: req.body.description,
      user: req.user._id,
    });
    req.user.outcomes.push(outcome._id);
    await req.user.save();
  
    res.status(201).json(outcome);
  });

  //@desc: get user outcome by outcome id
  //@method: GET
  //@route: api/outcomes/:id

  
  const getOutcome = asyncHandler(async (req, res) => {
    const outcome = await Outcome.findById(req.params.id);
    if (!outcome) {
      res.status(404);
      throw new Error("Outcome not found");
    }
    res.status(200).json(outcome);
  });
  
  //@desc: get all user outcomes by user id
  //@method: GET
  //@route: api/outcomes/:id/all

  const getOutcomes = asyncHandler(async (req, res) => {
    try {
      const outcomes = await Outcome.find({ user: req.user._id });
      res.status(200).json({ success: true, data: outcomes });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
  //@desc: get all outcomes in general
  //@method: GET
  //@route: api/outcomes/all

  const getAllOutcomes = asyncHandler(async (req, res) => {
    try {
      const outcomes = await Outcome.find();
      res.status(201).json({ success: true, data: outcomes });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
  // @desc: update one of the outcome field
  // @PUT method
  // @route: api/outcomes/:id

  const updateOutcome = async function (req, res) {
    const customOutcome = await Outcome.findById(req.params.id);
    if (!customOutcome) {
      res.status(404).send("Outcome ID wasn't found");
      return;
    }
  
    if (req.body.title) {
      customOutcome.title = req.body.title;
    }
    if (req.body.amount) {
      customOutcome.amount = req.body.amount;
    }
    if (req.body.description) {
      customOutcome.description = req.body.description;
    }
  
    const result = await customOutcome.save();
    res.status(200).json(result);
  };
  
  ////////////////////
  // @desc: Delete any outcome by outcome ID
  // @DELETE method
  // @route: api/outcomes/:id

  const deleteOutcome = async function (req, res) {
    const customOutcome = await Outcome.findById(req.params.id);
    if (!customOutcome) {
      res.status(404).send("Outcome with this ID wasn't found");
      return;
    }
    const result = await Outcome.deleteOne({ _id: req.params.id });
    res.status(200).send(result);
  };
  module.exports = {
    createOutcome,
    getOutcome,
    getOutcomes,
    getAllOutcomes,
    updateOutcome,
    deleteOutcome,
  };