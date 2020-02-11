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
    - [ ] The dance-off results should be sent to the backend using the API 
---
### And we will see you in the Ballroom, but in the meantime, `Keep dancing`