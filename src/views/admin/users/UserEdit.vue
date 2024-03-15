<template>
  <div>
    <h1>Editer le profil admin</h1>
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
import axios from 'axios';

export default {
  name: 'UserEdit',
  data() {
    return {
      user: null
    };
  },     
  methods: {
    fetchUserData() {
        const userId = this.$route.params.id;
        axios.get(`http://localhost:3000/admins/${userId}`)
            .then(response => {
                if (!response.data.success) {
                    throw new Error('User not found');
                }
                this.user = response.data.admin;
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
