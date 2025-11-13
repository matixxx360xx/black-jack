/**
 * KLASA: TaliaKart
 * To jest serce gry. Przechowuje stan talii, ręki gracza i krupiera, 
 * oraz wszystkie metody do zarządzania kartami i obliczania wyników.
 */
class TaliaKart {

    constructor() {
        this.talia = []; // Moja cała talia, z której będziemy dobierać
        this.karta = 0; // Nieużywana, można usunąć, ale zostawiam
        this.mojeKarty = ""; // Karty, które mam ja (ciąg tekstowy, np. "♠-A,♥-10")
        this.krupierKarty = ""; // Karty, które ma krupier
        this.sumaMoje = 0; // Aktualna suma moich punktów
        this.sumaKrupier = 0; // Aktualna suma punktów krupiera
    }

    // Tworzę standardową talię 52 kart z kolorami i wartościami
    generujTalię(){
        const kolory = ["♠", "♣", "♦", "♥"];
        const wartości = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        for(let i = 0; i < kolory.length; i++){
            for (let j = 0; j < wartości.length; j++) {
                this.talia.push(`${kolory[i]}-${wartości[j]}`)
            }
        }
    }

    // Mieszam karty, żeby były losowe (używam algorytmu Fishera-Yatesa)
    tasujKarty() {
        let losowa = 0;
        for(let i = 0; i < this.talia.length; i++){
            losowa = Math.floor(Math.random() * (i + 1));
            let temp = this.talia[i]
            this.talia[i] = this.talia[losowa]
            this.talia[losowa] = temp;
        }
    }

    // Pokazuje mi w konsoli, ile kart zostało w talii (do kontroli)
    wypiszTalię(){
        console.log("Liczba kart:", this.talia.length);
        return this.talia;
    }

    // Rozdaję początkowe dwie karty dla siebie i dla krupiera
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

    // Przygotowuję nowy zestaw startowych kart, nie resetując talii, tylko ręce
    noweRozdanie(){
            this.mojeKarty = "";
            this.krupierKarty = "";
        for(let i = 0; i < 2; i++){
            let moja = this.talia.splice(0, 1)[0];
            let krupier = this.talia.splice(0, 1)[0];

            this.mojeKarty += (i > 0 ? "," : "") + moja;
            this.krupierKarty += (i > 0 ? "," : "") + krupier;
        }
    }

    // Obliczam sumę punktów moich kart, uwzględniając Asy (mogą być 11 lub 1)
    obliczWynikGracza(){
        let m = this.mojeKarty.split(",");
        let sumaMoje = 0;
        let liczbaAsow = 0; 

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
                liczbaAsow++; 
            }
        }
        
        // Jeśli przekroczyłem 21, obniżam Asy z 11 do 1, dopóki jest to możliwe
        while (sumaMoje > 21 && liczbaAsow > 0) {
            sumaMoje -= 10; 
            liczbaAsow -= 1;
        }
        
        this.sumaMoje = sumaMoje;
        return sumaMoje;
    }

    // Obliczam sumę punktów krupiera, uwzględniając Asy i opcję ukrycia drugiej karty
    obliczWynikKrupiera(pokazUkryta = false) {
        let k = this.krupierKarty.split(",");
        let sumaKrupier = 0;
        let liczbaAsow = 0; 
        
        for(let i = 0; i < k.length; i++){
            // Jeśli mam nie pokazywać ukrytej (pokazUkryta=false), pomijam drugą kartę krupiera
            if(i === 1 && !pokazUkryta){
                continue; 
            }

            let val = k[i].split("-")[1];
            let wartosc = 0;

            if(!isNaN(parseInt(val))){
                wartosc = parseInt(val);
            }else if (["K", "Q", "J"].includes(val)){
                wartosc = 10;
            }else if (val === "A"){
                wartosc = 11;
                liczbaAsow++; 
            }
            sumaKrupier += wartosc;
        }

        // Korekta Asów krupiera
        while (sumaKrupier > 21 && liczbaAsow > 0) {
            sumaKrupier -= 10;
            liczbaAsow -= 1;
        }

        this.sumaKrupier = sumaKrupier;
        return this.sumaKrupier;
    }


    // Generuje kod HTML dla obrazków kart
    generujHTMLKart(tablicaKart){
        return tablicaKart.map(karta => {
            return `<img src="image/${karta}.svg" class="karty" alt="${karta}">`;
        }).join("");
    }

    // Generuje HTML dla krupiera, ale pokazuje wszystkie karty (używane po 'Pasuj')
    KrupierKartyHTMLPelne(){
        return this.krupierKarty.split(",").map(karta =>{
            return `<img src="image/${karta}.svg" class="karty" alt="${karta}">`;
        }).join("");
    }

    // Generuje HTML dla moich kart
    MojeKartyHTML(){
        return this.generujHTMLKart(this.mojeKarty.split(","));
    }

    // Generuje HTML dla krupiera, ukrywając drugą kartę za klasą 'karta-czarna'
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

    // Logika krupiera: dobiera karty, dopóki suma jest mniejsza niż 17
    dobierzKartyKrupiera(){
        // Najpierw obliczam wynik, uwzględniając ukrytą kartę
        this.obliczWynikKrupiera(true); 

        while(this.sumaKrupier < 17 && this.talia.length > 0){
            let karta = this.talia.splice(0, 1)[0];
            this.krupierKarty += "," + karta; 
            this.obliczWynikKrupiera(true); // Ponowne obliczenie po dobraniu
        }
        
        return this.krupierKarty.split(",");
    }

    // Dobieram jedną kartę z talii
    dobierzKarte(){
        if(this.talia.length > 0 && this.sumaMoje < 21){
            let karta = this.talia.splice(0, 1)[0];
            this.mojeKarty += "," + karta; 
            return karta;
        }
    }

    // Określam, kto wygrał, sprawdzając warunki w ustalonej kolejności
    sprawdzWynik(){
        if (this.sumaMoje > 21){
            return "przegrana"; // Ja przegrałem
        }
        if (this.sumaKrupier > 21){
            return "wygrana"; // Krupier przegrał
        }
        if (this.sumaMoje > this.sumaKrupier) {
            return "wygrana"; // Mam więcej punktów
        } else if(this.sumaMoje < this.sumaKrupier){
            return "przegrana";
        } else{
            return "remis";
        }
    }
}


