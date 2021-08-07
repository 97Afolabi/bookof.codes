---
title: 'Hosting node.js app on shared hosting.'
excerpt: 'Deploying node js app on shared hosting with cpanel'
date: '7, Aug 2021'
---

## Hosting a node js app on shared hosting with cpanel

Most articles and tutorials online about node js development often go with vps hosting on services like digital ocean or most commonly heroku.
So most beginners find it confusing, like i just want to upload my website somewhere and see it running right away but now i got to do ssh and a bunch of other prerequisite steps for running node on vps server, now I'm not saying vps sucks or you shouldn't know things or i prefer shared hosting.
Shared hosting has a lot of downsides to it as well like not having root access to your server because 🤷🏽‍♂️ it's a "shared" server.

But if you're totally cool with that and you just want to run your simple express app in a low cost server then lets get to it.

### **Prerequisites**

1. Hosting with cpanel (in my case i am using namecheap steller hosting)
2. Domain name connected to hosting server

For the sake of this tutorial i'll be deploying a very simple express app, you can follow along with any express app or just do whatever i do to get the concepts.

**Step 1 :** Create an express app (\*skip if you got one already)

```sh
npx express-generator --view=ejs simpleapp
```

This tells express generator to create an app named _"simpleapp"_ using the ejs view engine.

**Step 2 :** Lets run the app locally to make sure it's working fine.

```sh
cd simpleapp && npm i
```

Install the required modules.

```sh
npm i && npm start
```

Now run the app.

If everything goes well you should see this in your browser when you visit [http://localhost:3000](http://localhost:3000)

![app on localhost](/posts/nodejs-on-cpanel-01.png)

**Step 3**: Bundle the app
In order to upload our app to cpanel we have to compress it into a single zip archive.
Depending on the operating system you use, the steps may differ. I'm on a mac so all i have to do is right click on the _simpleapp_ folder and find _"compress simpleapp"_.

\*Before you do the compression, i recommend deleting the _`node_modules`_ folder

**Step 4:** Upload the app to cpanel

1. Log into your cpanel and navigate to file manager
   ![app on localhost](/posts/nodejs-on-cpanel-02.png)

2. Upload the folder you compressed earlier.
   ![node on cpanel app guide](/posts/nodejs-on-cpanel-03.png)

3. Now right click on that folder to unzip it, when prompted for a directory leave field empty
   ![node on cpanel app guide](/posts/nodejs-on-cpanel-04.png)

4. Now head back to your cpanel dashboard and find the _"software"_ section.
   ![cpanel dashboard](/posts/nodejs-on-cpanel-08.png)

5. Fill in the fields according to your requirement, leave the application URL field empty if you're not using a sub domain.
   ![node on cpanel app guide](/posts/nodejs-on-cpanel-05.png)

6. Click _NPM Install_ (\*Do not click run script.)
   ![node on cpanel app guide](/posts/nodejs-on-cpanel-06.png)

7. Now head over to your domain name and you should see your simple node app.
   ![node app running ](/posts/nodejs-on-cpanel-07.png)
