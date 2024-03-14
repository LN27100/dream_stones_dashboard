<template>
  <div class="containerReg">
    <h1>Ajouter un administrateur</h1>
    <form @submit.prevent="addAdmin">
      <div class="input-container">
        <label for="last_name">Nom:</label>
        <input
          type="text"
          id="last_name"
          v-model="adminData.last_name"
          required
        />
      </div>
      <div class="input-container">
        <label for="first_name">Prénom:</label>
        <input
          type="text"
          id="first_name"
          v-model="adminData.first_name"
          required
        />
      </div>
        <div class="input-container">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="adminData.email"
          required
          autocomplete="username"
        />
      </div>
      <div class="input-container">
        <label for="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          v-model="adminData.password"
          required
          autocomplete="new-password"
        />
      </div>
      <div class="button-container">
      <button type="submit">Ajouter</button>
      </div>
    </form>
    <p class="message" v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      adminData: {
        last_name: "",
        first_name: "",
        email: "",
        password: "",
      },
      message: "",
    };
  },
  methods: {
    async addAdmin() {
      try {
        const response = await axios.post(
          "http://localhost:3000/admins",
          this.adminData
        );
        this.message = response.data.message;
      } catch (error) {
        this.message =
          "Une erreur s'est produite lors de l'ajout de l'administrateur.";
        console.error(error);
      }
    },
  },
};
</script>

<style>

.containerReg {
    border-radius: 20px;
  width: 60rem;
  margin: 0 auto;
  background: linear-gradient(0deg, rgba(34, 193, 195, 1) 14%, rgba(91, 189, 158, 1) 60%);
  /* ombrage card */
  -webkit-box-shadow: 10px 15px 5px 3px #6eb59d;
  -moz-box-shadow: 10px 15px 5px 3px #6eb59d;
  filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=10, OffY=15, Color='#6eb59d', Positive='true');
  zoom: 1;
  box-shadow: 10px 15px 5px 3px #6eb59d;
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
  border-radius: 20px;
  }

p.message {
  color: #0B533D;
  text-decoration: none;
}
</style>
