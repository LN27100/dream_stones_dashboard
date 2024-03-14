<template>
    <div>
      <h1>Liste des pierres et minéraux</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Référence</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Prix unitaire</th>
            <th>Pays d'origine</th>
            <th>Couleur</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.PRODUCT_ID">
            <td>{{ product.PRODUCT_ID }}</td>
            <td>{{ product.PRODUCT_REF }}</td>
            <td>{{ product.PRODUCT_DESC }}</td>
            <td>{{ product.PRODUCT_STOCK }}</td>
            <td>{{ product.PRODUCT_UNIT_PRICE }}</td>
            <td>{{ product.PRODUCT_ORIGIN_COUNTRY }}</td>
            <td>{{ product.PRODUCT_COLOR }}</td>
            <td>{{ product.PRODUCT_PICTURE }}</td>
            <!-- Ajout de la colonne 'Couleur' -->
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: 'DreamStonesIndex',
    data() {
      return {
        products: []
      };
    },
    async mounted() {
      await this.getProducts();
    },
    methods: {
      async getProducts() {
        try {
          const response = await axios.get('http://localhost:3000/products');
          this.products = response.data.products;
        } catch (error) {
          console.error('Erreur lors de la récupération des produits :', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  