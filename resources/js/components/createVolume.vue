<template>
  <div>
    <div class="form-group">
      <label for="name">Name of the new volume</label>
      <input class="form-control" type="text" name="name" id="name" v-model="volumeData.name" />
    </div>

    <div class="form-group row">
      <div class="col-xs-3">
        <label for="size">Volume size (GB)</label>
        <input class="form-control" name="size" id="size" type="number" v-model="volumeData.size" />
      </div>
    </div>

    <div class="form-group">{{this.totalGBLeft + " GB available"}}</div>

    <div v-if="error" class="alert alert-danger" role="alert">{{error}}</div>
    <hr />
    <div>
      <button type="button" class="btn btn-primary" v-on:click.prevent="createVolume()">Create volume</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      volumeData: {
        name: "",
        size: null
      },
      totalGBLeft: null,
      error: null
    };
  },
  methods: {
    getGBAvailable: function() {
      axios
        .get(
          this.$store.state.url +
            "/volume/v3/" +
            this.$store.state.currentProjectID +
            "/limits",
          {
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": this.$store.state.projectScopedToken
            }
          }
        )
        .then(response => {
          this.totalGBLeft =
            response.data.limits.absolute.maxTotalVolumeGigabytes -
            response.data.limits.absolute.totalGigabytesUsed;
          //console.log("Gb left for volumes: " + this.totalGBLeft);
          //console.log(response);
        });
    },
    createVolume: function() {
      let payload = {
        volume: {
          size: this.volumeData.size,
          name: this.volumeData.name
        }
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
          if (response.status == 202) {
            Vue.$toast.open(
              "Volume " + this.volumeData.name + " created with success!"
            );
          }
          console.log(response);
        });
    }
  },
  mounted() {
    this.getGBAvailable();
  }
};
</script>

<style>
</style>
