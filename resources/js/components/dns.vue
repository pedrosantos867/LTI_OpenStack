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
<<<<<<< HEAD

     createDNS: function() {
      let payload = {
          name: this.dnsData.name,
          email: this.dnsData.email
  
      };
      console.log(payload);
      axios
        .post(
          this.$store.state.url +
            "/volume/v3/" +
            this.$store.state.currentProjectID +
            "/volumes",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": this.$store.state.projectScopedToken
=======
    showZones() {
       axios
        .get(
          this.$store.state.url +
            ":9001/v2/zones", 
          {
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": this.$store.state.token
>>>>>>> d4951bd60dcab1aefc8bc7aebe6b2bb3754bc85d
            }
          }
        )
        .then(response => {
<<<<<<< HEAD
          if(response.status == 202){
            Vue.$toast.open(
              "Volume " + this.volumeData.name + " criado com sucesso!"
            );
          }
        });
    }
  },
    
=======
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
>>>>>>> d4951bd60dcab1aefc8bc7aebe6b2bb3754bc85d
  },
  mounted() {
  }
};
</script>