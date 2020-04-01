<template>
    <div>
        <h2>{{ title }}</h2>
        <br>
        <h5>Escolha um dos projetos a baixo</h5>
        <br>
    
        <div v-if="projectList.projects.length">
                <h5>Showing {{ projectList.projects.length }} items</h5>
        </div>

        
        <div v-if=projectList.projects.length>
            <div>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="project in projectList.projects" :key="project">
                            <td>
                                <button type="button" class="btn btn-secondary btn-lg btn-block" data-toggle="button" aria-pressed="false" autocomplete="off" v-on:click=changeProject(project)>{{ project.name }}</button>
                            </td>
                            <td> 
                                <button type="button" class="btn btn-lg btn-warning " v-on:click="updateProject(project)">Update</button>
                                &nbsp;
                                <button type="button" class="btn btn-lg btn-danger " v-on:click="deleteProject(project)">Delete</button>
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
        </div><br>

    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                title: "Lista de Projetos",
                projectList: [],
                tokenProjeto: ""
            };
        },
        methods: {
            getProjects: function() {
                axios.get(this.$store.state.url + '/identity/v3/auth/projects',{
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': this.$store.state.token
                    },
                }).then(response => {
                    this.projectList = response.data
                });
            },
            changeProject: function(project) {
                this.$store.state.currentProjectID = project.id;
                this.$store.state.currentProjectName = project.name;

                let payload = 
                {
                    "auth": {
                        "identity": {
                            "methods": [
                                "password"
                            ],
                            "password": {
                                "user": {
                                    "id": this.$store.state.userID,
                                    "password": this.$store.state.userPassword
                                }
                            }
                        },
                        "scope": {
                            "project": {
                                "id": this.$store.state.currentProjectID
                            }
                        }
                    }
                }
                axios.post(this.$store.state.url + '/identity/v3/auth/tokens', payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    //Token scoped para o projectID
                    console.log(this.$store.state.currentProjectID)
                    this.$store.state.projectScopedToken = response.headers["x-subject-token"]
                    this.$router.push("/projectDetails");
                });
            },
            deleteProject: function(project){
                console.log("A pedir token scoped para o projeto: " + project.id + " para depois poder apagar o projeto")
                
                this.$store.state.currentProjectID = project.id;
                this.$store.state.currentProjectName = project.name;

                let payload = 
                {
                    "auth": {
                        "identity": {
                            "methods": [
                                "password"
                            ],
                            "password": {
                                "user": {
                                    "id": this.$store.state.userID,
                                    "password": this.$store.state.userPassword
                                }
                            }
                        },
                        "scope": {
                            "project": {
                                "id": project.id
                            }
                        }
                    }
                }
                
                axios.post(this.$store.state.url + '/identity/v3/auth/tokens', payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    this.tokenProjeto = response.headers["x-subject-token"]
                    console.log(this.tokenProjeto)
                    axios.delete(this.$store.state.url + '/identity/v3/projects/' + project.id, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Auth-Token': this.tokenProjeto
                        },
                    }).then(response => {
                        console.log("this.tokenProjeto2: " + this.tokenProjeto )
                        console.log(response)
                    });
                });
            },
            updateProject: function(projectID){
                console.log(project)
            },
        },
        mounted() {
            this.getProjects()
        },

    }
</script>