const taliaKart = new TaliaKart(); // Tworzę instancję gry

// --- FUNKCJE OBSŁUGI ZDARZEŃ (Globalne) ---

// Inicjuje grę: tworzy i tasuje talię
function przygotujTalię(){
    taliaKart.generujTalię();
    taliaKart.tasujKarty();
    document.getElementById("karty").innerHTML = taliaKart.wypiszTalię();
}

// Rozdaje karty na start i odświeża widok
function rozdaj(){
    taliaKart.rozdajKarty();
    document.getElementById("mojekarty").innerHTML = taliaKart.MojeKartyHTML();
    document.getElementById("krupierkarty").innerHTML = taliaKart.KrupierKartyHTML();
    document.getElementById("karty").innerHTML = taliaKart.wypiszTalię();
}

// Wyświetla wynik krupiera (domyślnie pokazuje tylko wynik z pierwszej karty)
function pokazWynikKrupiera(pokazUkryta = false){
    document.getElementById("krupierwynik").innerHTML = "wynik krupier: " + taliaKart.obliczWynikKrupiera(pokazUkryta);
}

// Wyświetla mój wynik
function pokazWynikGracza(){
    document.getElementById("mojwynik").innerHTML = "wynik moj: " + taliaKart.obliczWynikGracza();
}


// Akcja przycisku "Karta"
function dobierzMojaKarte(){
    const karta = taliaKart.dobierzKarte();
    if (karta) { 
        const kartaHTML = taliaKart.generujHTMLKart([karta]);
        document.getElementById("mojekarty").innerHTML += kartaHTML; // Dodaję nową kartę do widoku
        document.getElementById("karty").innerHTML = taliaKart.wypiszTalię();
        pokazWynikGracza()
        
        // Jeśli przekroczyłem 21, gra się kończy
        if (taliaKart.sumaMoje > 21) {
            pasuj(true); 
        }
    }
}

// Akcja przycisku "Reset"
function resetuj(){
    // Sprawdzam, czy talia jest na wyczerpaniu, i resetuję ją, jeśli tak
    if (taliaKart.talia.length < 10) {
        przygotujTalię();
    }
    taliaKart.noweRozdanie(); // Nowe karty
    taliaKart.sumaMoje = 0;
    taliaKart.sumaKrupier = 0;
    
    // Resetuję widok i ukrywam komunikat o wyniku
    document.getElementById("mojekarty").innerHTML = taliaKart.MojeKartyHTML();
    document.getElementById("krupierkarty").innerHTML = taliaKart.KrupierKartyHTML();
    document.getElementById("karty").innerHTML = taliaKart.wypiszTalię();
    document.getElementById("wynik-gry").style.display = "none";
    document.getElementById("wynik-gry").className = "result"; 
    
    // Włączam przyciski
    document.querySelector('.btn-card').disabled = false;
    document.querySelector('.btn-pass').disabled = false;
    
    pokazWynikKrupiera(false);
    pokazWynikGracza();
}

// Akcja przycisku "Pasuj" - moment kulminacyjny
function pasuj(graczBust = false){
    // 1. Działania krupiera: dobiera, jeśli nie mam BUSTA
    if (!graczBust) { 
        taliaKart.dobierzKartyKrupiera();
    }
    
    // 2. Odsłaniam wszystkie karty krupiera
    document.getElementById("krupierkarty").innerHTML = taliaKart.KrupierKartyHTMLPelne();
    
    // 3. Pokazuję ostateczny wynik krupiera
    document.getElementById("krupierwynik").innerHTML = "wynik krupier: " + taliaKart.sumaKrupier;
    
    // 4. Wyświetlam wynik gry (kto wygrał)
    const wynik = taliaKart.sprawdzWynik();
    const wynikDiv = document.getElementById("wynik-gry");
    
    wynikDiv.className = 'result'; 
    wynikDiv.classList.add(wynik); // Dodaje klasę dla odpowiedniego koloru (np. 'wygrana')
    wynikDiv.innerHTML = wynik; 
    wynikDiv.style.display = "block";
    
    // 5. Blokuję przyciski, bo gra się zakończyła
    document.querySelector('.btn-card').disabled = true;
    document.querySelector('.btn-pass').disabled = true;
}

// Funkcja uruchamiana po załadowaniu strony
window.onload = function (){
    przygotujTalię();
    rozdaj();
    pokazWynikKrupiera(false); // Pokazuję tylko wynik pierwszej karty krupiera
    pokazWynikGracza();
};