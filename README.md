# What You'll Need
 - [**git**](https://git-scm.com/downloads).
 - [**Node**](https://nodejs.org/en/) (and npm) installed. 
 - A free [**Heroku**](https://www.heroku.com/home) account. 
 - Intall the [**Heroku CLI**](https://devcenter.heroku.com/articles/heroku-cli).

# Instructions

### Setup on your local machine
Clone or download this template project:  
```bash
git clone https://github.com/ConnorJamesLow/icc-heroku.git
cd <app-name:[icc-heroku]>
```
Intall dependencies and run:
```bash
npm install
npm start
```
You should see your application running on [localhost:3000](http://localhost:3000)! Open up your browser to confirm.  
**Explaination:** `npm install` will look at [package.json](package.json) and find the `"dependencies"` list. It will install the basic requirements for a Node server to run in addition to those dependencies (in our case, the only dependency is express.js). `npm start` runs the `"start"` script seen here:
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
heroku create
git push heroku master
```
And that's it! See your app in the browser by copying the url in the terminal, or by typing in the following command:
```bash
heroku open
```
You may also login to the [heroku web console](https://dashboard.heroku.com) in your browser to see the current list of projects.