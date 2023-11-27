function initializationMaps(x: number, y: number): Array<Array<number>> {
    let map = new Array<Array<number>>;

    for (let i = 0; i < x; i++) {
        map[i] = new Array<number>;
        for (let j = 0; j < y; j++) {
            map[i][j] = 0;
        }
    }
    // console.log(map);
    return map;
}


function displayMap(map: Array<Array<number>>): void {
    let ligne = "";

    // for (let i = 0; i < map.lengt)

    for (let i = 0; i < map.length; i++) {
        ligne = "| ";
        for (let y = 0; y < map[i].length; y ++) {
            switch(map[i][y]) {
                case 0 : ligne+= "- | "; break;
                case 1 : ligne += "0 | "; break; // joueur 1 = X
                case 2 : ligne += "X | "; break; //  
            }
        }
        console.log(ligne);
    }
}

function isVoid(posHorizontale:number, posVertical:number, map:Array<Array<number>>): boolean {
    // console.log("isVoid : ", posHorizontale, posVertical, map[posHorizontale][posVertical]);
    return map[posHorizontale][posVertical] == 0;
}

///////////////////
// PARTIE ARTHUR //
///////////////////

function addPion(posVertical:number, player:number, map:Array<Array<number>>): number {
    for (let posHorizontale = map.length-1; posHorizontale >= 0; posHorizontale--) {
        
        if (isVoid(posHorizontale, posVertical, map)) {
            map[posHorizontale][posVertical] = player;
            return posHorizontale;
        }
    }
    return -1;
}

///////////////////
///////////////////
///////////////////

// joueur 1 = X | joueur 2 = 0

function isAlign(posHorizontale: number, posVertical: number, map: Array<Array<number>>): boolean {
    let nbrAlign = 0;
    let player = map[posHorizontale][posVertical];
    if (player === 0) return false;

    // Vérification Verticale [-]
    for (let y = posVertical - 3; y <= posVertical + 3; y++) {
        if (y >= 0 && y < map[0].length && map[posHorizontale][y] === player) {
            nbrAlign++;
            if (nbrAlign === 4) {
                return true;
            }
        } else {
            nbrAlign = 0;
        }
    }
    nbrAlign = 0;
    // Vérification horizontale [|]
    for (let horizontale = posHorizontale-3; horizontale <= posHorizontale+3; horizontale++) {
        if (horizontale >= 0 && horizontale < map.length && map[horizontale][posVertical] === player) {
            nbrAlign++
            if (nbrAlign === 4) {
                return true;
            }
        } else {
            nbrAlign = 0;
        }
    }



    nbrAlign = 0;
    // Vérification diagonale [\]
    for (let horizontale = posHorizontale-3, vertical = posVertical-3; 
        vertical <= posVertical+3; 
        horizontale++, vertical++
        ) {
        // console.log("[x;y] = [",horizontale,";",vertical,"]");

        if ((horizontale >= 0 && horizontale < map.length) 
        && (vertical >= 0 && vertical < map[0].length) 
        && map[horizontale][vertical] === player) 
        {
            // console.log("Player : ",player, " is ", map[horizontale][vertical]);

            nbrAlign++;
            if (nbrAlign === 4) {
                return true;
            } 
        } else {
            nbrAlign = 0;
        }
    }

    
    // Vérification diagonale [/]
    for (let horizontale = posHorizontale-3, vertical = posVertical+3; 
        vertical >= posVertical-3; 
        horizontale++, vertical--
        ) {
        // console.log("[x;y] = [",horizontale,";",vertical,"]");

        if ((horizontale >= 0 && horizontale < map.length) 
        && (vertical >= 0 && vertical < map[0].length) 
        && map[horizontale][vertical] === player) 
        {
            // console.log("Player : ",player, " is ", map[horizontale][vertical]);

            nbrAlign++;
            if (nbrAlign === 4) {
                return true;
            } 
        } else {
            nbrAlign = 0;
        }
    }

    return false;
}

function isWin(player:number, posHorizontale: number, posVertical: number, map: Array<Array<number>>): boolean {
    return map[posHorizontale][posVertical] === player ?  isAlign(posHorizontale, posVertical, map) : false;
}

function menu(): void {
    console.log("/-----------------------------------\\");
    console.log(": 1- Joueur contre Joueur.          :");
    console.log(": 2- Joueur contre IA Aléatoire.    :");
    console.log(": 3- Joueur contre IA Récompenses.  :");
    console.log(": 4- Joueur contre IA Grille.       :");
    console.log("\\-----------------------------------/");
}

function question(): number {
    let choose = -1;
    do {
        menu();
        choose = Number(prompt("\n\nVotre choix : "));
        console.log(choose);
    } while (choose == -1)
    return choose;
}


function playerVSplayer(map: Array<Array<number>>): void {

    let player = 1;
    do {
        console.log(displayMap(map));
        console.log("Au joueur",player,"de jouer.");
        let posVerticalPion = Number(prompt("Ligne a jouer : "));
        let posHorizontalePion = addPion(posVerticalPion, player, map);
        console.log(posHorizontalePion, posVerticalPion);
        if (posHorizontalePion === -1) {
            console.log("Vous n'avez pas donner une position valide !");
            continue;
        }
        else if (isWin(player, posHorizontalePion, posVerticalPion, map)) {
            
            console.log(displayMap(map));
            console.log("\nJOUEUR", player, " A GAGNE !!\n");
            break;
        }
        if (player === 1) player = 2;
        else player = 1;

    } while(true)
}

function playerVsIARandom(map: Array<Array<number>>): void {

    let player = 1;
    let posVerticalPion = 0;
    let posHorizontalePion = 0;
    do {
        console.log(displayMap(map));
        console.log("Au joueur",player,"de jouer.");

        if (player == 1)
            posVerticalPion = Number(prompt("Ligne a jouer : "));
        else posVerticalPion = Math.floor(Math.random() * ((map[0].length-1) - 0 + 1)) + 0;


        posHorizontalePion = addPion(posVerticalPion, player, map);
        if (posHorizontalePion === -1) {
            console.log("Vous n'avez pas donner une position valide !");
            continue;
        }
        else if (isWin(player, posHorizontalePion, posVerticalPion, map)) {
            
            console.log(displayMap(map));
            console.log("\nJOUEUR", player, " A GAGNE !!\n");
            break;
        }
        if (player === 1) player = 2;
        else player = 1;

    } while(true)
}


function main(): void {
    console.log("INITIALISATION DU PUISSANCE 4...");
    let map = initializationMaps(Number(prompt("Hauteur du puissance 4 :\n")),Number(prompt("largeur du puissance 4 :\n")));

    switch (Number(question())) {
        case 1:
            console.log("Vous jouez premier jeu.");
            playerVSplayer(map);
            break;
        case 2:
            console.log("Vous jouez deuxième jeu.");
            playerVsIARandom(map);
            break;
        case 3:
            break;
        case 4:
            break;
        default:
            break;

    }

}

main();