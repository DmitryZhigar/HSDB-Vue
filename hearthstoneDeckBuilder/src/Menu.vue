<!DOCTYPE html>
<template>
  <div>
    <div class="menu freeze">
      <img src="./assets/common.png" @dblclick="filterClass='Neutral'">
      <img src="./assets/druid-icon.png" @dblclick="filterClass='Druid'">
      <img src="./assets/hunter-icon.png" @dblclick="filterClass='Hunter'">
      <img src="./assets/mage-icon.png" @dblclick="filterClass='Mage'">
      <img src="./assets/pally-icon.png" @dblclick="filterClass='Paladin'">
      <img src="./assets/priest-icon.png" @dblclick="filterClass='Priest'">
      <img src="./assets/rogue-icon.png" @dblclick="filterClass='Rogue'">
      <img src="./assets/shaman-icon.png" @dblclick="filterClass='Shaman'">
      <img src="./assets/warlock-icon.png" @dblclick="filterClass='Warlock'">
      <img src="./assets/warrior-icon.png" @dblclick="filterClass='Warrior'">

      <div v-for="cost in manaData" style="display: inline">
        <input type="radio" name="mana" @click="setManaCost(cost)">{{cost.toString()}}
      </div> <br>

      <div v-for="rar in rarities" style="display: inline">
        <input type="radio" name="rarity" @click="setRarity(rar)">{{rar.toString()}}
      </div> <br>

      <div v-for="rac in races" style="display: inline">
        <input type="radio" name="race" @click="setManaCost(rac)">{{rac.toString()}}
      </div>
    </div>
    <Deck class="deck" :menu-class="filterClass.toString()"
          v-bind:menu-mana="manaCost"
          :menu-rarity="rarity.toString()"/>

  </div>
</template>

<script>

  import Deck from './Deck'

  export default {
    name: "Menu",
    components: {
      Deck
    },

    data() {
      return {
        filterClass: 'Neutral',
        manaCost: -1,
        rarity: '',
        rarities: ['all'],
        adventures: [], //приключения
        selectedAdventure: [], //Выбранные приключения
        selectedRaces: [], //Выбранные рассы
        selectedHero: '', //Выбранный герой
        selectedRariry: '', //Выбранная редкость карт
        selectedMechanics: [], //Выбранные механики
        mechanics: [],
        races: ['all'],
        heroes: [],
        manaData: ['all', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],

      }
    },

    created() {
      this.getAdventures()
    },
    methods: {

      setManaCost: function (item) {
        this.manaCost = item;
      },

      setRarity: function (item) {
        this.rarity = item
      },


      getAdventures: async function () {
        const resp = await fetch('https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Mashape-Key': '4dWa3VgL5HmshG40JWJTJDp1qLYvp1vET4vjsniGMTrsJbabTq'
          },
          method: 'GET',
          mode: 'cors',
          cache: 'default'
        }).then(r => r.json())

        for (let adv in resp) {
          if (resp[adv].length > 0) {
            if (adv !== 'Hero Skins') {
              this.adventures.push(adv)
            }
            for (let card of resp[adv]) {
              if (card.type === 'Hero' && !this.heroes.includes(card)) {
                this.heroes.push(card) // Добавление героев TODO - возможность выбора не только класса но и героя
              } else {
                if ('race' in card) {
                  if (!this.races.includes(card.race)) {
                    this.races.push(card.race)
                  }
                }
                if ('rarity' in card) {
                  if (!this.rarities.includes(card.rarity)) {
                    this.rarities.push(card.rarity)
                  }
                }
                if ('mechanics' in card) {
                  for (let mechanic of card['mechanics']) {
                    if (!this.mechanics.includes(mechanic.name)) {
                      this.mechanics.push(mechanic.name)
                    }
                  }
                }
              }
            }
          }
        }
      },

    },

  }
</script>

<style scoped>

  ul {
    list-style: none; /*убираем маркеры списка*/
    margin: 0; /*убираем верхнее и нижнее поле, равное 1em*/
    padding-left: 0; /*убираем левый отступ, равный 40px*/
  }

  .deck {
    margin-top: 5%;
  }

  .currentClass {
    display: inline-block;
  }

  .menu img {
    display: inline-block;
    width: 40px;
    height: 40px;
  }

  .freeze {
    width: 100%;
    position: fixed;
  }

  .background {
    background-color: tan;
  }

  .select {
    width: 100%;
    margin-top: 0.4em;
    margin-bottom: 0.4em;
  }

</style>
