<template>
  <div>
    <div class="jumbotron">
      <h1>Create Instance</h1>
    </div>
    <div>
      <label for="name">Name</label>
      <input type="text" class="form-control" name="name" id="name" v-model="instanceData.name" />
    </div>
    <div>
      <label for="description">Description</label>
      <input
        type="text"
        class="form-control"
        name="description"
        id="description"
        v-model="instanceData.description"
      />
    </div>

    <div>
      <label for="volumeSource">Volume source</label>
      <select
        class="form-control"
        id="volumeSource"
        name="volumeSource"
        v-model="instanceData.volumeSource"
      >
        <option
          v-for="option in optionsVolumeSource"
          :key="option.value"
          v-bind:value="option.value"
        >{{ option.text }}</option>
      </select>
    </div>

    <div v-if="instanceData.volumeSource == 2">
      <div>
        <label for="image">Image</label>
        <select class="form-control" id="image" name="image" v-model="instanceData.image">
          <option v-for="option in images" :key="option.id" v-bind:value="option.id">{{option.name}}</option>
        </select>
      </div>
    </div>
    <div v-else-if="instanceData.volumeSource == 3">
      <div>
        <label for="volume">Volume</label>
        <select class="form-control" id="volume" name="volume" v-model="instanceData.volume">
          <option v-for="option in volumes" :key="option.id" v-bind:value="option.id">
            <div v-if="option.name">{{ option.name }}</div>
            <dir v-else>{{ option.id }}</dir>
          </option>
        </select>
      </div>
    </div>

    <div>
      <label for="flavor">Flavor</label>
      <select class="form-control" id="flavor" name="flavor" v-model="instanceData.flavorID">
        <option
          v-for="option in flavors"
          :key="option.id"
          v-bind:value="option.id"
        >{{ option.name }}</option>
      </select>
    </div>

    <br />
    <div v-if="error" class="alert alert-danger" role="alert">{{error}}</div>
    <hr />
    <div>
      <button type="button" class="btn btn-primary" v-on:click.prevent="createInstance">Create</button>
      <button type="button" class="btn btn-danger" v-on:click="goBack()">Cancel</button>
    </div>
  </div>
</template>

<script>
//import { Socket } from 'dgram';
export default {
  data() {
    return {
      instanceData: {
        name: "",
        flavorID: null,
        volume: null,
        image: null,
        description: "",
        volumeSource: 0
      },
      flavors: [],
      volumes: [],
      images: [],
      optionsVolumeSource: [
        { text: "Image", value: 2 },
        { text: "Volume", value: 3 }
      ],
      optionsPayment: [
        { text: "Bank Transfer", value: "bt" },
        { text: "MB Payment", value: "mb" }
      ],
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
            "X-OpenStack-Nova-API-Version": "2.19",
            "X-Auth-Token": this.$store.state.projectScopedToken
          }
        })
        .then(response => {
          console.dir(response)
          if (response.status == 202) {
            Vue.$toast.open(
              "Instância " + this.instanceData.name + " criada com sucesso!"
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
    goBack: function() {
      this.$router.push("/projectDetails");
    }
    /*
    getCategories: function() {
      axios.get("api/categories/e").then(response => {
        this.categories = response.data.data;
      });
    },
    createMovement: function() {
      //   console.log(this.movementData);
      this.error = null;
      axios
        .post("api/movement/create", this.movementData)
        .then(response => {
          console.log(response);
          this.$router.push("/wallet");
          this.$socket.emit("userUpdated", this.movementData.email);
        })
        .catch(err => {
          this.error = err.response.data.message;
          console.log(err.response.data);
        });
    }
    */
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
