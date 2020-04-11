<template>
  <div>
    <h2>{{ title }}</h2>

    



    <button class="btn btn-primary" v-on:click="showZones">Show zones</button>
    <button class="btn btn-primary" v-on:click="showCreateZone = !showCreateZone">Create new DNS Zone</button>

    <div v-if="showCreateZone">
      {{ "Mostrar menu" }}
    </div>

  </div>
</template>
<script>
export default {
  data: function() {
    return {
      title: "DNS",
      showCreateZone: false
    };
  },
  methods: {
    showZones() {
       axios
        .get(
          this.$store.state.url +
            ":9001/v2/zones", 
          {
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": this.$store.state.token
            }
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    }
  },
  mounted() {
  }
};
</script>