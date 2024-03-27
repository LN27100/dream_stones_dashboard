<template>
  <div class="admin">
      <!-- En-tête de l'administration -->
    <AdminHeader />
    <div class="ad_contain">
        <div id="ad_side">
      <!-- Panneau latéral de navigation -->
            <AdminNav />
        </div>
      <!-- Vue du routeur pour afficher les différentes pages -->
            <Router-view />
    </div>

  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader.vue";
import AdminNav from "@/components/AdminNav.vue";
export default {
  name: "AdminLayout",
  components: {
    // Composants utilisés dans le layout
    AdminHeader,
    AdminNav,
  },
};
</script>

<style>
.admin {
  background-color: antiquewhite;
}

.ad_contain {
    display: flex;
}

#ad_side {
    width: 20%;
    border-right: solid 1px black;
    background-color: #24916A;

}


</style>
