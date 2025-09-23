class Karty{

    constructor(){
        this.talia = [];
        this.karta = 0;
        this.mojeKarty = "";
        this.krupierKarty = ""
        this.sumaMoje = 0;     
        this.sumaKrupier = 0;

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
        console.log("Liczba kart:", this.talia.length);
        return this.talia;
    }

  
    rozdajkarty(){
        for(let i = 0; i < 2; i++){
            let moja = this.talia.splice(0,1)[0];   
            let krupier = this.talia.splice(0,1)[0]; 

            this.mojeKarty += (i > 0 ? "," : "") + moja; 
            this.krupierKarty += (i > 0 ? "," : "") + krupier;
        } 
        return{
        mojeKarty: this.mojeKarty,
        krupierKarty: this.krupierKarty
        };
    }

    noweRozdanie(){
        this.mojeKarty = "";
        this.krupierKarty = "";
        for(let i = 0; i < 2; i++){
            let moja = this.talia.splice(0,1)[0];   
            let krupier = this.talia.splice(0,1)[0]; 

            this.mojeKarty += (i > 0 ? "," : "") + moja; 
            this.krupierKarty += (i > 0 ? "," : "") + krupier;
        } 
    }

    wyniki(){
        let m = this.mojeKarty.split(",");
        let k = this.krupierKarty.split(",");

        let sumaMoje = 0;
        let sumaKrupier = 0;

        for(let i = 0; i < m.length; i++){
            let val = m[i].split("-")[1];

            if(!isNaN(parseInt(val))) sumaMoje += parseInt(val);
            else if(["K", "Q", "J"].includes(val)) sumaMoje += 10;
            else if(val === "A") sumaMoje += 11;
        }

        for(let i = 0; i < k.length; i++){
            let val = k[i].split("-")[1];

            if(!isNaN(parseInt(val))) sumaKrupier += parseInt(val);
            else if(["K", "Q", "J"].includes(val)) sumaKrupier += 10;
            else if(val === "A") sumaKrupier += 11;
        }
            this.sumaMoje = sumaMoje;
            this.sumaKrupier = sumaKrupier;
        return{
        sumaMoje: this.sumaMoje,
        sumaKrupier: this.sumaKrupier
        };


    }

    generujHTMLKarty(kartyArray) {
        return kartyArray.map(karta => {
            return `<img src="image/${karta}.svg" alt="${karta}">`;
        }).join("");
    }

    MojeKartyHTML() {
        return this.generujHTMLKarty(this.mojeKarty.split(","));
        
    }

    KrupierKartyHTML() {
        return this.generujHTMLKarty(this.krupierKarty.split(","));
    }

    dodajKarte(){
        if(this.talia.length > 0){
        let karta = this.talia.splice(0, 1)[0];
        return karta; 
        }
    }

    
    Pass(){
        if(this.sumaMoje > this.sumaKrupier){
            return "wygrana"
        }else if(this.sumaMoje == this.sumaKrupier){
            return "remis"
        }else if(this.sumaMoje < this.sumaKrupier){
            return "przegrana"
           
        }
        
    }
    


}

    const karty = new Karty()
    function card(){
            karty.generujTalie();        
            karty.tasowanieKart(); 
            document.getElementById("karty").innerHTML = karty.wypiszTalie(); 
    }

    function rozdajkarty(){
        karty.rozdajkarty();
        document.getElementById("mojekarty").innerHTML =  karty.MojeKartyHTML();    
        document.getElementById("krupierkarty").innerHTML = karty.KrupierKartyHTML();  
         document.getElementById("karty").innerHTML = karty.wypiszTalie();
    }
    function wyniki(){
           const wynik = karty.wyniki();
            document.getElementById("krupierwynik").innerHTML = "wynik moj:" +  wynik.sumaMoje;
            document.getElementById("mojwynik").innerHTML = "krupierwynik  " +  wynik.sumaKrupier;
    }


    function dajKarte(){
      
    const karta = karty.dodajKarte(); 
    const kartaHTML = karty.generujHTMLKarty([karta]); 
    
    document.getElementById("mojekarty").innerHTML += kartaHTML;
    document.getElementById("karty").innerHTML = karty.wypiszTalie();
    wyniki();
        
    }

    function Reset(){
        karty.noweRozdanie();
        document.getElementById("mojekarty").innerHTML =  karty.getMojeKartyHTML();    
        document.getElementById("krupierkarty").innerHTML = karty.getKrupierKartyHTML();  
        document.getElementById("karty").innerHTML = karty.wypiszTalie();
        document.getElementById("wynik-gry").style.display = "none";
        wyniki(); 
    }

    function Pass(){
        document.getElementById("wynik-gry").style.display = "block";
        document.getElementById("wynik-gry").innerHTML = karty.Pass();
    }

    




window.onload = function() {
    card();
    rozdajkarty();
    wyniki();
};