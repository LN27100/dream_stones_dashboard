<template>
  <div class="admin">
    <AdminHeader />
    <div class="ad_contain">
        <div id="ad_side">
            <AdminNav />
        </div>

        <div id="ad_display">
            <Router-view />
        </div>
    </div>

  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader.vue";
import AdminNav from "@/components/AdminNav.vue";
export default {
  name: "AdminLayout",
  components: {
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

#ad_display {
    padding: 1rem;
    text-align: left;
}

</style>
