# What You'll Need
 - [**git**](https://git-scm.com/downloads).
 - [**Node**](https://nodejs.org/en/) (and npm) installed. 
 - A free [**Heroku**](https://www.heroku.com/home) account. 
 - Intall the [**Heroku CLI**](https://devcenter.heroku.com/articles/heroku-cli).
 - A modern code editor like [**VS Code**](https://code.visualstudio.com) or [**Atom**](https://atom.io/).

# Deployment Instructions

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

# TL;DR
Here's a summary of how to get the app up and running on the heroku cloud platorm:
```bash
git clone https://github.com/ConnorJamesLow/icc-heroku.git
cd icc-heroku
heroku login
heroku create
git push heroku master
```