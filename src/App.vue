<template>
  <div id="app">

    <nav>
      <router-link to="/">Add questions</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',

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
  margin-top: 60px;
  grid-template-rows: auto;
  justify-items: center;
  padding-top: 50px;
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
nav a:hover {
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
    border-bottom-right-radius: 3px;
}
a {
  color: #178656;
}
</style>
