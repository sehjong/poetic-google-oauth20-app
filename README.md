# Poetic Google OAuth2.0 App
The Poetic Google OAuth2.0 App is a fullstack web application utilizing Google's secure authentication strategy.

<img width="1440" alt="Screen Shot 2023-04-02 at 9 32 21 PM" src="https://user-images.githubusercontent.com/103136497/229854167-f642872f-a16b-4311-9b94-3a37736259b4.png">

**Link to project:** https://poetic.herokuapp.com/

## How It's Made:

**Tech used:** HTML, Handlebars, CSS, Materialize, JavaScript, Node.js, MongoDB, Mongoose, Heroku, MVC pattern/architecture

In creating this app, I used MVC principles to structure, encapsulate, and abstract away the database from the client and server.

Protected routes - This app will check whether a user is logged in to protect routes and reroute to the appropriate view.

Users can write and submit Public and Private poems with a rich text editor.

Mongoose and MongoDB - to set the schemas to model and format the data that goes to and from the database.

Materialize - a modern responsive front-end framework based on Material Design and Google's flat aesthetics.

Handlebars for the templating engine.

## Optimizations:

Since DOM manipulations are costly, either in time or resources, I would improve this app with react to paint the virtual DOM and improve the layout.

## Lessons Learned:

One of the challenges I encountered was with a validation error in the User model that I wasn't able to figure out, until I realized I had set the wrong property on my schema, which resolved the issue.

I had forgotten to export a module and require it which took me a while to track down and resolve.

Resolved issue looping through the poem object in my index.hbs that was passed in - a user value that's attached to a specific poem - comparing the logged in user value from the poem object, by backing out of the loop ../user and their separate _id.
