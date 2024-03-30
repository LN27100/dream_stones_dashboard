<template>
  <div>
    <!-- Dashboard -->
    <main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4">
      <h1 class="mt-3 dashboard-title">Dashboard Dream Stones</h1>
      <div class="row mt-">
        <div class="col-md-3 mr-2">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Total des pierres</h6>
              <p class="recupText">{{ totalProducts }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 mr-2">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Total des utilisateurs</h6>
              <p class="recupText">{{ totalUsers }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 mr-2">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Total des commandes</h6>
              <p class="recupText">{{ totalOrders }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 mr-2">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Commandes validées</h6>
              <p class="recupText">{{ totalValidatedOrders }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 mr-2">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Commandes en attentes</h6>
              <p class="recupText">{{ totalPendingOrders }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 mr-2">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Commandes complétées</h6>
              <p class="recupText">{{ totalCompletedOrders }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 mr-2">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">Stats couleur de pierres</h6>
              <canvas id="stoneColorChart"></canvas>
            </div>
          </div>
        </div>
        <div class="col-md-3 mr-4">
          <div class="card" style="height: 350px">
            <div class="card-body">
              <h6 class="card-title">Stats de ventes mensuelles</h6>
              <canvas id="lineChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// Importation de la bibliothèque Chart.js pour le rendu des graphiques
import Chart from "chart.js/auto";

export default {
  emits: ['vnode-unmounted'],
  name: "DashboardPage",
  data() {
    return {
      // Données du composant
      totalProducts: 0,
      totalUsers: 0,
      totalOrders: 0,
      totalValidatedOrders: 0,
      totalPendingOrders: 0,
      totalCompletedOrders: 0,
      stoneColorsData: [],
      ordersByMonthData: [],
    };
  },
  mounted() {
    // Initialise les données et effectue les appels Backend nécessaires
    this.fetchTotalProducts();
    this.fetchTotalUsers();
    this.fetchTotalOrders();
    this.fetchCompletedOrdersCount();
    this.fetchOrderStatusCount();
    this.fetchOrdersByMonth();
    this.fetchStoneColorsData();
  },
  methods: {
    // Méthodes pour récupérer les données depuis le Backend
    async fetchCompletedOrdersCount() {
      try {
        // Récupère le nombre de commandes complétées depuis le backend
        const response = await fetch(
          "http://localhost:3000/dashboard/completedOrdersCount"
        );
        const data = await response.json();
        this.totalCompletedOrders = data.nombre_complétées;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre de commandes complétées :",
          error
        );
      }
    },
    async fetchOrdersByMonth() {
      try {
        // Récupère les données des commandes par mois depuis le Backend
        const response = await fetch(
          "http://localhost:3000/dashboard/ordersByMonth"
        );
        const data = await response.json();
        // Trier les données des mois par leur position dans l'année (de 1 à 12)
        this.ordersByMonthData = data.orders_by_month.sort((a, b) => {
          return parseInt(a.month) - parseInt(b.month);
        });
// utilisation de l'api Chart.js
        this.renderLineChart();
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de commandes par mois :",
          error
        );
      }
    },
    // Méthode pour afficher le graphique des commandes par mois
    renderLineChart() {
      const ctx = document.getElementById("lineChart").getContext("2d");
      const counts = this.ordersByMonthData.map((data) => data.count);
      const maxYValue = Math.max(...counts);

      // Configuration du graphique en ligne
      new Chart(ctx, {
        type: "line",
        data: {
          labels: this.ordersByMonthData.map((data) => data.month),
          datasets: [
            {
              label: "Nombre de commandes",
              data: counts,
              borderColor: "#0B533D",
              fill: false,
            },
          ],
        },
        options: {
          maintainAspectRatio: false, // Permet au graphique de s'étendre pour remplir son conteneur
          aspectRatio: 1, 
          scales: {
            y: {
              beginAtZero: true, // Commence l'axe y à 0
              ticks: {
                precision: 0,
              },
            },
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                font: {
                  family: '"Varela Round", sans-serif',
                  size: 12,
                  style: "normal",
                },
                color: "#0B533D",
              },
            },
          },
          layout: {
            padding: {
              top: 20,
              bottom: 20,
              left: 5,
              right: 5,
            },
          },
        },
      });
    },

    async fetchStoneColorsData() {
      try {
        // Récupère les données sur les couleurs des pierres depuis le Backend
        const response = await fetch(
          "http://localhost:3000/dashboard/stoneColors"
        );
        const data = await response.json();
        this.stoneColorsData = data.stone_colors;

        this.renderStoneColorChart();
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de couleurs de pierres :",
          error
        );
      }
    },
// Utilisation de l'API chart.js
    // Méthode pour afficher le graphique des couleurs de pierres
    renderStoneColorChart() {
      const ctx = document.getElementById("stoneColorChart").getContext("2d");
      
      // Configuration du graphique camembert
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: this.stoneColorsData.map((colorData) => colorData.color),
          datasets: [
            {
              label: "Nombre de pierres",
              data: this.stoneColorsData.map((colorData) => colorData.count),
              backgroundColor: this.stoneColorsData.map((colorData) =>
                this.getColorCode(colorData.color)
              ),
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                font: {
                  family: '"Varela Round", sans-serif',
                  size: 12,
                  style: "normal",
                },
                color: "#0B533D",
                padding: 10,
              },
            },
          },
        },
      });
    },
      // Méthode pour obtenir le code couleur en fonction de la couleur spécifiée
    getColorCode(color) {
      switch (color) {
        case "bleue":
          return "#0863cc";
        case "blanche":
          return "#ffffff";
        case "verte":
          return "#53ac32";
        case "rouge":
          return "#ff1807";
        case "violette":
          return "#990099";
        case "jaune":
          return "#ffff00";
        case "multicolore":
          return "#9b8989";
        case "marron":
          return "#663300";
        case "rose":
          return "#ff99cc";
        default:
          return "#000000";
      }
    },
    // Méthode pour récupérer le nombre de commandes par statut depuis le Backend
    async fetchOrderStatusCount() {
      try {
        const response = await fetch(
          "http://localhost:3000/dashboard/orderStatusCount"
        );
        const data = await response.json();
        this.totalValidatedOrders = data.nombre_validées;
        this.totalPendingOrders = data.nombre_en_attente;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre de commandes par statut :",
          error
        );
      }
    },
    // Méthode pour récupérer le nombre total de commandes depuis le Backend
    async fetchTotalOrders() {
      try {
        const response = await fetch("http://localhost:3000/orders/count");
        const data = await response.json();
        this.totalOrders = data.total_orders;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre total de commandes :",
          error
        );
      }
    },
    // Méthode pour récupérer le nombre total de produits depuis le Backend
    async fetchTotalProducts() {
      try {
        const response = await fetch(
          "http://localhost:3000/dashboard/totalStones"
        );
        const data = await response.json();
        this.totalProducts = data.total_stones;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre total de produits :",
          error
        );
      }
    },
    // Méthode pour récupérer le nombre total d'utilisateurs depuis le Backend
    async fetchTotalUsers() {
      try {
        const response = await fetch(
          "http://localhost:3000/userprofiles/count"
        );
        const data = await response.json();
        this.totalUsers = data.total_userprofiles;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre total d'utilisateurs :",
          error
        );
      }
    },
  },
};
</script>

<style>
/* Dashboard */

#app > div > div.ad_contain > div:nth-child(2) > main > div {
margin-bottom: 2rem
}

h6 {
  text-align: center;
  color: black;
}
.dashboard-title {
  font-size: 3rem;
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  width: 20rem;
}

.recupText {
  color: white;
  text-decoration: none;
  font-size: 3rem;
  text-align: center;
}
</style>
