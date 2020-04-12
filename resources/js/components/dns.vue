<template>
  <div>
    <h2>{{ title }}</h2>

    <button class="btn btn-primary" v-on:click="showZones">Show zones</button>
    <button
      class="btn btn-primary"
      v-on:click="showCreateZone = !showCreateZone"
    >Create new DNS Zone</button>

    <!-- Criar zona -->
    <div v-if="showCreateZone">
      <form>
        <div class="form-group">
          <label for="name">Zone name</label>
          <input type="text" class="form-control" id="name" placeholder="Enter zone name" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" class="form-control" id="description" placeholder="Enter description" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" class="form-control" id="email" placeholder="Enter email" />
        </div>

        <div>
          <button type="button" class="btn btn-primary" v-on:click.prevent="createZone">Create</button>
          <button type="button" class="btn btn-danger" v-on:click="showCreateZone = false">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      title: "DNS",
      showCreateZone: false,
      zoneData: {
        name: "",
        description: "",
        email: ""
      }
    };
  },
  methods: {
    createZone() {
      let payload = {
        name: this.zoneData.name,
        email: this.zoneData.email,
        description: this.zoneData.description
      };
      axios
        .post(this.$store.state.url + ":9001/v2/zones", payload, {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": this.$store.state.token
          }
        })
        .then(response => {
          console.log(response);
          if (response.status == 202) {
            Vue.$toast.open(
              "Zona " + this.zoneData.name + " created successfully!"
            );
            this.showCreateZone = false;
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
        });
    },
    showZones() {
      axios
        .get(this.$store.state.url + ":9001/v2/zones", {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": this.$store.state.token
          }
        })
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
  mounted() {}
};
</script>