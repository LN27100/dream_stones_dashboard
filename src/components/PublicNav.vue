<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <nav class="main-nav">
    <router-link to="/">Accueil</router-link>
    <span class="divider">|</span>
    <router-link to="/admin/dashboard">Admin</router-link>
    <span class="divider">|</span>
    <router-link to="/login">Connexion</router-link>
  </nav>
</template>

<script>
export default {
  name: "PublicNav",
};
</script>

<style>
#app > nav {
  background-color: #0b533d;
  padding-top: 1.5rem;
  height: 3.8rem;
}

img {
  position: absolute;
  left: 1rem;
  height: 5rem;
  box-shadow: 0 0 25px 10px rgba(255, 255, 255, 0.5);
  margin-top: 1rem;
}

.divider {
  color: white;
  margin: 0 5px;
}

a:-webkit-any-link {
  text-decoration: none;
  color: white;
}

a.router-link-exact-active {
  color: #0b533d;
  font-weight: bold;
}
</style>
