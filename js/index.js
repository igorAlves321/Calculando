document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('toggle-theme');
    const body = document.body;

    // Carregar o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(savedTheme);
    } else {
        body.classList.add('light-theme');
    }

    // Alternar o tema
    themeToggleBtn.addEventListener('click', function () {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });
});

// Função para definir um campo como inválido
function setInvalidField(fieldId) {
    document.getElementById(fieldId).classList.add("is-invalid");
}

// Função para remover a marcação de campo inválido
function removeInvalidField(fieldId) {
    document.getElementById(fieldId).classList.remove("is-invalid");
}

// Função para validar os dados de entrada
function validarEntrada(peso, altura, idade) {
    let erros = [];
    if (!peso || isNaN(peso) || peso <= 0) {
        erros.push("Peso inválido");
        setInvalidField("peso");
    } else {
        removeInvalidField("peso");
    }

    if (!altura || isNaN(altura) || altura <= 0) {
        erros.push("Altura inválida");
        setInvalidField("altura");
    } else {
        removeInvalidField("altura");
    }

    if (!idade || isNaN(idade) || idade <= 0) {
        erros.push("Idade inválida");
        setInvalidField("idade");
    } else {
        removeInvalidField("idade");
    }
    return erros;
}

// Funções para cálculos
function calcularIMC(peso, altura_m) {
    return peso / (altura_m * altura_m);
}

function calcularAgua(peso) {
    return peso * 0.035;
}

function calcularTMB(peso, altura, idade, sexo) {
    return sexo === "masculino" ? 
           10 * peso + 6.25 * altura - 5 * idade + 5 :
           10 * peso + 6.25 * altura - 5 * idade - 161;
}

function calcularCaloriasTotais(tmb, atividade) {
    return tmb * parseFloat(atividade);
}

// Função principal para calcular e mostrar os resultados
function calcular() {
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const altura_m = altura / 100;
    const idade = parseFloat(document.getElementById("idade").value);
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const atividade = document.getElementById("atividade").value;

    const erros = validarEntrada(peso, altura, idade);
    if (erros.length > 0) {
        alert("Erros:\n" + erros.join("\n"));
    } else {
        const imc = calcularIMC(peso, altura_m);
        const consumo_de_agua = calcularAgua(peso);
        const tmb = calcularTMB(peso, altura, idade, sexo);
        const calorias_totais = calcularCaloriasTotais(tmb, atividade);

        let imc_classification = "";
        if (imc < 18.5) {
            imc_classification = " (Abaixo do peso)";
        } else if (imc >= 18.5 && imc < 24.9) {
            imc_classification = " (Normal)";
        } else if (imc >= 25 && imc < 29.9) {
            imc_classification = " (Sobrepeso)";
        } else if (imc >= 30 && imc < 34.9) {
            imc_classification = " (Obesidade I)";
        } else if (imc >= 35 && imc < 39.9) {
            imc_classification = " (Obesidade II)";
        } else {
            imc_classification = " (Obesidade III)";
        }

        document.getElementById("peso_na_tabela").innerHTML = peso.toFixed(2) + " kg";
        document.getElementById("altura_na_tabela").innerHTML = altura.toFixed(2) + " cm";
        document.getElementById("imc").innerHTML = imc.toFixed(2) + imc_classification;
        document.getElementById("consumo_de_agua").innerHTML = "Você deve tomar " + consumo_de_agua.toFixed(2) + " litros de água por dia";
        document.getElementById("tmb").innerHTML = tmb.toFixed(2) + " calorias";
        document.getElementById("calorias_totais").innerHTML = calorias_totais.toFixed(2) + " calorias";

        // Mostrar a tabela
        const resultsTable = document.getElementById("resultsTable");
        resultsTable.style.display = "table";
        resultsTable.style.opacity = 0;
        setTimeout(() => resultsTable.style.opacity = 1, 0);
    }

    // Limpar os campos do formulário após o cálculo ou erros
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("masculino").checked = false;
    document.getElementById("feminino").checked = false;
    document.getElementById("atividade").value = "1.2"; // valor padrão para 'Sedentário'
}

document.querySelector("form").onsubmit = function(event) {
    event.preventDefault();
    calcular();
    return false;
};
