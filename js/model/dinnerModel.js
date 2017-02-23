//DinnerModel Object constructor
var DinnerModel = function() {

 
	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner menu
	this.guests = 0;
	this.menu = [];
	this.observers = [];


	// Lab 3 observable
	this.addObserver = function(observer) {
		// TODO: LAB3
		this.observers.push(observer);
	}

	this.notifyObservers = function(obj) {
		// TODO: LAB3
		this.observers.forEach(function(observer) {
			observer.update(obj);
		});
	}

	this.setNumberOfGuests = function(num) {
		//TODO Lab 2
		this.guests = num;
		this.notifyObservers();

	}

	// should return 
	this.getNumberOfGuests = function() {
		//TODO Lab 2
		return this.guests;
	}

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		//TODO Lab 2
		return this.menu.filter(function(dish) {
	  		return dish.type == type;
	  	});	
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		//TODO Lab 2
		return this.menu;
	}

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		//TODO Lab 2
		var ingredients = [];
		this.menu.forEach(function(dish) {
			dish.extendedIngredients.forEach(function(ingredient) {
				ingredients.push(ingredient);
			});
		});
		return ingredients;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		//TODO Lab 2
		var allIngredients = this.getAllIngredients();
		var totalPrice = 0;

		allIngredients.forEach(function(ingredient) {
			totalPrice += ingredient.amount;
		});

		return totalPrice*this.guests;
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(dish) {
		//TODO Lab 2
		var newDish = dish;
		var exists = false;

		// check if dish of same type exists
		this.menu.forEach(function(dish, i, menu) {
			if(dish.id == newDish.id) {
				exists = true;
				menu[i] = newDish;
			}
		});

		if(!exists) {
			this.menu.push(newDish);
		} 

		this.notifyObservers();
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		//TODO Lab 2
		var dish = this.getDish(id);
		var dishIndex = this.menu.indexOf(dish);

		if(dishIndex != -1) {
			this.menu.splice(dishIndex, 1);
		}

		this.notifyObservers();
	}

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type, filter, cb, cbError) {
	   	$.ajax( {
		   url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
		   headers: {
		     'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB',
		     'query': filter,
		     'type': type
		   },
		   dataType: 'json',
		   success: function(dishes) {
		     console.log(dishes);
		     cb(dishes);
		   },
		   error: function(error) {
		     console.log(error);
		   }
		}); 
	}

	//function that returns a dish of specific ID
	this.getDish = function (id, cb, cbError) {
	 	$.ajax( {
		   url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information',
		   headers: {
		     'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
		   },
		   dataType: 'json',
		   success: function(dish) {
		     cb(dish);
		   },
		   error: function(error) {
		     console.log(error);
		   }
		});
	}

	this.getDishSummary = function(id, cb, cbError) {
		$.ajax( {
		   url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/summary',
		   headers: {
		     'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
		   },
		   dataType: 'json',
		   success: function(dish) {
		     cb(dish);
		   },
		   error: function(error) {
		     console.log(error);
		   }
		});	
	}

	// returns a json object with stepwise instructions
	this.getDishInstructions = function(id, cb, cbError) {
		$.ajax( {
		   url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/analyzedInstructions',
		   headers: {
		     'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
		   },
		   dataType: 'json',
		   success: function(instructions) {
		   	 console.log(instructions);
		     cb(instructions);
		   },
		   error: function(error) {
		     console.log(error);
		   }
		});	
	}

	this.getIngredientList = function(ingredients, servings, cb) {
		$.ajax( {
		   url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/visualizeIngredients',
		   type: 'post',
		   headers: {
		     'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
		   },
		   data: {
		   		defaultCss: false,
		   		ingredientList: ingredients,
		     	servings: servings,
		     	view: 'list'
		   },
		   success: function(ingredientList) {
		     cb(ingredientList);
		   },
		   error: function(error) {
		     console.log("Error: " + error);
		   }
		});		
	}

	this.getDishPrice = function (ID) {
		price = 0;
		this.menu.forEach(function(dish) {
			if (dish.id == ID) {
				dish.extendedIngredients.forEach(function(ingredient) {
					price += ingredient.amount;
				});
			}
		});




		/*this.getDish(id, function(dish) {
			dish.extendedIngredients.forEach(function(ingredient) {
				price += ingredient.amount;
			});
		});*/
		//ASYNCH!!!!
		return price*this.guests;

	}


	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolate Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

}
