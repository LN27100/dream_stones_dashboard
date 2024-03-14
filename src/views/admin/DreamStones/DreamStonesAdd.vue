<template>
    <div class="containerReg">
      
      <h1>Ajouter un produit</h1>

      <form @submit.prevent="addProduct">
        <div class="input-container">
          <label for="productRef">Référence du produit:</label>
          <input
            type="text"
            id="productRef"
            v-model="productData.PRODUCT_REF"
            required
          />
        </div>
        <div class="input-container">
          <label for="productDesc">Description du produit:</label>
          <textarea
            id="productDesc"
            v-model="productData.PRODUCT_DESC"
            required
          ></textarea>
        </div>
        <div class="input-container">
          <label for="productStock">Stock:</label>
          <input
            type="number"
            id="productStock"
            v-model="productData.PRODUCT_STOCK"
            required
          />
        </div>
        <div class="input-container">
          <label for="productUnitPrice">Prix unitaire:</label>
          <input
            type="number"
            step="0.01"
            id="productUnitPrice"
            v-model="productData.PRODUCT_UNIT_PRICE"
            required
          />
        </div>
        <div class="input-container">
          <label for="productOriginCountry">Pays d'origine:</label>
          <input
            type="text"
            id="productOriginCountry"
            v-model="productData.PRODUCT_ORIGIN_COUNTRY"
            required
          />
        </div>
        <div class="input-container">
          <label for="productPicture">Image du produit:</label>
          <input
            type="text"
            id="productPicture"
            v-model="productData.PRODUCT_PICTURE"
          />
        </div>
        <div class="input-container">
          <label for="splId">Identifiant SPL:</label>
          <input
            type="number"
            id="splId"
            v-model="productData.SPL_ID"
            required
          />
        </div>
        <div class="input-container">
          <label for="typeId">Identifiant de type:</label>
          <input
            type="number"
            id="typeId"
            v-model="productData.TYPE_ID"
            required
          />
        </div>
        <div class="input-container">
          <label for="productName">Nom du produit:</label>
          <input
            type="text"
            id="productName"
            v-model="productData.PRODUCT_NAME"
          />
        </div>
        <div class="input-container">
          <label for="productColor">Couleur du produit:</label>
          <input
            type="text"
            id="productColor"
            v-model="productData.PRODUCT_COLOR"
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
  
  <style>

.containerReg {
    border-radius: 20px;
  width: 40rem;
  margin-left: 17rem;
  padding: 1rem;
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

h1 {
  margin-bottom: 1rem;
  text-align: center;
}

.input-container {
  text-align: right;
  margin-bottom: 1rem;
  margin-right: 2rem;
}

label {
  text-align: center;
  vertical-align: top;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="number"],
input[type="password"],
input[type="email"],
textarea {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 20rem;
  margin-left: 1rem;
}

button[type="submit"] {
  width: 8rem;
  background-color: #24916A;
  font-family: "Varela Round", sans-serif;
  padding: 0.2rem;
  font-size: 1rem;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 1px #000;
  border-radius: 5px;
  box-shadow:
    inset 2px 2px 3px rgba(255, 255, 255, 0.6),
    inset -2px -2px 3px rgba(0, 0, 0, 0.6);
}

button[type="submit"]:hover {
  background-color: #57BC9A;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem; 
}
</style>
  