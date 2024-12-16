import Jugador from "./models/jugador.js";

export default class Controller {
  constructor(players) {
    this.players = this.savePlayers(players);
    this.currentTurnIndex = 0;
    console.log(
      'players data retrieved from "index.js" using post method for the keys, and the validation with websockets.'
    );
    console.table(this.players);
  }

  savePlayers(players) {
    return players.map(
      (player) => new Jugador(player.name, player.id, player.items)
    );
  }

  getPlayers() {
    return this.players;
  }

  setPlayers(players) {
    this.players = players;
  }

  getCurrentPlayerTurn() {
    return this.players[this.currentTurnIndex];
  }

  getCurrentPlayerTurnIndex() {
    const currentPlayer = this.getCurrentPlayerTurn();
    return this.players.indexOf(currentPlayer);
  }

  nextTurn() {
    this.currentTurnIndex = (this.currentTurnIndex + 1) % this.players.length;
  }

  async getDataShips() {
    const url = "https://program-web-taller-4-production.up.railway.app/boats";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      return json.boats;
    } catch (error) {
      throw error;
    }
  }
}
