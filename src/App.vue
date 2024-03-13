<!-- composant de démarrage (vue de démarrage) -->
<template>
      <img alt="Vue logo" src="./assets/logo.png">
<nav>

  <router-link to='/'>Accueil</router-link> |
  <router-link to='/admin/dashboard'>Dashboard Dream Stones</router-link>

</nav>
<!-- ici j'affiche le template du Layout qui servira à tous les enfants aussi -->
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

img {
  position: absolute;
  left: 1.8rem;
  height: 3rem;
}
</style>
