const { request, response } = require('express');
const { v4: uuid } = require('uuid');

const Form = require('../models/Form');
const Entries = require('../models/Entries');

const createForm = async (req = request, res = response) =>
{
    const { name, fields } = req.body;

    const token = uuid();
    const form = new Form({ name, fields, token });

    await form.save();

    res.status(200).json({
        ok: true,
        form
    });
}

const callForm = async(req = request, res  = response) =>
{
    const { token, fields } = req.body;
    
    const form = await Form.findOne({ token });
    
    if(!form)
    {
        res.status(404).json({
            ok: false,
            msg: 'Form not found'
        });
    }
    
    const validFields = {};
    let flag = false;
    
    fields.forEach(field =>
    {
        validFields[field.name] = (validFields[field.name] || 0) + 1;
        
        if(validFields[field.name] > 1)
        {
            flag = true;
            return res.status(400).json({
                ok: false,
                msg: 'Invalid form format, multiple values for the same field'
            });
        }
    });
    
    if(flag) return;

    const formFields = [];

    form.fields.forEach(field =>
    {
        formFields.push(field.name);
    });

    if(Object.keys(validFields).toString() !== formFields.toString()) 
    {
        return res.status(400).json({
            ok: false,
            msg: 'Invalid form format, fields do not match with expected format'
        });
    }
    
    const entry = Entries({ form, fields });
    
    await entry.save();
    
    res.status(200).json({
        ok: true,
        entry
    });
}

const getEntries = async(req = request, res = response) =>
{
    const { token } = req.body;

    const form = await Form.findOne({ token });

    if(!form)
    {
        return res.status(404).json({
            ok: false,
            msg: 'Form not found'
        });
    }

    const entriesObj = await Entries.find({ form });

    const entries = [];
    entriesObj.forEach(entry =>
    {
        entries.push(entry.fields);
    });

    res.status(200).json({
        ok: true,
        entries
    });
}

module.exports = { createForm, callForm, getEntries };