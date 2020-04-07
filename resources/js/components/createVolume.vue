<template>
  <div>
    <div class="form-group">
      <label for="name">Name of the new volume</label>
      <input class="form-control" type="text" name="name" id="name" v-model="volumeData.name" />
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
        projectID: null,
        volume: null,
        size: 0
      },
      volumes: [],
      error: null
    };
  },
  methods: {
    getFlavors: function() {
      console.log(this.$store.state.projectScopedToken);
      axios
        .get(this.$store.state.url + "/compute/v2.1/flavors", {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": this.$store.state.projectScopedToken
          }
        })
        .then(response => {
          this.flavors = response.data.flavors;
          //console.log(this.flavors)
        });
    },
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
    getImages: function() {
      axios
        .get(this.$store.state.url + "/compute/v2.1/images", {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": this.$store.state.projectScopedToken
          }
        })
        .then(response => {
          this.images = response.data.images;
          //console.log(this.images)
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
              "Volume  " + this.volumeData.name + " criado com sucesso!"
            );
            this.goBack();
          }

          console.log(response);
          /*
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            */
        });
    },
    createInstance: function() {
      let payload = {
        server: {
          name: this.instanceData.name,
          imageRef: this.instanceData.image,
          flavorRef: this.instanceData.flavorID,
          description: this.instanceData.description,
          networks: [
            {
              uuid: "1147a077-f1e5-479a-bb81-e56a49438158"
            }
          ]
        }
      };

      //console.log(this.$store.state.url + '/flavors/' + this.instanceData.flavorRef)
      console.log(payload);
      axios
        .post(this.$store.state.url + "/compute/v2.1/servers", payload, {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": this.$store.state.projectScopedToken
          }
        })
        .then(response => {
          if (response.status == 202) {
            Vue.$toast.open(
              "Instância " + this.instanceData.name + " criada com sucesso!"
            );
            this.goBack();
          }
        })
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
    this.getFlavors();
    this.getVolumes();
    this.getImages();
  }
};
</script>

<style>
</style>
