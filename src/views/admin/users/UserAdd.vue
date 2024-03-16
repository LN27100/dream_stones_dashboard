<template>
  <div class="containerReg">
    <h1>Ajouter un administrateur</h1>
    <form @submit.prevent="addAdmin">
      <div class="input-container">
        <label for="last_name">Nom:</label>
        <input
          type="text"
          id="last_name"
          v-model="adminData.last_name"
          required
        />
        <!-- contrôle de champs obligatoire -->
        <span v-if="!adminData.last_name" class="required-label">*</span>
      </div>
      <div class="input-container">
        <label for="first_name">Prénom:</label>
        <input
          type="text"
          id="first_name"
          v-model="adminData.first_name"
          required
        />
        <span v-if="!adminData.first_name" class="required-label">*</span>
      </div>
      <div class="input-container">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="adminData.email"
          required
          autocomplete="username"
        />
        <span v-if="!adminData.email" class="required-label">*</span>
      </div>
      <div class="input-container">
        <label for="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          v-model="adminData.password"
          required
          autocomplete="new-password"
          @click="showPasswordConditions = !showPasswordConditions"
        />
        <span v-if="!adminData.password" class="required-label">*</span>
        <div class="password-conditions" :class="{ 'visible': showPasswordConditions }">
          <div :class="{ 'condition-failed': !hasMinimumLength, 'condition-passed': hasMinimumLength }">Au moins 8 caractères</div>
          <div :class="{ 'condition-failed': !hasLowerCase, 'condition-passed': hasLowerCase }">Une lettre minuscule</div>
          <div :class="{ 'condition-failed': !hasUpperCase, 'condition-passed': hasUpperCase }">Une lettre majuscule</div>
          <div :class="{ 'condition-failed': !hasNumber, 'condition-passed': hasNumber }">Un chiffre</div>
          <div :class="{ 'condition-failed': !hasSpecialChar, 'condition-passed': hasSpecialChar }">Un caractère spécial</div>
        </div>
      </div>
      <div class="button-container">
        <button type="submit" :disabled="!isValidPassword">Ajouter</button>
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
      adminData: {
        last_name: "",
        first_name: "",
        email: "",
        password: "",
      },
      message: "",
      showPasswordConditions: false,
    };
  },
  computed: {
    isValidPassword() {
      return (
        this.hasMinimumLength &&
        this.hasLowerCase &&
        this.hasUpperCase &&
        this.hasNumber &&
        this.hasSpecialChar
      );
    },
    hasMinimumLength() {
      return this.adminData.password.length >= 8;
    },
    hasLowerCase() {
      return /[a-z]/.test(this.adminData.password);
    },
    hasUpperCase() {
      return /[A-Z]/.test(this.adminData.password);
    },
    hasNumber() {
      return /\d/.test(this.adminData.password);
    },
    hasSpecialChar() {
      return /[!@#$%^&*()_+]/.test(this.adminData.password);
    },
  },
  methods: {
    async addAdmin() {
      if (!this.isValidPassword) {
        this.message = "Le mot de passe ne respecte pas les critères requis.";
        return; // Ne continuez pas si le mot de passe est invalide
      }
      
      try {
        const response = await axios.post(
          "http://localhost:3000/admins",
          this.adminData
        );
        this.message = response.data.message;
      } catch (error) {
        this.message =
          "Une erreur s'est produite lors de l'ajout de l'administrateur.";
        console.error(error);
      }
    },
  },
};
</script>

<style>

.containerReg {
  margin: 2rem auto 0; 
  width: 40rem;
  background: linear-gradient(0deg, rgba(34, 193, 195, 1) 14%, rgba(91, 189, 158, 1) 60%);
  box-shadow: 10px 15px 5px 3px #6eb59d;
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
  border-radius: 20px;
}

.input-container {
  position: relative;
}

.required-label {
  position: absolute;
  top: 5px;
  right: -15px;
  color: red;
  font-size: 1rem;
}

.password-conditions {
  margin-top: 5px;
  display: none;
}

.password-conditions.visible {
  display: block;
}

.password-conditions div {
  font-size: 0.9rem;
}

.condition-failed {
  color: red;
}

.condition-passed {
  color: green;
}

p.message {
  color: #0B533D;
  text-decoration: none;
}
</style>
