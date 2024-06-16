document.addEventListener('DOMContentLoaded', function() {
    const botaoAlternarTema = document.getElementById('toggle-theme');
    const corpo = document.body;

    // Carregar o tema salvo no localStorage
    const temaSalvo = localStorage.getItem('theme');
    if (temaSalvo) {
        corpo.classList.remove('light-theme', 'dark-theme');
        corpo.classList.add(temaSalvo);
    } else {
        corpo.classList.add('light-theme');
    }

    // Alternar o tema
    botaoAlternarTema.addEventListener('click', function() {
        if (corpo.classList.contains('light-theme')) {
            corpo.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            corpo.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });

    // Adicionar evento de envio de formulário
    document.querySelector("form").onsubmit = function(event) {
        event.preventDefault();
        calcular();
    };
});

// Função para definir um campo como inválido
function definirCampoInvalido(campoId) {
    document.getElementById(campoId).classList.add("is-invalid");
}

// Função para remover a marcação de campo inválido
function removerCampoInvalido(campoId) {
    document.getElementById(campoId).classList.remove("is-invalid");
}

// Função para validar os dados de entrada
function validarEntrada(peso, altura, idade) {
    let erros = [];
    if (!peso || isNaN(peso) || peso <= 0) {
        erros.push("Peso inválido");
        definirCampoInvalido("peso");
    } else {
        removerCampoInvalido("peso");
    }

    if (!altura || isNaN(altura) || altura <= 0) {
        erros.push("Altura inválida");
        definirCampoInvalido("altura");
    } else {
        removerCampoInvalido("altura");
    }

    if (!idade || isNaN(idade) || idade <= 0) {
        erros.push("Idade inválida");
        definirCampoInvalido("idade");
    } else {
        removerCampoInvalido("idade");
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
    const baseTMB = 10 * peso + 6.25 * altura - 5 * idade;
    return sexo === "masculino" ? baseTMB + 5 : baseTMB - 161;
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
        return;
    }

    const imc = calcularIMC(peso, altura_m);
    const consumoDeAgua = calcularAgua(peso);
    const tmb = calcularTMB(peso, altura, idade, sexo);
    const caloriasTotais = calcularCaloriasTotais(tmb, atividade);

    const classificacaoIMC = obterClassificacaoIMC(imc);

    exibirResultados(peso, altura, imc, classificacaoIMC, consumoDeAgua, tmb, caloriasTotais);

    // Limpar os campos do formulário após o cálculo ou erros
    limparFormulario();
}

// Função para obter a classificação do IMC
function obterClassificacaoIMC(imc) {
    if (imc < 18.5) return " (Abaixo do peso)";
    if (imc >= 18.5 && imc < 24.9) return " (Normal)";
    if (imc >= 25 && imc < 29.9) return " (Sobrepeso)";
    if (imc >= 30 && imc < 34.9) return " (Obesidade I)";
    if (imc >= 35 && imc < 39.9) return " (Obesidade II)";
    return " (Obesidade III)";
}

// Função para exibir os resultados
function exibirResultados(peso, altura, imc, classificacaoIMC, consumoDeAgua, tmb, caloriasTotais) {
    document.getElementById("peso_na_tabela").innerHTML = `${peso.toFixed(2)} kg`;
    document.getElementById("altura_na_tabela").innerHTML = `${altura.toFixed(2)} cm`;
    document.getElementById("imc").innerHTML = `${imc.toFixed(2)}${classificacaoIMC}`;
    document.getElementById("consumo_de_agua").innerHTML = `Você deve tomar ${consumoDeAgua.toFixed(2)} litros de água por dia`;
    document.getElementById("tmb").innerHTML = `${tmb.toFixed(2)} calorias`;
    document.getElementById("calorias_totais").innerHTML = `${caloriasTotais.toFixed(2)} calorias`;

    // Mostrar a tabela
    const tabelaResultados = document.getElementById("resultsTable");
    tabelaResultados.style.display = "table";
    tabelaResultados.style.opacity = 0;
    setTimeout(() => tabelaResultados.style.opacity = 1, 0);
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("masculino").checked = false;
    document.getElementById("feminino").checked = false;
    document.getElementById("atividade").value = "1.2"; // valor padrão para 'Sedentário'
}
