<template>
  <div>
    <div>
      <label for="name">New name</label>
      <input type="text" class="form-control" name="name" id="name" v-model="newName" />
    </div>
    <div>
      <label for="description">New description</label>
      <input
        type="text"
        class="form-control"
        name="description"
        id="description"
        v-model="newDescription"
      />
    </div>

    <div>
      <button type="button" class="btn btn-primary" v-on:click.prevent="editProject">Edit</button>
      <button type="button" class="btn btn-danger" v-on:click="goBack()">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newName: "",
      newDescription: "",
      error: null
    };
  },
  methods: {
    editProject() {
      let payload = {
        project: {}
      };

      if (this.newDescription) {
        payload.project.description = this.newDescription;
      }

      if (this.newName) {
        payload.project.name = this.newName;
      }

      axios
        .patch(
          this.$store.state.url +
            "/identity/v3/projects/" +
            this.$store.state.currentProjectID,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": this.$store.state.projectScopedToken
            }
          }
        )
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            Vue.$toast.open("Alterações efetuadas com sucesso!");
          }
          this.goBack();
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
    },
    goBack() {
      this.$router.push("/projectsList");
    }
  },
  mounted() {}
};
</script>

<style>
</style>
