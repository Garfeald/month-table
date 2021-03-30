
const apiKey = 'AIzaSyBMR3anl2HCpln7xyWn_cQTw1pywD_bmGo'

const key = '9skiQ5VMy5VDGO0sv9fHRe0sOwdcYskc79sE1WGK'

const validDate = (date) => {
    return new Date(date).toLocaleDateString();
}

const getTitleMonth = (date) => {
    const monthArray = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const newDate = new Date(date);
    const monthItem = newDate.getMonth(newDate);
    return monthArray[monthItem]
}

const getTitleYear = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear(newDate);
    
    return `${year}`.slice(-2)
}

// === renderTabsContent === //

const renderTabsContent = () => {
    fetch('numbers.json')
    .then((numbers) => {
        return numbers.json();
    })
    .then((data) => {
        console.log(data)
        const dataFilter = data.numbers.filter(item => item.is_visible === true)
        dataFilter.map((data, index) => {
            document.getElementById('tabs-triggers').innerHTML += 
            `
                <a 
                    href="#tab-${index + 1}" 
                    id="${index + 1}" 
                    class="tabs-triggers__item" 
                    onclick="changeTabs(${index + 1})"
                >
                    ${getTitleMonth(data.date_from)}
                    <sup class="sup">${getTitleYear(data.date_from)}</sup>
                </a>
            `
            document.querySelector('.tabs-triggers__item').click()
            document.querySelector('.block-search').innerHTML =
            `
                <input type="text" class="search" id="search${index + 1}" placeholder="search...">
            `
            Object.values(dataFilter[index].number_list).map((data) => {
                document.getElementById('tabs-content').innerHTML +=
                `
                    <tr id="content-${index + 1}" class="tabs-content__item">
                        <td class="number-td">${data.number}</td>
                        <td class="date-td">${validDate(data.cdate)}</td>
                    </tr>
                `
            })

            // === Search === //

            let input = document.querySelector(`#search${index + 1}`);

            input.oninput = function(e) {
                e.preventDefault();
                let value = this.value.trim();
                let list = document.querySelectorAll('.number-td');

                if (value) {
                    list.forEach(elem => {
                        if (elem.innerText.search(value) == -1) {
                            elem.parentNode.classList.add('hide');
                        }
                    });
                } else {
                    list.forEach(elem => {
                        elem.parentNode.classList.remove('hide');
                    });
                }
            };

            // === //
        })
    })
}

renderTabsContent();


// === changeTabs === //

const changeTabs = (id) => {
    document.querySelectorAll('.tabs-triggers__item').forEach(
        (child) => child.classList.remove('tabs-triggers__item--active')
    );

    document.querySelectorAll('.tabs-content__item').forEach(
        (child) => child.classList.remove('tabs-content__item--active')
    );

    document.querySelectorAll(`#content-${id}`).forEach(
        (child) => child.classList.toggle('tabs-content__item--active')
    );

    document.getElementById(id).classList.add('tabs-triggers__item--active')
    
}

/// === ///


const timeFunc = () => {
    
    const date = new Date();

    const hour = date.getUTCHours();

    const minutes = date.getUTCMinutes();


    if(hour >= 12 && minutes > 0 && hour < 18){
        console.log(`Сейчас ${hour}:${minutes} - UTC, это где-то между 12:00 и 18:00`)
    }
    else{
        console.log(`${hour}:${minutes}`)
    }
}


timeFunc();

