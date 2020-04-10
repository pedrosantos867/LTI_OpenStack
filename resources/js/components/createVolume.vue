<template>
  <div>
    <div>
      <label for="name">Name</label>
      <input
        type="text"
        class="form-control"
        name="name"
        id="name"
        placeholder="Volume Name"
        v-model="volumeData.name"
      />
    </div>

    <div>
      <label for="size">Size in GB</label>
      <div class="input-group themable-spinner spinner-initialized">
        <div class="form-group row">
          <label for="size" class="col-2 col-form-label">Size</label>
          <div class="col-10">
            <input class="form-control" type="number" id="size" v-model="volumeData.size"/>
          </div>
        </div>
      </div>

      <div class="form-group">{{this.totalGBLeft + " GB available"}}</div>
    </div>
    <br />
    <div v-if="error" class="alert alert-danger" role="alert">{{error}}</div>
    <hr />
    <div>
      <button type="button" class="btn btn-primary" v-on:click.prevent="createVolume">Create</button>
      <button type="button" class="btn btn-danger" v-on:click="goBack()">Cancel</button>
    </div>
  </div>
</template>

<script>
//import { Socket } from 'dgram';
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
    getVolumes: function() {
      axios
        .get(
          this.$store.state.url +
            "/volume/v3/" +
            this.$store.state.currentProjectID +
            "/volumes",
          {
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": this.$store.state.projectScopedToken
            }
          }
        )
        .then(response => {
          this.volumes = response.data.volumes;
          //console.log(this.volumes)
        });
    },

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
          /*           console.log("Gb left for volumes: " + this.totalGBLeft);
          console.log(response); */
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
          if(response.status == 202){
            Vue.$toast.open(
              "Volume " + this.volumeData.name + " criado com sucesso!"
            );
          }
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