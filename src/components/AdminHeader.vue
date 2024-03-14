<template>
  <div class="ad_head">
    <h3>Bienvenue {{firstName}}</h3>
    <button class="btn3" @click="logout">Déconnexion</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AdminHeader",
  data() {
    return {
      firstName: ''
    };
  },
  mounted() {
    // Récupérer le prénom de l'administrateur depuis la bdd
    axios.get('http://localhost:3000/admins/:id/firstName') 
      .then(response => {
        this.firstName = response.data.first_name;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du prénom de l\'administrateur :', error);
      });
  },
  methods: {
    logout() {
      localStorage.removeItem("loggedIn");
      this.$router.push({ name: "Login" });
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
  display: flex;
  align-items: center; 
  justify-content: space-between;
}

h3 {
  margin: 0; 
  text-align: center; 
  flex-grow: 1; /* occupe tout l'espace disponible */
}

.btn3 {
  background-color: #24916a;
  font-family: "Varela Round", sans-serif;
  padding: 0.2rem 1rem; 
  font-size: 1rem;
  color: white;
  border-radius: 5px;
  box-shadow: inset 2px 2px 3px rgba(255, 255, 255, 0.6), inset -2px -2px 3px rgba(0, 0, 0, 0.6);
}

.btn3:hover {
  background-color: #57bc9a;
}


</style>
