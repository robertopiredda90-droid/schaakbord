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

    for (let rij = 0; rij < 8; rij++) {
        for (let kolom = 0; kolom < 8; kolom++) {
            const vak = document.createElement('div');
            vak.className = `vak ${(rij + kolom) % 2 === 0 ? 'wit' : 'zwart'}`;

            const stuk = startStelling[rij][kolom];
            if (stuk !== null) {
                vak.textContent = stuk;
            }

            bord.appendChild(vak);
        }
    }
});
