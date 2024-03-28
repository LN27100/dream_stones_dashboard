<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ currentYear }} {{ creatorName }}</p>
    </div>
  </footer>
</template>

<script>
export default {
      // Données du composant
  data() {
    return {
      creatorName: "Poirier-Halley Hélène",
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.footer {
  background-color: rgba(36, 145, 106, 0.6);
  height: 2rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.container {
  width: 100%;
  text-align: center;
}

#app > div > footer > div > p {
  color: black;
  text-decoration: none;
  text-align: center;
  margin-top: 0.3rem;
}
</style>
