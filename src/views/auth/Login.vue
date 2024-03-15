<template>
    <div class="containerHome">
    <h1>Connexion</h1>

    <!-- au moment où je submit, je dis d'aller à la méthode login (écoute du submit)-->
    <form @submit.prevent="login">
      <div class="formGroup">
        <label for="user_login">Email </label>
        <input
          id="user_login"
          type="text"
          placeholder="Adresse email"
          autocomplete="email"
          v-model="user.email"
        />
      </div>
      <!-- v-model indique que lorsque j'écris dans les inputs, cela écrit aussi dans les propriétés user -->
      <div class="formGroup">
        <label for="user_password">Mot de passe </label>
        <input
          id="user_password"
          type="password"
          placeholder="Mot de passe"
          autocomplete="current-password"
          v-model="user.password"
        />
      </div>
      <div class="formGroup">
        <button type="submit" class="btn2">Se connecter</button>
        <!-- Utilisez v-if pour afficher errorMessage uniquement s'il est défini -->
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    login() {
      if (!this.user.email || !this.user.password) {
        this.errorMessage = "Veuillez remplir tous les champs.";
        return;
      }

      const data = {
        email: this.user.email,
        password: this.user.password,
      };

      axios
        .post("http://localhost:3000/login", data)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("loggedIn", true);
            // Rediriger l'utilisateur vers Dashboard.vue
            this.$router.push({ name: "dashboard"});
            // Réinitialisation de l'erreur en cas de succès de la connexion
            this.errorMessage = "";
          } else {
            this.errorMessage = response.data.message;
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la connexion:", error);
          this.errorMessage =
            "Une erreur s'est produite lors de la connexion. Veuillez réessayer.";
        });
    },
  },
};
</script>

<style>
.error-message {
  color: red;
}

.containerUsage {
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
}

*,
::after,
::before {
  box-sizing: content-box;
}
.btn2 {
  margin-top: 1rem;
  background-color: #24916a;
  font-family: "Varela Round", sans-serif;
  padding: 0.2rem;
  font-size: 1rem;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 1px #000;
  border-radius: 5px;
  box-shadow: inset 2px 2px 3px rgba(255, 255, 255, 0.6),
    inset -2px -2px 3px rgba(0, 0, 0, 0.6);
}

.btn2:hover {
  background-color: #57bc9a;
}
</style>
