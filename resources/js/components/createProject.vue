<template>
  <div>
    <div>
      <label for="name">Name</label>
      <input
        type="text"
        class="form-control"
        name="name"
        id="name"
        placeholder="Project name"
        v-model="projectName"
      />
    </div>

    <div>
      <label for="description">Description</label>
      <input
        type="text"
        class="form-control"
        name="description"
        id="description"
        placeholder="Description"
        v-model="projectDescription"
      />
    </div>
    <br />
    <div v-if="showButtonToAddMeAsMember">
      <button
        class="btn btn-primary"
        v-on:click="setMember()"
      >Set me as administrator of this project</button>
      <button class="btn btn-primary" v-on:click="goBack()">Go to projects list</button>
    </div>
    <br />
    <div v-if="!showButtonToAddMeAsMember">
      <button
        type="button"
        class="btn btn-primary"
        v-on:click.prevent="createProject"
      >Create project</button>
      <button type="button" class="btn btn-danger" v-on:click="goBack()">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectName: "",
      projectDescription: "",
      idOfDefaultProject: null,
      newProjectID: null,
      roleIDofAdmin: null,
      temporaryToken: null,
      showButtonToAddMeAsMember: false
    };
  },
  methods: {
    createProject() {
      //Buscar lista de projetos
      axios
        .get(this.$store.state.url + "/identity/v3/auth/projects", {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": this.$store.state.token
          }
        })
        .then(response => {
          console.log("1");
          this.idOfDefaultProject = response.data.projects[0].id;

          let payload_scoped = {
            auth: {
              identity: {
                methods: ["password"],
                password: {
                  user: {
                    id: this.$store.state.userID,
                    password: this.$store.state.userPassword
                  }
                }
              },
              scope: {
                project: {
                  id: this.idOfDefaultProject
                }
              }
            }
          };

          //Obter token scoped para este projeto
          axios
            .post(
              this.$store.state.url + "/identity/v3/auth/tokens",
              payload_scoped,
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
            .then(response => {
              console.log("2");
              this.$store.commit(
                "setProjectScopedToken",
                response.headers["x-subject-token"]
              );
              console.log("3");

              //Criar novo projeto
              let payload_new_project = {
                project: {
                  name: this.projectName,
                  description: this.projectDescription
                }
              };
              console.log("4");
              axios
                .post(
                  this.$store.state.url + "/identity/v3/projects",
                  payload_new_project,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "X-Auth-Token": this.$store.state.projectScopedToken
                    }
                  }
                )
                .then(response => {
                  console.log(response);
                  console.log("5");

                  if (response.status == 201) {
                    Vue.$toast.open(
                      "Projeto " + this.projectName + " criado com sucesso!"
                    );

                    this.$store.commit(
                      "setCurrentProjectID",
                      response.data.project.id
                    );
                    this.$store.commit(
                      "setCurrentProjectName",
                      this.projectName
                    );
                    this.showButtonToAddMeAsMember = true;
                  }
                })
                .catch(error => {
                  if(error.response.status == 409){
                    Vue.$toast.open(
                      "It is not permitted to have two projects with the same name!"
                    );
                  }
                });
            });
        });
    },
    goBack() {
      this.$router.push("/projectsList");
    },
    setMember() {
      //buscar o id da role de admin
      axios
        .get(this.$store.state.url + "/identity/v3/roles?name=admin", {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": this.$store.state.projectScopedToken
          }
        })
        .then(response => {
          //console.log("6");
          //console.log(response);
          this.roleIDofAdmin = response.data.roles[0].id;
          console.log("this.roleIDofAdmin: " + this.roleIDofAdmin);

          console.log(
            this.$store.state.currentProjectID +
              " " +
              this.$store.state.userID +
              " " +
              this.roleIDofAdmin +
              " " +
              this.$store.state.projectScopedToken
          );
          axios
            .put(
              this.$store.state.url +
                "/identity/v3/projects/" +
                this.$store.state.currentProjectID +
                "/users/" +
                this.$store.state.userID +
                "/roles/" +
                this.roleIDofAdmin,
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-Auth-Token": this.$store.state.projectScopedToken
                }
              }
            )
            .then(response => {
              if (response.status == 204) {
                Vue.$toast.open("You changed you role sucessufully!");
                this.goBack();
              }
            });
        });
    }
  },
  mounted() {}
};
</script>

<style>
</style>