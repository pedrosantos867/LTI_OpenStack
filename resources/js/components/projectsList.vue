<template>
    <div>
        <h2>{{ title }}</h2>
        
        <ul>
            <li v-for="project in projectList.projects" :key="project.name">
                {{ project.name }}
            </li>
        </ul>
        
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
            }
        },
        mounted() {
            this.getProjects()
        },

    }
</script>