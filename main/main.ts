function initializationMaps(x: number, y: number): Array<Array<number>> {
    let map = new Array<Array<number>>;

    for (let i = 0; i < x; i++) {
        map[i] = new Array<number>;
        for (let j = 0; j < y; j++) {
            map[i][j] = 0;
        }
    }

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
                case 1 : ligne += "X | "; break; // joueur 1 = X
                case 2 : ligne += "0 | "; break; //  
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

function addPion(posVertical:number, player:boolean, map:Array<Array<number>>): boolean {
    for (let posHorizontale = map.length-1; posHorizontale >= 0; posHorizontale--) {
        /*console.log("addPion : ",isVoid(posHorizontale, posVertical, map),
        "posHorizontale=",posHorizontale, 
        " | posVertical=",posVertical, 
        " | map=",map[posHorizontale][0]);
        */
        
        if (isVoid(posHorizontale, posVertical, map)) {
            map[posHorizontale][posVertical] = Number(player)+1;
            return true;
        }
    }
    return false;
}

///////////////////
///////////////////
///////////////////

// joueur 1 = X | joueur 2 = 0

function isAlign(posHorizontale: number, posVertical: number, map: Array<Array<number>>): boolean {
    let nbrAlign = 0;
    let player = map[posHorizontale][posVertical];
    if (player === 0) return false;

    // Vérification horizontale
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

    return false;
}


/*
function isAlign(posHorizontale:number, posVertical:number, map:Array<Array<number>>) : boolean {
    let nbrAlign = 0;
    let player = map[posHorizontale][posVertical];
    if (player == 0) return false;

    for (let y = posVertical-3; y <= posVertical+3; y++) {
        // console.log(i, posVertical, posHorizontale, map[posHorizontale][posVertical], player);

        if ((y < map[0].length && y >= 0) && map[posHorizontale][y] == player) {
            // console.log("isAlign : ", posHorizontale, posVertical, map[posHorizontale][posVertical], nbr , player);
            nbrAlign++;
            if (nbrAlign == 3) {
                return true;
            }
        } else {
            nbrAlign = 0;
        }
    }
    nbrAlign = 0;
    for (let x = posHorizontale-3, y = posVertical-3; x <= posVertical+3 && y <=posHorizontale+3; x++, y++) {
        if ((x < map[0].length && x >= 0) && (y < map.length && y >= 0)  && map[x][y] == player) {
            nbrAlign++;
            if (nbrAlign == 3) {
                return true;
            }
        } else {
            nbrAlign = 0;
        }
    }
    nbrAlign = 0;
    for (let x = posHorizontale+3, y = posVertical+3; x >= posVertical+3 && y >= posHorizontale+3; x--, y--) {
        if ((x < map[0].length && x >= 0) && (y < map.length && y >= 0)  && map[x][y] == player) {
            nbrAlign++;
            if (nbrAlign == 3) {
                return true;
            }
        } else {
            nbrAlign = 0;
        }
    }
    
    return false;
}*/


let maps = new Array<Array<number>>;
maps = initializationMaps(4,5);
console.log(displayMap(maps));
console.log(addPion(0,true,maps));
console.log(addPion(1,true,maps));
console.log(addPion(2,true,maps));
console.log(addPion(3,true,maps));

// console.log(addPion(0,true,maps));
// console.log(addPion(1,false,maps));
// console.log(addPion(1,true,maps));
// console.log(addPion(2,false,maps));
// console.log(addPion(2,false,maps));
// console.log(addPion(2,true,maps));
// console.log(addPion(3,false,maps));
// console.log(addPion(3,false,maps));
// console.log(addPion(3,false,maps));
// console.log(addPion(3,true,maps));
console.log("Gagné ? ", isAlign(3,3,maps));
console.log(displayMap(maps));
// console.log(maps);
