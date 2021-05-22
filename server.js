const express = require('express')
const app = express()
const superagent = require('superagent')
require('dotenv').config();
// const mongoose = require('mongoose');
let newArr = [];
let foodArr2 = [];

const PORT = process.env.PORT || 3001
// const Chief = require('./Model/userModel');

// mongoose.connect('mongodb://localhost:27017/chief', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => console.log('mongodb is connected!'));

app.get('/', function (req, res) {
    res.send('homepage')
})

app.get('/nute', function (req, res) {
    try {
        const testApi2 = `https://api.edamam.com/search?app_key=${process.env.API_KEY}&app_id=${process.env.API_ID}&q=rice,+chicken,+pepper`;
        superagent.get(testApi2).then(foodData2 => {

            foodArr2.push(foodData2.body.hits[0].recipe.ingredients.map(index => new Food(index)));
            console.log(foodArr2);
            for (let i = 0; i < foodData2.body.hits.length; i++) {
                console.log(foodData2.body.hits.length);
                newArr.push([foodData2.body.hits[i].recipe.label, foodData2.body.hits[i].recipe.image, foodData2.body.hits[i].recipe.ingredientLines, foodArr2, `Total Calories`, foodData2.body.hits[i].recipe.calories, `Total Weight`, foodData2.body.hits[i].recipe.totalWeight, `Total Time`, foodData2.body.hits[i].recipe.totalTime, `Cuisine Type`, foodData2.body.hits[i].recipe.cuisineType, `Meal Type`, foodData2.body.hits[i].recipe.mealType, `Dish Type`, foodData2.body.hits[i].recipe.dishType])
            }
            res.send(newArr);
        })

    } catch (error) {
        res.send = ('not working')
    }
})

class Food {
    constructor(data) {
        this.text = data.text;
        this.weight = data.weight
        this.foodCategory = data.foodCategory;
        this.foodId = data.foodId
        this.img = data.image
    }
}
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});







// userModel{
// 	email: ""
// 	name:""
// 	myRecipes:[]
// }

// blogModel{
// 	title: ""
// 	text: ""
// 	userName:""
// 	Image:""
// }
// recipesModel{
// 	recipeName:""
// 	recipe:""
// 	calories:
// 	ingredients:	
// }