<template>
    <div>
        <h2>{{ title }}</h2>
        <br>

        <button class="btn btn-primary"  v-on:click="createInstance()">Criar nova instância</button><br>
        <br><br>

        <div v-if="instancesList.length">
                <h5>Showing {{ instancesList.length }} items</h5>
        </div>
        
        <div v-if=instancesList.length>
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image name</th>
                            <th>IP Adressess (Private, public, shared)</th>
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

                            <td v-if='instance.image.id == null'>Boot from volume</td>
                            <td v-else>{{ verificarImage(instance.image.id) }}</td>
                            
                            <td>
                                <div v-for="privateIP in instance.addresses.private" :key="privateIP">
                                    {{privateIP.addr}}
                                </div>
                                <div v-for="sharedIP in instance.addresses.shared" :key="sharedIP">
                                    {{sharedIP.addr}}
                                </div>
                                <div v-for="publicIP in instance.addresses.public" :key="publicIP">
                                    {{publicIP.addr}}
                                </div>
                            </td>

                            <td>{{ verificarFlavor(instance.flavor.id) }}</td>
                            
                            <td v-if="instance.key_name == null">-</td>
                            <td v-else>{{instance.key_name}}</td>
                            
                            <td>{{ instance['OS-EXT-STS:vm_state']}}</td>
                            
                            <td v-if="instance['OS-EXT-STS:power_state'] == null">-</td>
                            <td v-else-if="instance['OS-EXT-STS:power_state'] == 0"> NOSTATE </td>
                            <td v-else-if="instance['OS-EXT-STS:power_state'] == 1"> RUNNING </td>
                            <td v-else-if="instance['OS-EXT-STS:power_state'] == 3"> PAUSED </td>
                            <td v-else-if="instance['OS-EXT-STS:power_state'] == 4"> SHUTDOWN </td>
                            <td v-else-if="instance['OS-EXT-STS:power_state'] == 6"> CRASHED </td>
                            <td v-else-if="instance['OS-EXT-STS:power_state'] == 7"> SUSPENDED </td>
                            
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

        <div v-if="instancesList.length">
            <h5>Showing {{ instancesList.length }} items</h5>
        </div><br>

        <button v-on:click=goBack()>Voltar para a lista de projetos</button>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                title: "Lista de instancias do projeto " +  this.$store.state.currentProjectName,
                instancesList: [],
                instancesDetails: [],
                imagesDetails:[],
                flavorsDetails:[]
            };
        },
        methods: {
            getInstances: function() {
                axios.get(this.$store.state.url + '/compute/v2.1/servers',{
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': this.$store.state.projectScopedToken
                    },
                }).then(response => {
                    this.instancesList = response.data.servers
                    this.getAllInstancesDetails()
                    this.getImagesDetails()
                    this.getFlavorsDetails()
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
                    axios.get(this.$store.state.url + '/compute/v2.1/servers/' + this.instancesList[i].id,{
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
            },
            getImagesDetails: function() {
                axios.get(this.$store.state.url + '/compute/v2.1/images',{
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': this.$store.state.projectScopedToken
                    },
                }).then(response => {
                    //for(let i=0; i<response.data.images.length; i++){
                        this.imagesDetails.push(response.data.images)
                    //}
                    //console.log(this.imagesDetails)
                });
            },
            verificarImage: function(imageAVerificar){
                for(let i=0; i < this.imagesDetails[0].length; i++){
                    /*
                    console.log(i)
                    console.log("Imagem a verificar" + imageAVerificar)
                    console.log(this.imagesDetails[0][i].id)
                    */
                    if(this.imagesDetails[0][i].id == imageAVerificar){
                        //console.log(this.imagesDetails[i][0].name)
                        return this.imagesDetails[0][i].name
                    }
                }
            },
            getFlavorsDetails: function() {
                axios.get(this.$store.state.url + '/compute/v2.1/flavors',{
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': this.$store.state.projectScopedToken
                    },
                }).then(response => {
                    this.flavorsDetails = response.data.flavors
                });
            },
            verificarFlavor: function(flavorAverificar) {
                 for(let i=0; i < this.flavorsDetails.length; i++){
                    if(this.flavorsDetails[i].id == flavorAverificar){
                        return this.flavorsDetails[i].name
                    }
                }
            }
        },
        mounted() {
            this.getInstances();
        },

    }
</script>