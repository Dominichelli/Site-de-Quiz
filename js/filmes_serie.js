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
        question: 'Em qual filme a personagem Hermione Granger aparece?',
        answers: [
            { text: 'Percy Jackson', correct: false },
            { text: 'O Senhor dos Anéis', correct: false },
            { text: 'Jogos Vorazes', correct: false },
            { text: 'Harry Potter', correct: true }
        ]
    },
    {
        question: 'Qual o nome do vilão no filme "Os Vingadores: Ultimato"?',
        answers: [
            { text: 'Ultron', correct: false },
            { text: 'Loki', correct: false },
            { text: 'Thanos', correct: true },
            { text: 'Hela', correct: false }
        ]
    },
    {
        question: 'Qual é a famosa frase de Buzz Lightyear em "Toy Story"?',
        answers: [
            { text: 'Eu sou o maior brinquedo do mundo!', correct: false },
            { text: 'Salvem Woody!', correct: false },
            { text: 'Ao infinito e além!', correct: true },
            { text: 'Para o alto e avante!', correct: false }
        ]
    },

    // Nível Médio
    {
        question: 'Quem foi o diretor do filme "Titanic"?',
        answers: [
            { text: 'Quentin Tarantino', correct: false },
            { text: 'Christopher Nolan', correct: false },
            { text: 'Steven Spielberg', correct: false },
            { text: 'James Cameron', correct: true }
        ]
    },
    {
        question: 'Em qual série Walter White é o protagonista?',
        answers: [
            { text: 'Stranger Things', correct: false },
            { text: 'The Sopranos', correct: false },
            { text: 'Mad Men', correct: false },
            { text: 'Breaking Bad', correct: true }
        ]
    },
    {
        question: 'Qual destes personagens é de "O Senhor dos Anéis"?',
        answers: [
            { text: 'Neo', correct: false },
            { text: 'Harry', correct: false },
            { text: 'Katniss', correct: false },
            { text: 'Frodo', correct: true }
        ]
    },
    {
        question: 'Qual é o nome do parque temático no filme "Jurassic Park"?',
        answers: [
            { text: 'Parque dos Dinossauros', correct: false },
            { text: 'Jurassic Island', correct: false },
            { text: 'Dino World', correct: false },
            { text: 'Isla Nublar', correct: true }
        ]
    },

    // Nível Difícil
    {
        question: 'Quem interpretou o Coringa no filme "O Cavaleiro das Trevas"?',
        answers: [
            { text: 'Jared Leto', correct: false },
            { text: 'Heath Ledger', correct: true },
            { text: 'Jack Nicholson', correct: false },
            { text: 'Joaquin Phoenix', correct: false }
        ]
    },
    {
        question: 'Qual o nome do robô de "Star Wars" que acompanha C-3PO?',
        answers: [
            { text: 'Wall-E', correct: false },
            { text: 'T-1000', correct: false },
            { text: 'BB-8', correct: false },
            { text: 'R2-D2', correct: true }
        ]
    },
    {
        question: 'Em qual filme Tom Hanks interpreta um advogado com HIV?',
        answers: [
            { text: 'O Resgate do Soldado Ryan', correct: false },
            { text: 'Filadélfia', correct: true },
            { text: 'O Terminal', correct: false },
            { text: 'Forrest Gump', correct: false }
        ]
    },
    {
        question: 'Qual é o nome do bar em "How I Met Your Mother"?',
        answers: [
            { text: 'Paddy’s Pub', correct: false },
            { text: 'Central Perk', correct: false },
            { text: 'Cheers', correct: false },
            { text: 'MacLaren’s Pub', correct: true }
        ]
    },

    // Nível Muito Difícil (Clássicos)
    {
        question: 'Qual é o nome do personagem de Humphrey Bogart em "Casablanca"?',
        answers: [
            { text: 'Rick Blaine', correct: true },
            { text: 'Charles Foster Kane', correct: false },
            { text: 'Sam Spade', correct: false },
            { text: 'George Bailey', correct: false }
        ]
    },
    {
        question: 'Qual diretor é responsável pelo filme "Cidadão Kane"?',
        answers: [
            { text: 'Francis Ford Coppola', correct: false },
            { text: 'Stanley Kubrick', correct: false },
            { text: 'Orson Welles', correct: true },
            { text: 'Alfred Hitchcock', correct: false }
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