export default class Jugador {
  constructor(username, id, items = new Map()) {
    this.username = username;
    this.id = id;
    this.items = items;
  }

  getUsername() {
    return this.username;
  }

  setUsername(username) {
    this.username = username;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getItems() {
    return this.items;
  }

  setItems(items) {
    this.items = items;
  }
}
