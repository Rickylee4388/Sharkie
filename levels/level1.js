
coin = 'coin';
life = 'life';
poison = 'poison';
let level1;
function initLevel() {

    level1 = new Level(
        newEnemie(),
        newBarrier(),
        newBackgroundObject(),
        newStatusBar(),
        newCoin(),
        newPoison()
    )
}

function newEnemie() {
    return [
        new Enemy(),
        new EnemyRed(),
        new Jellyfish(),
        new Enemy(),
        new EnemyRed(),
        new Enemy(),
        new Jellyfish(),
        new Endboss()
    ]
}

function newBarrier() {
    return [
        new Barrier()
    ]
}

function newBackgroundObject() {
    return [
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D2.png', -719),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/4.Fondo 2/D2.png', -719),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D2.png', -719),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D2.png', -719),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D1.png', 0),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/4.Fondo 2/D1.png', 0),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D1.png', 0),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D1.png', 0),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D2.png', 719),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/4.Fondo 2/D2.png', 719),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D2.png', 719),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D2.png', 719),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D1.png', 719 * 2),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/4.Fondo 2/D1.png', 719 * 2),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D1.png', 719 * 2),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D1.png', 719 * 2),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D2.png', 719 * 3),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/4.Fondo 2/D2.png', 719 * 3),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D2.png', 719 * 3),
        new BackgroundObject('Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D2.png', 719 * 3)
    ]
}

function newStatusBar() {
    return [
        new StatusBar(this.coin),
        new StatusBar(this.life),
        new StatusBar(this.poison)
    ]
}

function newCoin() {
    return [
        new Coin(550),
        new Coin(700),
        new Coin(1100),
        new Coin(1400),
        new Coin(1600)
    ]
}

function newPoison() {
    return [
        new Poison(400),
        new Poison(850),
        new Poison(950),
        new Poison(1100),
        new Poison(1300)
    ]
}