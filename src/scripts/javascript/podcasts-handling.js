// Dynamically create the DOM elements for each podcast as well as the styling

/*Need to loop through the podcasts array
<div>
    <img src="" alt=""> podcasts[index].image 
    <h1>Title</h1> podcasts[index].title 
    <span>Small img like a tv</span> Can download this 
    <div>Number of seasons</div> podcasts[index].seasons (only gives the int)
    <div>Genres that this podcast fits</div> the genre value inside the podcasts array is the id of the genre in the genres array. podcasts[index].genres (will have to loop the numbers and find the genre title in the genre array) 
    <div>The last time this podcast was updated</div> podcasts[index].updated (Need to change this to be readable by creating a date function)
</div>*/

// Use the class to manipulate podcasts data (add, delete, update, etc)

// Example code 
/* PlayerService.js
export default class PlayerService {
  constructor() {
    this.players = [];
  }

  addPlayer(name, type, teamIds = []) {
    const player = { id: this.players.length + 1, name, type, teamIds };
    this.players.push(player);
    return player;
  }

  deletePlayer(id) {
    this.players = this.players.filter(p => p.id !== id);
  }

  getPlayers() {
    return this.players;
  }
}*/

