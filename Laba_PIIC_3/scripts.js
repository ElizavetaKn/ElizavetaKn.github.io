import { shirts } from './shirts.js';


function createTable(shirtsArray, containerId) {
    const container = document.getElementById(containerId);
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (let i = 0; i < shirtsArray.length; i++) {
        if (i % 3 === 0) {
            var row = document.createElement('tr');
        }

        const cell = document.createElement('td');
        const card = document.createElement('div');
        const name = document.createElement('h3');
        const img = document.createElement('img');
        const colors = document.createElement('span');
        const button1 = document.createElement('button');
        const button2 = document.createElement('button');


        name.textContent = shirtsArray[i].name ? shirtsArray[i].name : "Name not available";


        img.src = shirtsArray[i].colors?.white?.front ? shirtsArray[i].colors.white.front : "/Redem-Error.jpeg";
        img.style.width = "200px";
        img.style.height = "220px";


        colors.textContent = shirtsArray[i].colors ?
            "Available in " + Object.keys(shirtsArray[i].colors).length + " colors" :
            "Colors not available";

        button1.textContent = "Quick View";
        button2.textContent = "See Page";


        button2.addEventListener("click", function() {
            const shirt = shirtsArray[i];
            const shirtData = encodeURIComponent(JSON.stringify(shirt));
            window.location.href = `details.html?shirt=${shirtData}`;
        });



        cell.style.borderRadius = '10px';
        cell.style.border = '2px solid purple';
        cell.style.padding = '20px';

        const modal = document.getElementById("modal");

        button1.addEventListener("click", function() {
            const modalContent = document.getElementById('modal');
            modalContent.innerHTML = '';

            const cell = document.createElement('td');
            const card = document.createElement('div');
            const name = document.createElement('h3');
            const price = document.createElement('h3');
            const imgFront = document.createElement('img');
            const imgBack = document.createElement('img');
            const buttonClose = document.createElement('button');

            buttonClose.textContent = "Close";

            name.textContent = shirtsArray[i].name ? shirtsArray[i].name : "Name not available";

            price.textContent = shirtsArray[i].price ? shirtsArray[i].price : "Price not available";

            imgFront.src = shirtsArray[i].colors?.white?.front ? shirtsArray[i].colors.white.front : "/Redem-Error.jpeg";
            imgFront.style.width = "150px";
            imgFront.style.height = "170px";

            imgBack.src = shirtsArray[i].colors?.white?.back ? shirtsArray[i].colors.white.back : "/Redem-Error.jpeg";
            imgBack.style.width = "150px";
            imgBack.style.height = "170px";

            cell.style.borderRadius = '5px';
            cell.style.border = '2px solid purple';
            cell.style.padding = '20px';

            card.appendChild(imgFront);
            card.appendChild(imgBack);
            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(buttonClose);
            cell.appendChild(card);
            modalContent.appendChild(cell);

            modal.style.display = "block";

            buttonClose.addEventListener("click", function() {
                modal.style.display = "none";
            });
        });

        button2.className = 'buttonStyle';

        const buttonsHolder = document.createElement('div');
        buttonsHolder.style.paddingTop = "10px";
        buttonsHolder.appendChild(button1);
        buttonsHolder.appendChild(button2);

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(colors);
        card.appendChild(buttonsHolder);
        cell.appendChild(card);
        row.appendChild(cell);

        if (i % 3 === 2 || i === shirtsArray.length - 1) {
            tbody.appendChild(row);
        }
    }

    table.appendChild(tbody);
    container.appendChild(table);
}

createTable(shirts, 'tableId');
