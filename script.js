const karty = ["♠", "♣", "♦", "♥"];
const wartosci = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

let talia = [];
let random = 0;
function card(){

    for(let i = 0; i < karty.length; i++){
        for(let j = 0; j < wartosci.length; j++){
            talia.push(`${karty[i]}-${wartosci[j]}`)
        }
    }
    
    for(let i = 0; i < talia.length; i++){
         random = Math.floor(Math.random() * (i + 1));

         let temp = talia[i]
         talia[i] = talia[random]
         talia[random] = temp;
    }
console.log(talia)
console.log(talia.length)
}

card();