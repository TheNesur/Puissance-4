console.clear();

function Menu(): number {
  console.log(
    "# Jeu Puissance 4 #\n\nChoisi la partie :\n\n1 => Joueur contre Joueur\n2 => Joueur contre IA"
  );
  let choix = Number(prompt("ton choix :"));
  while (choix !== 1 && choix !== 2)
    choix = Number(prompt("Erreur, Tu dois choisir entre 1 et 2"));
  return choix;
}

let tab = Array<Array<number>>();
tab = [
  [0, 0, 1],
  [0, 0, 2],
  [0, 1, 2],
];

function VerifEmplacement(
  TableaudeJeu: Array<Array<number>>,
  PosHoriontal: number
): boolean {
  let dispo = false;
  for (let i = 0; i < TableaudeJeu.length; i++) {
    if (TableaudeJeu[i][PosHoriontal] == 0) return true;
  }
  return false;
}

function AjoutPion(
  TableaudeJeu: Array<Array<number>>,
  PosHoriontal: number,
  Joueur: boolean
): Array<Array<number>> {


  for (let i = 0; i < TableaudeJeu.length; i++) {
    if (TableaudeJeu[i][PosHoriontal] == 0) TableaudeJeu[i][PosHoriontal]=
  }


  return TableaudeJeu;
}





console.log(VerifEmplacement(tab, 2));
