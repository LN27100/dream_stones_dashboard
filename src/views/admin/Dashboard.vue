<template>
  <div>
    <!-- Dashboard -->
    <main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4">
      <h1 class="mt-3">Dashboard</h1>
      <div class="row mt-3">
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total des pierres</h5>
              <p class="card-text">{{ totalProducts }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Active Users</h5>
              <p class="card-text">500</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total Orders</h5>
              <p class="card-text">2000</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total Orders</h5>
              <p class="card-text">2000</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6">
          <!-- Chart Placeholder -->
        </div>

        <div class="col-md-6">
          <!-- Pie Chart Placeholder -->
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "DashboardPage",
  data() {
    return {
      totalProducts: 0
    };
  },
  mounted() {
    this.fetchTotalProducts();
  },
  methods: {
    async fetchTotalProducts() {
      try {
        const response = await fetch('http://localhost:3000/dashboard/totalStones');
        const data = await response.json();
        this.totalProducts = data.total_stones;
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de produits :', error);
      }
    }
  }
};
</script>

<style>
/* Dashboard */

.dashboard-title {
  font-size: 2rem;
  color: #239670;
}

.card {
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 14%,
    rgba(91, 189, 158, 1) 60%
  );
  /* ombrage card */
  -webkit-box-shadow: 10px 15px 5px 3px #6eb59d;
  -moz-box-shadow: 10px 15px 5px 3px #6eb59d;
  filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=10, OffY=15, Color='#6eb59d', Positive='true');
  zoom: 1;
  box-shadow: 10px 15px 5px 3px #6eb59d;
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
  border-radius: 20px;
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
