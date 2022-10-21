<template>
  <div id="app">
    <div id="roomText" v-if="!game.hasSubscreen()"> <pre>{{game.roomText}}</pre> </div>

    <div id="eventText" v-if="!game.hasSubscreen()"> <pre>{{game.eventText}}</pre> </div>

    <div id="inputText" v-if="!game.hasSubscreen()"> <pre>What would you like to do?</pre> </div>

    <div id="subscreenText" v-if="game.hasSubscreen()" style="color:red"> <pre>{{game.subscreens[0].text}}</pre> </div>

    <div id="optionText" v-bind:class="{ option: game.hasSubscreen() }"> <pre>{{game.optionText}}</pre> </div>
  </div>
</template>

<script>
import * as game from "@/src/game.js"
//import * as engine from "@/src/gameEngine.js"

export default {
  data() {
    return {
      game: game.getNewGame(),
    }
  },
  methods: {
    processInput(e) {
      let input = e.key.toLowerCase()
      this.game.runCommand(input)
      this.game.updateText()
    },
    onLoad() {
      document.addEventListener("keydown",(e) => this.processInput(e))
      this.game.updateText()
    }
  },
  mounted() {
    this.onLoad()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: green;
  margin-top: 60px;
}
#input {
  position: absolute;
  top: 10000px;

}
body {
  background-color: black;
  font-size: 1.6em;
  font-weight: 0;
  letter-spacing: 0.04em;
  margin-top: 5%;
  overflow: hidden; /* Hide scrollbars */
}

.option {
  color: red;
}
</style>
