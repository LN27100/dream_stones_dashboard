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
    <!-- Footer de l'administration -->
    <AdminFooter />
  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader.vue";
import AdminNav from "@/components/AdminNav.vue";
import AdminFooter from "@/components/AdminFooter.vue";

export default {
  name: "AdminLayout",
  components: {
    // Composants utilisés dans le layout
    AdminHeader,
    AdminNav,
    AdminFooter,
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
