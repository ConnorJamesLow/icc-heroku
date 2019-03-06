# Contents
 - [What You'll Need](#what-youll-need)
 - [Tips](#Tips)
 - [Deployment Instructions](#deployment-instructions)
   - [Setup](#setup-on-your-local-machine)
   - [Deploy](#deploy-to-heroku-using-the-cli)
   - [Update](#update-your-project)
   - [TL;DR](#heroku-tldr)
 - [MongoDB and Express](#mongodb-and-express)
   - [Local Install](#local-install)
   - [Commands](#commands)
   - [Mongo in Node](#mongo-in-node)
   - [Mongo in Heroku Apps](#mongo-in-heroku-apps)
   - [Express REST API](#express-rest-api)
   - [Express Middleware](#express-middleware)
   - [TL;DR](#mongo-tldr)

# What You'll Need
### Deploy to Heroku
 - [**git**](https://git-scm.com/downloads).
 - [**Node**](https://nodejs.org/en/) (and npm) installed. 
 - A free [**Heroku**](https://www.heroku.com/home) account. 
 - Intall the [**Heroku CLI**](https://devcenter.heroku.com/articles/heroku-cli).
 - A modern code editor, like [**VS Code**](https://code.visualstudio.com) or [**Atom**](https://atom.io/).
### MongoDB
 - Install and setup [**MongoDB**](https://docs.mongodb.com/manual/tutorial/).
 - *Optional*: get [**Postman**](https://www.getpostman.com/downloads/) for API.

# Tips
### Code and Scripting
 - When you see a code snipit surrounded with arrow braces `<like this>`, that's your cue to use your own value.
### JSON
The JSON format consists of comma separated key-value pairs, where *keys are strings* and *values* may be one of the following: *strings; numbers; booleans; arrays; or objects*. JSON objects are defined by surrounding them with *{ brackets }*. Here is an example structure:
```JSON
{
  "name": "John Smith",
  "age": 35,
  "isEmployed": true,
  "degrees": [
    "High School Diploma",
    "General A.A.",
    "B.S. in Computer Programming"
  ],
  "contact" : {
    "phone": "(123)456-8551",
    "email": "jsmith@my.gcu.edu"
  }
}
```

# Deployment Instructions
### Setup on your local machine
Clone or download this template project:  
```bash
git clone https://github.com/ConnorJamesLow/icc-heroku.git
cd icc-heroku
```
Intall dependencies and run:
```bash
npm install
npm start
```
You should see your application running on [localhost:3000](http://localhost:3000)! Open up your browser to confirm.  

**Explanation:** `npm install` will look at [package.json](package.json) and find the `"dependencies"` list. It will install the basic requirements for a Node server to run in addition to those dependencies (in our case, the only dependency is express.js). `npm start` runs the `"start"` script seen here:
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
```
So, `npm start` translates to `node index.js`, which runs the [index.js](index.js) script, assigning the port and starting the express application.

### Deploy to Heroku using the CLI
Test deployment by running on local machine with Heroku:
```bash
heroku local web
```
You should be able to view the webapp in your browser. *Note, the port may be different.* Login to heroku to authorize deployment from your local machine:
```bash
heroku login
```
Create and deploy your node application:
```bash
heroku create <optional-app-name>
git push heroku master
```
And that's it! See your app in the browser by copying the url in the terminal, or by typing in the following command:
```bash
heroku open
```
You may also login to the [heroku web console](https://dashboard.heroku.com) in your browser to see the current list of projects.  

**Explanation:** `heroku create` creates a new project. You can see these on your dashboard by navigating to https://dashboard.heroku.com/apps. `git push heroku master` will deploy your application code to heroku's git client. Heroku will then take care of the build for you.

### Update your project
Hello world is pretty neat, but we want to update our application and make it our own. Since we already have our project here, we can begin editing. However, if you wanted to pull down the project from heroku, you could do so with the following command:
```bash
heroku git:clone -a <name-of-your-cloud-application>
```
Make some changes to the files in the **/public** folder. For example, change the `<h1>` element in [index.html](public/index.html) to this:
```html
<h1>Hello there</h1>
```
Now that you've made some changes, you can preview your updated application using the `heroku local web` from earlier.  
Looks good? To deploy your updated app, we are going to use the following commands:
```bash
git add <space separated list of files>
git commit -am "This is a commit message so you can give a short summary of what you changed."
git push heroku master
```
Wait for the build to pass, then go refresh your app in the browser. You should see your changes!  

### Heroku TL;DR
Here's a summary of how to get the app up and running on the heroku cloud platorm:
```bash
git clone https://github.com/ConnorJamesLow/icc-heroku.git
cd icc-heroku
heroku login
heroku create
git push heroku master
```  
[*Back to top*](#contents)

# MongoDB and Express
**Before you begin**, make sure you have the most recent release of the second version app code. Do a git pull, or clone the repository code. 
### Local Install
Though you don't need to install Mongo to run it in Heroku, you will want to have it for development purposes. If you haven't already, follow [this 
tutorial](https://docs.mongodb.com/manual/tutorial/) (or [this one](https://www.tutorialspoint.com/mongodb/) for TutorialsPoint fans, if those exist) to install the community version of Mongo. For Windows, you may need to add the directory location of mongo.exe and mongod.exe to your [environment variables](https://dangphongvanthanh.wordpress.com/2017/06/12/add-mongos-bin-folder-to-the-path-environment-variable/). Run the `mongo` command to startup the server.

### Commands
Mongo can be interacted with in a command terminal using JavaScript-like syntax. Some commands to know: 
 - `mongod`: Open a mongo shell. You'll need to use this before you can run mongo commands. Type `exit` when you are done, just like with cmd or bash.
 - `show dbs`: List all existing databases.
 - `db`: Get the name of your current working database.
 - `use <name of your database>`: Switch your current working database. If you want to create a new database, using this command and inserting data into a collection will add the db to your list.
 - `db.<collection name>.insert( <json formatted data> )`: This command can be used from your terminal to insert data into a collection. For example, you might insert new credentials into a user database like so:
 ```bash
 db.users.insert({ username: 'General Kenobie', password: 'HelloThere', role: 'Jedi Master' })
 ```
 - `db.<collection name>.find( <query> )`: Get data from a collection. Queries are in JSON format: `{<key>: <expected value>}`. For example, we could search for our previous document like so:
```bash
 db.users.find({ username: 'General Kenobie'}) # Find all documents where username equals General Kenobie.
 db.users.find({}) # Find all documents
```
### Mongo in Node
We will be using [**Mongoose**](https://www.npmjs.com/package/mongoose) as an interface for Mongo. The dependency was added to our Node.js application with the `npm i mongoose` command. Mongoose provides schemas, which represent the structure of the documents we insert into our database collection. In this example, I store a log of when the node application starts.  
Run the application using `npm start`. Your console should report the application port and the message, *"Successfully added the log!"*, followed by some JSON data. This means the application is working! In your browser, open up [localhost:3000](http://localhost:3000). You should see the logs listed. This means our app is working.  

### Mongo in Heroku Apps
To add a mongo database to our Heroku application, we will need to include the mongo add-on. We will use the free sandbox tier. Include the addon by running the following command in the directory of your Heroku application:
```bash
heroku addons:create mongolab:sandbox
```
You should see a few lines of output, including the environment variable to connect to your database from node, which should look something like this: `Created mongolab-apple-12345 as MONGODB_URI`. Go ahead and update/deploy your app:
```bash
git commit -a -m "<your commit message>"
git push heroku master
```
and view the app with the `heroku open` command. You should see a log entry dated about the time you deployed your app.

### Express REST API
How is this application working? In the file [*public/site.js*](public/site.js) `getData(callback)` performs a GET request to our Node server as defined with the following line:
```js
  // Set the type and destination of the request
  xhr.open("GET", "/api/log");
```
Whereas in the first part of the tutorial, we were only using our Node server to deliver static content (i.e. self-contained content), this second iteration utilizes Express to create our own [RESTful API](https://restfulapi.net/). I've set up a get route in [*index.js*](index.js) as an example: 
```js
// A GET route that returns some log data fetched from our mongodb.
app.get('/api/log', (req, res) => {
```
You may have noticed that this is the same route provided in the `xhr.open` line from earlier.  
Express route handlers tend to look like this: `app.get('some/route', (request, response, next) => {});`. The function name after `app.` could be [any HTTP request method](https://expressjs.com/en/api.html#app.METHOD) - `app.get`, `app.delete`, `app.update`, etc... - or it could be one specific to Express behavior, like `app.static` or `app.use`. The `request` and `response` parameters in the handler function correspond to the incoming request data and outgoing response, which in *index.js* is sent with: 
```js
      // return the query result to the client.
      res.send({
        message: 'OK',
        status: 0,
        data: documents
      });
```
To further understand just what is going on here, we will look at how to add our own middleware to our Express/Node app.

### Express Middleware
To get started, add a new route just above the `app.get('/api/log', (req, res) => {` line. We will make this route apply to all requests.
```js
app.all('/api/*', () => console.log('Hello from Express!'));
```
Run your app locally with `npm start` and open up to [localhost](http://localhost:3000/). Notice that there are no logs in your *Startup log* list. Don't worry! Your app is not broken. If you check your server console, you should see the _Hello from Express!_ message. Your server script runs top to bottom, looking for a matching route. `app.all` matches all HTTP requests, and the `/api/*` includes a wildcard so this route matches all requests that begin with the _api/_ uri. Thus, when the client _public/site.js_ script creates our xhr request to _/api/log_, it is intercepted by our new route.  
What we need is a way to tell Express to keep looking for more route matches after the initial match. Modify the new route so it looks like this:
```js
app.all('/api/*', (req, res, next) => {
  console.log('Hello from Express!');
  next();
});
```
If you run the application again, the server console will display the "_Search successful!_" message, and you will receive the log data back from the server. The `next()` function tells the script to look for more matching routes. It is passed in as the third parameter, following the response.  
We have just created middleware. You can use middleware to apply additional logic to routes. A use cases might security, or caching. We are going to use it for logging. Add the following lines before the `next()` call within the `app.all` callback function:
```js
app.all('/api/*', (req, res, next) => {
  console.log('Hello from Express!');

  // message containing the http request method and ip origin.
  const message = `${req.method} request from origin ${req.ip}.`;

  // creates a new log model.
  const log = new Log({ message });

  // inserts the model into the database
  log.save((err, result) => {

    // error handling
    if (err) {
      console.error('Execption:', err);
    } else {

      // do somthing with the result data
      console.log('Successfully added the log!', result);
    }
  });

  next();
});
```
If you run the app again, you should now see a new log for every time you access the api in addition to the existing startup logs.  
Finally, let's deploy the changes to Heroku:
```bash
git commit -a -m "Added more logging"
git push heroku master
# wait for the app to build
heroku open
```
### Mongo TL;DR
Add a mongo db plugin to an existing heroku application:
```bash
heroku addons:create mongolab:sandbox
```
Use `process.env.MONGODB_URI` to dynamically assign the url in your Node app.  
Add middleware to your _index.js_ script: 
```js
app.all('/api/*', (req, res, next) => {
  
  // logic here ...

  next();
});
```
[*Back to top*](#contents)

***
#### Documentation Referenced
https://devcenter.heroku.com/articles/deploying-nodejs  
https://docs.mongodb.com/manual/tutorial/  
https://expressjs.com/en/api.html