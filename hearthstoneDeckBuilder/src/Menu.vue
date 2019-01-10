<!DOCTYPE html>
<template>
  <div>
    <div class="menu freeze">
      <nav class="navbar navbar-light bg-light">
        <div style="width: 50%">
          <a class="navbar-brand" v-for="clas in classes1">
            <img :src=' "./assets/" + clas + ".png" ' @click="setClass(clas)">
          </a>
        </div>
        <div style="width: 50%;">
         Mana: <div v-for="cost in manaData" class="currentClass">
            <input type="radio" name="mana" @click="manaToDeck=cost">
            <label>{{cost.toString()}}</label>
          </div>
          <br>
          Rarity: <div v-for="rar in rarities" class="currentClass">
            <input type="radio" name="rarity" @click="setRarity(rar)">
            <label>{{rar.toString()}}</label>
          </div>
        </div>
      </nav>


      <!--<div v-for="rac in races" style="display: inline">
        <input type="radio" name="race" @click="setManaCost(rac)">{{rac.toString()}}
      </div>-->
    </div>
    <Deck class="deck" :menu-class="filterClass.toString()"
          v-bind:menu-mana="manaCost"
          :menu-rarity="rarity.toString()"/>

  </div>
</template>

<script>

  import BootstrapVue from 'bootstrap-vue'
  import Deck from './Deck'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    name: "Menu",
    components: {
      Deck, BootstrapVue
    },

    data() {
      return {
        filterClass: 'Neutral',
        mana: -1,
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
        classes1: ['Neutral', 'Druid', 'Shaman', 'Hunter', 'Warrior', 'Warlock', 'Mage', 'Priest', 'Rouge', 'Paladin'],
        heroes: [],
        manaData: ['all', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],

      }
    },

    created() {
      this.getAdventures()
    },

    computed:{

      manaToDeck:{
        set:function (m) {
          this.mana = m
        },
        get: function () {
          return this.mana
        }
      },

      rarityToDeck:{
        set:function (r) {
          this.rarity=r
        },
        get:function () {
          return this.rarity
        }
      },

      classToDeck:{
        set:function (c) {
          this.filterClass = c
        },
        get:function () {
          return this.filterClass
        }
      }

    },
    methods: {

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
    width: 50px;
    height: 50px;
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
