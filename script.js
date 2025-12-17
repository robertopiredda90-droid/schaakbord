document.addEventListener('DOMContentLoaded', () => {
    const bord = document.getElementById('schaakbord');

    const startStelling = [
        ["♜","♞","♝","♛","♚","♝","♞","♜"],
        ["♟","♟","♟","♟","♟","♟","♟","♟"],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        ["♙","♙","♙","♙","♙","♙","♙","♙"],
        ["♖","♘","♗","♕","♔","♗","♘","♖"]
    ];

    // wie is aan zet? true = wit, false = zwart
    let witAanZet = true;

    // onthouden welk vak geselecteerd is
    let geselecteerdVak = null;

    // Bord opbouwen
    for (let rij = 0; rij < 8; rij++) {
        for (let kolom = 0; kolom < 8; kolom++) {
            const vak = document.createElement('div');
            vak.className = `vak ${(rij + kolom) % 2 === 0 ? 'wit' : 'zwart'}`;

            const stuk = startStelling[rij][kolom];
            if (stuk !== null) {
                vak.textContent = stuk;
            }

            vak.addEventListener('click', () => {
                const inhoud = vak.textContent;

                // Bepaal wie aan zet is
                const huidigeKleur = witAanZet ? 'wit' : 'zwart';

                // 1. Nog geen selectie: alleen stuk van speler aan zet mag gekozen worden
                if (!geselecteerdVak) {
                    if (inhoud && stukKleur(inhoud) === huidigeKleur) {
                        deselecteerAlleVakken();
                        vak.classList.add('geselecteerd');
                        geselecteerdVak = vak;
                    }
                    return;
                }

                // 2. Er is al een stuk geselecteerd

                // Op hetzelfde vak klikken = annuleren
                if (vak === geselecteerdVak) {
                    deselecteerAlleVakken();
                    geselecteerdVak = null;
                    return;
                }

                // Klik je op een eigen stuk: selectie wisselen
                if (inhoud && stukKleur(inhoud) === huidigeKleur) {
                    deselecteerAlleVakken();
                    vak.classList.add('geselecteerd');
                    geselecteerdVak = vak;
                    return;
                }

                // Voor nu: alleen verplaatsen naar een leeg vak of een vijandelijk stuk slaan
                if (!inhoud || stukKleur(inhoud) !== huidigeKleur) {
                    vak.textContent = geselecteerdVak.textContent;
                    geselecteerdVak.textContent = '';
                    deselecteerAlleVakken();
                    geselecteerdVak = null;

                    // beurt wisselen
                    witAanZet = !witAanZet;
                }
            });

            bord.appendChild(vak);
        }
    }

    function deselecteerAlleVakken() {
        document
            .querySelectorAll('.vak.geselecteerd')
            .forEach(v => v.classList.remove('geselecteerd'));
    }

    // Geeft 'wit' of 'zwart' terug op basis van het Unicode‑symbool
    function stukKleur(symbool) {
        const witteStukken = ['♔','♕','♖','♗','♘','♙'];
        return witteStukken.includes(symbool) ? 'wit' : 'zwart';
    }
});
