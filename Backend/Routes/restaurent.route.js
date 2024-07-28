const express = require("express");
const router = express.Router();
const Restaurent = require("../Models/restaurent.model");

let SampleRestaurentsList = [
	{
		_id: "669166a89bcf7d0c8af0cfe7",
		imageUrl: "https://picsum.photos/id/1018/200/150",
		restaurentName: "The Gourmet Spot",
		cusion: "Italian",
		rating: 1,
		restaurantMenu: [
			{
				itemName: "Margherita Pizza",
				price: 12.99,
				_id: "669166a89bcf7d0c8af0cfe8",
			},
			{
				itemName: "Spaghetti Carbonara",
				price: 14.99,
				_id: "669166a89bcf7d0c8af0cfe9",
			},
			{
				itemName: "Lasagna",
				price: 13.99,
				_id: "669166a89bcf7d0c8af0cfea",
			},
			{
				itemName: "Fettuccine Alfredo",
				price: 14.99,
				_id: "669166a89bcf7d0c8af0cfeb",
			},
			{
				itemName: "Penne Arrabbiata",
				price: 11.99,
				_id: "669166a89bcf7d0c8af0cfec",
			},
			{
				itemName: "Bruschetta",
				price: 6.99,
				_id: "669166a89bcf7d0c8af0cfed",
			},
			{
				itemName: "Caprese Salad",
				price: 8.99,
				_id: "669166a89bcf7d0c8af0cfee",
			},
			{
				itemName: "Minestrone Soup",
				price: 7.99,
				_id: "669166a89bcf7d0c8af0cfef",
			},
			{
				itemName: "Risotto",
				price: 15.99,
				_id: "669166a89bcf7d0c8af0cff0",
			},
			{
				itemName: "Gnocchi",
				price: 13.99,
				_id: "669166a89bcf7d0c8af0cff1",
			},
			{
				itemName: "Cannoli",
				price: 5.99,
				_id: "669166a89bcf7d0c8af0cff2",
			},
			{
				itemName: "Tiramisu",
				price: 6.99,
				_id: "669166a89bcf7d0c8af0cff3",
			},
		],
	},
	{
		_id: "669166a89bcf7d0c8af0cff5",
		imageUrl: "https://picsum.photos/id/1015/200/150",
		restaurentName: "Flavor Fiesta",
		cusion: "Mexican",
		rating: 1,
		restaurantMenu: [
			{
				itemName: "Tacos",
				price: 8.99,
				_id: "669166a89bcf7d0c8af0cff6",
			},
			{
				itemName: "Burrito",
				price: 9.99,
				_id: "669166a89bcf7d0c8af0cff7",
			},
			{
				itemName: "Enchiladas",
				price: 10.99,
				_id: "669166a89bcf7d0c8af0cff8",
			},
			{
				itemName: "Quesadilla",
				price: 8.99,
				_id: "669166a89bcf7d0c8af0cff9",
			},
			{
				itemName: "Nachos",
				price: 7.99,
				_id: "669166a89bcf7d0c8af0cffa",
			},
			{
				itemName: "Fajitas",
				price: 12.99,
				_id: "669166a89bcf7d0c8af0cffb",
			},
			{
				itemName: "Chimichanga",
				price: 9.99,
				_id: "669166a89bcf7d0c8af0cffc",
			},
			{
				itemName: "Tamales",
				price: 8.99,
				_id: "669166a89bcf7d0c8af0cffd",
			},
			{
				itemName: "Guacamole",
				price: 5.99,
				_id: "669166a89bcf7d0c8af0cffe",
			},
			{
				itemName: "Salsa & Chips",
				price: 4.99,
				_id: "669166a89bcf7d0c8af0cfff",
			},
			{
				itemName: "Flan",
				price: 4.99,
				_id: "669166a89bcf7d0c8af0d000",
			},
			{
				itemName: "Churros",
				price: 4.99,
				_id: "669166a89bcf7d0c8af0d001",
			},
		],
	},
	{
		_id: "669166a89bcf7d0c8af0d003",
		imageUrl: "https://picsum.photos/id/1021/200/150",
		restaurentName: "Spice Symphony",
		cusion: "Indian",
		rating: 1,
		restaurantMenu: [
			{
				itemName: "Butter Chicken",
				price: 11.99,
				_id: "669166a89bcf7d0c8af0d004",
			},
			{
				itemName: "Paneer Tikka",
				price: 10.99,
				_id: "669166a89bcf7d0c8af0d005",
			},
			{
				itemName: "Chicken Tikka Masala",
				price: 12.99,
				_id: "669166a89bcf7d0c8af0d006",
			},
			{
				itemName: "Saag Paneer",
				price: 9.99,
				_id: "669166a89bcf7d0c8af0d007",
			},
			{
				itemName: "Rogan Josh",
				price: 13.99,
				_id: "669166a89bcf7d0c8af0d008",
			},
			{
				itemName: "Biryani",
				price: 10.99,
				_id: "669166a89bcf7d0c8af0d009",
			},
			{
				itemName: "Samosa",
				price: 4.99,
				_id: "669166a89bcf7d0c8af0d00a",
			},
			{
				itemName: "Naan",
				price: 2.99,
				_id: "669166a89bcf7d0c8af0d00b",
			},
			{
				itemName: "Chole Bhature",
				price: 9.99,
				_id: "669166a89bcf7d0c8af0d00c",
			},
			{
				itemName: "Dosa",
				price: 8.99,
				_id: "669166a89bcf7d0c8af0d00d",
			},
			{
				itemName: "Gulab Jamun",
				price: 3.99,
				_id: "669166a89bcf7d0c8af0d00e",
			},
			{
				itemName: "Ras Malai",
				price: 4.99,
				_id: "669166a89bcf7d0c8af0d00f",
			},
		],
	},
	{
		_id: "669166a89bcf7d0c8af0d011",
		imageUrl: "https://picsum.photos/id/1025/200/150",
		restaurentName: "Sushi Central",
		cusion: "Japanese",
		rating: 1,
		restaurantMenu: [
			{
				itemName: "California Roll",
				price: 8.99,
				_id: "669166a89bcf7d0c8af0d012",
			},
			{
				itemName: "Spicy Tuna Roll",
				price: 9.99,
				_id: "669166a89bcf7d0c8af0d013",
			},
			{
				itemName: "Tempura",
				price: 10.99,
				_id: "669166a89bcf7d0c8af0d014",
			},
			{
				itemName: "Sashimi",
				price: 12.99,
				_id: "669166a89bcf7d0c8af0d015",
			},
			{
				itemName: "Nigiri",
				price: 11.99,
				_id: "669166a89bcf7d0c8af0d016",
			},
			{
				itemName: "Miso Soup",
				price: 4.99,
				_id: "669166a89bcf7d0c8af0d017",
			},
			{
				itemName: "Edamame",
				price: 5.99,
				_id: "669166a89bcf7d0c8af0d018",
			},
			{
				itemName: "Udon",
				price: 9.99,
				_id: "669166a89bcf7d0c8af0d019",
			},
			{
				itemName: "Ramen",
				price: 11.99,
				_id: "669166a89bcf7d0c8af0d01a",
			},
			{
				itemName: "Katsu Curry",
				price: 12.99,
				_id: "669166a89bcf7d0c8af0d01b",
			},
			{
				itemName: "Mochi",
				price: 4.99,
				_id: "669166a89bcf7d0c8af0d01c",
			},
			{
				itemName: "Green Tea Ice Cream",
				price: 3.99,
				_id: "669166a89bcf7d0c8af0d01d",
			},
		],
	},
	{
		_id: "669166a99bcf7d0c8af0d01f",
		imageUrl: "https://picsum.photos/id/1029/200/150",
		restaurentName: "Burger Haven",
		cusion: "American",
		rating: 1,
		restaurantMenu: [
			{
				itemName: "Cheeseburger",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d020",
			},
			{
				itemName: "Bacon Burger",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d021",
			},
			{
				itemName: "Veggie Burger",
				price: 7.99,
				_id: "669166a99bcf7d0c8af0d022",
			},
			{
				itemName: "BBQ Burger",
				price: 10.99,
				_id: "669166a99bcf7d0c8af0d023",
			},
			{
				itemName: "Chicken Sandwich",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d024",
			},
			{
				itemName: "French Fries",
				price: 3.99,
				_id: "669166a99bcf7d0c8af0d025",
			},
			{
				itemName: "Onion Rings",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d026",
			},
			{
				itemName: "Milkshake",
				price: 5.99,
				_id: "669166a99bcf7d0c8af0d027",
			},
			{
				itemName: "Coleslaw",
				price: 2.99,
				_id: "669166a99bcf7d0c8af0d028",
			},
			{
				itemName: "Buffalo Wings",
				price: 6.99,
				_id: "669166a99bcf7d0c8af0d029",
			},
			{
				itemName: "Hot Dog",
				price: 5.99,
				_id: "669166a99bcf7d0c8af0d02a",
			},
			{
				itemName: "Apple Pie",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d02b",
			},
		],
	},
	{
		_id: "669166a99bcf7d0c8af0d02d",
		imageUrl: "https://picsum.photos/id/1035/200/150",
		restaurentName: "Pasta Paradise",
		cusion: "Italian",
		rating: 2,
		restaurantMenu: [
			{
				itemName: "Penne Alfredo",
				price: 13.99,
				_id: "669166a99bcf7d0c8af0d02e",
			},
			{
				itemName: "Rigatoni Bolognese",
				price: 14.99,
				_id: "669166a99bcf7d0c8af0d02f",
			},
			{
				itemName: "Gnocchi Pesto",
				price: 13.99,
				_id: "669166a99bcf7d0c8af0d030",
			},
			{
				itemName: "Ravioli",
				price: 12.99,
				_id: "669166a99bcf7d0c8af0d031",
			},
			{
				itemName: "Bruschetta",
				price: 6.99,
				_id: "669166a99bcf7d0c8af0d032",
			},
			{
				itemName: "Caprese Salad",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d033",
			},
			{
				itemName: "Minestrone Soup",
				price: 7.99,
				_id: "669166a99bcf7d0c8af0d034",
			},
			{
				itemName: "Tiramisu",
				price: 6.99,
				_id: "669166a99bcf7d0c8af0d035",
			},
			{
				itemName: "Cannoli",
				price: 5.99,
				_id: "669166a99bcf7d0c8af0d036",
			},
			{
				itemName: "Fettuccine Alfredo",
				price: 14.99,
				_id: "669166a99bcf7d0c8af0d037",
			},
			{
				itemName: "Penne Arrabbiata",
				price: 11.99,
				_id: "669166a99bcf7d0c8af0d038",
			},
			{
				itemName: "Lasagna",
				price: 13.99,
				_id: "669166a99bcf7d0c8af0d039",
			},
		],
	},
	{
		_id: "669166a99bcf7d0c8af0d03b",
		imageUrl: "https://picsum.photos/id/1043/200/150",
		restaurentName: "Taco Town",
		cusion: "Mexican",
		rating: 2,
		restaurantMenu: [
			{
				itemName: "Tacos",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d03c",
			},
			{
				itemName: "Burrito",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d03d",
			},
			{
				itemName: "Enchiladas",
				price: 10.99,
				_id: "669166a99bcf7d0c8af0d03e",
			},
			{
				itemName: "Quesadilla",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d03f",
			},
			{
				itemName: "Nachos",
				price: 7.99,
				_id: "669166a99bcf7d0c8af0d040",
			},
			{
				itemName: "Fajitas",
				price: 12.99,
				_id: "669166a99bcf7d0c8af0d041",
			},
			{
				itemName: "Chimichanga",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d042",
			},
			{
				itemName: "Tamales",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d043",
			},
			{
				itemName: "Guacamole",
				price: 5.99,
				_id: "669166a99bcf7d0c8af0d044",
			},
			{
				itemName: "Salsa & Chips",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d045",
			},
			{
				itemName: "Flan",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d046",
			},
			{
				itemName: "Churros",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d047",
			},
		],
	},
	{
		_id: "669166a99bcf7d0c8af0d049",
		imageUrl: "https://picsum.photos/id/1050/200/150",
		restaurentName: "Curry House",
		cusion: "Indian",
		rating: 2,
		restaurantMenu: [
			{
				itemName: "Butter Chicken",
				price: 11.99,
				_id: "669166a99bcf7d0c8af0d04a",
			},
			{
				itemName: "Paneer Tikka",
				price: 10.99,
				_id: "669166a99bcf7d0c8af0d04b",
			},
			{
				itemName: "Chicken Tikka Masala",
				price: 12.99,
				_id: "669166a99bcf7d0c8af0d04c",
			},
			{
				itemName: "Saag Paneer",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d04d",
			},
			{
				itemName: "Rogan Josh",
				price: 13.99,
				_id: "669166a99bcf7d0c8af0d04e",
			},
			{
				itemName: "Biryani",
				price: 10.99,
				_id: "669166a99bcf7d0c8af0d04f",
			},
			{
				itemName: "Samosa",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d050",
			},
			{
				itemName: "Naan",
				price: 2.99,
				_id: "669166a99bcf7d0c8af0d051",
			},
			{
				itemName: "Chole Bhature",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d052",
			},
			{
				itemName: "Dosa",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d053",
			},
			{
				itemName: "Gulab Jamun",
				price: 3.99,
				_id: "669166a99bcf7d0c8af0d054",
			},
			{
				itemName: "Ras Malai",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d055",
			},
		],
	},
	{
		_id: "669166a99bcf7d0c8af0d057",
		imageUrl: "https://picsum.photos/id/1063/200/150",
		restaurentName: "Noodle Nirvana",
		cusion: "Japanese",
		rating: 2,
		restaurantMenu: [
			{
				itemName: "California Roll",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d058",
			},
			{
				itemName: "Spicy Tuna Roll",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d059",
			},
			{
				itemName: "Tempura",
				price: 10.99,
				_id: "669166a99bcf7d0c8af0d05a",
			},
			{
				itemName: "Sashimi",
				price: 12.99,
				_id: "669166a99bcf7d0c8af0d05b",
			},
			{
				itemName: "Nigiri",
				price: 11.99,
				_id: "669166a99bcf7d0c8af0d05c",
			},
			{
				itemName: "Miso Soup",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d05d",
			},
			{
				itemName: "Edamame",
				price: 5.99,
				_id: "669166a99bcf7d0c8af0d05e",
			},
			{
				itemName: "Udon",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d05f",
			},
			{
				itemName: "Ramen",
				price: 11.99,
				_id: "669166a99bcf7d0c8af0d060",
			},
			{
				itemName: "Katsu Curry",
				price: 12.99,
				_id: "669166a99bcf7d0c8af0d061",
			},
			{
				itemName: "Mochi",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d062",
			},
			{
				itemName: "Green Tea Ice Cream",
				price: 3.99,
				_id: "669166a99bcf7d0c8af0d063",
			},
		],
	},
	{
		_id: "669166a99bcf7d0c8af0d065",
		imageUrl: "https://picsum.photos/id/1069/200/150",
		restaurentName: "Grill Master",
		cusion: "American",
		rating: 2,
		restaurantMenu: [
			{
				itemName: "Cheeseburger",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d066",
			},
			{
				itemName: "Bacon Burger",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d067",
			},
			{
				itemName: "Veggie Burger",
				price: 7.99,
				_id: "669166a99bcf7d0c8af0d068",
			},
			{
				itemName: "BBQ Burger",
				price: 10.99,
				_id: "669166a99bcf7d0c8af0d069",
			},
			{
				itemName: "Chicken Sandwich",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d06a",
			},
			{
				itemName: "French Fries",
				price: 3.99,
				_id: "669166a99bcf7d0c8af0d06b",
			},
			{
				itemName: "Onion Rings",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d06c",
			},
			{
				itemName: "Milkshake",
				price: 5.99,
				_id: "669166a99bcf7d0c8af0d06d",
			},
			{
				itemName: "Coleslaw",
				price: 2.99,
				_id: "669166a99bcf7d0c8af0d06e",
			},
			{
				itemName: "Buffalo Wings",
				price: 6.99,
				_id: "669166a99bcf7d0c8af0d06f",
			},
			{
				itemName: "Hot Dog",
				price: 5.99,
				_id: "669166a99bcf7d0c8af0d070",
			},
			{
				itemName: "Apple Pie",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d071",
			},
		],
	},
	{
		_id: "669166a99bcf7d0c8af0d073",
		imageUrl: "https://picsum.photos/id/1074/200/150",
		restaurentName: "Ristorante Roma",
		cusion: "Italian",
		rating: 3,
		restaurantMenu: [
			{
				itemName: "Margherita Pizza",
				price: 12.99,
				_id: "669166a99bcf7d0c8af0d074",
			},
			{
				itemName: "Spaghetti Carbonara",
				price: 14.99,
				_id: "669166a99bcf7d0c8af0d075",
			},
			{
				itemName: "Lasagna",
				price: 13.99,
				_id: "669166a99bcf7d0c8af0d076",
			},
			{
				itemName: "Fettuccine Alfredo",
				price: 14.99,
				_id: "669166a99bcf7d0c8af0d077",
			},
			{
				itemName: "Penne Arrabbiata",
				price: 11.99,
				_id: "669166a99bcf7d0c8af0d078",
			},
			{
				itemName: "Bruschetta",
				price: 6.99,
				_id: "669166a99bcf7d0c8af0d079",
			},
			{
				itemName: "Caprese Salad",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d07a",
			},
			{
				itemName: "Minestrone Soup",
				price: 7.99,
				_id: "669166a99bcf7d0c8af0d07b",
			},
			{
				itemName: "Risotto",
				price: 15.99,
				_id: "669166a99bcf7d0c8af0d07c",
			},
			{
				itemName: "Gnocchi",
				price: 13.99,
				_id: "669166a99bcf7d0c8af0d07d",
			},
			{
				itemName: "Cannoli",
				price: 5.99,
				_id: "669166a99bcf7d0c8af0d07e",
			},
			{
				itemName: "Tiramisu",
				price: 6.99,
				_id: "669166a99bcf7d0c8af0d07f",
			},
		],
	},
	{
		_id: "669166a99bcf7d0c8af0d081",
		imageUrl: "https://picsum.photos/id/1080/200/150",
		restaurentName: "Burrito Brothers",
		cusion: "Mexican",
		rating: 3,
		restaurantMenu: [
			{
				itemName: "Tacos",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d082",
			},
			{
				itemName: "Burrito",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d083",
			},
			{
				itemName: "Enchiladas",
				price: 10.99,
				_id: "669166a99bcf7d0c8af0d084",
			},
			{
				itemName: "Quesadilla",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d085",
			},
			{
				itemName: "Nachos",
				price: 7.99,
				_id: "669166a99bcf7d0c8af0d086",
			},
			{
				itemName: "Fajitas",
				price: 12.99,
				_id: "669166a99bcf7d0c8af0d087",
			},
			{
				itemName: "Chimichanga",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d088",
			},
			{
				itemName: "Tamales",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d089",
			},
			{
				itemName: "Guacamole",
				price: 5.99,
				_id: "669166a99bcf7d0c8af0d08a",
			},
			{
				itemName: "Salsa & Chips",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d08b",
			},
			{
				itemName: "Flan",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d08c",
			},
			{
				itemName: "Churros",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d08d",
			},
		],
	},
	{
		_id: "669166a99bcf7d0c8af0d08f",
		imageUrl: "https://picsum.photos/id/1084/200/150",
		restaurentName: "Masala Magic",
		cusion: "Indian",
		rating: 3,
		restaurantMenu: [
			{
				itemName: "Butter Chicken",
				price: 11.99,
				_id: "669166a99bcf7d0c8af0d090",
			},
			{
				itemName: "Paneer Tikka",
				price: 10.99,
				_id: "669166a99bcf7d0c8af0d091",
			},
			{
				itemName: "Chicken Tikka Masala",
				price: 12.99,
				_id: "669166a99bcf7d0c8af0d092",
			},
			{
				itemName: "Saag Paneer",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d093",
			},
			{
				itemName: "Rogan Josh",
				price: 13.99,
				_id: "669166a99bcf7d0c8af0d094",
			},
			{
				itemName: "Biryani",
				price: 10.99,
				_id: "669166a99bcf7d0c8af0d095",
			},
			{
				itemName: "Samosa",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d096",
			},
			{
				itemName: "Naan",
				price: 2.99,
				_id: "669166a99bcf7d0c8af0d097",
			},
			{
				itemName: "Chole Bhature",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d098",
			},
			{
				itemName: "Dosa",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d099",
			},
			{
				itemName: "Gulab Jamun",
				price: 3.99,
				_id: "669166a99bcf7d0c8af0d09a",
			},
			{
				itemName: "Ras Malai",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d09b",
			},
		],
	},
	{
		_id: "669166a99bcf7d0c8af0d09d",
		imageUrl: "https://picsum.photos/id/1085/200/150",
		restaurentName: "Tempura Treats",
		cusion: "Japanese",
		rating: 3,
		restaurantMenu: [
			{
				itemName: "California Roll",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d09e",
			},
			{
				itemName: "Spicy Tuna Roll",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d09f",
			},
			{
				itemName: "Tempura",
				price: 10.99,
				_id: "669166a99bcf7d0c8af0d0a0",
			},
			{
				itemName: "Sashimi",
				price: 12.99,
				_id: "669166a99bcf7d0c8af0d0a1",
			},
			{
				itemName: "Nigiri",
				price: 11.99,
				_id: "669166a99bcf7d0c8af0d0a2",
			},
			{
				itemName: "Miso Soup",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d0a3",
			},
			{
				itemName: "Edamame",
				price: 5.99,
				_id: "669166a99bcf7d0c8af0d0a4",
			},
			{
				itemName: "Udon",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d0a5",
			},
			{
				itemName: "Ramen",
				price: 11.99,
				_id: "669166a99bcf7d0c8af0d0a6",
			},
			{
				itemName: "Katsu Curry",
				price: 12.99,
				_id: "669166a99bcf7d0c8af0d0a7",
			},
			{
				itemName: "Mochi",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d0a8",
			},
			{
				itemName: "Green Tea Ice Cream",
				price: 3.99,
				_id: "669166a99bcf7d0c8af0d0a9",
			},
		],
	},
	{
		_id: "669166a99bcf7d0c8af0d0ab",
		imageUrl: "https://picsum.photos/id/1092/200/150",
		restaurentName: "BBQ Bliss",
		cusion: "American",
		rating: 3,
		restaurantMenu: [
			{
				itemName: "Cheeseburger",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d0ac",
			},
			{
				itemName: "Bacon Burger",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d0ad",
			},
			{
				itemName: "Veggie Burger",
				price: 7.99,
				_id: "669166a99bcf7d0c8af0d0ae",
			},
			{
				itemName: "BBQ Burger",
				price: 10.99,
				_id: "669166a99bcf7d0c8af0d0af",
			},
			{
				itemName: "Chicken Sandwich",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d0b0",
			},
			{
				itemName: "French Fries",
				price: 3.99,
				_id: "669166a99bcf7d0c8af0d0b1",
			},
			{
				itemName: "Onion Rings",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d0b2",
			},
			{
				itemName: "Milkshake",
				price: 5.99,
				_id: "669166a99bcf7d0c8af0d0b3",
			},
			{
				itemName: "Coleslaw",
				price: 2.99,
				_id: "669166a99bcf7d0c8af0d0b4",
			},
			{
				itemName: "Buffalo Wings",
				price: 6.99,
				_id: "669166a99bcf7d0c8af0d0b5",
			},
			{
				itemName: "Hot Dog",
				price: 5.99,
				_id: "669166a99bcf7d0c8af0d0b6",
			},
			{
				itemName: "Apple Pie",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d0b7",
			},
		],
	},
	{
		_id: "669166a99bcf7d0c8af0d0b9",
		imageUrl: "https://picsum.photos/id/1100/200/150",
		restaurentName: "Trattoria Toscana",
		cusion: "Italian",
		rating: 4,
		restaurantMenu: [
			{
				itemName: "Margherita Pizza",
				price: 12.99,
				_id: "669166a99bcf7d0c8af0d0ba",
			},
			{
				itemName: "Spaghetti Carbonara",
				price: 14.99,
				_id: "669166a99bcf7d0c8af0d0bb",
			},
			{
				itemName: "Lasagna",
				price: 13.99,
				_id: "669166a99bcf7d0c8af0d0bc",
			},
			{
				itemName: "Fettuccine Alfredo",
				price: 14.99,
				_id: "669166a99bcf7d0c8af0d0bd",
			},
			{
				itemName: "Penne Arrabbiata",
				price: 11.99,
				_id: "669166a99bcf7d0c8af0d0be",
			},
			{
				itemName: "Bruschetta",
				price: 6.99,
				_id: "669166a99bcf7d0c8af0d0bf",
			},
			{
				itemName: "Caprese Salad",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d0c0",
			},
			{
				itemName: "Minestrone Soup",
				price: 7.99,
				_id: "669166a99bcf7d0c8af0d0c1",
			},
			{
				itemName: "Risotto",
				price: 15.99,
				_id: "669166a99bcf7d0c8af0d0c2",
			},
			{
				itemName: "Gnocchi",
				price: 13.99,
				_id: "669166a99bcf7d0c8af0d0c3",
			},
			{
				itemName: "Cannoli",
				price: 5.99,
				_id: "669166a99bcf7d0c8af0d0c4",
			},
			{
				itemName: "Tiramisu",
				price: 6.99,
				_id: "669166a99bcf7d0c8af0d0c5",
			},
		],
	},
	{
		_id: "669166a99bcf7d0c8af0d0c7",
		imageUrl: "https://picsum.photos/id/1103/200/150",
		restaurentName: "Guacamole Grill",
		cusion: "Mexican",
		rating: 4,
		restaurantMenu: [
			{
				itemName: "Tacos",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d0c8",
			},
			{
				itemName: "Burrito",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d0c9",
			},
			{
				itemName: "Enchiladas",
				price: 10.99,
				_id: "669166a99bcf7d0c8af0d0ca",
			},
			{
				itemName: "Quesadilla",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d0cb",
			},
			{
				itemName: "Nachos",
				price: 7.99,
				_id: "669166a99bcf7d0c8af0d0cc",
			},
			{
				itemName: "Fajitas",
				price: 12.99,
				_id: "669166a99bcf7d0c8af0d0cd",
			},
			{
				itemName: "Chimichanga",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d0ce",
			},
			{
				itemName: "Tamales",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d0cf",
			},
			{
				itemName: "Guacamole",
				price: 5.99,
				_id: "669166a99bcf7d0c8af0d0d0",
			},
			{
				itemName: "Salsa & Chips",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d0d1",
			},
			{
				itemName: "Flan",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d0d2",
			},
			{
				itemName: "Churros",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d0d3",
			},
		],
	},
	{
		_id: "669166a99bcf7d0c8af0d0d5",
		imageUrl: "https://picsum.photos/id/1111/200/150",
		restaurentName: "Bombay Bistro",
		cusion: "Indian",
		rating: 4,
		restaurantMenu: [
			{
				itemName: "Butter Chicken",
				price: 11.99,
				_id: "669166a99bcf7d0c8af0d0d6",
			},
			{
				itemName: "Paneer Tikka",
				price: 10.99,
				_id: "669166a99bcf7d0c8af0d0d7",
			},
			{
				itemName: "Chicken Tikka Masala",
				price: 12.99,
				_id: "669166a99bcf7d0c8af0d0d8",
			},
			{
				itemName: "Saag Paneer",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d0d9",
			},
			{
				itemName: "Rogan Josh",
				price: 13.99,
				_id: "669166a99bcf7d0c8af0d0da",
			},
			{
				itemName: "Biryani",
				price: 10.99,
				_id: "669166a99bcf7d0c8af0d0db",
			},
			{
				itemName: "Samosa",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d0dc",
			},
			{
				itemName: "Naan",
				price: 2.99,
				_id: "669166a99bcf7d0c8af0d0dd",
			},
			{
				itemName: "Chole Bhature",
				price: 9.99,
				_id: "669166a99bcf7d0c8af0d0de",
			},
			{
				itemName: "Dosa",
				price: 8.99,
				_id: "669166a99bcf7d0c8af0d0df",
			},
			{
				itemName: "Gulab Jamun",
				price: 3.99,
				_id: "669166a99bcf7d0c8af0d0e0",
			},
			{
				itemName: "Ras Malai",
				price: 4.99,
				_id: "669166a99bcf7d0c8af0d0e1",
			},
		],
	},
	{
		_id: "669166aa9bcf7d0c8af0d0e3",
		imageUrl: "https://picsum.photos/id/1116/200/150",
		restaurentName: "Sakura Sushi",
		cusion: "Japanese",
		rating: 4,
		restaurantMenu: [
			{
				itemName: "California Roll",
				price: 8.99,
				_id: "669166aa9bcf7d0c8af0d0e4",
			},
			{
				itemName: "Spicy Tuna Roll",
				price: 9.99,
				_id: "669166aa9bcf7d0c8af0d0e5",
			},
			{
				itemName: "Tempura",
				price: 10.99,
				_id: "669166aa9bcf7d0c8af0d0e6",
			},
			{
				itemName: "Sashimi",
				price: 12.99,
				_id: "669166aa9bcf7d0c8af0d0e7",
			},
			{
				itemName: "Nigiri",
				price: 11.99,
				_id: "669166aa9bcf7d0c8af0d0e8",
			},
			{
				itemName: "Miso Soup",
				price: 4.99,
				_id: "669166aa9bcf7d0c8af0d0e9",
			},
			{
				itemName: "Edamame",
				price: 5.99,
				_id: "669166aa9bcf7d0c8af0d0ea",
			},
			{
				itemName: "Udon",
				price: 9.99,
				_id: "669166aa9bcf7d0c8af0d0eb",
			},
			{
				itemName: "Ramen",
				price: 11.99,
				_id: "669166aa9bcf7d0c8af0d0ec",
			},
			{
				itemName: "Katsu Curry",
				price: 12.99,
				_id: "669166aa9bcf7d0c8af0d0ed",
			},
			{
				itemName: "Mochi",
				price: 4.99,
				_id: "669166aa9bcf7d0c8af0d0ee",
			},
			{
				itemName: "Green Tea Ice Cream",
				price: 3.99,
				_id: "669166aa9bcf7d0c8af0d0ef",
			},
		],
	},
	{
		_id: "669166aa9bcf7d0c8af0d0f1",
		imageUrl: "https://picsum.photos/id/1120/200/150",
		restaurentName: "Grill House",
		cusion: "American",
		rating: 4,
		restaurantMenu: [
			{
				itemName: "Cheeseburger",
				price: 8.99,
				_id: "669166aa9bcf7d0c8af0d0f2",
			},
			{
				itemName: "Bacon Burger",
				price: 9.99,
				_id: "669166aa9bcf7d0c8af0d0f3",
			},
			{
				itemName: "Veggie Burger",
				price: 7.99,
				_id: "669166aa9bcf7d0c8af0d0f4",
			},
			{
				itemName: "BBQ Burger",
				price: 10.99,
				_id: "669166aa9bcf7d0c8af0d0f5",
			},
			{
				itemName: "Chicken Sandwich",
				price: 8.99,
				_id: "669166aa9bcf7d0c8af0d0f6",
			},
			{
				itemName: "French Fries",
				price: 3.99,
				_id: "669166aa9bcf7d0c8af0d0f7",
			},
			{
				itemName: "Onion Rings",
				price: 4.99,
				_id: "669166aa9bcf7d0c8af0d0f8",
			},
			{
				itemName: "Milkshake",
				price: 5.99,
				_id: "669166aa9bcf7d0c8af0d0f9",
			},
			{
				itemName: "Coleslaw",
				price: 2.99,
				_id: "669166aa9bcf7d0c8af0d0fa",
			},
			{
				itemName: "Buffalo Wings",
				price: 6.99,
				_id: "669166aa9bcf7d0c8af0d0fb",
			},
			{
				itemName: "Hot Dog",
				price: 5.99,
				_id: "669166aa9bcf7d0c8af0d0fc",
			},
			{
				itemName: "Apple Pie",
				price: 4.99,
				_id: "669166aa9bcf7d0c8af0d0fd",
			},
		],
	},
	{
		_id: "669166aa9bcf7d0c8af0d0ff",
		imageUrl: "https://picsum.photos/id/1122/200/150",
		restaurentName: "Gusto Italiano",
		cusion: "Italian",
		rating: 5,
		restaurantMenu: [
			{
				itemName: "Margherita Pizza",
				price: 12.99,
				_id: "669166aa9bcf7d0c8af0d100",
			},
			{
				itemName: "Spaghetti Carbonara",
				price: 14.99,
				_id: "669166aa9bcf7d0c8af0d101",
			},
			{
				itemName: "Lasagna",
				price: 13.99,
				_id: "669166aa9bcf7d0c8af0d102",
			},
			{
				itemName: "Fettuccine Alfredo",
				price: 14.99,
				_id: "669166aa9bcf7d0c8af0d103",
			},
			{
				itemName: "Penne Arrabbiata",
				price: 11.99,
				_id: "669166aa9bcf7d0c8af0d104",
			},
			{
				itemName: "Bruschetta",
				price: 6.99,
				_id: "669166aa9bcf7d0c8af0d105",
			},
			{
				itemName: "Caprese Salad",
				price: 8.99,
				_id: "669166aa9bcf7d0c8af0d106",
			},
			{
				itemName: "Minestrone Soup",
				price: 7.99,
				_id: "669166aa9bcf7d0c8af0d107",
			},
			{
				itemName: "Risotto",
				price: 15.99,
				_id: "669166aa9bcf7d0c8af0d108",
			},
			{
				itemName: "Gnocchi",
				price: 13.99,
				_id: "669166aa9bcf7d0c8af0d109",
			},
			{
				itemName: "Cannoli",
				price: 5.99,
				_id: "669166aa9bcf7d0c8af0d10a",
			},
			{
				itemName: "Tiramisu",
				price: 6.99,
				_id: "669166aa9bcf7d0c8af0d10b",
			},
		],
	},
	{
		_id: "669166aa9bcf7d0c8af0d10d",
		imageUrl: "https://picsum.photos/id/1134/200/150",
		restaurentName: "Salsa & Spice",
		cusion: "Mexican",
		rating: 5,
		restaurantMenu: [
			{
				itemName: "Tacos",
				price: 8.99,
				_id: "669166aa9bcf7d0c8af0d10e",
			},
			{
				itemName: "Burrito",
				price: 9.99,
				_id: "669166aa9bcf7d0c8af0d10f",
			},
			{
				itemName: "Enchiladas",
				price: 10.99,
				_id: "669166aa9bcf7d0c8af0d110",
			},
			{
				itemName: "Quesadilla",
				price: 8.99,
				_id: "669166aa9bcf7d0c8af0d111",
			},
			{
				itemName: "Nachos",
				price: 7.99,
				_id: "669166aa9bcf7d0c8af0d112",
			},
			{
				itemName: "Fajitas",
				price: 12.99,
				_id: "669166aa9bcf7d0c8af0d113",
			},
			{
				itemName: "Chimichanga",
				price: 9.99,
				_id: "669166aa9bcf7d0c8af0d114",
			},
			{
				itemName: "Tamales",
				price: 8.99,
				_id: "669166aa9bcf7d0c8af0d115",
			},
			{
				itemName: "Guacamole",
				price: 5.99,
				_id: "669166aa9bcf7d0c8af0d116",
			},
			{
				itemName: "Salsa & Chips",
				price: 4.99,
				_id: "669166aa9bcf7d0c8af0d117",
			},
			{
				itemName: "Flan",
				price: 4.99,
				_id: "669166aa9bcf7d0c8af0d118",
			},
			{
				itemName: "Churros",
				price: 4.99,
				_id: "669166aa9bcf7d0c8af0d119",
			},
		],
	},
	{
		_id: "669166aa9bcf7d0c8af0d11b",
		imageUrl: "https://picsum.photos/id/1136/200/150",
		restaurentName: "Tandoori Treasures",
		cusion: "Indian",
		rating: 5,
		restaurantMenu: [
			{
				itemName: "Butter Chicken",
				price: 11.99,
				_id: "669166aa9bcf7d0c8af0d11c",
			},
			{
				itemName: "Paneer Tikka",
				price: 10.99,
				_id: "669166aa9bcf7d0c8af0d11d",
			},
			{
				itemName: "Chicken Tikka Masala",
				price: 12.99,
				_id: "669166aa9bcf7d0c8af0d11e",
			},
			{
				itemName: "Saag Paneer",
				price: 9.99,
				_id: "669166aa9bcf7d0c8af0d11f",
			},
			{
				itemName: "Rogan Josh",
				price: 13.99,
				_id: "669166aa9bcf7d0c8af0d120",
			},
			{
				itemName: "Biryani",
				price: 10.99,
				_id: "669166aa9bcf7d0c8af0d121",
			},
			{
				itemName: "Samosa",
				price: 4.99,
				_id: "669166aa9bcf7d0c8af0d122",
			},
			{
				itemName: "Naan",
				price: 2.99,
				_id: "669166aa9bcf7d0c8af0d123",
			},
			{
				itemName: "Chole Bhature",
				price: 9.99,
				_id: "669166aa9bcf7d0c8af0d124",
			},
			{
				itemName: "Dosa",
				price: 8.99,
				_id: "669166aa9bcf7d0c8af0d125",
			},
			{
				itemName: "Gulab Jamun",
				price: 3.99,
				_id: "669166aa9bcf7d0c8af0d126",
			},
			{
				itemName: "Ras Malai",
				price: 4.99,
				_id: "669166aa9bcf7d0c8af0d127",
			},
		],
	},
];

