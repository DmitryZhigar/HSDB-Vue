<!DOCTYPE html>
<template>
  <div class="background">
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
      <form>
        <input type="radio" name="rare" @click="setRarity('')" > All
        <input type="radio" name="rare" @click="setRarity('Common')" > Common
        <input type="radio" name="rare" @click="setRarity('Rare')" > Rare
        <input type="radio" name="rare" @click="setRarity('Epic')" > Epic
        <input type="radio" name="rare" @click="setRarity('Legendary')" > Legendary
      </form>
      <ul >
        <li v-for="cost in manaData">{{cost.toString()}}</li>
      </ul>

      <form class="menu">
        <input type="radio" name="mana" @click="setManaCost(-1)" > All
        <input type="radio" name="mana" @click="setManaCost(0)"> 0
        <input type="radio" name="mana" @click="setManaCost(1)"> 1
        <input type="radio" name="mana" @click="setManaCost(2)"> 2
        <input type="radio" name="mana" @click="setManaCost(3)"> 3
        <input type="radio" name="mana" @click="setManaCost(4)"> 4
        <input type="radio" name="mana" @click="setManaCost(5)"> 5
        <input type="radio" name="mana" @click="setManaCost(6)"> 6
        <input type="radio" name="mana" @click="setManaCost(7)"> 7
        <input type="radio" name="mana" @click="setManaCost(8)"> 8
        <input type="radio" name="mana" @click="setManaCost(9)"> 9
        <input type="radio" name="mana" @click="setManaCost(10)"> 10
        <input type="radio" name="mana" @click="setManaCost(11)"> 11
      </form>
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
        rarity:'',
        adventures: [], //приключения
        selectedAdventure: [], //Выбранные приключения
        selectedRaces: [], //Выбранные рассы
        selectedHero: '', //Выбранный герой
        selectedRariry: '', //Выбранная редкость карт
        selectedMechanics: [], //Выбранные механики
        mechanics: [],
        races: [],
        heroes: [],
        manaData: [0, 1, 2, 3, 4, 5, 6, 7, 8, '9+'],
      }
    },

    created() {
      //this.getAdventures()
    },
    methods: {

      setManaCost: function(item){
        this.manaCost=item;
      },

      setRarity: function(item) {
        this.rarity=item
      },


      getAdventures: async function () {
        //https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1  https://omgvamp-hearthstone-v1.p.mashape.com/info?callback=standard
        const resp = await fetch('https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Mashape-Key': '4dWa3VgL5HmshG40JWJTJDp1qLYvp1vET4vjsniGMTrsJbabTq'
          },
          method: 'GET',
          mode: 'cors',
          cache: 'default'
        })

        for (let adv in resp) {
          if (resp[adv].length > 0) {
            if (adv !== 'Hero Skins') {
              // Добавление приключений
              this.adventures.push(adv)
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

  .deck{
    margin-top: 5%;
  }

  .currentClass{
    display: inline-block;
  }

  .menu img {
    display: inline-block;
    width: 80px;
    height: 80px;
  }

  .freeze {
    width: 100%;
    position: fixed;
    background-color: tan;
  }

  .background{
    background-color: tan;
  }

  .select {
    width: 100%;
    margin-top: 0.4em;
    margin-bottom: 0.4em;
  }

</style>
