class Game {
    constructor() {
        this.timeLeft = 30;
        this.score = 0;
        this.co2Level = 0;
        this.isPlaying = false;
        this.objects = document.querySelectorAll('.object');
        this.timerElement = document.getElementById('time');
        this.scoreElement = document.getElementById('score');
        this.co2LevelElement = document.getElementById('co2-level');
        this.gameOverElement = document.getElementById('game-over');
        this.finalScoreElement = document.getElementById('final-score');
        this.ecoMessageElement = document.getElementById('eco-message');
        this.restartButton = document.getElementById('restart-button');

        this.ecoMessages = [
            "Un écran allumé consomme en moyenne 100W par heure !",
            "Une console en veille consomme encore de l'énergie !",
            "Une multiprise avec interrupteur permet d'économiser jusqu'à 10% d'électricité !",
            "Une lampe LED consomme 80% d'énergie en moins qu'une ampoule classique !"
        ];

        this.init();
    }

    init() {
        this.objects.forEach(object => {
            object.addEventListener('click', () => this.handleObjectClick(object));
        });

        this.restartButton.addEventListener('click', () => this.restart());
        this.startGame();
    }

    startGame() {
        this.isPlaying = true;
        this.timeLeft = 30;
        this.score = 0;
        this.co2Level = 0;
        this.updateUI();

        // Démarrer le timer
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateUI();

            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);

        // Augmenter le CO2 toutes les 2 secondes
        this.co2Timer = setInterval(() => {
            this.co2Level += 5;
            this.updateUI();

            if (this.co2Level >= 100) {
                this.endGame();
            }
        }, 2000);

        // Changer aléatoirement l'état des objets
        this.objectTimer = setInterval(() => {
            this.objects.forEach(object => {
                if (Math.random() < 0.3) {
                    const status = object.querySelector('.status');
                    status.classList.toggle('on');
                    status.classList.toggle('off');
                }
            });
        }, 3000);
    }

    handleObjectClick(object) {
        if (!this.isPlaying) return;

        const status = object.querySelector('.status');
        if (status.classList.contains('on')) {
            status.classList.remove('on');
            status.classList.add('off');
            this.score += 10;
            this.co2Level = Math.max(0, this.co2Level - 15);
            this.updateUI();
        }
    }

    updateUI() {
        this.timerElement.textContent = this.timeLeft;
        this.scoreElement.textContent = this.score;
        this.co2LevelElement.style.width = `${this.co2Level}%`;
    }

    endGame() {
        this.isPlaying = false;
        clearInterval(this.timer);
        clearInterval(this.co2Timer);
        clearInterval(this.objectTimer);

        this.finalScoreElement.textContent = this.score;
        this.ecoMessageElement.textContent = this.ecoMessages[Math.floor(Math.random() * this.ecoMessages.length)];
        this.gameOverElement.classList.remove('hidden');
    }

    restart() {
        this.gameOverElement.classList.add('hidden');
        this.objects.forEach(object => {
            const status = object.querySelector('.status');
            status.classList.remove('on', 'off');
            status.classList.add(Math.random() < 0.5 ? 'on' : 'off');
        });
        this.startGame();
    }
}

// --- PAGE ACCUEIL & LANCEMENT DU JEU ---
document.addEventListener('DOMContentLoaded', () => {
    const homeScreen = document.getElementById('home-screen');
    const dashboard = document.getElementById('dashboard');
    const startBtn = document.getElementById('start-btn');

    startBtn.addEventListener('click', () => {
        homeScreen.classList.add('hidden');
        dashboard.classList.remove('hidden');
        startDashboardGame();
    });
});

// --- LOGIQUE DU DASHBOARD ---
const tipsList = [
    "Un serveur de jeu consomme autant qu'un foyer moyen.",
    "Recycler une console, c'est éviter 1kg de déchets électroniques !",
    "Le streaming de jeux vidéo explose la consommation d'énergie.",
    "Privilégie les jeux éco-conçus pour réduire ton impact.",
    "Éteindre ta console au lieu de la mettre en veille = 90% d'énergie économisée !",
    "Les data centers du gaming émettent des millions de tonnes de CO₂ chaque année.",
    "Acheter d'occasion, c'est aussi écolo !",
    "Un gamer français émet en moyenne 200kg de CO₂ par an juste en jouant."
];

