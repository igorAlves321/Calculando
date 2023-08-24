
function calcular() {
    var peso = document.getElementById("peso").value;
    var altura = document.getElementById("altura").value / 100;

    var imc = peso / (altura * altura);
    var consumo_de_agua = 50 * peso / 1000; // Corrected formula

    document.getElementById("peso_na_tabela").innerHTML = peso + " kg";
    document.getElementById("altura_na_tabela").innerHTML = altura * 100 + " cm";
    document.getElementById("imc").innerHTML = imc.toFixed(2);
    document.getElementById("consumo_de_agua").innerHTML = "Você deve tomar " + consumo_de_agua.toFixed(2) + " litros de água por dia";

    return false;
}

document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  calcular();
});
