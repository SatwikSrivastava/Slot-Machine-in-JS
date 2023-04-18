const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
}
 const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,

 }





const deposit = () =>{
    while(true){
    const Amount = prompt("Enter Balance Amount ");
    const BetAmount = parseFloat(Amount);

    if(isNaN(BetAmount)||BetAmount<=0){
        console.log("Invalid Balance Amount");
    }
    else{
        return BetAmount;
    }
}
};
const Linebet = () =>{
    while(true){
    const Line = prompt("Enter Number of lines to bet on between 1-3 ");
    const LineNumber = parseFloat(Line);

    if(isNaN(LineNumber)||LineNumber<=0||LineNumber > 3){
        console.log("Invalid Bet");
    }
    else{
        return LineNumber;
    }
}
};

const getbet = (Amount,LineNumber) => {
    while(true){
        const Bet = prompt("Enter Your Bet per line: ");
        const NumberBet = parseFloat(Bet);
    
        if(isNaN(NumberBet)||NumberBet<=0||NumberBet > Amount/LineNumber){
            console.log("Invalid Bet");
        }
        else{
            return NumberBet;
        }
    }

};

const spin = ()=>{
 const symbols = [];
 for(const [symbol, count] of Object.entries(SYMBOL_COUNT)){
    for(let i = 0;i< count;i++){
        symbols.push(symbol);
    }
}
 const reels = [];
 for(let i=0;i<COLS;i++){
    reels.push([]);
    const reelSymbols = [...symbols];
    for(let j =0;j<ROWS;j++){
        const randomIndex = Math.floor(Math.random() * reelSymbols.length); 
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex,1);

    }
 }
 return reels;
};
  const transpose = (reels)=>{
    const rows = [];
    for(let i = 0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};

const printRows = (rows)=>{
    for(const row of rows){
        let rowString = "";
        for(const [i,symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length -1){
                rowString += " | ";
            }
        }
        console.log(rowString);

    }
};

const getWinnings = (rows,bet,LineNumber) => {
    let winnings = 0;

    for(let row = 0; row< LineNumber; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet*SYMBOL_VALUES[symbols[0]]
        }
        return winnings;

    }



};
const game = ()=>{
let Amount = deposit();
while(true){
    console.log("You Have A Balance Of $" + Amount);
const LineNumber = Linebet();
const Bet = getbet(Amount,LineNumber);
Amount -= Bet * LineNumber;
const reels = spin();
const rows = transpose(reels);
printRows(rows);
const winnings = getWinnings(rows,Bet,LineNumber);
Amount += winnings;
console.log("You WON, $"+ winnings.toString());

if(Amount <= 0){
    console.log("You Ran Out Of Money!");
    break;
}
const playAgain = prompt("Do You Want To Play Again? (y/n)")
if(playAgain != "y") break;
}};
game();