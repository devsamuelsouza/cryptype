let menubutton = document.getElementById('menu-button');
let phone = document.getElementById('section-1-phone');
let fechar = document.getElementById('fechar');
let vizualizar = document.getElementById('vizualizar');
let table = document.getElementById('table-body');

vizualizar.addEventListener('click', () => {
    table.scrollIntoView({ behavior: 'smooth' });
})

menubutton.addEventListener('click', () => {
    phone.classList.remove('sai');
    phone.classList.add('entra');
    menubutton.style.opacity = '0';
})

fechar.addEventListener('click', () => {
    phone.classList.remove('entra');
    phone.classList.add('sai');
    menubutton.style.opacity = '1';
})


// Request
fetch('https://api-crypto-q3f7.onrender.com/cotacao/coins')
    .then(response => {
        data = response.json();
        return data
    })
    .then(data => {
        filterData = data.data
        for (let i = 0; i < filterData.length; i++) {
            let cripto = document.createElement('tr');

            let name = filterData[i].name
            let symbol = filterData[i].symbol
            let cotacao = filterData[i].quote.USD.price
            let change24h = filterData[i].quote.USD.percent_change_24h
            let change7d = filterData[i].quote.USD.percent_change_7d
            let volume24h = filterData[i].quote.USD.volume_change_24h
            let capital = filterData[i].quote.USD.market_cap

            cotacao = cotacao.toFixed(3);
            change24h = change24h.toFixed(3);
            change7d = change7d.toFixed(3);
            volume24h = volume24h.toFixed(3);
            capital = capital.toFixed(3);


            cripto.innerHTML =
                `          
                    <td>${i + 1}</td>         
                    <td class="logo-name"><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/${i + 1}.png" alt="${name} class="cripto-logo" style="width: 2em; height: 2em; margin-right: 0.5em;"> <span class="green">${name}</span> <span class="gray font-asap" style="margin-left: 0.5em">${symbol}</span></td>
                    <td>US$ ${cotacao}</td>
                    <td class="some">${change24h}%</td>
                    <td class="some">${change7d}%</td>
                    <td class="some">${volume24h}%</td>
                    <td class="some">US$ ${capital}</td>
                `
            table.insertAdjacentElement('beforeend', cripto);
        }
    })

