<template>
<form>
  <div class="form-group">
    <label for="exampleFormControlInput1">Email address</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Example select</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect2">Example multiple select</label>
    <select multiple class="form-control" id="exampleFormControlSelect2">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Example textarea</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
</form>

    
</template>
<script>
    export default {
        data: function() {
            return {
                title: "Lista de instancias do projeto " +  this.$store.state.currentProjectName,
                volumeList: [],
                volumeName: [],
                volumeSize:[],
                flavorsDetails:[]
            };
        },
        methods: {
            
            goBack: function() {
                this.$router.push("/projectsList");

            },
            getAllVolumeDetails: function() {
                let i;
                for(let i = 0; i < this.instancesList.length; i++){
                    axios.get(this.$store.state.url + '/compute/v2.1/servers/' + this.instancesList[i].id,{
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Auth-Token': this.$store.state.projectScopedToken
                        },
                    }).then(response => {
                        //console.log(response.data.server)
                        this.instancesDetails.push(response.data.server)
                        //this.instancesDetails = response.data
                    });
                }
                console.log(this.instancesDetails)
            },
            getVolumes: function() {
                let i;
                for(let i = 0; i < this.volume.length; i++){
                    axios.get(this.$store.state.url + '/v3/v2.1/servers/' + this.volumeList[i].id,{
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Auth-Token': this.$store.state.projectScopedToken
                        },
                    }).then(response => {
                        //console.log(response.data.server)
                        this.instancesDetails.push(response.data.server)
                        //this.instancesDetails = response.data
                    });
                }
                console.log(this.instancesDetails)
            },
            
        mounted() {
            this.getInstances();
        },

    }
    }
</script>