const mongoose = require('mongoose');
const { Schema } = mongoose;



const recipesSchema = new Schema({
    recipeName: String,
    recipe: String,
    calories: Number,
    ingredients: String,
});
const userSchema = new Schema({
    email: String,
    name: String,
    myRecipes: [recipesSchema],
});


const Chief = mongoose.model('Chief', userSchema);

module.exports = Chief;