const actionImages = {
    play: 'images/joueur.jpeg',
    stream: 'images/JDGRYFC3N5ALHE5R6YRPB2HQ4U.avif',
    'buy-console': 'images/console.jpg',
    recycle: 'images/recyclé.jpg',
    'eco-game': 'images/eco.jpg'
};

const actionExplanations = {
    play: "Jouer à un jeu vidéo consomme de l'énergie (électricité pour la console/PC, serveurs, etc.) et émet du CO₂. Limiter le temps de jeu ou choisir des jeux moins gourmands réduit ton impact !",
    stream: "Le streaming de jeux vidéo sollicite énormément les data centers et les réseaux, ce qui augmente la consommation d'énergie et les émissions de CO₂. Préfère le jeu local ou limite le streaming pour la planète !",
    'buy-console': "Acheter une nouvelle console ou un nouveau PC génère beaucoup de déchets électroniques et consomme des ressources rares. Recycler ou acheter d'occasion est plus écologique !",
    recycle: "Recycler tes anciens appareils permet d'éviter la pollution liée aux déchets électroniques et de récupérer des matériaux précieux. C'est un geste essentiel pour la planète !",
    'eco-game': "Certains jeux sont conçus pour être moins gourmands en ressources et plus respectueux de l'environnement. Les choisir, c'est réduire ton impact tout en t'amusant !"
};

function startDashboardGame() {
    // Valeurs initiales
    let co2 = 30; // sur 100
    let energy = 30;
    let waste = 10;
    let score = 0;
    let gameOver = false;

    // Elements
    const co2Bar = document.getElementById('co2-bar');
    const energyBar = document.getElementById('energy-bar');
    const wasteBar = document.getElementById('waste-bar');
    const planetMessage = document.getElementById('planet-message');
    const tipsBox = document.getElementById('tips-box');
    const actionBtns = document.querySelectorAll('.action-btn');
    const actionImage = document.getElementById('action-image');
    const actionExplanation = document.getElementById('action-explanation');
    const gameoverModal = document.getElementById('gameover-modal');
    const gameoverSummary = document.getElementById('gameover-summary');
    const replayBtn = document.getElementById('replay-btn');

    // Affichage initial
    updateGauges();
    showRandomTip();
    planetMessage.textContent = "Fais tes choix et surveille l'état de la planète !";
    actionImage.classList.add('hidden');
    actionExplanation.classList.add('hidden');

    // Actions
    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (gameOver) return;
            let action = btn.dataset.action;
            let msg = '';
            // Afficher l'image liée à l'action
            if (actionImages[action]) {
                actionImage.src = actionImages[action];
                actionImage.classList.remove('hidden');
            } else {
                actionImage.classList.add('hidden');
            }
            // Afficher le texte d'explication
            if (actionExplanations[action]) {
                actionExplanation.textContent = actionExplanations[action];
                actionExplanation.classList.remove('hidden');
            } else {
                actionExplanation.classList.add('hidden');
            }
            switch(action) {
                case 'play':
                    co2 += 8; energy += 10; score += 5;
                    msg = "Tu as joué... et la planète chauffe !";
                    break;
                case 'stream':
                    co2 += 12; energy += 15; score += 8;
                    msg = "Streamer, c'est fun, mais ça consomme un max !";
                    break;
                case 'buy-console':
                    co2 += 15; energy += 8; waste += 18; score += 12;
                    msg = "Nouvelle console, nouveaux déchets...";
                    break;
                case 'recycle':
                    waste = Math.max(0, waste - 20); co2 -= 3; score += 10;
                    msg = "Bravo ! Recycler, c'est sauver la planète.";
                    break;
                case 'eco-game':
                    co2 = Math.max(0, co2 - 10); energy -= 8; score += 15;
                    msg = "Un jeu éco-conçu, c'est moins d'impact !";
                    break;
            }
            showRandomTip();
            updateGauges();
            planetMessage.textContent = msg;
            checkGameOver();
        });
    });

    function updateGauges() {
        co2 = Math.max(0, Math.min(100, co2));
        energy = Math.max(0, Math.min(100, energy));
        waste = Math.max(0, Math.min(100, waste));
        co2Bar.style.width = co2 + '%';
        energyBar.style.width = energy + '%';
        wasteBar.style.width = waste + '%';
        co2Bar.style.background = getGaugeColor(co2);
        energyBar.style.background = getGaugeColor(energy);
        wasteBar.style.background = getGaugeColor(waste);
    }
    function getGaugeColor(val) {
        if (val < 40) return 'linear-gradient(90deg,#00ff88,#ffd60a)';
        if (val < 80) return 'linear-gradient(90deg,#ffd60a,#ff006e)';
        return 'linear-gradient(90deg,#ff006e,#222)';
    }
    function showRandomTip() {
        tipsBox.textContent = tipsList[Math.floor(Math.random() * tipsList.length)];
    }
    function checkGameOver() {
        if (co2 >= 100 || energy >= 100 || waste >= 100) {
            gameOver = true;
            planetMessage.textContent = "🌍 GAME OVER : La planète n'a pas supporté ta passion du gaming...";
            tipsBox.textContent = `Score final : ${score} | Essaie d'être un éco-gamer la prochaine fois !`;
            actionBtns.forEach(btn => btn.disabled = true);
            // Résumé des erreurs et conseils
            let errors = [];
            let conseils = [];
            if (co2 >= 100) {
                errors.push("Trop d'émissions de CO₂ !");
                conseils.push("Joue moins longtemps ou privilégie les jeux éco-conçus.");
                conseils.push("Éteins tes appareils au lieu de les laisser en veille.");
            }
            if (energy >= 100) {
                errors.push("Trop de consommation d'énergie !");
                conseils.push("Réduis le streaming et baisse la luminosité de tes écrans.");
                conseils.push("Privilégie les consoles et PC économes en énergie.");
            }
            if (waste >= 100) {
                errors.push("Trop de déchets électroniques !");
                conseils.push("Recycle tes anciens appareils.");
                conseils.push("Évite d'acheter trop de matériel neuf.");
            }
            // Affichage du résumé dans la pop-up
            gameoverSummary.innerHTML =
                `<b>Résumé de ta partie :</b><br>` +
                errors.map(e => `❌ ${e}`).join('<br>') +
                `<br><br><b>Conseils pour t'améliorer :</b><br>` +
                conseils.map(c => `💡 ${c}`).join('<br>') +
                `<br><br><b>Score final :</b> ${score}`;
            gameoverModal.classList.remove('hidden');
        }
    }
    // Bouton rejouer
    replayBtn.onclick = () => {
        gameoverModal.classList.add('hidden');
        // Reset la partie
        co2 = 30;
        energy = 30;
        waste = 10;
        score = 0;
        gameOver = false;
        updateGauges();
        showRandomTip();
        planetMessage.textContent = "Fais tes choix et surveille l'état de la planète !";
        actionBtns.forEach(btn => btn.disabled = false);
        actionImage.classList.add('hidden');
        actionExplanation.classList.add('hidden');
    };
}

