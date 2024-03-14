<template>
  <div class="ad_head">
    Bienvenue administrateur
    <button @click="logout()">Logout</button>
  </div>
</template>

<script>


export default {
  name: "AdminHeader",

};
</script>
<style>
.ad_head {
  border-bottom: solid 1px black;
  background-color: #0b533d;
  height: 3rem;
  color: white;
}

</style>
