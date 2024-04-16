<template>
  <div class="table-container">
    <h1>Liste des pierres et minéraux</h1>
    <div class="button-container">
      <button class="btn2" @click="sortByAlphabeticalOrder">Trier par nom</button>
      <button class="btn2" @click="sortByColor">Trier par couleur</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Référence</th>
          <th>Pays d'origine</th>
          <th>Couleur</th>
          <th>Stock</th>
          <th>Prix unitaire</th>
          <th>Action</th>
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
          <td class="text-center">
              <button @click="confirmDelete(product.PRODUCT_ID)" class="btnDelete">
              <i class="bi bi-trash"></i>
            </button>
          </td>
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
    async confirmDelete(productId) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cette pierre ?")) {
        await this.deleteProduct(productId);
      }
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`http://localhost:3000/products/${productId}`);
        // Mise à jour de la liste des produits après la suppression
        await this.getProducts();
        alert("Pierre supprimée avec succès !");
      } catch (error) {
        console.error("Erreur lors de la suppression de la pierre :", error);
        alert("Erreur lors de la suppression de la pierre. Veuillez réessayer.");
      }
    },
   sortByAlphabeticalOrder() {
      this.products.sort((a, b) => {
        return a.PRODUCT_NAME.localeCompare(b.PRODUCT_NAME);
      });
    },
    sortByColor() {
      this.products.sort((a, b) => {
        return a.PRODUCT_COLOR.localeCompare(b.PRODUCT_COLOR);
      });
    },
  },
};
</script>

<style scoped>
.button-container button {
  margin-right: 10px;
}

.btnDelete {
  background-color: #d1001f;
  color: white;
  width: 30%; 
}

.btnDelete i {
margin: 0 auto;
}
</style>

