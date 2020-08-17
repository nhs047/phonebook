const express = require('express');
const phoneBookRouter = express.Router();
const { connect } = require('../database/dbconnection');
const { phonebookdata } = require('../models/phonebook');
const { createPhonebookValidate, editPhonebookValidate } = require('../validate/phonebook');
const { successResponse, errorResponse, bcryptPassword } = require('../common/helpers');
const {
  emptyMessage,
  noUpdateFound,
  noRecordFound,
  createdSuccessfully,
  deletedSuccessfully
} = require('../common/messages');

phoneBookRouter.get('/', async (req, res) => {
  try {
    await connect();
    const phoneBookData = await phonebookdata.find();
    return successResponse(res, true, phoneBookData, emptyMessage);
  } catch (err) {
    return errorResponse(res, 400, {}, err.message);
  }
});

phoneBookRouter.get('/:id', async (req, res) => {
  try {
    await connect();
    const phoneBookData = await phonebookdata.findOne({
      _id: req.params.id
    });
    return phoneBookData
      ? successResponse(
          res,
          true,
          phoneBookData,
          emptyMessage
        )
      : successResponse(res, false, {}, noRecordFound);
  } catch (err) {
    return errorResponse(res, 400, {}, err.message);
  }
});

phoneBookRouter.get('/get/:phoneNo', async (req, res) => {
  try {
    const exp = new RegExp(`^.*${req.params.phoneNo}.*`, 'gmi');
    await connect();
    const phoneBookData = await phonebookdata.find({
      phoneNo: exp
    });
    return phoneBookData
      ? successResponse(
          res,
          true,
          phoneBookData,
          emptyMessage
        )
      : successResponse(res, false, {}, noRecordFound);
  } catch (err) {
    return errorResponse(res, 400, {}, err.message);
  }
});


phoneBookRouter.post('/', async (req, res) => {
    try {
      const { error } = createPhonebookValidate.validate(req.body);
      if (error) {
        return errorResponse(res, 400, {}, error.details[0].message);
      }
      await connect();
      const phoneBookData = new phonebookdata(req.body);
      await phoneBookData.save();
      return successResponse(
        res,
        true,
        phoneBookData,
        createdSuccessfully
      );
    } catch (err) {
      return errorResponse(res, 400, {}, err.message);
    }
});

phoneBookRouter.put('/:id', async (req, res) => {
  try {
    const { error } = editPhonebookValidate.validate(req.body);
    if (error) {
      return errorResponse(res, 400, {}, error.details[0].message);
    }
    await connect();

    const user = await phonebookdata.updateOne(
      {
        _id: req.params.id
      },
      req.body
    );
    return user.nModified > 0
      ? successResponse(res, true, req.body, emptyMessage)
      : successResponse(res, false, req.body, noUpdateFound);
  } catch (err) {
    return errorResponse(res, 400, {}, err.message);
  }
});

phoneBookRouter.put('/edit/:phoneNo', async (req, res) => {
  try {
    const { error } = editPhonebookValidate.validate(req.body);
    if (error) {
      return errorResponse(res, 400, {}, error.details[0].message);
    }
    await connect();

    const user = await phonebookdata.updateOne(
      {
        phoneNo: req.params.phoneNo
      },
      req.body
    );
    return user.nModified > 0
      ? successResponse(res, true, req.body, emptyMessage)
      : successResponse(res, false, req.body, noUpdateFound);
  } catch (err) {
    return errorResponse(res, 400, {}, err.message);
  }
});

phoneBookRouter.delete('/:id', async (req, res) => {
  try {
    await connect();
    const phoneBookData = await phonebookdata.deleteOne(
      {
        _id: req.params.id
      }
    );
    return phoneBookData.deletedCount > 0
      ? successResponse(res, true, {}, deletedSuccessfully)
      : successResponse(res, false, {}, noRecordFound);
  } catch (err) {
    return errorResponse(res, 400, {}, err.message);
  }
});

phoneBookRouter.delete('/delete/:phoneNo', async (req, res) => {
  try {
    await connect();
    const phoneBookData = await phonebookdata.deleteOne(
      {
        phoneNo: req.params.phoneNo
      }
    );
    return phoneBookData.deletedCount > 0
      ? successResponse(res, true, {}, deletedSuccessfully)
      : successResponse(res, false, {}, noRecordFound);
  } catch (err) {
    return errorResponse(res, 400, {}, err.message);
  }
});

module.exports = phoneBookRouter;