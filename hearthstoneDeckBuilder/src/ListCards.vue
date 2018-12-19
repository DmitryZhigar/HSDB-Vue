<template>
  <div>
    <aside class="deck-left" v-if="pickedCardsCount > 0">
      <ul class="deck-list">
        <li class="deck-card" v-for="card in displayPickedCards" :key="card.id" @click="deleteCard(card)">
          <div class="deck-card-cost"><span>{{card.cost}}</span></div>
          <div class="blur"></div>
          <div class="deck-card-face" :style="'background-image: url(' + card.img + ')'">
            <span :class="[card.rarity]" data-card="KAR_009">{{card.name}}</span>
          </div>
          <div :class="['deck-card-count',card.rarity]"><span>{{card.rarity === 'Legendary' ? '★' : card.count}}</span>
          </div>
        </li>
      </ul>
      <el-button :disabled="pickedCardsCount !== 30" @click="generateDeckCode">
        Copy deck
      </el-button>
    </aside>
  </div>
</template>

<script>
  export default {
    name: "ListCards"
  }
</script>

<style scoped>

  .deck-left {
    min-width: 320px;
  }

  .deck-card {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 40px;
    border-bottom: 1px solid #000;
  }

  .deck-card:before {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    background: linear-gradient(
      to right,
      #282828 25%,
      rgba(120, 120, 120, 0) 80%
    );
    top: 0;
    z-index: 10;
  }

  .deck-card:hover::before {
    background: linear-gradient(
      to right,
      #505050 20%,
      rgba(120, 120, 120, 0) 80%
    );
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

  .deck-card-count.common {
    box-shadow: -6px 0px #838383;
  }

  .deck-card-count.rare {
    box-shadow: -6px 0px #0763ae;
  }

  .deck-card-count.epic {
    box-shadow: -6px 0px #7b28b3;
  }


</style>
