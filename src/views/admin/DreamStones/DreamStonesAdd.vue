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

        <!-- contrôle de champs obligatoires affiché uniquement si le champs n'est pas rempli-->
        <span v-if="!productData.PRODUCT_REF" class="required-label">*</span>
      </div>

      <div class="input-container">
        <label for="productDesc">Description du produit:</label>
        <textarea
          id="productDesc"
          v-model="productData.PRODUCT_DESC"
          required
        ></textarea>
        <span v-if="!productData.PRODUCT_DESC" class="required-label">*</span>
      </div>

      <div class="input-container">
        <label for="productStock">Stock:</label>
        <!-- v-model : Lorsque la valeur du champ de saisie est modifiée, la propriété de l'objet est mise à jour automatiquement. -->
        <input
          type="number"
          id="productStock"
          v-model="productData.PRODUCT_STOCK"
          required
        />
        <span v-if="!productData.PRODUCT_STOCK" class="required-label">*</span>
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
        <span v-if="!productData.PRODUCT_UNIT_PRICE" class="required-label">*</span>
      </div>

      <div class="input-container">
        <label for="productOriginCountry">Pays d'origine:</label>
        <input
          type="text"
          id="productOriginCountry"
          v-model="productData.PRODUCT_ORIGIN_COUNTRY"
          required
        />
        <span v-if="!productData.PRODUCT_ORIGIN_COUNTRY" class="required-label">*</span>
      </div>

      <div class="input-container">
        <label for="productPicture">Image du produit:</label>
        <input
          type="text"
          id="productPicture"
          v-model="productData.PRODUCT_PICTURE"
          required
        />
        <span v-if="!productData.PRODUCT_PICTURE" class="required-label">*</span>
      </div>

      <div class="input-container">
        <label for="splId">Identifiant SPL:</label>
        <input
          type="number"
          id="splId"
          v-model="productData.SPL_ID"
          required
        />
        <span v-if="!productData.SPL_ID" class="required-label">*</span>
      </div>

      <div class="input-container">
        <label for="typeId">Identifiant de type:</label>
        <input
          type="number"
          id="typeId"
          v-model="productData.TYPE_ID"
          required
        />
        <span v-if="!productData.TYPE_ID" class="required-label">*</span>
      </div>

      <div class="input-container">
        <label for="productName">Nom du produit:</label>
        <input
          type="text"
          id="productName"
          v-model="productData.PRODUCT_NAME"
          required
        />
        <span v-if="!productData.PRODUCT_NAME" class="required-label">*</span>
      </div>

      <div class="input-container">
        <label for="productColor">Couleur du produit:</label>
        <input
          type="text"
          id="productColor"
          v-model="productData.PRODUCT_COLOR"
          required
        />
        <span v-if="!productData.PRODUCT_COLOR" class="required-label">*</span>
      </div>

      <div class="button-container">
        <button class="btn2" type="submit">Ajouter</button>
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
        // Afficher le message pendant 3 secondes puis le supprimer
        setTimeout(() => {
          this.message = "";
        }, 3000);
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


.input-container {
  position: relative;
}

/* champs obligatoires */
.required-label {
  position: absolute;
  top: 5px;
  right: -15px;
  color: red;
  font-size: 1rem;
}

  /* Pop-up confirmation ajout pierre */

.message {
  background-color: #4CAF50;
  color: white;
  text-align: center;
  padding: 16px;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