// Types de points et icônes SVG associées
const pointTypes = [
    { type: 'console', icon: `<svg width='24' height='24' viewBox='0 0 24 24'><rect x='3' y='8' width='18' height='8' rx='2' fill='#00b4d8'/><circle cx='7' cy='12' r='1.5' fill='#fff'/><circle cx='17' cy='12' r='1.5' fill='#fff'/></svg>` },
    { type: 'pc', icon: `<svg width='24' height='24' viewBox='0 0 24 24'><rect x='4' y='6' width='16' height='10' rx='2' fill='#0096c7'/><rect x='8' y='18' width='8' height='2' rx='1' fill='#fff'/></svg>` },
    { type: 'lamp', icon: `<svg width='24' height='24' viewBox='0 0 24 24'><ellipse cx='12' cy='8' rx='6' ry='3' fill='#ffd60a'/><rect x='11' y='11' width='2' height='6' fill='#fff'/></svg>` },
    { type: 'multiplug', icon: `<svg width='24' height='24' viewBox='0 0 24 24'><rect x='7' y='8' width='10' height='8' rx='2' fill='#adb5bd'/><circle cx='10' cy='12' r='1' fill='#fff'/><circle cx='14' cy='12' r='1' fill='#fff'/></svg>` },
    { type: 'plante', icon: `<svg width='24' height='24' viewBox='0 0 24 24'><ellipse cx='12' cy='16' rx='4' ry='2' fill='#43aa8b'/><path d='M12 16 Q12 10 18 8' stroke='#43aa8b' stroke-width='2' fill='none'/><path d='M12 16 Q12 10 6 8' stroke='#43aa8b' stroke-width='2' fill='none'/></svg>` },
    { type: 'panneau', icon: `<svg width='24' height='24' viewBox='0 0 24 24'><rect x='6' y='10' width='12' height='6' rx='2' fill='#90e0ef'/><rect x='10' y='16' width='4' height='3' fill='#adb5bd'/></svg>` }
];

