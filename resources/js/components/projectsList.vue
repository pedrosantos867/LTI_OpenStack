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
                                <button type="button" class="btn btn-lg btn-warning " v-on:click="updateProject(project.id)">Update</button>
                                &nbsp;
                                <button type="button" class="btn btn-lg btn-danger " v-on:click="deleteProject(project.id)">Delete</button>
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
                projectList: []
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
                    this.$store.state.projectScopedToken =response.headers["x-subject-token"]
                    this.$router.push("/projectDetails");
                });
            },
            deleteProject: function(project){
                console.log(project)
            },
            updateProject: function(project){
                console.log(project)
            },
        },
        mounted() {
            this.getProjects()
        },

    }
</script>