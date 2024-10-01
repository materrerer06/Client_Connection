const s = io('ws://');
const l = e => console.log(e);
const $ = e => document.querySelector(e);
const _ = e => document.createElement(e);

const aktualizujListeKlientow = dane => {
    const tabela = $('.klienci-tabela');
    tabela.innerHTML = '';

    dane.forEach(([id, czas]) => {
        const tr = _('tr'); 

        const tdId = _('td');
        tdId.textContent = id;

        const tdCzas = _('td');
        tdCzas.textContent = czas;

        tr.appendChild(tdId);
        tr.appendChild(tdCzas);

        tabela.appendChild(tr);
    });
};

setInterval(() => {
    s.emit('czas', new Date().toLocaleTimeString())
}, 1000);

s.on('akt', dane => {
    l(dane);
    aktualizujListeKlientow(dane); 
});
