<!DOCTYPE html>
<template>
  <div>
    <div class="menu freeze">
      <nav class="navbar navbar-light bg-light">
        <div style="width: 50%">
          <a class="navbar-brand" v-for="clas in classes">
            <img :src=' "./assets/" + clas + ".png" ' @click="filterClass=clas">
          </a>
        </div>
        <div style="width: 50%;">
          Mana:
          <div v-for="cost in manaData" class="currentClass">
            <input type="radio" name="mana" @click="mana=cost">
            <label>{{cost.toString()}}</label>
          </div>
          <br>
          Rarity:
          <div v-for="rar in rarities" class="currentClass">
            <input type="radio" name="rarity" @click="rarity=rar">
            <label>{{rar.toString()}}</label>
          </div>
        </div>
      </nav>
    </div>
    <Deck class="deck"
          :menu-class="filterClass.toString()"
          :menu-mana="mana"
          :menu-rarity="rarity"/>
  </div>
</template>

<script>

  import BootstrapVue from 'bootstrap-vue'
  import Deck from './Deck'
  import {dataBase} from './dataBase'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    name: "Menu",
    components: {
      Deck, BootstrapVue
    },

    data() {
      return {
        //props for deck
        filterClass: 'Neutral',
        mana: -1,
        rarity: '',

        rarities: dataBase.temporaryStorage.rarity,
        races: dataBase.temporaryStorage.races,
        classes: ['Neutral', 'Druid', 'Shaman', 'Hunter', 'Warrior', 'Warlock', 'Mage', 'Priest', 'Rogue', 'Paladin'],
        manaData: ['all', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      }
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
