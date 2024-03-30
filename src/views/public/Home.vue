<template>
    <div class="containerHome">
       <h1>Bienvenue sur la plateforme administrateur.</h1>
       <p class="homeTexte">Veuillez vous connecter pour accéder à votre dashboard</p>
       <p class="homeTexte">Une fois connecté, vous arriverez sur le tableau de bord de l'entreprise de pierres et minéraux "Dream Stones".</p>
       <p class="homeTexte">Sur ce portail, vous retrouverez ce qui concerne les administrateurs, les produits et les commandes.</p>
       <p class="homeTexte">Cela vous permettra de consulter la liste des administrateurs ainsi que la liste des produits en vente.</p>
       <p class="homeTexte">D'ajouter un administrateur et un produit.</p>
       <p class="homeTexte">De voir les détails d'un produit, modifier celui-ci ou le supprimer.</p>
       <p class="homeTexte">Sur le dashboard vous pourrez également visionner différentes informations essentielles à la gestion de l'entreprise comme des graphiques de statistiques.</p>
    </div>
</template>

<script>
export default {
    emits: ['vnode-unmounted'],
    name: 'Home',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Macondo&display=swap');
/*   font-family: "Macondo", cursive; */
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
/*   font-family: "Varela Round", sans-serif; */


.containerHome {
  padding: 1rem 5rem 1rem 5rem;
  border-radius: 20px;
  background: linear-gradient(0deg, rgba(34, 193, 195, 1) 14%, rgba(91, 189, 158, 1) 60%);
  /* ombrage card */
  -webkit-box-shadow: 10px 15px 5px 3px #6eb59d;
  -moz-box-shadow: 10px 15px 5px 3px #6eb59d;
  filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=10, OffY=15, Color='#6eb59d', Positive='true');
  zoom: 1;
  box-shadow: 10px 15px 5px 3px #6eb59d;
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
  width: 50rem;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 1.7rem;
}

.homeTexte {
    color: black;
    font-family: "Varela Round", sans-serif;
    text-decoration: none;
    font-size:1.3rem;
}

</style>