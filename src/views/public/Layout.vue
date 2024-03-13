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
</template>

<script>
import PublicNav from "@/components/PublicNav.vue";

export default {
  name: "PublicLayout",
  components: {
    PublicNav,
  },
};
</script>

<style></style>
