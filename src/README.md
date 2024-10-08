# Product Recommendation System

This project implements a basic product recommendation system.


## Setup

1. CLone the repository "git clone https://github.com/git7k/product_recommendation-"
2. Install Node.js
3. Install mongoDB
4. Start MongoDB- sudo systemctl start mongod
5. npm install
6. create .env in the root folder- MONGODB_URI=mongodb://mongodb:27017/ecommerce_recommendationdb
PORT=3000
7. inside project folder compile type script- npx tsc
8. node dist/app.js


OR

Accessing docker image
1. Clone the repo- "git clone https://github.com/git7k/product_recommendation-"
2. Install docker
3. Inside the root folder Build app- "docker-compose up --build"
4. access the app at http://localhost:3000

## API Endpoints
 Accessible on localhost:3000

- POST /api/products: Add a new product
- GET /api/products: Retrieve all products (with pagination)
- POST /api/users/:userId/purchases: Record a user's purchase
- GET /api/users/:userId/recommendations: Get product recommendations for a user

## Asumptions
- only one product is purchased 
- user ID(integer) is created when purchase is made


## Recommendation Algorithm Explanation

This algoritm uses combination of user past purchase, product categories, and overall popularity of products.

1. Gathering data:
   - Fetch all purchases made by all users.
   - Get the purchase history of  specific user 
   - Get all the products

2. See what products user has already bought to know the category   of product and not recommend the stuff user already bought.

3. Check what products other users buy, if something is not bought by the specific user, add it to recommendation list.

4. Consider product categories from which the user has bought before, find product in same category and add to recommondation list.

5. Consider the overall product popularity based on how many times it has been purchased by all the users.

6. Finally, combine and sort our recommendation list by merging recommendations from step 3,4 and 5. Remove any duplicates and limit recommendations to 5 in number. 
 

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- TypeScript


