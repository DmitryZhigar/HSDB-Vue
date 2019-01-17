export  const dataBase = {
  temporaryStorage: {
      cards: [], //карты
      heroes: ['all'], //герои
      races: ['all'], //рассы
      adventures: ['all'], //приключения
      mechanics: ['all'], //механики
      rarity:['all'],// редкость
  },

  addRarity: function(newRare){
    if (!this.temporaryStorage.rarity.includes(newRare)) {
      this.temporaryStorage.rarity.push(newRare)
    }
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
};
