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
        question: 'Qual é o principal ingrediente da guacamole?',
        answers: [
            { text: 'Abacate', correct: true },
            { text: 'Tomate', correct: false },
            { text: 'Pepino', correct: false },
            { text: 'Pimenta', correct: false }
        ]
    },
    {
        question: 'Qual o nome do prato italiano feito de arroz e que leva caldo aos poucos?',
        answers: [
            { text: 'Lasanha', correct: false },
            { text: 'Risoto', correct: true },
            { text: 'Polenta', correct: false },
            { text: 'Nhoque', correct: false }
        ]
    },
    {
        question: 'Qual é o utensílio principal para preparar um suflê?',
        answers: [
            { text: 'Assadeira', correct: false },
            { text: 'Frigideira', correct: false },
            { text: 'Forma de torta', correct: false },
            { text: 'Ramequim', correct: true }
        ]
    },

    // Nível Médio
    {
        question: 'Qual o nome da técnica que envolve cozinhar alimentos lentamente em baixa temperatura?',
        answers: [
            { text: 'Brasear', correct: false },
            { text: 'Sauté', correct: false },
            { text: 'Sous-vide', correct: true },
            { text: 'Gratinar', correct: false }
        ]
    },
    {
        question: 'Qual é o nome da tradicional sopa francesa feita com mariscos e frutos do mar?',
        answers: [
            { text: 'Vichyssoise', correct: false },
            { text: 'Bouillabaisse', correct: true },
            { text: 'Minestrone', correct: false },
            { text: 'Ratatouille', correct: false }
        ]
    },
    {
        question: 'Qual tempero é tradicionalmente usado em pesto?',
        answers: [
            { text: 'Alecrim', correct: false },
            { text: 'Manjericão', correct: true },
            { text: 'Tomilho', correct: false },
            { text: 'Orégano', correct: false }
        ]
    },
    {
        question: 'O que significa "al dente" em relação ao cozimento de massas?',
        answers: [
            { text: 'Levemente crocante', correct: true },
            { text: 'Completamente macia', correct: false },
            { text: 'Grudenta', correct: false },
            { text: 'Cozida demais', correct: false }
        ]
    },

    // Nível Difícil
    {
        question: 'Qual é o nome do chef francês considerado o pai da gastronomia moderna?',
        answers: [
            { text: 'Paul Bocuse', correct: true },
            { text: 'Alain Ducasse', correct: false },
            { text: 'Auguste Escoffier', correct: false },
            { text: 'Gaston Lenôtre', correct: false }
        ]
    },
    {
        question: 'O que é foie gras?',
        answers: [
            { text: 'Fígado de pato ou ganso', correct: true },
            { text: 'Cérebro de vitela', correct: false },
            { text: 'Linguiça de sangue', correct: false },
            { text: 'Timo de cordeiro', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do prato japonês de fatias finas de peixe cru?',
        answers: [
            { text: 'Tempura', correct: false },
            { text: 'Udon', correct: false },
            { text: 'Sashimi', correct: true },
            { text: 'Ramen', correct: false }
        ]
    },
    {
        question: 'Que queijo é tradicionalmente usado no preparo da salada Caesar?',
        answers: [
            { text: 'Cheddar', correct: false },
            { text: 'Parmesão', correct: true },
            { text: 'Brie', correct: false },
            { text: 'Gorgonzola', correct: false }
        ]
    },

    // Nível Muito Difícil (Clássicos)
    {
        question: 'Qual chef criou a receita de "Pato à l’orange"?',
        answers: [
            { text: 'Marie-Antoine Carême', correct: true },
            { text: 'Paul Bocuse', correct: false },
            { text: 'Ferran Adrià', correct: false },
            { text: 'Joël Robuchon', correct: false }
        ]
    },
    {
        question: 'Em que país nasceu o tradicional "Strogonoff"?',
        answers: [
            { text: 'França', correct: false },
            { text: 'Rússia', correct: true },
            { text: 'Alemanha', correct: false },
            { text: 'Itália', correct: false }
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