var urlSenate = "https://api.propublica.org/congress/v1/113/senate/members.json";
var initFetchSenado = {
  method: 'GET',
  headers: new Headers({"X-API-Key" : "l9so3QbzzrR154LqSMioUWh7EeLLae1JlMCXGv97"})
};
var app = new Vue({
  el: '#app',
  data:{},

  created(){
    this.listarSenadores();
  },

  methods: {
    listarSenadores(){
      fetch(urlSenate, initFetchSenado).then(function(response){
        return response.json()
      }).then(senadoEstadistica)
    }
  }
});

function senadoEstadistica(dataSen){
  var resultSen = dataSen.results[0].members;
  var contR = 0;
  var contD = 0;
  var contI = 0;
  var sumTotVotos = 0;
  var sumTotVotR = 0;
  var sumTotVotD = 0;
  var sumTotVotI = 0;

  for(var i=0 ; i<resultSen.length; i++){
    if(resultSen[i].party == "R"){
      contR = contR + 1;
      sumTotVotR = sumTotVotR + resultSen[i].total_votes;
    }
    else if( resultSen[i].party == "D"){
      contD = contD + 1;
      sumTotVotD = sumTotVotD + resultSen[i].total_votes;
    }
    else {
      contI = contI +1;
      sumTotVotI = sumTotVotI + resultSen[i].total_votes;
    }
    sumTotVotos = sumTotVotos + resultSen[i].total_votes;
  }

  var porcRep = ((sumTotVotR * 100) / sumTotVotos);
  var porcDem = ((sumTotVotD * 100) / sumTotVotos);
  var porcInd = ((sumTotVotI * 100) / sumTotVotos);
  var totPartyS = (contR + contD + contI);

  $("#nroVotRepS").text(contR);
  $("#nroVotDemS").text(contD);
  $("#nroVotIndS").text(contI);
  $("#prVotRepS").text((porcRep.toFixed(2)) + "%");
  $("#prVotDemS").text((porcDem.toFixed(2)) + "%");
  $("#prVotIndS").text((porcInd.toFixed(2)) + "%");
  $("#totPartS").text(totPartyS);
// -------------------------------------------------------------------  
  var reMostSen = ((resultSen.length * 10) / 100);
  var menCompro = resultSen.sort(mayorAmenor).slice(0, reMostSen);
  var bodyMenosComp = $("#menos-comp-sen");
  
  for(var i=0; i < menCompro.length; i++){
    var tr = $("<tr>");
    var tdNombre = $("<td>");
    var nombreCompleto = menCompro[i].first_name + " " + (menCompro[i].middle_name == null ? "" : menCompro[i].middle_name + " ") + menCompro[i].last_name;
    tdNombre.text(nombreCompleto);
    tdNombre.addClass("col");
    
    var tdNumVotPerd = $("<td>");
    tdNumVotPerd.text(menCompro[i].missed_votes);
    
    var tdPorVotPerd = $("<td>");
    tdPorVotPerd.text(menCompro[i].missed_votes_pct.toFixed(2) + " % ");
    
    tr.append(tdNombre);
    tr.append(tdNumVotPerd);
    tr.append(tdPorVotPerd);
   
    bodyMenosComp.append(tr);
  }
  // ---------------------------------------------------------------
  var masCompro = resultSen.sort(menorAmayor).slice(0, reMostSen);
  var bodyMasComp = $("#mas-comp-sen");
  
  for(var i=0; i < masCompro.length; i++){ 
    var tr = $("<tr>");
    var tdNombre = $("<td>");
    var nombreCompleto = masCompro[i].first_name + " " + (masCompro[i].middle_name == null ? "" : masCompro[i].middle_name + " ") + masCompro[i].last_name;
    tdNombre.text(nombreCompleto);
    tdNombre.addClass("col");
  
    var tdNumVotPerd = $("<td>");
    tdNumVotPerd.text(masCompro[i].missed_votes);
  
    var tdPorVotPerd = $("<td>");
    tdPorVotPerd.text(masCompro[i].missed_votes_pct.toFixed(2) + " % ");
   
    tr.append(tdNombre);
    tr.append(tdNumVotPerd);
    tr.append(tdPorVotPerd);
  
    bodyMasComp.append(tr);
  }
// -------------------------------------------------------------
  var menLeal = resultSen.sort(mayorAmenor2).slice(0, reMostSen);
  var bodyMenosLeal = $("#men-leal-sen");

  for(var i=0; i < menLeal.length; i++){
    var tr = $("<tr>");
    var tdNombre = $("<td>");
    var nombreCompleto = menLeal[i].first_name + " " + (menLeal[i].middle_name == null ? "" : menLeal[i].middle_name + " ") + menLeal[i].last_name;
    tdNombre.text(nombreCompleto);
    tdNombre.addClass("col");

    var tdNumVotPart = $("<td>");
    tdNumVotPart.text(menLeal[i].total_votes);
    
    var tdPorVotPart = $("<td>");
    tdPorVotPart.text(menLeal[i].votes_with_party_pct.toFixed(2) + " % ");
    
    tr.append(tdNombre);
    tr.append(tdNumVotPart);
    tr.append(tdPorVotPart);
  
    bodyMenosLeal.append(tr);
  }
  // ---------------------------------------------------------------
  var masLeal = resultSen.sort(menorAmayor2).slice(0, reMostSen);
  var bodyMasLeal = $("#mas-leal-sen");

  for(var i=0; i < masLeal.length; i++){
    var tr = $("<tr>");
    var tdNombre = $("<td>");
    var nombreCompleto = masLeal[i].first_name + " " + (masLeal[i].middle_name == null ? "" : masLeal[i].middle_name + " ")  + masLeal[i].last_name;
    tdNombre.text(nombreCompleto);
    tdNombre.addClass("col");

    var tdNumVotPart = $("<td>");
    tdNumVotPart .text(masLeal[i].total_votes);

    var tdPorVotPart  = $("<td>");
    tdPorVotPart .text(masLeal[i].votes_with_party_pct.toFixed(2) + " % ");
  
    tr.append(tdNombre);
    tr.append(tdNumVotPart);
    tr.append(tdPorVotPart);

    bodyMasLeal.append(tr);
  }
}

function menorAmayor( x , y){
  return x.missed_votes - y.missed_votes;
}
function mayorAmenor( x, y ){  
    return y.missed_votes - x.missed_votes;   
}
function menorAmayor2( x , y){
  return x.total_votes - y.total_votes;
}
function mayorAmenor2( x, y ){  
    return y.total_votes - x.total_votes;   
}