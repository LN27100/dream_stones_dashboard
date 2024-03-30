<template>
  <div class="public">
    <div class="ad_contain">
      <div id="ad_side">
        <PublicNav />
      </div>

      <div id="ad_display">
            <Router-view />
        </div>
    </div>
  </div>
  <AdminFooter />
</template>

<script>
import PublicNav from "@/components/PublicNav.vue";
import AdminFooter from "@/components/AdminFooter.vue";

export default {
  emits: ['vnode-unmounted'],
  name: "PublicLayout",
  components: {
    PublicNav,
    AdminFooter,
  },
};
</script>

<style></style>
