<template>
  <div>
    <ul>
      <li><router-link to='/'>Accueil</router-link></li>
      <li>&nbsp;</li>
      <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
      <li>&nbsp;</li>

      <p>Utilisateur :</p>
      <li>
        <router-link to="/admin/users/index"
          >Liste des admins</router-link
        >
      </li>
      <li>
        <router-link to="/admin/users/add">Ajouter un admin</router-link>
      </li>
  
      <li>&nbsp;</li>

      <p>Pierres :</p>

      <li>
        <router-link to="/admin/DreamStones/index"
          >Liste des pierres</router-link
        >
      </li>
      <li>
        <router-link to="/admin/DreamStones/add"
          >Ajouter une pierre</router-link
        >
      </li>
      <li>
        <router-link to="/admin/DreamStones/edit/"
          >Editer une pierre</router-link
        >
      </li>

      <li>&nbsp;</li>

      <li>
        <router-link to="/admin/Stocks/index/"
          >Stock des produits</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AdminNav",
};
</script>

<style>
ul {
  list-style: none;
  padding: 1rem;
  margin-right: 10px;
}
ul li {
  text-align: left;
}

a:-webkit-any-link {
  text-decoration: none;
  color: white;
}

a.router-link-exact-active {
  color:bisque;
  font-weight: bold;
}

p {
  color: white;
  text-align: left;
  text-decoration-line: underline;
  text-decoration-color: white;
  text-underline-offset: 0.3rem;
}
</style>
