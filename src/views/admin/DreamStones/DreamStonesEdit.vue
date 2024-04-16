<template>
  <div class="containerReg">
    <h1>Détails d'une pierre</h1>
    <select
      id="selectedProductId"
      name="selectedProductId"
      v-model="selectedProduct"
      @change="fetchProductDetails"
    >
      <option disabled value="">Sélectionner une pierre</option>
      <option
        v-for="product in products"
        :key="product.PRODUCT_ID"
        :value="product"
      >
        {{ product.PRODUCT_NAME }}
      </option>
    </select>

    <div v-if="selectedProduct">
      <!-- Détails de la pierre sélectionnée -->
      <p class="recupText2">
        <span>ID:</span> {{ selectedProduct.PRODUCT_ID }}
      </p>
      <p class="recupText2">
        <span>Référence:</span> {{ selectedProduct.PRODUCT_REF }}
      </p>
      <p class="recupText2">
        <span>Nom:</span> {{ selectedProduct.PRODUCT_NAME }}
      </p>
      <p class="recupText2">
        <span>Description:</span> {{ selectedProduct.PRODUCT_DESC }}
      </p>
      <p class="recupText2">
        Pays d'origine: {{ selectedProduct.PRODUCT_ORIGIN_COUNTRY }}
      </p>
      <p class="recupText2">
        <span>Couleur:</span> {{ selectedProduct.PRODUCT_COLOR }}
      </p>
      <p class="recupText2">
        <span>Stock:</span> {{ selectedProduct.PRODUCT_STOCK }}
      </p>
      <p class="recupText2">
        <span>Prix unitaire:</span> {{ selectedProduct.PRODUCT_UNIT_PRICE }}€
      </p>

      <div class="spaceBtn">
        <button class="btn2" @click="showEditForm">Modifier</button>
      </div>

      <!-- Formulaire de modification -->
      <div v-if="showEditFormFlag">
        <h2>Modifier la pierre</h2>
        <form @submit.prevent="updateProduct">
          <div class="input-container">
            <label for="ref">Référence:</label>
            <input
              type="text"
              name="ref"
              id="ref"
              v-model="updatedProduct.PRODUCT_REF"
            />
          </div>
          <div class="input-container">
            <label for="name">Nom:</label>
            <input
              type="text"
              id="name"
              name="name"
              v-model="updatedProduct.PRODUCT_NAME"
            />
          </div>
          <div class="input-container">
            <label for="desc">Description:</label>
            <textarea
              id="desc"
              name="desc"
              v-model="updatedProduct.PRODUCT_DESC"
            ></textarea>
          </div>
          <div class="input-container">
            <label for="origin">Pays d'origine:</label>
            <input
              type="text"
              id="origin"
              name="origin"
              v-model="updatedProduct.PRODUCT_ORIGIN_COUNTRY"
            />
          </div>
          <div class="input-container">
            <label for="color">Couleur:</label>
            <input
              type="text"
              id="color"
              name="color"
              v-model="updatedProduct.PRODUCT_COLOR"
            />
          </div>
          <div class="input-container">
            <label for="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              v-model="updatedProduct.PRODUCT_STOCK"
            />
          </div>
          <div class="input-container">
            <label for="price">Prix unitaire:</label>
            <input
              type="number"
              id="price"
              name="price"
              v-model="updatedProduct.PRODUCT_UNIT_PRICE"
            />
          </div>
          <div class="spaceBtn">
            <button class="btn2" type="submit">Enregistrer</button>
            <button type="button" class="btn2" @click="cancelEdit">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  emits: ['vnode-unmounted'], // Déclaration des événements émis
  data() {
    return {
      products: [],
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
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/products");
        this.products = response.data.products;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des produits :",
          error
        );
      }
    },
    async fetchProductDetails() {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${this.selectedProduct.PRODUCT_ID}`
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
          `http://localhost:3000/products/${this.selectedProduct.PRODUCT_ID}`,
          this.updatedProduct
        );
        await this.fetchProductDetails(); // Actualiser les détails de la pierre après la mise à jour
        this.showEditFormFlag = false; // Masquer le formulaire de modification
      } catch (error) {
        console.error("Erreur lors de la mise à jour du produit :", error);
      }
    },
    cancelEdit() {
      // Retourner formulaire aux détails actuels du produit
      this.updatedProduct = { ...this.selectedProduct };
      // Masquer le formulaire de modification
      this.showEditFormFlag = false;
    },
  },
};
</script>

<style>
.recupText2 {
  color: black;
  text-decoration: none;
}

.spaceBtn {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

span {
  font-weight: bold;
}
</style>
