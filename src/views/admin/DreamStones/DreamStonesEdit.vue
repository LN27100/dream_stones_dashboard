<template>
    <div>
      <h1>Sélectionner une pierre</h1>
      <select v-model="selectedProductId" @change="fetchProductDetails">
        <option v-for="productId in productIds" :key="productId" :value="productId">{{ productId }}</option>
      </select>
  
      <div v-if="selectedProduct">
        <h2>Détails de la pierre</h2>
        <p>Nom: {{ selectedProduct.PRODUCT_NAME }}</p>
        <p>Description: {{ selectedProduct.PRODUCT_DESC }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        productIds: [], // Stocke les IDs des produits
        selectedProductId: null, // Stocke l'ID de la pierre sélectionnée
        selectedProduct: null // Stocke les détails de la pierre sélectionnée
      };
    },
    mounted() {
      this.fetchProductIds();
    },
    methods: {
      async fetchProductIds() {
        try {
          const response = await axios.get('http://localhost:3000/products');
          this.productIds = response.data.products.map(product => product.PRODUCT_ID);
        } catch (error) {
          console.error('Erreur lors de la récupération des IDs des produits :', error);
        }
      },
      async fetchProductDetails() {
        try {
          // Récupère les détails de la pierre sélectionnée depuis le backend
          const response = await axios.get(`http://localhost:3000/products/${this.selectedProductId}`);
          this.selectedProduct = response.data.product;
        } catch (error) {
          console.error('Erreur lors de la récupération des détails de la pierre :', error);
        }
      }
    }
  };
  </script>
  
  <style>
  /* Ajoute du style au besoin */
  </style>
  