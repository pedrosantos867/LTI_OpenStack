<template>
    <div>
        <h2>{{ title }}</h2>
        <br>

        <button class="btn btn-primary"  v-on:click="createInstance()">Criar nova instância</button><br>

        <div v-if=instancesList.length>
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image name</th>
                            <th>IP Adress</th>
                            <th>Flavor</th>
                            <th>Key Pair</th>
                            <th>Status</th>
                            <th>Power State</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="instance in instancesDetails" :key="instance">
                            <td>{{ instance.name }}</td>
                            <td v-if="instance.image == null">Boot from volume</td>
                            <td v-else>{{instance.image}}</td>
                            <td>{{ instance.addresses.shared[0].addr }}</td>
                            <td>{{ instance.flavor.id }}</td>
                            <td v-if="instance.key_name == null">-</td>
                            <td v-else>{{instance.key_name}}</td>
                            <td>{{ instance.status }}</td>
                            <td>{{ instance.host_status  }}</td>                            
                            <td>                    
                                <button type="button" class="btn btn-sm btn-primary" v-on:click="editInstance(instance.id)">Editar</button>
                                <button type="button" class="btn btn-sm btn-danger" v-on:click="removeInstance(instance.id)">Remover</button>
                            </td>
                        </tr>            
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else>
                <h5>Não existem instâncias neste projeto</h5>
        </div>
        <button v-on:click=goBack()>Voltar para a lista de projetos</button>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                title: "Lista de instancias do projeto " +  this.$store.state.currentProjectName,
                instancesList: [],
                instancesDetails: []
            };
        },
        methods: {
            getInstances: function() {
                axios.get('http://134.122.49.176/compute/v2.1/servers',{
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': this.$store.state.projectScopedToken
                    },
                }).then(response => {
                    this.instancesList = response.data.servers
                    this.getAllInstancesDetails()
                });
            },
            goBack: function() {
                this.$router.push("/projectsList");
            },
            editInstance: function() {
                console.log("Função: editInstance");
            },
            removeInstance: function() {
                console.log("Função: removeInstance");
            },
            createInstance: function() {
                this.$router.push("/createInstance");
            },
            getAllInstancesDetails: function() {
                let i;
                for(let i = 0; i < this.instancesList.length; i++){
                    axios.get('http://134.122.49.176/compute/v2.1/servers/' + this.instancesList[i].id,{
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
            }
        },
        mounted() {
            this.getInstances();
        },

    }
</script>