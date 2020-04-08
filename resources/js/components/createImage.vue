<template>
  <form enctype="multipart/form-data">
    <div>
      <div class="form-group">
        <label for="name">Name of the new image</label>
        <input class="form-control" type="text" name="name" id="name" v-model="name" />
      </div>

      <div class="form-group">
        <label for="file">Choose a file</label>
        <input type="file" id="file" class="form-control-file" @change="onFileSelected" multiple />
      </div>

      <div>
        <button type="button" class="btn btn-primary" v-on:click.prevent="uploadImage">Create image</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      name: "",
      imageID: null,
      image: null
    };
  },
  methods: {
    uploadImage: function() {
      //create Image to get id
      let payload_post = {
        name: this.name,
        visibility: "shared",
        container_format: "bare",
        disk_format: "qcow2"
      };
      axios
        .post(this.$store.state.url + "/image/v2/images", payload_post, {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": this.$store.state.projectScopedToken
          }
        })
        .then(response => {
          this.imageID = response.data.id;
          var reader = new FileReader();
          reader.readAsArrayBuffer(this.image);
          reader.onload = (evt) => {
            axios({
              method: "put",
              url: this.$store.state.url + "/image/v2/images/" + this.imageID + "/file",
              data: evt.target.result,
              headers: {
                "Content-Type": "application/octet-stream",
                "X-Auth-Token": this.$store.state.projectScopedToken
              }
            })
              .then(function(response) {
                if (response.status == 204) {
                  Vue.$toast.open("Image created with success!");
                }
              });
          };
        });
    },
    onFileSelected(event) {
      this.image = event.target.files[0];
    }
  },
  mounted() {}
};
</script>

<style>
</style>
