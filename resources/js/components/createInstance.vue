<template>
   <div>
       <!--
        <div>
        <div class="row">

            <div class="col">
            <label for="id">ID:</label>
            <input type="text" id="id" class="form-control" v-model="filterData.id" />
            </div>

            <div class="col">
            <label for="type">Type:</label>
            <select class="form-control" id="type" name="type" v-model="filterData.type">
                <option
                v-for="option in optionsType"
                :key="option.value"
                v-bind:value="option.value"
                >{{ option.text }}</option>
            </select>
            </div>

            <div class="col">
            <label for="dataMin">From:</label>
            <input type="date" id="dateMin" class="form-control" v-model="filterData.dataMin" />
            </div>

            <div class="col">
            <label for="dataMin">Until:</label>
            <input type="date" id="dateMin" class="form-control" v-model="filterData.dataMax" />
            </div>
        </div>
        <div class="row">
            <div class="col">
            <label for="type_payment">Type of Payment:</label>
            <select
                class="form-control"
                id="type_payment"
                name="type_payment"
                v-model="filterData.type_payment">
                <option
                v-for="option in optionsTypePayment"
                :key="option.value"
                v-bind:value="option.value"
                >{{ option.text }}</option>
            </select>
            </div>

            <div class="col">
            <label for="transfer">Transfer:</label>
            <select class="form-control" id="transfer" name="transfer" v-model="filterData.transfer">
                <option
                v-for="option in optionsTransfer"
                :key="option.value"
                v-bind:value="option.value"
                >{{ option.text }}</option>
            </select>
            </div>

            <div v-if="filterData.transfer">
            <div class="col">
                <label for="transfer_email">Transfer e-mail:</label>
                <input
                type="text"
                id="transfer_email"
                class="form-control"
                v-model="filterData.transfer_email"
                />
            </div>
            </div>
            </div>
            <br />
            <button type="submit" class="btn btn-primary" v-on:click.prevent="filter">Submit</button>
            <button type="button" class="btn btn-link" v-on:click.prevent="clear">Clear all</button>
        </div>
        <br />
        -->
   </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
