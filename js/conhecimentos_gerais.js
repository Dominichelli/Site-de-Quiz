const questao_container = document.getElementById('questao_container');
const button_resposta = document.getElementById('button_resposta');
const conteudo_quiz = document.getElementById('conteudo_quiz');
const botao_proximo = document.getElementById('botao_proximo'); 
const quiz_container = document.getElementById('quiz_container');
const resultado_container = document.getElementById('resultado_container');
const button_inicio = document.getElementById('button_inicio');

const questions = [

     // Nível Fácil
    {
        question: 'Qual a capital da França?',
        answers: [  
            { text: 'Paris', correct: true },
            { text: 'Londres', correct: false },
            { text: 'Berlim', correct: false },
            { text: 'Madri', correct: false }
        ]
    },
    {
        question: 'Qual é a maior floresta do mundo?',
        answers: [
            { text: 'Amazônia', correct: true },
            { text: 'Congo', correct: false },
            { text: 'Taiga', correct: false },
            { text: 'Savana', correct: false }
        ]
    },
       
        {
            question: 'Qual é o maior oceano do mundo?',
            answers: [
                { text: 'Oceano Atlântico', correct: false },
                { text: 'Oceano Índico', correct: false },
                { text: 'Oceano Pacífico', correct: true },
                { text: 'Oceano Ártico', correct: false }
            ]
        },
        // Nível Médio
        {
            question: 'Quem foi o primeiro presidente do Brasil?',
            answers: [
                { text: 'Marechal Deodoro da Fonseca', correct: true },
                { text: 'Getúlio Vargas', correct: false },
                { text: 'Juscelino Kubitschek', correct: false },
                { text: 'Dom Pedro II', correct: false }
            ]
        },
        {
            question: 'Qual é o menor país do mundo em área?',
            answers: [
                { text: 'Vaticano', correct: true },
                { text: 'Mônaco', correct: false },
                { text: 'Nauru', correct: false },
                { text: 'Malta', correct: false }
            ]
        },
        {
            question: 'Em que ano o homem pisou na Lua pela primeira vez?',
            answers: [
                { text: '1972', correct: false },
                { text: '1959', correct: false },
                { text: '1969', correct: true },
                { text: '1965', correct: false }
            ]
        },
        {
            question: 'Qual é o elemento químico mais abundante no universo?',
            answers: [
                { text: 'Hélio', correct: false },
                { text: 'Hidrogênio', correct: true },
                { text: 'Oxigênio', correct: false },
                { text: 'Carbono', correct: false }
            ]
        },
        // Nível Difícil
        {
            question: 'Quem escreveu a obra "Dom Quixote"?',
            answers: [
                { text: 'William Shakespeare', correct: false },
                { text: 'Victor Hugo', correct: false },
                { text: 'Eça de Queiroz', correct: false },
                { text: 'Miguel de Cervantes', correct: true }
            ]
        },
        {
            question: 'Qual foi o primeiro país a legalizar o casamento entre pessoas do mesmo sexo?',
            answers: [
                { text: 'Canadá', correct: false },
                { text: 'Espanha', correct: false },
                { text: 'Holanda', correct: true },
                { text: 'Suécia', correct: false }
            ]
        },
        {
            question: 'Qual a capital da Coreia do Norte?',
            answers: [
                { text: 'Seul', correct: false },
                { text: 'Pyongyang', correct: true },
                { text: 'Pequim', correct: false },
                { text: 'Tóquio', correct: false }
            ]
        },
        {
            question: 'Qual a montanha mais alta do mundo?',
            answers: [
                { text: 'K2', correct: false },
                { text: 'Everest', correct: true },
                { text: 'Kangchenjunga', correct: false },
                { text: 'Makalu', correct: false }
            ]
        },
        // Nível Muito Difícil
        {
            question: 'Quem foi o líder da Revolução Russa de 1917?',
            answers: [
                { text: 'Josef Stalin', correct: false },
                { text: 'Vladimir Lenin', correct: true },
                { text: 'Leon Trotsky', correct: false },
                { text: 'Karl Marx', correct: false }
            ]
        },
        {
            question: 'Em que ano ocorreu a independência dos Estados Unidos?',
            answers: [
                { text: '1783', correct: false },
                { text: '1776', correct: true },
                { text: '1804', correct: false },
                { text: '1812', correct: false }
            ]
        }
    ];
    


let currentQuestionIndex = 0;
let correto = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    correto=0;
    aleatorizar(questions);
    botao_proximo.style.display = 'none'; // Esconde o botão "Próxima Pergunta"
    showQuestion(questions[currentQuestionIndex]); // Mostra a primeira pergunta
}

function showQuestion(question) {
    questao_container.innerHTML = question.question; // Define o texto da pergunta
    button_resposta.innerHTML = ''; // Limpa os botões de resposta existentes

    question.answers.forEach(answer => { 
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        button_resposta.appendChild(button);
    });
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        console.log('Resposta correta!');
        correto++;
    } else {
        console.log('Resposta errada.');
    }

    Array.from(button_resposta.children).forEach(button => {
        button.disabled = true; // Desativa todos os botões de resposta
    });

    botao_proximo.style.display = 'block'; // Exibe o botão "Próxima Pergunta"
}

function finalizarQuiz() {
    conteudo_quiz.classList.add('hidden'); // Oculta o quiz
    resultado_container.classList.remove('hidden'); // Mostra o resultado
    button_inicio.classList.add('button'); //deixar visível

    const pontuacao  = Math.round((correto / questions.length) * 100);
    resultado_container.innerHTML = `Sua pontuação é: ${correto} de ${questions.length} <br>${pontuacao}%`;  
    button_inicio.style.display = 'block'; 
    
}

function aleatorizar(array) {
    return array.sort(() => Math.random() - 0.5);
}



botao_proximo.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        botao_proximo.style.display = 'none'; // Esconde o botão novamente
    } else {
        finalizarQuiz();
    }
});


button_inicio.addEventListener('click', () =>{
    window.location.href = 'index.html';
});

startQuiz();


