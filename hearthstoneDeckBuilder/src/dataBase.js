export  const dataBase = {
  temporaryStorage: {
      cards: [], //карты
      heroes: [], //герои
      races: [], //рассы
      adventures: [], //приключения
      mechanics: [], //механики
  },

  addCard: function (newCard){
    this.temporaryStorage.cards.push(newCard)
  },

  addHero: function (newHero) {
    if (!this.temporaryStorage.heroes.includes(newHero)) {
      this.temporaryStorage.heroes.push(newHero)
    }
  },

  addRace: function (newRace){
    if(!this.temporaryStorage.races.includes(newRace)){
      this.temporaryStorage.races.push(newRace)
    }
  },

  addAdventure: function(newAdventure){
    if(!this.temporaryStorage.adventures.includes(newAdventure)){
      this.temporaryStorage.adventures.push(newAdventure)
    }
  },

  addMechanic: function(newMechanic) {
    if(!this.temporaryStorage.mechanics.includes(newMechanic)){
      this.temporaryStorage.mechanics.push(newMechanic)
    }
  },

  Cards:{
    get: function () {
      return this.temporaryStorage.cards
    }
  },

  Heroes:{
    get: function () {
      return this.temporaryStorage.heroes
    }
  },

  Mechanics:{
    get: function () {
      return this.temporaryStorage.mechanics
    }
  },

  Adventures:{
    get: function () {
      return this.temporaryStorage.adventures
    }
  },

  Races:{
    get: function () {
      return this.temporaryStorage.races
    }
  },
};
