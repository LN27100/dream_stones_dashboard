<template>
    <img alt="Vue logo" src="../assets/logo.png">
    <nav>
        <router-link to='/'>Accueil</router-link> 
        <span class="divider">|</span> 
        <router-link to='/admin/dashboard'>Admin</router-link>
        <span class="divider">|</span> 
        <router-link to="/login">Connexion</router-link>

    </nav>
</template>

<script>
export default {
    name: 'PublicNav'
}
</script>

<style>
    img{
        position: absolute;
        right: 30px;
        height: 50px;
    }

    .divider {
        color: white; 
        margin: 0 5px; 
    }

    a:-webkit-any-link {
  text-decoration: none;
  color: white;
}

a.router-link-exact-active {
  color: #0B533D;
  font-weight: bold;
}

</style>