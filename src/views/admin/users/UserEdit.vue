<template>
    <div>
      <h1>User Edit</h1>
      <div v-if="user">
        <p>Last Name: {{ user.last_name }}</p>
        <p>First Name: {{ user.first_name }}</p>
        <p>Email: {{ user.email }}</p>
      </div>
      <div v-else>
        <p>User not found</p>
      </div>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      user: null
    };
  },
  methods: {
    fetchUserData() {
      fetch(`http://localhost:3000/admins/${this.$route.params.id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('User not found');
          }
          return response.json();
        })
        .then(data => {
          this.user = data.success ? data.admin : null;
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  },
  created() {
    this.fetchUserData();
  }
};
</script>
  