// Types électriques (ajoutent du temps)
const electricTypes = ['console', 'pc', 'lamp', 'multiplug'];
// Types écolos (retirent du temps)
const ecoTypes = ['plante', 'panneau'];

function startGame() {
    const gameArea = document.getElementById('game-area');
    const nbPoints = 15;
    const points = [];
    const timerDuration = 45; // 45 secondes
    let timeLeft = timerDuration;
    gameArea.innerHTML = '<div id="timer-bar" class="timer-bar"><span id="timer-label">45s</span></div>';

    // Répartition aléatoire des types de points (majorité électriques)
    let typesArray = [
        ...Array(3).fill('plante'),
        ...Array(2).fill('panneau'),
        ...Array(4).fill('console'),
        ...Array(3).fill('pc'),
        ...Array(2).fill('lamp'),
        ...Array(1).fill('multiplug')
    ];
    typesArray = typesArray.sort(() => Math.random() - 0.5);

    // Générer les points à des positions mieux réparties mais irrégulières
    for (let i = 0; i < nbPoints; i++) {
        const point = document.createElement('div');
        point.classList.add('point');
        // Répartition sur une grille irrégulière
        const row = Math.floor(i / 5);
        const col = i % 5;
        let top = 15 + row * (70 / 2.5) + (Math.random() - 0.5) * 10;
        let left = 5 + col * (90 / 4.5) + (Math.random() - 0.5) * 8;
        top = Math.max(8, Math.min(88, top));
        left = Math.max(2, Math.min(96, left));
        point.style.top = `${top}vh`;
        point.style.left = `${left}vw`;
        point.dataset.index = i;
        // Attribuer un type et une icône
        const type = typesArray[i % typesArray.length];
        point.dataset.type = type;
        const iconObj = pointTypes.find(pt => pt.type === type);
        point.innerHTML = iconObj ? iconObj.icon : '';
        gameArea.appendChild(point);
        points.push(point);
    }

    // Fonction pour allumer exactement 2 points non allumés
    function lightUpTwoPoints() {
        const offPoints = points.filter(p => !p.classList.contains('on'));
        if (offPoints.length === 0) return;
        let indices = [];
        while (indices.length < 2 && offPoints.length > 0) {
            let idx = Math.floor(Math.random() * offPoints.length);
            if (!indices.includes(idx)) indices.push(idx);
        }
        indices.forEach(idx => offPoints[idx].classList.add('on'));
    }

    // Premier allumage
    lightUpTwoPoints();
    // Puis toutes les 1.2 secondes, on allume jusqu'à 2 points si besoin
    const interval = setInterval(() => {
        const nbOn = points.filter(p => p.classList.contains('on')).length;
        if (nbOn < 2) lightUpTwoPoints();
    }, 1200);

    // Gestion du clic sur les points
    points.forEach(point => {
        point.addEventListener('click', () => {
            if (point.classList.contains('on')) {
                point.classList.remove('on');
                const type = point.dataset.type;
                if (electricTypes.includes(type)) {
                    timeLeft = Math.min(timeLeft + 4, timerDuration); // Ajoute 4s
                } else if (ecoTypes.includes(type)) {
                    timeLeft = Math.max(timeLeft - 4, 1); // Retire 4s
                }
                updateTimerBar();
            }
        });
    });

    // Timer visuel
    const timerLabel = document.getElementById('timer-label');
    const timerBar = document.getElementById('timer-bar');
    function updateTimerBar() {
        timerLabel.textContent = timeLeft + 's';
        const percent = timeLeft / timerDuration;
        timerBar.style.background = `linear-gradient(90deg, #00ff88 ${percent*100}%, #ff0000 ${(1-percent)*100}%)`;
    }
    updateTimerBar();
    const timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerBar();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(interval);
            // Fin de partie à gérer ici
        }
    }, 1000);
}

// Démarrer le jeu quand la page est chargée
window.addEventListener('load', () => {
    new Game();
}); 