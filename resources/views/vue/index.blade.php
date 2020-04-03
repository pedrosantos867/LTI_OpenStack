@extends('master')

@section('title', 'Open Stack')

@section('content')
<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">OpenStack</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">

        </ul>
        <ul class="nav navbar-nav navbar-right" >
            
            <li class="nav-item">
                <router-link  class="nav-link" v-if="!this.$store.state.token" to="/login">Login</router-link>
            </li>
            <router-link  class="nav-link" to="/createVolume" v-if="this.$store.state.token">Criar Volume</router-link>
            <router-link  class="nav-link" to="/projectCreate" v-if="this.$store.state.token">Criar Projeto</router-link>
            <router-link  class="nav-link" to="/projectsList" v-if="this.$store.state.token">Lista de Projetos</router-link>

            <router-link  class="nav-link" to="/logout" v-if="this.$store.state.token">Logout</router-link>
        </ul>
    </div>
</nav>
<router-view class="container" style="padding:20px;"></router-view>

@endsection
@section('pagescript')
<script src="js/app.js"></script>
{{-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"> --}}
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
@stop