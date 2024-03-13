<template>
  <div class="containerUsage">
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
      <div class="formGroup">
        <label for="user_password">Mot de passe </label>
        <!-- v-model indique que lorsque j'écris dans les inputs, cela écrit aussi dans les propriétés user -->
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
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
return {
    user: {
        email:'',
        password:'',
    }
}
  },
  methods: {
    login() {
      console.log("stop form")
      console.log(this.user)
    }
  }
}
</script>

<style>

.containerUsage {
  padding: 1rem 15rem 1rem 15rem;
  background: linear-gradient(0deg, rgba(34, 193, 195, 1) 14%, rgba(91, 189, 158, 1) 60%);
  width: 10rem;
  margin: 0 auto;
  margin-top: 1rem;
}

.btn2 {
    margin-top: 1rem;
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

.btn2:hover {
  background-color: #57BC9A;
}
</style>
