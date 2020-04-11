<template>
  <div>
    <div class="jumbotron">
      <h1>Edit Instance</h1>
    </div>

    <div>
      <label for="name">Name</label>
      <input type="text" class="form-control" name="name" id="name" v-model="name" />
    </div>

    <div>
      <label for="description">Description</label>
      <input
        type="text"
        class="form-control"
        name="description"
        id="description"
        v-model="description"
      />
    </div>

    <br />
    <div v-if="error" class="alert alert-danger" role="alert">{{error}}</div>
    <hr />
    <div>
      <button type="button" class="btn btn-primary" v-on:click.prevent="edit">Edit</button>
      <button type="button" class="btn btn-danger" v-on:click="goBack()">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      description: "",
      error: null
    };
  },
  methods: {
    edit() {
      let payload = {
        server: {}
      };

      if (this.name) {
        payload.server.name = this.name;
      }

      if (this.description) {
        payload.server.description = this.description;
      }

      axios
        .put(
          this.$store.state.url +
            "/compute/v2.1/servers/" +
            this.$store.state.currentInstance,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": this.$store.state.projectScopedToken,
              "X-OpenStack-Nova-API-Version": "2.19"
            }
          }
        )
        .then(response => {
          if(response.status == 200){
             Vue.$toast.open(
              "Alterações efetuadas com sucesso!"
            );
            this.goBack()
          }
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
          console.log(error.config);
        });
    },
    goBack: function() {
      this.$router.push("/projectDetails");
    }
  },
  mounted() {}
};
</script>

<style>
</style>