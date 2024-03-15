<template>
  <div class="table-container">
    <h1>Liste des administrateurs</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="admin in admins" :key="admin.id">
          <td>{{ admin.id }}</td>
          <td>{{ admin.last_name }}</td>
          <td>{{ admin.first_name }}</td>
          <td>{{ admin.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserIndex",
  data() {
    return {
      admins: [],
    };
  },
  async mounted() {
    await this.getAdmins();
  },
  methods: {
    async getAdmins() {
      try {
        const response = await axios.get("http://localhost:3000/admins");
        this.admins = response.data.admins;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des administrateurs :",
          error
        );
      }
    },
  },
};
</script>

<style scoped>

</style>
