<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
        </form>
        <div>
            <button type="button" class="btn btn-primary" v-on:click.prevent="login">Login</button>
        </div>
    </div>
</template>
<script>

    export default {
        data () {
            return {
                username: '',
                password: '',
                submitted: false
            }
        },
        methods: {
            login: function() {

                let payload = 
                {
                    "auth": {
                        "identity": {
                            "methods": [
                                "password"
                            ],
                            "password": {
                                "user": {
                                    "name": "demo",
                                    "domain": {
                                        "name": "Default"
                                    },
                                    "password": "devstack"
                                }
                            }
                        }
                    }
                }

                axios.post('http://134.122.49.176/identity/v3/auth/tokens', payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    console.log(response);
                })
            }
        },
        mounted() {
            console.log('Component mounted.')
        },


    
    }
</script>