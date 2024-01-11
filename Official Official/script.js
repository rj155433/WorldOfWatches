document.addEventListener('DOMContentLoaded', function () {
    // Artikel im Warenkorb
    let warenkorb = [];

    // Warenkorb-Container und Gesamtsumme-Element
    const warenkorbContainer = document.getElementById("cart");
    const gesamtsummeElement = document.getElementById("total");

    // Event Listener für alle "In den Warenkorb" Buttons
    const addToCartButtons = document.querySelectorAll('.product button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Produktinformationen aus dem geklickten Artikel
            const produktContainer = button.closest('.product');
            const produktName = produktContainer.querySelector('h2').textContent;
            const produktPreis = parseFloat(produktContainer.querySelector('p').textContent.replace('Preis: ', '').replace(' Euro', ''));

            // Prüfen, ob das Produkt bereits im Warenkorb ist
            const vorhandenesProdukt = warenkorb.find(produkt => produkt.name === produktName);

            if (vorhandenesProdukt) {
                vorhandenesProdukt.anzahl++;
            } else {
                warenkorb.push({ name: produktName, preis: produktPreis, anzahl: 1 });
            }

            // Warenkorb aktualisieren
            aktualisiereWarenkorb();
        });
    });

    // Warenkorb leeren
    const leerenButton = document.querySelector('.delete-btn');
    leerenButton.addEventListener('click', () => {
        warenkorb = [];
        aktualisiereWarenkorb();
    });

    // Warenkorb aktualisieren und Anzeigen
    function aktualisiereWarenkorb() {
        warenkorbContainer.innerHTML = '';
        let gesamtsumme = 0;

        warenkorb.forEach(produkt => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `${produkt.name} - ${produkt.preis.toFixed(3)} Euro x ${produkt.anzahl}`;
            warenkorbContainer.appendChild(li);

            gesamtsumme += produkt.preis * produkt.anzahl;
        });

        gesamtsummeElement.textContent = gesamtsumme.toFixed(3) + ' Euro';
    }
});
