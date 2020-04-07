<template>
  <div>
    <div class="jumbotron">
      <h1>Create Volume</h1>
    </div>
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
 
 <input 
 type="number" 
 name="size"
  value="1" min="1" 
  class="form-control"  
  required="" 
  id="id_size" v-model="volumeData.size"  >
  
  </div> 
  <div class="form-group">{{this.totalGBLeft + " GB available"}}</div>
         <!-- <label for="size">Size</label>
             <input id="ex1" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="1000" data-slider-step="1" data-slider-value="14" v-model="volumeData.size"/>
       <label for="customRange1">Example range</label> -->
   


       
    </div> 
  
    
   <!--  <div>
        <label for="volumeSource">Volume source</label>
        <select class="form-control" id="volumeSource" name="volumeSource" v-model="instanceData.volumeSource">
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
            <option
                v-for="option in images" :key="option.id" v-bind:value="option.id">{{option.name}}</option>
                
            </select>
        </div>
    </div>
    <div v-else-if="instanceData.volumeSource == 3">
        <div>
            <label for="volume">Volume</label>
            <select class="form-control" id="volume" name="volume" v-model="instanceData.volume">
            <option
                v-for="option in volumes" :key="option.id" v-bind:value="option.id">{{"ID: " + option.id + "      Name: " + option.name}}</option>
            </select>
        </div>
    </div> -->


    <!-- <div>
        <label for="flavor">Flavor</label>
        <select class="form-control" id="flavor" name="flavor" v-model="instanceData.flavorID">
          <option
            v-for="option in flavors"
            :key="option.id"
            v-bind:value="option.id"
          >{{ option.name }}</option>
        </select>
    </div>
     -->
   


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
        axios.get(this.$store.state.url + '/volume/v3/'+ this.$store.state.currentProjectID + '/volumes',{
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': this.$store.state.projectScopedToken
            },
        }).then(response => {
            this.volumes = response.data.volumes 
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
              "X-Auth-Token": this.$store.state.projectScopedToken,
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
    createVolume: function(){
        let payload = 

        {
            "volume":{
                "size": this.volumeData.size,
                "name": this.volumeData.name,
            }
        }
          console.log(payload)
        axios.post(this.$store.state.url +'/volume/v3/'+ this.$store.state.currentProjectID + '/volumes', payload, {
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': this.$store.state.projectScopedToken
            },
        }).then(response => {
            if(response.status == 202){
                Vue.$toast.open('Volume  ' + this.volumeData.name + " criado com sucesso!");
                this.goBack();
            }

            console.log(response)
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
      this.getGBAvailable()
  }
};
</script>

<style>
</style>
