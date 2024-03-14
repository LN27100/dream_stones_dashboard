<template>
  <div>
    <!-- Dashboard -->
    <main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4">
      <h1 class="mt-3 dashboard-title">Dashboard</h1>
      <div class="row mt-3">
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Total des pierres</h6>
              <p class="recupText">{{ totalProducts }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Total des utilisateurs</h6>
              <p class="recupText">{{ totalUsers }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Total des commandes</h6>
              <p class="recupText">{{ totalOrders }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Commandes validées</h6>
              <p class="recupText">{{ totalValidatedOrders }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Commandes en attentes</h6>
              <p class="recupText">{{ totalPendingOrders }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Stats catégories de pierres</h6>
              <p class="recupText"></p>
            </div>
          </div>
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
      totalProducts: 0,
      totalUsers: 0,
      totalOrders: 0,
      totalValidatedOrders: 0,
      totalPendingOrders: 0
    };
  },
  mounted() {
    this.fetchTotalProducts();
    this.fetchTotalUsers();
    this.fetchTotalOrders();
    this.fetchOrderStatusCount();

  },
  methods: {
        // Fonction pour récupérer le total des commandes validées et en attentes

    async fetchOrderStatusCount() {
      try {
        const response = await fetch('http://localhost:3000/dashboard/orderStatusCount');
        const data = await response.json();
        this.totalValidatedOrders = data.nombre_validées;
        this.totalPendingOrders = data.nombre_en_attente;
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de commandes par statut :', error);
      }
    },
    // Fonction pour récupérer le total des commandes
    async fetchTotalOrders() {
      try {
        const response = await fetch('http://localhost:3000/orders/count');
        const data = await response.json();
        this.totalOrders = data.total_orders;
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de commandes :', error);
      }
    },
        // Fonction pour récupérer le total des produits
    async fetchTotalProducts() {
      try {
        const response = await fetch('http://localhost:3000/dashboard/totalStones');
        const data = await response.json();
        this.totalProducts = data.total_stones;
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de produits :', error);
      }
    },
        // Fonction pour récupérer le total des utilisateurs
    async fetchTotalUsers() {
      try {
        const response = await fetch('http://localhost:3000/userprofiles/count');
        const data = await response.json();
        this.totalUsers = data.total_userprofiles;
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre total d\'utilisateurs :', error);
      }
    }
  }
};
</script>

<style>
/* Dashboard */


h6 {
  text-align: center;
  color: black;
}
.dashboard-title {
  font-size: 2,5rem;
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
  padding: 0,5remrem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.recupText {
  color: white;
  text-decoration: none;
  font-size: 3rem;
  text-align: center;
}
</style>
