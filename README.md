# Get Started
Clone this repository by pasting `git clone https://github.com/ConnorJamesLow/icc-heroku.git` into your terminal.  
*If you do not have git, you will need to download that first. See [What You'll Need](#what-youll-need).*  

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
 - [JSON Web Tokens](#json-web-tokens)
   - [A Quick Word About File Structure](#A-Quick-Word-About-File-Structure)
   - [An Introduction to Security with JWTs](#An-Introduction-to-Security-with-JWTs)
   - [Authentication using JWTs](#Authentication-using-JWTs)
   - [Authorization using JWTs](#Authorization-using-JWTs)
   - [Running Locally](#Running-Locally)
   - [Running on Heroku](#running-on-heroku)
   - [A Final Note](#a-final-note)
   - [TL;DR](#JWT-TLDR)

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
**Before you begin**: this section assumes you have the first version *(v1.0)* of the app code. You can download the version by visiting the [releases page](https://github.com/ConnorJamesLow/icc-heroku/releases) or by cloning the repo and performing a checkout on the appropriate branch: `git checkout 5b105b1cfbf6569e95ca35736df81aca823d2cfe`. 
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
**Before you begin**: this section assumes you have the second version *(v2.0)* of the app code. You can download the version by visiting the [releases page](https://github.com/ConnorJamesLow/icc-heroku/releases) or by cloning the repo and performing a checkout on the appropriate branch: `git checkout 45e212532193db5f8a1445728e53f3fd3fd91770`.    
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

# JSON Web Tokens
**Before you begin**: this section assumes you have the third version *(v3.0)* of the app code. You can download the version by visiting the [releases page](https://github.com/ConnorJamesLow/icc-heroku/releases) or by cloning the repo and performing a checkout on the appropriate branch: `git checkout 94fe71cf6bb2ba754a0efdbd37b41bcce3672e36`. 
### A Quick Word About File Structure
Or, [skip ahead](#An-Introduction-to-Security-with-JWTs). If you must.  

If you've walked through each version up to this point, you may notice that there is a new file structure for this version of the repository. [index.js](index.js), for example, is much shorter now; a lot of the functionality has been externalized to the [*src/*](src/) directory. There are several benefits to this approach: first, we remove a lot of clutter in our index.js file and improve it's readability; second, this practice is useful for making loosely coupled code, which translates to reusablity; third, it demonstrates encapsulation, hiding away logic that isn't necessary to know about in the current context. There may be a better structure than the one I've provided in *src/*, but it's still a major improvement from a single file structure, especially since we are about to add more content. 

Alright. Let's talk about security.
### An Introduction to Security with JWTs
Now that we have begun to store data, we should start thinking about securing our web application so we can control who has access to the Express API we have created. I have chosen JSON Web Tokens (JWTs) to secure the application.  
Auth0 provides a library for implementing JWTs; this has been installed via npm: `npm i jsonwebtoken`. Our [package.json](package.json) dependencies now should look like this:
```json
  "dependencies": {
    "express": "^4.16.4",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.4.17"
  }
```  
Open up [Security.js](src/Security.js) in *src/*. Here, we can see the basic functionality provided by the jwt library. In particular, notice these two method calls:
```js
// in getToken()
jwt.sign({ credentials }, secret, options);
// note: placing a variable name in { } is equivalent to saying { credentails: credentials }
// If I wanted to give the information a different name, I could use the standard syntax, e.g. { stuff: credentials }

// in verifyToken()
jwt.verify(token, secret, options);
```
The `sign` method is given three parameters: `{ credentials }` specifies the payload in the jwt. This could contain a username, privileges, birthday, or any other information that is used throughout the application. Here, I've provided one item: the user's `credentials`. But you could pass in any number of items:
```js
jwt.sign({ 
  name: 'General Kenobie', 
  role: 'Jedi Master', 
  greeting: 'Hello there.' 
}, secret, options);
```
The `secret` is something only the developers know. The secret is used to sign a token during encryption so the token can only be decrypted if the same secret is provided with an encrypted token. This prevents other people from spoofing tokens to bypass your security.  
Finally, `options` allows us to provide some information and instructions to the jwt itself. In this case, I've included an expiration:
```js
const options = {
  expiresIn: 60 // seconds
};
```
This all transaltes to `jwt.sign({ credentials: 'username' }, 'Secret here', { expiresIn: 60 })`, which returns an encoded token. It will look something like this:
```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFscyI6W3siX2lkIjoiNWNhNTFjZjU4YTk3OWQwOGZjMWQxOGM5IiwibmFtZSI6IkNvbm5vciJ9XSwiaWF0IjoxNTU0MzI2MTE5LCJleHAiOjE1NTQzMjYxNzl9.wcAvN4XadKjJXrC8AkUbtwEYO1XsyBMTUfjGR0WIigI"
```
There's a lot more to JWTs that I won't get into here. I recommend you check out [jwt.io](https://jwt.io/) or, to learn about this library, read the [documentation on GitHub](https://github.com/auth0/node-jsonwebtoken).  

### Authentication Using JWTs
I've made a lot of changes in order to implement JWTs. It can get a bit confusing, so let me start by unpacking the process a little bit.  
1. A user visits our page. They are prompted to tell the script ([site.js](public/site.js)) who they are. These credentials are included as a [query string](https://help.marketruler.com/wiki/What_is_the_correct_syntax_for_query_strings%3F) parameter and sent to `api/login`:
```js
  // from retrieveToken()
  const credentials = prompt('Who are you?');
  
  // ...some xhr setup...

  xhr.open('GET', `/api/login?credentials=${credentials}`);
```
2. In [index.js](index.js), our request to `api/login` is routed to the `authenticate()` function in our `Controller`:
```js
app.get('/api/login', controller.authenticate);
```
3. In [Controller.js](src/Controller.js), we get the credentials from the request query parameters. These are passed to our Database method, `getUser()`, along with some handler callback functions:
```js
// from authenticate()
const { credentials } = req.query;

// ... callbacks defined ...

db.getUser(credentials, handleSuccess, handleFail);
```
4. In [Database.js](src/Database.js), we use a mongoose model to query the `users` collection in our database. The results are passed to the handlers defined in `Controller.authenticate()`:
```js
getUser(name, onSuccess, onFail) {
  User.find({ name }, (err, documents) => {
    if (err) {
      onFail(err);
    } else {
      onSuccess(documents);
    }
  });
}
```
5. Back in the `authenticate()` method in [Controller.js](src/Controller.js), you can see how the callbacks handle the database results, sending them back to the client:
```js
const handleSuccess = (data) => {
  if (data.length > 0) {
    // Results found! Create a token in the database.
    const token = security.getToken(data);
    res.send({
      message: 'OK',
      status: 0,
      data: token
    });
  } else {
    // If no results are found (i.e. length == 0), then the user must not be in the database.
    res.send({
      message: 'No user',
      status: 0,
      data: false
    });
  }
}
```
6. In [Security.js](src/Security.js), the `getToken()` method mentioned earlier signs the user's credentials and creates an encoded JSON Web Token.
```js
  getToken(credentials) {
    const token = jwt.sign({ credentials }, secret, options);
    return token;
  }
```
7. Back in our client, our xhr script [site.js](public/site.js) will receive the response, triggering our event listener callback, which sets the token as a cookie:
```js
xhr.addEventListener('readystatechange', function () {

  // ready state 4 means the request has received a response
  if (this.readyState === 4) {
    const { data } = JSON.parse(this.responseText);
    if (data) {
      console.log('Got a token:', data);
      setCookie('token', data);
    } else {
      alert('I don\' know you');
    }
  }
});
```


### Authorization Using JWTs
Now that our client has a JWT, they can use it to access the secured routes in our Express API.  
As we discovered in the [Express Middleware](#express-middleware) section, Express routes can use wild cards in routes, and the `next()` method to continue looking for additional matches; the combination of these allowed us to create the per-request middleware, which logged the requestor information (IP and HTTP method). We've leveraged that to create authentication middleware and restrict access to our `getLogs()` method. Take a look at [index.js](index.js). Supposed a user sent a *GET* request to the `/api/log` route:
```js
// This route matches. A next() call is made here, so we continue looking for more matching routes.
app.all('/api/*', controller.loggingMiddleware);

// This route does not match. Skip it!
app.get('/api/login', controller.authenticate);

// Another match. Here, the method will call next() only if the user has provided a valid jwt. (Keep reading to see how that works.)
app.all('/api/*', middleware.authorize);

// An exact match. No next() calls in this method, so it will finish our execution and return the result.
app.get('/api/log', controller.getLogs);
```
Let's take a look at the authorization process:  
1. The user clicks the **Get Logs** button on the [webpage](public/index.html), triggering the function defined in the **onclick** attribute of the button: 
```html
    <button onclick="populateLogs()">Get Logs</button>
```
2. The `populateLogs()` function defined in [site.js](public/site.js) calls the `getData()` method which has been modified to include the stored token cookie as a query parameter:
```js
// in getData()
const token = getCookie('token');

// ... some xhr setup ...

xhr.open('GET', `/api/log?token=${token}`);
xhr.setRequestHeader('cache-control', 'no-cache');
```
3. The request is sent and, in [index.js](index.js), the request in intercepted by our security middleware:
```js
app.all('/api/*', middleware.authorize);
```
4. In [SecurityMiddleware.js](src/SecurityMiddleware.js), our verification logic is invoked. If it passes, we call next() and execution continues. If it fails, the user receives a negative response and no data is exposed:
```js 
authorize(req, res, next) {
  const { token } = req.query;
  if (security.verifyToken(token)) {

    // verified!
    next();
  } else {

    // that token is invalid. Tell those hackers to come back with some id.
    res.send({
      message: 'Invalid token',
      status: -1,
      data: false
    });
  }
}
```
5. In [Security.js](src/Security.js), the `verifyToken()` method tries to decode the token. The `SecurityMiddleware.authorize` method will use the response to decide whether the user is authenticated:
```js
verifyToken(token) {
  try {
    const credentials = jwt.verify(token, secret, options);
    return credentials;
  } catch (err) {
    return null;
  }
}
```
6. If the token is valid, execution continues as normal and the logs are returned to the client!
### Running Locally
If you run your application, you will quickly discover that you are unable to access your logs: you don't have entries in your mongo database *users* collection! To add one, use the terminal on you local machine to run commands. Start `mongo` then run the following commands to add a user:
```bash
use <name_of_your_database>
db.users.save({ name: "user1" });
```
You can see the new user by typing `db.users.find({})`. Run your app again and, when prompted, say you are *"user1"*. You can add as many users as you want using this method.
### Running on Heroku
Publish your app to heroku (or, you may want to [create a new one](#heroku-tldr) with a [mongo plugin](#mongo-tldr)). Since the changes you made to the user collection on your local machine will not reflect the state of the database on heroku, we will need to create some new users in the cloud. We can use the same process as we used locally and create the users in the mongo shell.  
To access your the remote mongo shell for your application, do the following:
1. Run the following command in the root folder of the heroku app: `heroku addons:open mongolab`. The command should open up a new browser window for **mLab**.
2. Find the section where it says *"To connect using the mongo shell:"* and copy the first part of the shell command, leaving off the `u` and `p` options: `mongo ds123456.mlab.com:12345/heroku_ab123xyz`. 
3. Go to your [heroku dashboard](https://heroku.com/) and open up your app. Under the **Settings** tab, find the section named **Config Vars**. Click the **Reveal Config Vars** button. Click on the edit button (but don't change anything!) for *MONGODB_URI*. Our username and password are stored in this connection string, separated by a colon. It should look something like this:
```txt
mongodb://username_string:password_string_1234abcd@ds123456.mlab.com:37389/username_string
```
4. Copy the username and password into your command so it looks like this:
```bash
mongo ds123456.mlab.com:12345/heroku_ab123xyz -u username_string -p password_string_1234abcd
```
5. Press enter. If you copied the credentials properly, you should have an open session with your remote mongo instance! Go ahead an add the user to the `db.users` colletion. No need to switch databases (with a `use` command), since you are already connected to the one your application uses.
```bash
db.users.save({ name: "user1" });
```
6. And that's it! You should be able to query your database with `db.users.find({})` and see your added user. You can go back to your heroku web app and authenticate to get your logs.  

### A Final Note
**Do not** assume everything in this section of the tutorial is a best practice. Or even a good practice. Sure it get's the job done, but really, you should be doing a lot of things differently, such as specifying the encryption algorithm in your jwt options and using the Authorization header in your requests rather than a query string. So, before you copy and paste this code into a more important application, do some research. I recommend starting with [this article](https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/), published by Auth0.  
 
### JWT TL;DR
JWTs and Express Middleware are used to secure the getLogs functionality in our node application. You will need to add a user to your mongo db in order to generate a JWT for authorization.

To add a user on your local instance, start `mongo` and run `db.users.save({ name: "user1" });`.  

To access the remote mongo database and add a user to your heroku app, you need to run `mongo <connection_string>` in your local terminal.  

Get your connection string by running `heroku addons:open mongolab` and following the instructions under **To connect using the mongo shell**. To get your username and password, open your application's settings on the [heroku dashboard](https://heroku.com/) and inspect the **Config Vars**. The credentials are found separated by a colon *(username:password)* in the connection string provided in the *MONGO_URI* variable.

[*Back to top*](#contents)

***
#### Documentation Referenced
https://devcenter.heroku.com/articles/deploying-nodejs  
https://docs.mongodb.com/manual/tutorial/  
https://expressjs.com/en/api.html  
https://github.com/auth0/node-jsonwebtoken  
***

<br/>

<div align="center">
<p>This tutorial was created for the students of Grand Canyon Univerity's <b>Innovative Computing Club</b> by Connor Low, Club President, Spring 2019.</p>
<p>&#128077;</p>  
<em>Thanks everyone!</em>
</div>
