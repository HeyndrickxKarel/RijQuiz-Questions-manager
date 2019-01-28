<template>
  <div id="app">

    <nav>
      <router-link to="/" v-on:click.native="setActive('addQuestions')" :class="{active: isActive('addQuestions')}">Add questions</router-link>
      <router-link to="/questionlist" v-on:click.native="setActive('questionlist')" :class="{ active: isActive('questionlist') }">Questionlist</router-link>
      <router-link to="/about" v-on:click.native="setActive('about')" :class="{ active: isActive('about') }">About</router-link>
    </nav>
  <transition name="router-animation">
   <router-view/>
</transition>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return{
      activeItem: 'addQuestions'
    }
  },
  methods: {
    setActive(item){
      this.activeItem = item;
    },
    isActive(item){
      return this.activeItem === item;

    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
body {
    background-color: #EEEEEE;
  font-family: 'Avenir', 'Montserrat',Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  grid-template-rows: auto;
  justify-items: center;
  padding-top: 20px;
  display: grid;
  text-align: center;
}

#app {
  width:100%;
}
nav {
  padding: 20px 20px 20px 0;
}
nav a {
  padding: 10px;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #178656;
  transition: 0.4s;
}
nav a:hover, .active {
  color: white;
  background-color: #178656;

}
nav a:first-child{
    border-right: none;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}
nav a:last-child{
    border-top-right-radius: 3px;
    border-left: none;
    border-bottom-right-radius: 3px;
}
a {
  color: #178656;
}
.page {
  position: fixed;
  width: inherit;
}.router-animation-enter-active {
  animation: coming 1s;
  animation-delay: .5s;
  opacity: 0;
}
.router-animation-leave-active {
  animation: going 1s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(50px);
    opacity: 0;
  }
}
@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

</style>
