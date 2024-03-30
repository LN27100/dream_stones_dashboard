<template>
  <div class="table-container">
    <h1>Liste des pierres et minéraux</h1>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Référence</th>
          <th>Pays d'origine</th>
          <th>Couleur</th>
          <th>Stock</th>
          <th>Prix unitaire</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.PRODUCT_ID">
          <td>{{ product.PRODUCT_NAME }}</td>
          <td>{{ product.PRODUCT_REF }}</td>
          <td>{{ product.PRODUCT_ORIGIN_COUNTRY }}</td>
          <td>{{ product.PRODUCT_COLOR }}</td>
          <td>{{ product.PRODUCT_STOCK }}</td>
          <td>{{ product.PRODUCT_UNIT_PRICE }} €</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  emits: ['vnode-unmounted'],
  name: "DreamStonesIndex",
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    await this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        const response = await axios.get("http://localhost:3000/products");
        this.products = response.data.products;
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    },
  },
};
</script>

<style scoped>

</style>
