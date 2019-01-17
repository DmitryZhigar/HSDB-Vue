<template>
  <div style="float:left; width:100%; height:100%;">
    <vue-loading :active.sync="!this.isLoaded" style=" margin-top: 5%; text-align: center">
    </vue-loading>
    <div class="cards-list"
         ref="massive">
      <div v-for="card in cardFilter" :key="card.cardId">
        <img class="single-card" :src="card.img" @click="pickCard(card)">
      </div>
    </div>
    <div class="listCards" @change="changeClass(this.props.MenuClass)"> <!-- Выбранные карты -->
      <div>
        <aside class="deck-left" v-if="pickedCardsCount > 0">
          <ul class="deck-list">
            <li class="deck-card" v-for="card in displayPickedCards" :key="card.id" @click="deleteCard(card)">
              <div class="deck-card-cost"><span>{{card.cost}}</span></div>
              <div class="deck-card-face" :style="'background-image: url(' + card.img + ')'">
                <span :class="[card.rarity]" data-card="KAR_009">{{card.name}}</span>
              </div>
              <div :class="['deck-card-count',card.rarity]">
                <span>{{card.rarity === 'Legendary' ? '★' : card.count}}</span>
              </div>
            </li>
            <button :disabled="pickedCardsCount!==30" @click="generateDeckCode">
              Copy deck
            </button>
          </ul>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>

  import {encode, decode} from 'deckstrings'
  import VueLoading from "vue-loading-overlay/src/js/Component";
  import {dataBase} from './dataBase.js'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    name: "Deck",
    components: {VueLoading},
    props: {
      MenuClass: {
        type: String,
        required: false,
      },
      MenuMana: {
        type: Number,
        required: false,
      },
      MenuRarity: {
        type: String,
        required: false,
      },

    },
    data() {
      return {
        massive: [],
        currentClass: '',

        classes: {
          Druid: 274,
          Hunter: 31,
          Mage: 637,
          Paladin: 671,
          Priest: 813,
          Rogue: 930,
          Shaman: 1066,
          Warlock: 893,
          Warrior: 7
        },

        isLoaded: false, //Загружены ли все карты
        pickedCards: {}, //Выбранные карты
        pickedCardsCount: 0, //Количество выбранных карт
      }
    },

    computed: {

      cardFilter: function () {
        this.massive = dataBase.temporaryStorage.cards
        this.massive = this.classFiltered()
        this.massive = this.manaFiltered();
        this.massive = this.rarityFiltered();
        return this.massive;
      },


      displayPickedCards() {
        let result = Object.values(this.pickedCards);
        console.log(result);

        return result
      },

      changeClass(Class) {
        if (this.currentClass.toString() !== Class) {
          this.clearDeck();
          this.currentClass = Class
        } else return;

      },

      clearDeck() {
        this.pickedCards = {};
        this.pickedCardsCount = 0
      }
    },

    created() {
      this.getCards()
    },

    methods: {

      addCard(card) {
        dataBase.addCard(card)
      },

      addMechanic(mechanic) {
        dataBase.addMechanic(mechanic)
      },

      addHero(hero) {
        dataBase.addHero(hero)
      },

      addRace(race) {
        dataBase.addRace(race)
      },

      addAdventure(adventure) {
        dataBase.addAdventure(adventure)
      },

      addRarity(rarity) {
        dataBase.addRarity(rarity)
      },

      classFiltered: function () {
        if (this.MenuClass !== 'Neutral') {
          if (this.currentClass !== this.MenuClass) {
            this.currentClass = this.MenuClass;
            this.pickedCards = {};
            this.pickedCardsCount = 0;
            return this.massive.filter(card => card['playerClass'] === this.MenuClass)
          } else {
            return this.massive.filter(card => card['playerClass'] === this.MenuClass)
          }
        } else
          return this.massive.filter(card => card['playerClass'] === this.MenuClass)
      },

      rarityFiltered: function () {
        if (this.MenuRarity !== 'all' && this.MenuRarity !== '') {
          return this.massive.filter(card => card['rarity'] === this.MenuRarity)
        } else
          return this.massive;
      },

      manaFiltered: function () {
        if (this.MenuMana < 9 && this.MenuMana > -1) {
          return this.massive.filter(card => card['cost'] === this.MenuMana)
        } else if (this.MenuMana === 9) {
          return this.massive.filter(card => card['cost'] > this.MenuMana)
        }
        return this.massive;
      },

      async getCards() {
        const resp = await fetch('https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1', {
          headers: {
            'Content-Type': 'application/json',
            'X-Mashape-Key': '4dWa3VgL5HmshG40JWJTJDp1qLYvp1vET4vjsniGMTrsJbabTq'
          },
          method: 'GET',
          mode: 'cors',
          cache: 'default'
        }).then(r => r.json())

        for (let adv in resp) {
          if (resp[adv].length > 0) {
            for (let card of resp[adv]) {


              if ('race' in card) {
                this.addRace(card.race)
              }
              if ('mechanics' in card) {
                this.addMechanic(card.mechanics)
              }
              if ('rarity' in card) {
                this.addRarity(card.rarity)
              }
              if ((card['cardSet'] !== 'Hero Skins' &&
                card['type'] !== 'Hero Power') &&
                (card['cardSet'] === 'The Boomsday Project' ||
                  card['cardSet'] === 'The Witchwood' ||
                  card['cardSet'] === 'Journey to Un\'Goro' ||
                  card['cardSet'] === 'Basic' ||
                  card['cardSet'] === 'Classic' ||
                  card['cardSet'] === 'Knights of the Frozen Throne' ||
                  card['cardSet'] === 'Kobolds & Catacombs' ||
                  card['cardSet'] === 'Rastakhan\'s Rumble')) {
                this.addCard(card)

              }
            }
          }
        }
        this.isLoaded = true
      },


      pickCard(card) {
        if (this.pickedCardsCount >= 30) return;
        const id = parseInt(card.dbfId);
        let newCard = {
          ...card,
          count: 1,
          dbfId: id
        };
        if (id in this.pickedCards) {
          if (card.rarity === 'Legendary') return; //Лега может быть только 1
          if (this.pickedCards[id].count < 2) {
            this.pickedCardsCount++
          }
          newCard.count = 2;
          this.$set(this.pickedCards, id, newCard)
        } else {
          this.pickedCardsCount++;
          this.$set(this.pickedCards, id, newCard)
        }
      },

      deleteCard(card) {
        this.pickedCardsCount--;
        if (card.count === 2) {
          card.count = 1;
          this.$set(this.pickedCards, card.dbfId, card)
        } else {
          this.$delete(this.pickedCards, card.dbfId)
        }
      },

      generateDeckCode() {
        //Генерация кода колоды для импорта в игру
        let cards = [];
        for (let card in this.pickedCards) {
          cards.push([parseInt(card), this.pickedCards[card]['count']])
        }
        const deck = {
          cards, // массив из пар [dbfid, count]
          heroes: [this.classes[this.currentClass]],
          format: 1 // 1 for Wild, 2 for Standard
        };
        const deckstring = encode(deck);
        const copyToClipboard = str => {
          const el = document.createElement('textarea');
          el.value = str;
          el.setAttribute('readonly', '');
          el.style.position = 'absolute';
          el.style.left = '-9999px';
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el)
        };
        copyToClipboard(deckstring)

      },
    }
  }
