<!-- DashboardCard.vue -->
<template>
    <div class="col-md-3 mr-2">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title">{{ title }}</h6>
          <p class="recupText">{{ value }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      value: Number 
    }
  }
  </script>
  