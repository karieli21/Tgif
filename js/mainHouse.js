var urlHouse = "https://api.propublica.org/congress/v1/113/house/members.json";
var initFetchHouse = {
    method: 'GET',
    headers: new Headers({"X-API-Key" : "l9so3QbzzrR154LqSMioUWh7EeLLae1JlMCXGv97"})
};
var app = new Vue({
    el: '#app',
    data: { listaCamaraRep:[]},

    created(){
        this.buscarCamaraRep();
    },

    methods: {
            buscarCamaraRep(){
                fetch(urlHouse, initFetchHouse).then(function(response){
                    return response.json()
                }).then(this.asignarDatos)
            },

            asignarDatos(data){
                this.listaCamaraRep = data.results[0].members;
            }
    }
});