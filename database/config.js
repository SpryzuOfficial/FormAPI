const mongoose = require('mongoose');

const configDB = () =>
{
    try 
    {
        mongoose.connect(process.env.MONGODB);
        console.log('DB connected');
    }
    catch (error)
    {
        console.log(error);    
    }
}

module.exports = { configDB };