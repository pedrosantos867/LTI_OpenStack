<template>
  <div v-if="initialized">
    <h2>{{ title }}</h2>
    <br />
    <h5>Escolha um dos projetos a baixo</h5>
    <br />

    <div v-if="projectList.projects.length">
      <h5>Showing {{ projectList.projects.length }} items</h5>
    </div>

    <div v-if="projectList.projects.length">
      <div>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projectList.projects" :key="project">
              <td>
                <button
                  type="button"
                  class="btn btn-secondary btn-lg btn-block"
                  data-toggle="button"
                  aria-pressed="false"
                  autocomplete="off"
                  v-on:click="changeProject(project)"
                >{{ project.name }}</button>
              </td>
              <td>{{ project.description }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-lg btn-warning"
                  v-on:click="updateProject(project)"
                >Update</button>
                &nbsp;
                <button
                  type="button"
                  class="btn btn-lg btn-danger"
                  v-on:click="deleteProject(project)"
                >Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <h5>Não existem projetos</h5>
    </div>

    <div v-if="projectList.projects.length">
      <h5>Showing {{ projectList.projects.length }} items</h5>
    </div>
    <br />
    <button class="btn btn-primary" v-on:click="createProject()">Create new project</button>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      title: "Lista de Projetos",
      initialized: false,
      projectList: [],
      tokenProjeto: ""
    };
  },
  methods: {
    getProjects: function() {
      this.projectList = [];
      axios
        .get(this.$store.state.url + "/identity/v3/auth/projects", {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": this.$store.state.token
          }
        })
        .then(response => {
          this.projectList = response.data;
          this.initialized = true;
        });
    },
    changeProject: function(project) {
      this.$store.commit("setCurrentProjectID", project.id);
      this.$store.commit("setCurrentProjectName", project.name);

      let payload = {
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
              id: this.$store.state.currentProjectID
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
          //Token scoped para o projectID
          this.$store.commit(
            "setProjectScopedToken",
            response.headers["x-subject-token"]
          );
          this.$router.push("/projectDetails");
        });
    },
    deleteProject: function(project) {
      let payload = {
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
              id: project.id
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
          this.tokenProjeto = response.headers["x-subject-token"];
          axios
            .delete(
              this.$store.state.url + "/identity/v3/projects/" + project.id,
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-Auth-Token": this.tokenProjeto
                }
              }
            )
            .then(response => {
              if (response.status == 204) {
                Vue.$toast.open(
                  "Projeto " + project.name + " apagado com sucesso!"
                );
                this.projectList = [];
                this.getProjects();
              }
              console.log(response);
            });
        });
    },
    updateProject: function(project) {
      this.$store.commit("setCurrentProjectID", project.id);
      this.$store.commit("setCurrentProjectName", project.name);

      let payload = {
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
              id: this.$store.state.currentProjectID
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
          //Token scoped para o projectID
          this.$store.commit(
            "setProjectScopedToken",
            response.headers["x-subject-token"]
          );
          this.$router.push("/projectEdit");
        });
    },
    createProject() {
      this.$router.push("/createProject");
    }
  },
  mounted() {
    this.getProjects();
  }
};
</script>