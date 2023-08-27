function validarEntrada(peso, altura, idade) {
    var erros = [];
    if (!peso || isNaN(peso) || peso <= 0) {
        erros.push("Peso inválido");
    }
    if (!altura || isNaN(altura) || altura <= 0) {
        erros.push("Altura inválida");
    }
    if (!idade || isNaN(idade) || idade <= 0) {
        erros.push("Idade inválida");
    }
    return erros;
}

function calcularIMC(peso, altura_m) {
    return peso / (altura_m * altura_m);
}

function calcularAgua(peso) {
    return peso * 0.05;
}

function calcularTMB(peso, altura, idade, sexo) {
    return sexo === "masculino" ? 
           10 * peso + 6.25 * altura - 5 * idade + 5 :
           10 * peso + 6.25 * altura - 5 * idade - 161;
}

function calcularCaloriasTotais(tmb, atividade) {
    return tmb * parseFloat(atividade);
}

function calcular() {
    var peso = parseFloat(document.getElementById("peso").value);
    var altura = parseFloat(document.getElementById("altura").value);
    var altura_m = altura / 100;
    var idade = parseFloat(document.getElementById("idade").value);
var sexo = document.querySelector('input[name="sexo"]:checked').value;
    var atividade = document.getElementById("atividade").value;

    var erros = validarEntrada(peso, altura, idade);
    if (erros.length > 0) {
        alert("Erros:\\n" + erros.join("\\n"));
        return false;
    }

    var imc = calcularIMC(peso, altura_m);
    var consumo_de_agua = calcularAgua(peso);
    var tmb = calcularTMB(peso, altura, idade, sexo);
    var calorias_totais = calcularCaloriasTotais(tmb, atividade);

    document.getElementById("peso_na_tabela").innerHTML = peso.toFixed(2) + " kg";
    document.getElementById("altura_na_tabela").innerHTML = altura.toFixed(2) + " cm";
    document.getElementById("imc").innerHTML = imc.toFixed(2);
    document.getElementById("consumo_de_agua").innerHTML = "Você deve tomar " + consumo_de_agua.toFixed(2) + " litros de água por dia";
    document.getElementById("tmb").innerHTML = tmb.toFixed(2) + " calorias";
    document.getElementById("calorias_totais").innerHTML = calorias_totais.toFixed(2) + " calorias";
}

document.querySelector("form").onsubmit = function(event) {
  event.preventDefault();
  calcular();
  return false;
};
