#Earn Your Cheat

**Earn Your Cheat** is a mobile-first app designed to track your daily health and fitness choices to earn points towards a cheat food of your choice.

Here's a video walkthrough of how to use our app: https://youtu.be/irtDt3QiQyE

View our deployed app here: http://earnyourcheat.herokuapp.com/


###Features
1. The **home page** gives you a brief introduction to the app and allows you to sign up/log in via the form or externally using Facebook.
2. If you are a first-time user, you will be redirected to the **levels page** where you can choose your difficulty. Depending on what you choose, you will be given varying number of points to start with.
3. You will then be redirected to your **main page** where you'll see your total points.
4. Here you can use the switches to record whether you ate healthy and drank enough water for each part of the day. The app automatically determines time of day, but if you forget to log your progress, you can always go back and record it.
5. Hitting the **Get Your Points** button will increment your points for eating healthy and drinking enough water.
6. By clicking on the **Activities** button, you are redirected to the activities page where you can click on each image and log the distance and time you did each activity.
7. Upon submitting that form, you'll be redirected to the main page where your points from doing that activity will have been added to the total.
8. When you get to 400 points for that day, you will receive some bonus points which gives you incentive to be healthy and active every day.
9. Clicking on the blue **total points** will redirect you to a page with three levels of cheats that cost an increasing amount of points to ***earn your cheat***. The point-value of the cheat item will be deducted from your total number of points.

**Note:** There are also admin privileges where an admin can delete users whose points are in the negative.


###Technologies Used
1. For Facebook's external authorization and log in/sign up, we used **Facebook's SDK**.
2. To populate the cheat items, we used the **Nutritionix API**.
3. The app uses a **Materialize** framework, **handlebars** templating and **Express.js** to query our **Postgres** database.
