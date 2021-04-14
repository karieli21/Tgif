var urlSenate = "https://api.propublica.org/congress/v1/113/senate/members.json";
var initFetchSenado = {
    method: 'GET',
    headers: new Headers({"X-API-Key" : "l9so3QbzzrR154LqSMioUWh7EeLLae1JlMCXGv97"})
};
var app = new Vue({
    el: '#app',
    data: { listaSenadores:[]},

    created(){
        this.buscarSenadores();
    },

    methods: {
            buscarSenadores(){
                fetch(urlSenate, initFetchSenado).then(function(response){
                    return response.json()
                }).then(this.asignarDatos)
            },

            asignarDatos(data){
                this.listaSenadores = data.results[0].members;
            }
    }
})
