<template>
  <div>
    <h2>{{ title }}</h2>

  </div>
</template>
<script>
export default {
  data: function() {
    return {
      title: "DNS",
    };
  },
  methods: {

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
            }
          }
        )
        .then(response => {
          if(response.status == 202){
            Vue.$toast.open(
              "Volume " + this.volumeData.name + " criado com sucesso!"
            );
          }
        });
    }
  },
    
  },
  mounted() {
  }
};
</script>