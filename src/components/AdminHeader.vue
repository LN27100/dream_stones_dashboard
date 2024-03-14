<template>
  <div class="ad_head">
    Bienvenue administrateur
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AdminHeader",
  methods: {
    async logout() {
      try {
        // Appel de l'API pour déconnecter l'utilisateur
        await axios.post('/logout');
        // Redirection vers la page de connexion
        this.$router.push('/login');
      } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
      }
    }
  }
};
</script>


<style>
.ad_head {
  border-bottom: solid 1px black;
  background-color: #0b533d;
  height: 3rem;
  color: white;
}
</style>
