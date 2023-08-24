
function calcular() {
    var peso = parseFloat(document.getElementById("peso").value);
    var altura = parseFloat(document.getElementById("altura").value);
    var idade = parseFloat(document.getElementById("idade").value);
    var sexo = document.getElementById("sexo").value;
    var altura_m = altura / 100;

    // Calculating BMI
    var imc = peso / (altura_m * altura_m);

    // Calculating daily water consumption (50 ml per kg)
    var consumo_de_agua = peso * 0.05;

    // Calculating BMR using Mifflin-St Jeor equation
    var tmb;
    if (sexo === "masculino") {
        tmb = 10 * peso + 6.25 * altura - 5 * idade + 5;
    } else {
        tmb = 10 * peso + 6.25 * altura - 5 * idade - 161;
    }

    // Updating the table with the results
    document.getElementById("peso_na_tabela").innerHTML = peso.toFixed(2) + " kg";
    document.getElementById("altura_na_tabela").innerHTML = altura.toFixed(2) + " cm";
    document.getElementById("imc").innerHTML = imc.toFixed(2);
    document.getElementById("consumo_de_agua").innerHTML = "Você deve tomar " + consumo_de_agua.toFixed(2) + " litros de água por dia";
    document.getElementById("tmb").innerHTML = tmb.toFixed(2) + " calorias";

    // Preventing form submission
    return false;
}
