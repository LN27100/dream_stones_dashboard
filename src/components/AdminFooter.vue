<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ currentYear }} {{ creatorName }}</p>
    </div>
  </footer>
</template>

<script>
export default {
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
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}

.container {
  width: 100%;
  position: relative;
  height: 100%;
}

#app > div > footer > div > p {
  color: black;
  text-decoration: none;
  text-align: center;
  margin-top: 0.3rem
}
</style>
