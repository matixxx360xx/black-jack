class Karty{

    constructor(){
        this.talia = [];
        this.karta = 0;
        this.mojeKarty = "";
        this.krupierKarty = ""

    }


    generujTalie(){
        const karty = ["♠", "♣", "♦", "♥"];
        const wartosci = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        for(let i = 0; i < karty.length; i++){
            for(let j = 0; j < wartosci.length; j++){
                this.talia.push(`${karty[i]}-${wartosci[j]}`)
        }
    }
    }

    tasowanieKart(){
        let random = 0;
    for(let i = 0; i < this.talia.length; i++){
         random = Math.floor(Math.random() * (i + 1));

         let temp = this.talia[i]
         this.talia[i] = this.talia[random]
         this.talia[random] = temp;
    }
    }
      wypiszTalie() {
        console.log(this.talia);
        console.log("Liczba kart:", this.talia.length);
        return this.talia;
    }

  
    rozdajkarty(){
        for(let i = 0; i < 2; i++){
            this.mojeKarty+= this.talia[i * 2]; 
            this.krupierKarty+= this.talia[i * 2 + 1]
        } 
        return{
        mojeKarty: this.mojeKarty,
        krupierKarty: this.krupierKarty
        };
    }
}

    const karty = new Karty()
    function card(){
            karty.generujTalie();        
            karty.tasowanieKart(); 
            document.getElementById("karty").innerHTML = karty.wypiszTalie(); 
    }

    function rozdajkarty(){
        const rozdaneKarty = karty.rozdajkarty();
        document.getElementById("mojekarty").innerHTML = "Moje Karty: " + rozdaneKarty.mojeKarty;
        document.getElementById("krupierkarty").innerHTML = "Karty Krupiera: " + rozdaneKarty.krupierKarty;
    }








window.onload = function() {
    card();
    rozdajkarty();
};