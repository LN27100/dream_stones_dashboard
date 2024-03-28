<template>
    <PublicNav />
  <!-- ici j'affiche le template du Layout qui servira à tous les enfants aussi -->
  <router-view/>

  <AdminFooter />

</template>

<script>
import PublicNav from "@/components/PublicNav.vue";
import AdminFooter from "@/components/AdminFooter.vue";

export default {
  name: "App",
  components: {
    PublicNav,
    AdminFooter,
  },
};
</script>

<style>
/* Style global de la page racine et de ses enfants */
@import url('https://fonts.googleapis.com/css2?family=Macondo&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

/* Scrollbar personnalisée */

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(74, 168, 85, 0.3);
  background-color: #24916A;
}

::-webkit-scrollbar {
  width: 1rem;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #0B533D;
  border: 2px solid #24916A;
  background-image: -webkit-linear-gradient(90deg,
      transparent,
      rgba(94, 92, 92, 0.4) 70%,
      transparent,
      transparent)
}

/* Autres styles */

#app {
  font-family: "Varela Round", sans-serif;
  text-align: center;
  min-height: 100vh;
}


h1 {
  font-family: "Macondo", cursive;
  margin-bottom: 1rem;
  text-align: center;
}

/* tableaux */

.table-container {
  margin: 0 auto; 
  width: 80%; 
  margin-top: 2rem;
  margin-bottom: 3rem;
}

table {
  margin: 0 auto;
  width: 60%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  color: white;
  background-color: #0b533d;
}

td {
  background-color: #6eb59d;
}

/* card add */

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


#app > footer > div > p {
  color: black;
  text-decoration: none;
  text-align: center;
  margin-top: 0.3rem;
}

</style>
