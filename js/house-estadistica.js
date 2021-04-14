var urlHouse = "https://api.propublica.org/congress/v1/113/house/members.json";
var initFetchHouse = {
  method: 'GET',
  headers: new Headers({"X-API-Key" : "l9so3QbzzrR154LqSMioUWh7EeLLae1JlMCXGv97"})
};
var app = new Vue({
  el: '#app',
  data:{},

  created(){
    this.listarCamRep();
  },

  methods: {
    listarCamRep(){
      fetch(urlHouse, initFetchHouse).then(function(response){
        return response.json()
      }).then(houseEstadistica)
    }
  }
});

function houseEstadistica(dataHou){
  var resultHou = dataHou.results[0].members;
  var contR2 = 0;
  var contD2 = 0;
  var contI2 = 0;
  var sumTotVotos2 = 0;
  var sumTotVotR2 = 0;
  var sumTotVotD2 = 0;
  var sumTotVotI2 = 0;

  for(var i=0 ; i<resultHou.length; i++){
    if(resultHou[i].party == "R"){
      contR2 = contR2 + 1;
      sumTotVotR2 = sumTotVotR2 + resultHou[i].total_votes;
    }
    else if( resultHou[i].party == "D"){
      contD2 = contD2 + 1;
      sumTotVotD2 = sumTotVotD2 + resultHou[i].total_votes;
    }
    else {
      contI2 = contI2 +1;
      sumTotVotI2 = sumTotVotI2 + resultHou[i].total_votes;
    }
    sumTotVotos2 = sumTotVotos2 + resultHou[i].total_votes;
  }

  var porcRep2 = ((sumTotVotR2 * 100) / sumTotVotos2);
  var porcDem2 = ((sumTotVotD2 * 100) / sumTotVotos2);
  var porcInd2= ((sumTotVotI2 * 100) / sumTotVotos2);
  var totPartyC = (contR2 + contD2 + contI2);

  $("#nVotRepC").text(contR2);
  $("#nVotDemC").text(contD2);
  $("#nVotIndC").text(contI2);
  $("#pVotRepC").text((porcRep2.toFixed(2)) + "%");
  $("#pVotDemC").text((porcDem2.toFixed(2)) + "%");
  $("#pVotIndC").text((porcInd2.toFixed(2)) + "%");
  $("#totPartC").text(totPartyC);
  // ------------------------------------------------------------
  var reMostCam = ((resultHou.length * 10 ) / 100);
  var menCompro2 = resultHou.sort(mayorAmenor).slice(0,reMostCam);
  var bodyMenosComp2 = $("#menos-comp-cam");

  for(var i=0; i < menCompro2.length; i++){
    var tr = $("<tr>");
    var tdNombre = $("<td>");
    var nombreCompleto = menCompro2[i].first_name + " " + (menCompro2[i].middle_name == null ? "" : menCompro2[i].middle_name + " ") + menCompro2[i].last_name;
    tdNombre.text(nombreCompleto);
    tdNombre.addClass("col");
    
    var tdNumVotPerd = $("<td>");
    tdNumVotPerd.text(menCompro2[i].missed_votes);
    
    var tdPorVotPerd = $("<td>");
    tdPorVotPerd.text(menCompro2[i].missed_votes_pct.toFixed(2) + " % ");
    
    tr.append(tdNombre);
    tr.append(tdNumVotPerd);
    tr.append(tdPorVotPerd);
  
    bodyMenosComp2.append(tr);
  }
  // ---------------------------------------------------------------
  var masCompro2 = resultHou.sort(menorAmayor).slice(0, reMostCam);
  var bodyMasComp2 = $("#mas-comp-cam");

  for(var i=0; i < masCompro2.length; i++){  
    var tr = $("<tr>");
    var tdNombre = $("<td>");
    var nombreCompleto = masCompro2[i].first_name + " " + (masCompro2[i].middle_name == null ? "" : masCompro2[i].middle_name + " ") + masCompro2[i].last_name;
    tdNombre.text(nombreCompleto);
    tdNombre.addClass("col");

    var tdNumVotPerd = $("<td>");
    tdNumVotPerd.text(masCompro2[i].missed_votes);

    var tdPorVotPerd = $("<td>");
    tdPorVotPerd.text(masCompro2[i].missed_votes_pct.toFixed(2) + " % ");
  
    tr.append(tdNombre);
    tr.append(tdNumVotPerd);
    tr.append(tdPorVotPerd);

    bodyMasComp2.append(tr);
  }
  // ================================================================
  var menLeal2 = resultHou.sort(mayorAmenor2).slice(0, reMostCam);
  var bodyMenosLeal2 = $("#men-leal-cam");

  for(var i=0; i < menLeal2.length; i++){
    var tr = $("<tr>");
    var tdNombre = $("<td>");
    var nombreCompleto = menLeal2[i].first_name + " " + (menLeal2[i].middle_name == null ? "" : menLeal2[i].middle_name + " ") + menLeal2[i].last_name;
    tdNombre.text(nombreCompleto);
    tdNombre.addClass("col");

    var tdNumVotPart = $("<td>");
    tdNumVotPart.text(menLeal2[i].total_votes);
    
    var tdPorVotPart = $("<td>");
    tdPorVotPart.text(menLeal2[i].votes_with_party_pct.toFixed(2) + " % ");
    
    tr.append(tdNombre);
    tr.append(tdNumVotPart);
    tr.append(tdPorVotPart);
  
    bodyMenosLeal2.append(tr);
  }
  // ---------------------------------------------------------------
  var masLeal2 = resultHou.sort(menorAmayor2).slice(0, reMostCam);
  var bodyMasLeal2 = $("#mas-leal-cam");

  for(var i=0; i < masLeal2.length; i++){
    var tr = $("<tr>");
    var tdNombre = $("<td>");
    var nombreCompleto = masLeal2[i].first_name + " " + (masLeal2[i].middle_name == null ? "" : masLeal2[i].middle_name + " ") + masLeal2[i].last_name;
    tdNombre.text(nombreCompleto);
    tdNombre.addClass("col");

    var tdNumVotPart = $("<td>");
    tdNumVotPart.text(masLeal2[i].total_votes);

    var tdPorVotPart  = $("<td>");
    tdPorVotPart.text(masLeal2[i].votes_with_party_pct.toFixed(2) + " % ");
  
    tr.append(tdNombre);
    tr.append(tdNumVotPart);
    tr.append(tdPorVotPart);

    bodyMasLeal2.append(tr);
  }
}

function menorAmayor( x, y ){
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