router.get("/", async (req, res, next) => {
	try {
		var result = await Restaurent.find({}, { __v: 0 });
		// var result = await Restaurent.find({price:699},{__v:0});

		res.send(result);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	var restaurent = new Restaurent({
		imageUrl: req.body.imageUrl,
		restaurentName: req.body.restaurentName,
		cusion: req.body.cusion,
		rating: req.body.rating,
		restaurantMenu: req.body.restaurantMenu,
	});

	try {
		var result = await restaurent.save();
		res.send(result);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		var restaurent = await Restaurent.findById(req.params.id, { __v: 0 });
		// var restaurent = await Restaurent.findOne({_id: req.params.id}, {__v:0})
		res.send(restaurent);
	} catch (error) {
		next(error);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		var restaurent = await Restaurent.findByIdAndUpdate(
			req.params.id,
			{
				imageUrl: req.body.imageUrl,
				restaurentName: req.body.restaurentName,
				cusion: req.body.cusion,
				rating: req.body.rating,
			},
			{
				new: true,
			}
		);
		res.send(restaurent);
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		var restaurent = await Restaurent.findByIdAndDelete(req.params.id, {
			__v: 0,
		});
		// var Restaurents = await Restaurents.findOne({_id: req.params.id}, {__v:0})
		res.send(restaurent);
	} catch (error) {
		next(error);
	}
});

// router.delete("/", async (req, res, next) => {
// 	try {
// 		var restaurent = await Restaurent.deleteMany();
// 		// var Restaurents = await Restaurents.findOne({_id: req.params.id}, {__v:0})
// 		res.send(restaurent);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// router.post("/sampledata", async (req, res, next) => {
// 	for (let index = 0; index < SampleRestaurentsList.length; index++) {
// 		const restaurent = SampleRestaurentsList[index];

// 		var addedrestaurent = new Restaurent({
// 			imageUrl: restaurent.imageUrl,
// 			restaurentName: restaurent.restaurentName,
// 			cusion: restaurent.cusion,
// 			rating: restaurent.rating,
// 			pramoted: index % 3 == 0,
// 			restaurantMenu: restaurent.restaurantMenu,
// 		});

// 		try {
// 			await addedrestaurent.save();
// 		} catch (error) {
// 			next(error);
// 		}
// 	}
// 	res.send();
// });

module.exports = router;
