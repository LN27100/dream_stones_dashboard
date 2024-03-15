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
                  <h6 class="card-title">Stats couleur de pierres</h6>
                  <canvas id="stoneColorChart"></canvas>
                </div>
              </div>
            </div>
      </div>
    </main>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: "DashboardPage",
  data() {
    return {
      cards: [
        { title: "Total des pierres", value: 0 },
        { title: "Total des utilisateurs", value: 0 },
        { title: "Total des commandes", value: 0 },
        { title: "Commandes validées", value: 0 },
        { title: "Commandes en attentes", value: 0 }
      ],
      stoneColorsData: []
    };
  },
  mounted() {
    this.fetchTotalProducts();
    this.fetchTotalUsers();
    this.fetchTotalOrders();
    this.fetchOrderStatusCount();
    this.fetchStoneColorsData();
  },
  methods: {
    async fetchStoneColorsData() {
      try {
        const response = await fetch('http://localhost:3000/dashboard/stoneColors');
        const data = await response.json();
        this.stoneColorsData = data.stone_colors;

        this.renderStoneColorChart();
      } catch (error) {
        console.error('Erreur lors de la récupération des données de couleurs de pierres :', error);
      }
    },
    renderStoneColorChart() {
      const ctx = document.getElementById('stoneColorChart').getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.stoneColorsData.map(colorData => colorData.color),
          datasets: [{
            label: 'Nombre de pierres',
            data: this.stoneColorsData.map(colorData => colorData.count),
            backgroundColor: this.stoneColorsData.map(colorData => this.getColorCode(colorData.color)),
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'bottom'
            },
            title: {
              display: true,
              text: 'Nombre de pierres par couleurs'
            }
          }
        }
      });
    },
    getColorCode(color) {
      // Retourne le code couleur pour chaque couleur spécifiée
      switch(color) {
        case 'bleue':
          return '#0863cc';
        case 'blanche':
          return '#ffffff';
        case 'verte':
          return '#53ac32';
        case 'rouge':
          return '#ff1807';
        case 'violette':
          return '#990099';
        case 'jaune':
          return '#ffff00';
          case 'multicolore':
  return [
    {
      // Couleur 1 : rgba(86,85,103,1)
      start: 'rgba(86, 85, 103, 1)',
      end: 'rgba(9, 121, 120, 1)',
      startPosition: { x: 0, y: 0 }, // Début en haut
      endPosition: { x: 0, y: 0.38 } // 38% de la hauteur pour la première couleur
    },
    {
      // Couleur 2 : rgba(9,121,120,1)
      start: 'rgba(9, 121, 120, 1)',
      end: 'rgba(255, 0, 249, 1)',
      startPosition: { x: 0, y: 0.38 }, // 38% de la hauteur pour la deuxième couleur
      endPosition: { x: 0, y: 0.91 } // 91% de la hauteur pour la troisième couleur
    },
    {
      // Couleur 3 : rgba(255,0,249,1)
      start: 'rgba(255, 0, 249, 1)',
      end: 'rgba(255, 0, 249, 1)',
      startPosition: { x: 0, y: 0.91 }, // 91% de la hauteur pour la troisième couleur
      endPosition: { x: 0, y: 1 } // Fin en bas
    }
  ];

        case 'marron':
          return '#663300';
        case 'rose':
          return '#ff99cc';
        default:
          return '#000000'; // Couleur par défaut si non spécifiée
      }
    },
    async fetchOrderStatusCount() {
      try {
        const response = await fetch('http://localhost:3000/dashboard/orderStatusCount');
        const data = await response.json();
        this.cards[3].value = data.nombre_validées;
        this.cards[4].value = data.nombre_en_attente;
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de commandes par statut :', error);
      }
    },
    async fetchTotalOrders() {
      try {
        const response = await fetch('http://localhost:3000/orders/count');
        const data = await response.json();
        this.cards[2].value = data.total_orders;
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de commandes :', error);
      }
    },
    async fetchTotalProducts() {
      try {
        const response = await fetch('http://localhost:3000/dashboard/totalStones');
        const data = await response.json();
        this.cards[0].value = data.total_stones;
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de produits :', error);
      }
    },
    async fetchTotalUsers() {
      try {
        const response = await fetch('http://localhost:3000/userprofiles/count');
        const data = await response.json();
        this.cards[1].value = data.total_userprofiles;
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre total d\'utilisateurs :', error);
      }
    },
  },
};
</script>


<style>
/* Dashboard */

h6 {
  text-align: center;
  color: black;
}
.dashboard-title {
  font-size: 2, 5rem;
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
  padding: 0, 5remrem;
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