</script>

<style>
  .cards-list {
    float: left;
    width: 80%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 16px;
    min-height: 200px;
  }

  .listCards {
    float: left;
  }

  .deck-left {
    width: 100%;
    overflow-y: scroll;
  }

  .deck-list {
    overflow-y: scroll;
  }

  .deck-card {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 40px;
    border-bottom: 1px solid #000;
  }

  .single-card {
    min-height: 300px;
    background-size: auto 100%;
    background: no-repeat center;
    height: 330px;
  }

  .deck-card-face {
    background-color: #1b120d;
    background-position: -20% 28%;
    background-size: 125%;
    flex: 1;
    position: relative;
  }

  .deck-card-face span {
    position: relative;
    display: block;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-size: 14px;
    z-index: 11;
    font-weight: 900;
    color: #fff;
    text-shadow: 1px 1px 1px #000;
  }

  .deck-card-cost {
    display: flex;
    z-index: 11;
    align-items: center;
    justify-content: center;
    background: #104e80;
    font-weight: 900;
    color: #fff;
    padding: 10px 0;
    width: 34px;
    border-right: solid 1px #000;
    box-sizing: border-box;
    text-align: center;
    text-shadow: 1px 1px 0 #000, 0 1px 0 #000, 1px 0 0 #000;
  }

  .deck-card-cost:before {
    content: attr(data-cost);
    font-weight: 900;
    text-shadow: 0 0 2px #000;
  }

  .deck-card-count {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #331504;
    padding: 10px 0;
    width: 34px;
    text-align: center;
    box-sizing: border-box;
    z-index: 12;
  }

  .deck-card-count span {
    color: #fff60a;
    font-weight: 900;
    text-shadow: 0 0 2px #000;
  }

  .deck-card-count.Legendary {
    box-shadow: -6px 0px #ff8f08;
  }

  .deck-card-count.Common {
    box-shadow: -6px 0px #838383;
  }

  .deck-card-count.Rare {
    box-shadow: -6px 0px #0763ae;
  }

  .deck-card-count.Epic {
    box-shadow: -6px 0px #7b28b3;
  }

</style>
