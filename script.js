class TaliaKart {

    constructor() {
        this.talia = [];
        this.karta = 0;
        this.mojeKarty = "";
        this.krupierKarty = "";
        this.sumaMoje = 0;
        this.sumaKrupier = 0;
        this.ukrytaKarta = 0;
        this.indeksUkrytejKarty = -1;
    }

    generujTalię(){
        const kolory = ["♠", "♣", "♦", "♥"];
        const wartości = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        for(let i = 0; i < kolory.length; i++){
            for (let j = 0; j < wartości.length; j++) {
                this.talia.push(`${kolory[i]}-${wartości[j]}`)
            }
        }
    }

    tasujKarty() {
        let losowa = 0;
        for(let i = 0; i < this.talia.length; i++){
            losowa = Math.floor(Math.random() * (i + 1));
            let temp = this.talia[i]
            this.talia[i] = this.talia[losowa]
            this.talia[losowa] = temp;
        }
    }

    wypiszTalię(){
        console.log("Liczba kart:", this.talia.length);
        return this.talia;
    }

    rozdajKarty(){
        for(let i = 0; i < 2; i++){
            let moja = this.talia.splice(0, 1)[0];
            let krupier = this.talia.splice(0, 1)[0];

            this.mojeKarty += (i > 0 ? "," : "") + moja;
            this.krupierKarty += (i > 0 ? "," : "") + krupier;
        }
        return {
            mojeKarty: this.mojeKarty,
            krupierKarty: this.krupierKarty
        };
    }

    noweRozdanie(){
        this.indeksUkrytejKarty = -1;
            this.mojeKarty = "";
            this.krupierKarty = "";
        for(let i = 0; i < 2; i++){
            let moja = this.talia.splice(0, 1)[0];
            let krupier = this.talia.splice(0, 1)[0];

            this.mojeKarty += (i > 0 ? "," : "") + moja;
            this.krupierKarty += (i > 0 ? "," : "") + krupier;
        }
    }

    obliczWynikGracza(){
        let m = this.mojeKarty.split(",");
        let sumaMoje = 0;
        for(let i = 0; i < m.length; i++) {
            let val = m[i].split("-")[1];
        if(!isNaN(parseInt(val))){
            sumaMoje += parseInt(val);
        }
        else if(["K", "Q", "J"].includes(val)){
            sumaMoje += 10;
        }
        else if(val === "A"){
            sumaMoje += 11;
        }
    }
        this.sumaMoje = sumaMoje;
        return sumaMoje;
    }

    obliczWynikKrupiera(pokazUkryta = false) {
        let k = this.krupierKarty.split(",");
        let sumaKrupier = 0;

    for (let i = 0; i < k.length; i++) {
        let val = k[i].split("-")[1];
        let wartosc = 0;

        if(!isNaN(parseInt(val))){
            wartosc = parseInt(val);
        }else if (["K", "Q", "J"].includes(val)){
            wartosc = 10;
        }else if (val === "A"){
            wartosc = 11;
        }

    
        if(i === 1 && !pokazUkryta){
            this.ukrytaKarta = wartosc;
            continue;
        }

        sumaKrupier += wartosc;
    }

    this.sumaKrupier = sumaKrupier;
    return this.sumaKrupier;
}



    generujHTMLKart(tablicaKart){
        if (this.sumaMoje < 21) {
            return tablicaKart.map(karta => {
                return `<img src="image/${karta}.svg" class="karty" alt="${karta}">`;
            }).join("");
        } else{
            return "";
        }
    }

    KrupierKartyHTMLPelne(){
        return this.krupierKarty.split(",").map(karta =>{
            return `<img src="image/${karta}.svg" class="karty" alt="${karta}">`;
        }).join("");
    }

    MojeKartyHTML(){
        return this.generujHTMLKart(this.mojeKarty.split(","));
    }

    KrupierKartyHTML(){
        let kolor;
        return this.krupierKarty.split(",").map((karta, index) =>{
            if (index === 1) {
                kolor = "karta-czarna";
            } else {
                kolor = "";
            }
            return `<img src="image/${karta}.svg" class="karty ${kolor}" alt="${karta}">`;
        }).join("");
    }

    dobierzKartyKrupiera(){
        this.sumaKrupier += this.ukrytaKarta;
     
        this.ukrytaKarta = 0;

        while(this.sumaKrupier < 17 && this.talia.length > 0){
            let karta = this.talia.splice(0, 1)[0];
            this.krupierKarty += (this.krupierKarty ? "," : "") + karta;
            this.obliczWynikKrupiera(true);
        }
       
        return this.krupierKarty.split(",");
    }

    dobierzKarte(){
        if(this.talia.length > 0 && this.sumaMoje < 21){
            let karta = this.talia.splice(0, 1)[0];
            this.mojeKarty += (this.mojeKarty ? "," : "") + karta;
            return karta;
        }
    }

    sprawdzWynik(){
        if(this.sumaMoje > this.sumaKrupier && this.sumaMoje <= 21){
            return "wygrana"
        }else if(this.sumaMoje == this.sumaKrupier){
            return "remis"
        }else if(this.sumaMoje < this.sumaKrupier){
            return "przegrana"
        }else if(this.sumaMoje > 21){
            return "przegrana"
        }
    }
}

