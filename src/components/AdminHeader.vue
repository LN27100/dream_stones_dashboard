<template>
  <div class="ad_head">
    <div class="spacer"></div>
    <button class="btn3" @click="logout">Déconnexion</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminHeader",

  methods: {
    logout() {
      localStorage.removeItem("loggedIn");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style>
.ad_head {
  border-bottom: solid 1px black;
  background-color: #0b533d;
  height: 1.5rem;
  color: white;
  display: flex;
  align-items: center;
}

.spacer {
  flex: 1;
}

.btn3 {
  background-color: #24916a;
  font-family: "Varela Round", sans-serif;
  padding: 0.2rem 1rem;
  font-size: 1rem;
  color: white;
  border-radius: 5px;
  box-shadow: inset 2px 2px 3px rgba(255, 255, 255, 0.6),
    inset -2px -2px 3px rgba(0, 0, 0, 0.6);
  margin-left: auto;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.btn3:hover {
  background-color: #57bc9a;
}
</style>
