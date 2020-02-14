# Strictly come dancing - Droid edition
--- 
## Welcome to this `Spine-tingling` Robot Danceoff

This is where a collection of nuts, bolts and rust assemble to form the likes of the indubitable **Infinity Sam** and his pals: the extravegant **Elastic Eddie** , kiss my keister, why isn't it **Hipster Kate** and who ever could be bothered to show up.

This collection of rust-buckets will battle each other in teams in breathtaking dances. Let's see who can give `Bruno Tonioli` a run for his money.

---
## How it works
- Go to `localhost:3000` in your browser and click on the big button that says `Let's get ready to DANCE`
- A Popup appears where you can enter the team names 
    - Click on the `UNDERLINED` text sections to enter the team names
    - Click on `Get the Team Members` to...  <*actually that is rather self-explanatory*>
- Your Team will be assigened 5 robots that each will dance against one robot of the other team
   - You can click on the `View` button of each Robot to see their avatar.  
- At the top, click on the button that says `Let's get this road on the show`.  *And yes that is the right order*
- You can see how your Robots did in the Leaderboard

## Usage 

1. Clone/Download this repo
2. Navigate to the `directory/folder` where you saved the repo and open it in terminal. 
3. Run the project:
    3.1. `Docker` : 

        3.1.1. Make sure you have `Docker` installed

        3.1.2. Run the command `docker-compose up` and let the project set up

    3.2. `Node`:

        3.2.1. Make sure you have `Node.js` installed 

        3.2.2. Run the command `node app.js` or `npm start` and let the project set up

4. Enter `localhost:3000` into your browser
5. Enjoy


## Features 

- [x] Random Robots are displayed on Homepage and changed on every refresh
- [x] Allow the user to start a new competition 
- [x] Allow the user to create two teams and give them names
- [x] Team members are filled in automatically using the following criteria:
    - [x] Each team is assigned 5 robots
    - [x] Robots are fetched from the API provided below
    - [x] Robots which are out of order can’t dance
    - [x]  The total experience of each team can’t exceed 50 points
- [x] Allow the user to start the dancing competition using the following criteria:
    - [x] Each robot dances against another robot of the opponent team in a dance-off
    - [x] For each dance-off, the system picks a winner randomly
    - [x] In total, 5 dance-offs take place
    - [x] The dance-off results should be sent to the backend using the API 
    - [x] There is an API endpoint to retrieve all dance-offs
    - [x] The leaderboard should ONLY be accessible if at least one competition has been finished
    - [x] Make the App run in Docker container
---
### And we will see you in the Ballroom, but in the meantime, `Keep dancing`
---
## Full Stack API Setup

If I would be tasked to set up an API, I would:

Firstly set up a Data Model (if not already provided) in the form of a `MYSQL` or `MONGO DB` Database where I would store all Data to be interacted with through the API.

Secondly, I would most likely set up a `node.js` application using `express.js` and `body-parser` packages.

**We will use a shop finder as an example**

After the Database has been set up and a `node.js` app is created, I would set up the routes:

**As an example**

To get all shops in the database, I would do something like this:

```javascript
app.get('/api/shops/',(req, res) => {
  let sql = "SELECT * FROM shops";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

```

To filter shops by name and/or type:

```javascript
app.get('/api/shops/',(req, res) => {
  var shoptype = req.query.type ||"";
  var shopname = req.query.name ||"";
  let sql = "SELECT shops.* FROM shops WHERE name like '%"+shopname+"%' AND \
   type like '%"+shoptype+"%'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
```

To add a new shop

```javascript
app.post('/api/shops',(req, res) => {
  let data = {lon: req.body.lon,lat: req.body.lat,name: req.body.name, website: req.body.website, trading_hours: req.body.trading_hours, type: req.body.type, street: req.body.street, postal_code: req.body.postal_code};
  let sql = "INSERT INTO shops SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
```

To update a shop

```javascript
app.put('/api/shops/:id',(req, res) => {
  let sql = "UPDATE shops SET name='"+req.body.name+"', website='"+req.body.website+"', trading_hours='"+req.body.trading_hours+"', type='"+req.body.type+"', street='"+req.body.street+"' , postal_code='"+req.body.postal_code+"' WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
```

To delete a shop

```javascript
app.delete('/api/shops/:id',(req, res) => {
  let sql = "DELETE FROM shops WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
```