const taliaKart = new TaliaKart();

function przygotujTalię(){
    taliaKart.generujTalię();
    taliaKart.tasujKarty();
    document.getElementById("karty").innerHTML = taliaKart.wypiszTalię();
}

function rozdaj(){
    taliaKart.rozdajKarty();
    document.getElementById("mojekarty").innerHTML = taliaKart.MojeKartyHTML();
    document.getElementById("krupierkarty").innerHTML = taliaKart.KrupierKartyHTML();
    document.getElementById("karty").innerHTML = taliaKart.wypiszTalię();
}

function pokazWynikKrupiera(pokazUkryta = false){
    document.getElementById("krupierwynik").innerHTML = "krupier wynik  " + taliaKart.obliczWynikKrupiera(pokazUkryta);
}

function pokazWynikGracza(){
    document.getElementById("mojwynik").innerHTML = "wynik moj:" + taliaKart.obliczWynikGracza();
}


function dobierzMojaKarte(){
    const karta = taliaKart.dobierzKarte();
    const kartaHTML = taliaKart.generujHTMLKart([karta]);
    document.getElementById("mojekarty").innerHTML += kartaHTML;
    document.getElementById("karty").innerHTML = taliaKart.wypiszTalię();
    pokazWynikGracza()
}

function resetuj(){
    taliaKart.noweRozdanie();
    taliaKart.sumaMoje = 0;
    taliaKart.sumaKrupier = 0;
    document.getElementById("mojekarty").innerHTML = taliaKart.MojeKartyHTML();
    document.getElementById("krupierkarty").innerHTML = taliaKart.KrupierKartyHTML();
    document.getElementById("karty").innerHTML = taliaKart.wypiszTalię();
    document.getElementById("wynik-gry").style.display = "none";
    pokazWynikKrupiera()
    pokazWynikGracza()
}

function pasuj(){
    taliaKart.dobierzKartyKrupiera();
    let krupierKartyImg = document.querySelectorAll("#krupierkarty .karty");

    if (krupierKartyImg.length > 1) {
        krupierKartyImg[1].classList.remove("karta-czarna");
    }
   
    document.getElementById("krupierkarty").innerHTML = taliaKart.KrupierKartyHTMLPelne();
    pokazWynikKrupiera(true);
    document.getElementById("krupierwynik").innerHTML = "krupier wynik  " + taliaKart.sumaKrupier;
    document.getElementById("wynik-gry").style.display = "block";
    document.getElementById("wynik-gry").innerHTML = taliaKart.sprawdzWynik();
    
}

window.onload = function (){
    przygotujTalię();
    rozdaj();
    pokazWynikKrupiera();
    pokazWynikGracza();
};
