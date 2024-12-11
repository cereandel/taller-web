import Jugador from "./models/jugador.js";

export default class Controller {
  constructor(players) {
    this.players = this.savePlayers(players);
    this.currentTurnIndex = 0;
    console.log(this.players);
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

  nextTurn() {
    this.currentTurnIndex = (this.currentTurnIndex + 1) % this.players.length;
  }
}
