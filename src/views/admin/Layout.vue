<template>
    <div class="admin">
        Admin Layout
        <AdminHeader/>
      <Router-view />
    </div>
</template>

<script>

import AdminHeader from '@/components/AdminHeader.vue'

export default {
    name:'AdminLayout',
    components :{
        AdminHeader
    }
}
</script>

<style>
.admin {
    border: solid 1px green;
}
</style>