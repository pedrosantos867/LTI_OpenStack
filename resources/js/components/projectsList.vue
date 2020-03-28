<template>
    <div>
        <h2>{{ title }}</h2>
        <br>
        <h5>Escolha um dos projetos a baixo</h5>
        <br>

        <dir v-for="project in projectList.projects" :key="project.name">
            <button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="button" aria-pressed="false" autocomplete="off" v-on:click=changeProject(project)>{{ project.name }}</button>
        </dir>

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
                axios.get('http://134.122.49.176/identity/v3/auth/projects',{
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': this.$store.state.token
                    },
                }).then(response => {
                    this.projectList = response.data
                    //console.log(this.projectList);
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

                axios.post('http://134.122.49.176/identity/v3/auth/tokens', payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    //Token scoped para o projectID
                    this.$store.state.projectScopedToken =response.headers["x-subject-token"]
                    this.$router.push("/projectDetails");
                });
            }
            
        },
        mounted() {
            this.getProjects()
        },

    }
</script>