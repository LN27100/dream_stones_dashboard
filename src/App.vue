<!-- composant de démarrage (vue de démarrage) -->
<template>
  <img alt="Vue logo" src="./assets/logo.png">
<nav class="homeNav">

  <PublicNav />

</nav>
<!-- ici j'affiche le template du Layout qui servira à tous les enfants aussi -->
<router-view/>
</template>


<script>
import PublicNav from "@/components/PublicNav.vue";

export default {
  name: "App",
  components: {
    PublicNav,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Macondo&display=swap');
/*   font-family: "Macondo", cursive; */
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
/*   font-family: "Varela Round", sans-serif; */

#app {
  font-family: "Varela Round", sans-serif;
    -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

h1 {
  font-family: "Macondo", cursive;
}

img {
  position: absolute;
  left: 1.8rem;
  height: 5rem;
}

.homeNav {
  background-color: #0b533d;
  height: 5rem;
}
</style>
