#  Beer Delivery App

## Admin Experience:
https://user-images.githubusercontent.com/102389687/236335063-7e3c165c-a76f-4b53-a4bb-a15a006fa7ba.mp4

## Customer Experience (making a new order):
https://user-images.githubusercontent.com/102389687/236335379-9b1beb8b-36ba-4fd7-9118-6b75af446a96.mp4

## Seller Experience:


https://user-images.githubusercontent.com/102389687/236335563-2a8b94c8-f1cc-4a06-a905-5d7139bb237d.mp4

## Customer Experience (receiving an order):


https://user-images.githubusercontent.com/102389687/236335627-1c13d42b-b968-47e6-82a9-7a892f87c4a3.mp4




## About:
This project was developed as part of the Trybe development course. It's a web application that connects beer sellers with buyers. Buyers can visit the website, browse available products, and choose from a list of sellers. Once they make a purchase, an order is created in the system with the status "in preparation". The seller then prepares the order and contacts a delivery driver, changing the order status to "sent". Once the orders arrive at their destination, buyers should change the order status to "arrived". The website allows buyers to view all their orders and their respective statuses. The same feature is available to sellers, who can only be created by the system admin.

All information is transmitted via the front-end and back-end through an API and stored in a MySQL database. During development, we conducted extensive testing to ensure the application was functioning as expected. The project was developed as a group effort, and I was responsible for developing the back-end, collaborating with other team members by contributing code and reviewing their work. The other developers who contributed to the project were @Abernardes19, @CarlaUyemura, @danilobarrosribeiro, and @PamelaCP.

## Concepts:
  - Database modeling;
  - RESTfull API;
  - Test-Driven Development (TDD);
  - Front-end;

## Database ER Diagram:
![ER database Diagram delivery app](https://user-images.githubusercontent.com/102389687/236294722-951648c7-fafd-4558-bb97-036a6c2ade84.png)

## Technologies:
- JavaScript;
- Express;
- Sequelize;
- MySQL;
- JSON Web Token (JWT), for authentication;
- Mocha, Chai, and Sinon for tests;
- React;
- React Context API;
- React Router DOM;
- CSS;
- Jest for tests;

## Files:
All files inside (`backend/src`) and (`frontend/src`) folder were developed by the group. The others were developed by Trybe team.

## How to run the project:
1. Run (`npm install`) in the source folder;
2. Go to (`backend/`) folder and rename (`.env-exemple`) file to (`.env`);
3. Inside the .env file, make sure to update the MYSQL_PASSWORD environment variable with the correct password for your MySQL database;
4. In the source folder, run (`npm start`);
5. The website should open and it is ready to navigate at `http://localhost:3000/login`;

## Standards user logins (ready to use):
  - Buyer:
    - username: `zebirita@email.com`;
    - password: `$#zebirita#$`;
  - Seller:
    - username: `fulana@deliveryapp.com`;
    - password: `fulana@123`;
  - Admin:
    - username: `adm@deliveryapp.com`;
    - password: `--adm2@21!!--`;
