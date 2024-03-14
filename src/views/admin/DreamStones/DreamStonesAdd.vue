<template>
    <div>
      <h2>Ajouter un produit</h2>
      <form @submit.prevent="addProduct">
        <div>
          <label for="productRef">Référence du produit:</label>
          <input
            type="text"
            id="productRef"
            v-model="productData.PRODUCT_REF"
            required
          />
        </div>
        <div>
          <label for="productDesc">Description du produit:</label>
          <textarea
            id="productDesc"
            v-model="productData.PRODUCT_DESC"
            required
          ></textarea>
        </div>
        <div>
          <label for="productStock">Stock:</label>
          <input
            type="number"
            id="productStock"
            v-model="productData.PRODUCT_STOCK"
            required
          />
        </div>
        <div>
          <label for="productUnitPrice">Prix unitaire:</label>
          <input
            type="number"
            step="0.01"
            id="productUnitPrice"
            v-model="productData.PRODUCT_UNIT_PRICE"
            required
          />
        </div>
        <div>
          <label for="productOriginCountry">Pays d'origine:</label>
          <input
            type="text"
            id="productOriginCountry"
            v-model="productData.PRODUCT_ORIGIN_COUNTRY"
            required
          />
        </div>
        <div>
          <label for="productPicture">Image du produit:</label>
          <input
            type="text"
            id="productPicture"
            v-model="productData.PRODUCT_PICTURE"
          />
        </div>
        <div>
          <label for="splId">Identifiant SPL:</label>
          <input
            type="number"
            id="splId"
            v-model="productData.SPL_ID"
            required
          />
        </div>
        <div>
          <label for="typeId">Identifiant de type:</label>
          <input
            type="number"
            id="typeId"
            v-model="productData.TYPE_ID"
            required
          />
        </div>
        <div>
          <label for="productName">Nom du produit:</label>
          <input
            type="text"
            id="productName"
            v-model="productData.PRODUCT_NAME"
          />
        </div>
        <div>
          <label for="productColor">Couleur du produit:</label>
          <input
            type="text"
            id="productColor"
            v-model="productData.PRODUCT_COLOR"
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
        productData: {
          PRODUCT_REF: "",
          PRODUCT_DESC: "",
          PRODUCT_STOCK: 0,
          PRODUCT_UNIT_PRICE: 0,
          PRODUCT_ORIGIN_COUNTRY: "",
          PRODUCT_PICTURE: "",
          SPL_ID: 0,
          TYPE_ID: 0,
          PRODUCT_NAME: "",
          PRODUCT_COLOR: "",
        },
        message: "",
      };
    },
    methods: {
      async addProduct() {
        try {
          const response = await axios.post(
            "http://localhost:3000/products",
            this.productData
          );
          this.message = response.data.message;
        } catch (error) {
          this.message =
            "Une erreur s'est produite lors de l'ajout du produit.";
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style></style>
  