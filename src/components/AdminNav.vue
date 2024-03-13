<template>
  <div>
    <ul>
      <li><router-link to="/">Accueil</router-link></li>
      <li>&nbsp;</li>
      <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
      <li>&nbsp;</li>
      <li><router-link to="/admin/users/index">Liste des utilisateurs</router-link></li>
      <li><router-link to="/admin/users/add">Ajouter un utilisateur</router-link></li>
      <li>&nbsp;</li>
      <li>
        <router-link to="/admin/DreamStones/index">Liste des pierres</router-link>
      </li>
      <li>
        <router-link to="/admin/DreamStones/edit/:id">Ajouter une pierre</router-link>
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
  padding-left: 0px;
  margin-right: 10px;
}
ul li {
  text-align: left;
}
</style>
