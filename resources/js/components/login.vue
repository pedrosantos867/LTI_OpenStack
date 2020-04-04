<template>
  <div>
    <h2>{{ title }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group line">
        <div class="col-xs-4">
          <label for="username">Username</label>
          <input
            type="text"
            v-model="userData.username"
            name="username"
            class="form-control"
            required
          />
        </div>
        <div class="col-xs-4">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="userData.password"
            name="password"
            class="form-control"
            required
          />
        </div>
      </div>
    </form>

    <div
      id="error"
      class="alert alert-danger"
      role="alert"
      hidden
    >Please type your credentials to login</div>

    <div>
      <button type="button" class="btn btn-primary" v-on:click.prevent="login">Login</button>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      title: "Login",
      userData: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    login: function() {
      if (!this.userData.username || !this.userData.password) {
        document.querySelector("#error").hidden = false;
        return;
      }
      let payload = {
        auth: {
          identity: {
            methods: ["password"],
            password: {
              user: {
                name: this.userData.username,
                domain: {
                  name: "Default"
                },
                password: this.userData.password
              }
            }
          }
        }
      };

      axios
        .post(this.$store.state.url + "/identity/v3/auth/tokens", payload, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          if (response.headers["x-subject-token"]) {
            this.$store.commit("setToken", response.headers["x-subject-token"]);
            this.$store.commit("setUser", this.userData.username);
            this.$store.commit("setUserID", response.data.token.user.id);
            this.$store.commit("setUserPassword", this.userData.password);
            this.$router.push("/projectsList");
          }
          //console.log(this.userData.username);
          //console.log(response);
        })
        .catch(err => {
          this.$store.commit("clearUserAndToken");
          //console.log(err.response.data.msg);
          document.querySelector("#error").hidden = false;
          document.querySelector("#error").innerHTML = "Dados inválidos";
          //document.querySelector("#error").innerHTML = err.response.data.msg;
        });
    }
  },
  mounted() {
    console.log("Component mounted.");
  }
};
</script>
