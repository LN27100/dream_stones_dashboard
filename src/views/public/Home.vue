<template>
    <div class="containerHome">
       <p class="homeTexte">Bienvenue sur le projet côté administrateur.</p>
       <p class="homeTexte">Dans celui-ci, vous retrouverez le Dashboard, accessible une fois connecté en temps qu'administrateur</p>
    </div>
</template>

<script>
export default {
    name: 'Home',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Macondo&display=swap');
/*   font-family: "Macondo", cursive; */
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
/*   font-family: "Varela Round", sans-serif; */


.containerHome {
  padding: 1rem 15rem 1rem 15rem;
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 14%,
    rgba(91, 189, 158, 1) 60%
  );
  width: 10rem;
  margin: 0 auto;
  margin-top: 1rem;
}

.homeTexte {
    color: black;
    font-family: "Varela Round", sans-serif;
}

</style>