let menubutton = document.getElementById('menu-button');
let phone = document.getElementById('section-1-phone');
let fechar = document.getElementById('fechar');
let vizualizar = document.getElementById('vizualizar');
let table = document.getElementById('table-body');
let submitemail = document.getElementById('submit-email');
let contato = document.getElementsByClassName('contato');
let footer = document.querySelector('.footer');

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

for (let j = 0; j < contato.length; j++) {
    contato[j].addEventListener('click', () => {
        if (phone.classList.contains('entra')) {
            phone.classList.remove('entra');
            phone.classList.add('sai');
            menubutton.style.opacity = '1';
        }
        footer.scrollIntoView({ behavior: 'smooth' });
    })
}

function formatarParaDolar(valor) {
    return valor.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

// Request Email
submitemail.addEventListener('click', () => {
    let email = document.getElementById('email');
    if (email.value != '') {
        email.value = ''
        fetch('https://email-anonimo.onrender.com/send/anonymous/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subject: 'Crypto Submit',
                email: 'silva.samueldev@gmail.com',
                message: `${email}`
            })
        })
        submitemail.innerHTML = 'Enviando...<i class="fa-solid fa-circle-notch fa-xs fa-spin" style="color: #22DE22; margin-left: 0.5em"></i>'

        setTimeout(() => {
            submitemail.innerHTML = 'Enviado <i class="fa-solid fa-check fa-xs" style="color: #22DE22;margin-left: 0.5em"></i>'
        }, 2000);

        setTimeout(() => {
            submitemail.innerHTML = 'Inscreva-se'
        }, 5000);
    }
})
// Request Cripto
fetch('https://api-crypto-q3f7.onrender.com/cotacao/coins')
    .then(response => {
        data = response.json();
        return data
    })
    .then(data => {
        filterData = data.data
        for (let i = 0; i < filterData.length; i++) {

            let cripto = document.createElement('tr');

            let id = filterData[i].id
            let name = filterData[i].name
            let symbol = filterData[i].symbol
            let cotacao = formatarParaDolar(filterData[i].quote.USD.price)
            let change24h = filterData[i].quote.USD.percent_change_24h
            let change7d = filterData[i].quote.USD.percent_change_7d
            let volume24h = filterData[i].quote.USD.volume_change_24h
            let capital = formatarParaDolar(filterData[i].quote.USD.market_cap)

            if(change24h < 0) {
                change24h = `<td class="some red"><i class="fa-solid fa-caret-down fa-xs" style="color: #ff0000; margin-right: 0.5em"></i> ${change24h} %</td>`
            }

            if(change24h > 0) {
                change24h = `<td class="some green"><i class="fa-solid fa-caret-up fa-xs" style="color: #22de22; margin-right: 0.5em"></i> ${change24h} %</td>`
            }

            if(change7d < 0) {
                change7d = `<td class="some red"><i class="fa-solid fa-caret-down fa-xs" style="color: #ff0000; margin-right: 0.5em"></i> ${change7d} %</td>`
            }

            if(change7d > 0) {
                change7d = `<td class="some green"><i class="fa-solid fa-caret-up fa-xs" style="color: #22de22; margin-right: 0.5em"></i> ${change7d} %</td>`
            }

            if(volume24h < 0) {
                volume24h = `<td class="some red"><i class="fa-solid fa-caret-down fa-xs" style="color: #ff0000; margin-right: 0.5em"></i> ${volume24h} %</td>`
            }

            if(volume24h > 0) {
                volume24h = `<td class="some green"><i class="fa-solid fa-caret-up fa-xs" style="color: #22de22; margin-right: 0.5em"></i> ${volume24h} %</td>`
            }

            cripto.innerHTML =
                `          
                    <td>${i + 1}</td>         
                    <td class="logo-name"><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png" alt="${name} class="cripto-logo" style="width: 2em; height: 2em; margin-right: 0.5em;"> <span style="font-family: 'Asap Regular">${name}</span> <span class="gray font-asap" style="margin-left: 0.5em">${symbol}</span></td>
                    <td>${cotacao}</td>
                    ${change24h}
                    ${change7d}
                    ${volume24h}
                    <td class="some">${capital}</td>
                `
            table.insertAdjacentElement('beforeend', cripto);
        }
    })

