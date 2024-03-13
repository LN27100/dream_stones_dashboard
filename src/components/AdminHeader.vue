<template>
  <div class="ad_head">
    Bienvenue administrateur
    <!-- Header Admin {{ getMarcel }} -->
    <!-- <button @click="logout()">Logout</button> -->
  </div>
</template>

<script>
// import { accountService } from '@/_services'
// import { mapGetters } from 'vuex'

export default {
  name: "AdminHeader",
  // methods:{
  //     logout(){
  //         accountService.logout()
  //         this.$router.push('/')
  //     }
  // },
  // computed:{
  //     ...mapGetters(['getMarcel'])
  // }
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
