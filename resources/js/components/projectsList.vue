
        
<template>
	<table class="table table-striped">
        <h2></h2>
	    <thead>
	        <tr>
	            <th>{{ title }}</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr v-for="project in projectList.projects" :key="project.name">
                <td>{{ project.name }}  </td>

            <button type="button" class="btn btn-primary">Edit Project</button>
              
            <button type="button" class="btn btn-danger">Delete Project</button>

	        </tr>

	    </tbody>
	</table>
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