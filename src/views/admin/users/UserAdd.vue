<template>
  <div>
    <h2>Ajouter un administrateur</h2>
    <form @submit.prevent="addAdmin">
      <div>
        <label for="last_name">Nom:</label>
        <input
          type="text"
          id="last_name"
          v-model="adminData.last_name"
          required
        />
      </div>
      <div>
        <label for="first_name">Prénom:</label>
        <input
          type="text"
          id="first_name"
          v-model="adminData.first_name"
          required
        />
      </div>
      <div>
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="adminData.email"
          required
          autocomplete="username"
        />
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          v-model="adminData.password"
          required
          autocomplete="new-password"
        />
      </div>
      <button type="submit">Ajouter</button>
    </form>
    <p v-if="message">{{ message }}</p>
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

<style></style>
