function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// let currentRound = 0;

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],
        }
    },
    methods: {
        startGame() {
            this.currentRound = 0;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.winner = null;
            this.logMessages = [];
        },
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addlogMessages('player', 'attack', attackValue);
        },
        attackPlayer() {
            const attackValue = getRandomValue(5, 15);
            this.playerHealth -= attackValue;
            this.addlogMessages('monster', 'attack', attackValue);
        },
        specialAttack() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 15);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addlogMessages('player', 'attack', attackValue);
        },
        healPlayer() {
            const heal = getRandomValue(8, 20);
            if (this.playerHealth + heal > 100) {
                this.playerHeal = 100;
            } else {
                this.playerHealth += heal;
            }
            this.attackPlayer();
            this.addlogMessages('player', 'heal', heal);
        },
        surrender() {
            this.winner = 'monster';
        },
        addlogMessages(who, what, value) {
            this.logMessages.unshift({
                who: who,
                what: what,
                value: value,
            });
        }
    },
    watch: {
        playerHealth(value) {
            if ( value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <=0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if ( value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <=0) {
                this.winner = 'player';
            }
        }
    },
    computed: 
    {
        monsterHealthDisplay() {
            if (this.monsterHealth < 0) {
                return { width: '0%' }
            }
            return { 
                width: this.monsterHealth + '%'
            }
        },
        playerHealthDisplay() {
            if (this.playerHealth < 0) {
                return { width: '0%' }
            }
            return { width: this.playerHealth + '%'}
        },
        useSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    }
});

app.mount('#game')