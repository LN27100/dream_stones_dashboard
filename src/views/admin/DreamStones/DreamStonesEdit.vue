<template>
  <div>
    <h1>Détails d'une pierre</h1>
    <select v-model="selectedProductId" @change="fetchProductDetails">
  <option  selected value="">Choisissez un ID</option>
  <option
    v-for="productId in productIds"
    :key="productId"
    :value="productId"
  >
    {{ productId }}
  </option>
</select>


    <div v-if="selectedProduct">
      <h2>Détails de la pierre</h2>

      <p class="recupText2">ID: {{ selectedProduct.PRODUCT_ID }}</p>
      <p class="recupText2">Référence: {{ selectedProduct.PRODUCT_REF }}</p>
      <p class="recupText2">Nom: {{ selectedProduct.PRODUCT_NAME }}</p>
      <p class="recupText2">Description: {{ selectedProduct.PRODUCT_DESC }}</p>
      <p class="recupText2">
        Pays d'origine: {{ selectedProduct.PRODUCT_ORIGIN_COUNTRY }}
      </p>
      <p class="recupText2">Couleur: {{ selectedProduct.PRODUCT_COLOR }}</p>
      <p class="recupText2">Stock: {{ selectedProduct.PRODUCT_STOCK }}</p>
      <p class="recupText2">
        Prix unitaire: {{ selectedProduct.PRODUCT_UNIT_PRICE }}€
      </p>

      <!-- Modifier une pierre -->
      <button class="btn2" @click="showEditForm">Modifier</button>
      <!-- Supprimer une pierre -->
      <button class="btn2" @click="confirmDelete">Supprimer</button>

      <!-- Formulaire de modification -->
      <div v-if="showEditFormFlag">
        <h2>Modifier la pierre</h2>
        <form @submit.prevent="updateProduct">
          <label for="ref">Référence:</label>
          <input
            type="text"
            id="ref"
            v-model="updatedProduct.PRODUCT_REF"
          /><br />

          <label for="name">Nom:</label>
          <input
            type="text"
            id="name"
            v-model="updatedProduct.PRODUCT_NAME"
          /><br />

          <label for="desc">Description:</label>
          <textarea id="desc" v-model="updatedProduct.PRODUCT_DESC"></textarea
          ><br />

          <label for="origin">Pays d'origine:</label>
          <input
            type="text"
            id="origin"
            v-model="updatedProduct.PRODUCT_ORIGIN_COUNTRY"
          /><br />

          <label for="color">Couleur:</label>
          <input
            type="text"
            id="color"
            v-model="updatedProduct.PRODUCT_COLOR"
          /><br />

          <label for="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            v-model="updatedProduct.PRODUCT_STOCK"
          /><br />

          <label for="price">Prix unitaire:</label>
          <input
            type="number"
            id="price"
            v-model="updatedProduct.PRODUCT_UNIT_PRICE"
          /><br />

          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      productIds: [],
      selectedProductId: null,
      selectedProduct: null,
      showEditFormFlag: false,
      updatedProduct: {
        PRODUCT_REF: "",
        PRODUCT_NAME: "",
        PRODUCT_DESC: "",
        PRODUCT_ORIGIN_COUNTRY: "",
        PRODUCT_COLOR: "",
        PRODUCT_STOCK: 0,
        PRODUCT_UNIT_PRICE: 0,
      },
    };
  },
  mounted() {
    this.fetchProductIds();
  },
  methods: {
    async fetchProductIds() {
      try {
        const response = await axios.get("http://localhost:3000/products");
        this.productIds = response.data.products.map(
          (product) => product.PRODUCT_ID
        );
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des IDs des produits :",
          error
        );
      }
    },
    async fetchProductDetails() {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${this.selectedProductId}`
        );
        this.selectedProduct = response.data.product;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de la pierre :",
          error
        );
      }
    },
    showEditForm() {
      this.showEditFormFlag = true;
      // Pré-remplir les champs du formulaire avec les détails actuels du produit
      this.updatedProduct = { ...this.selectedProduct };
    },
    async updateProduct() {
      try {
        await axios.put(
          `http://localhost:3000/products/${this.selectedProductId}`,
          this.updatedProduct
        );
        await this.fetchProductDetails(); // Actualiser les détails de la pierre après la mise à jour
        this.showEditFormFlag = false; // Masquer le formulaire de modification
      } catch (error) {
        console.error("Erreur lors de la mise à jour du produit :", error);
      }
    },
    confirmDelete() {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
        this.deleteProduct();
      }
    },
    async deleteProduct() {
      try {
        await axios.delete(
          `http://localhost:3000/products/${this.selectedProductId}`
        );
        alert("Produit supprimé avec succès !");
        // Redirection vers le dashboard après la suppression
        this.$router.push("/admin/dashboard");
      } catch (error) {
        console.error("Erreur lors de la suppression du produit :", error);
        alert("Erreur lors de la suppression du produit. Veuillez réessayer.");
      }
    },
  },
};
</script>

<style>
.recupText2 {
  color: black;
  text-decoration: none;
}
</style>
