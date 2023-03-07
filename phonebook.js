((D, B, log = (arg) => console.log(arg)) => {
    let res = {};
    B.addEventListener("keyup", async(e) => {
        let count = D.getElementById("count");
        let input, filter; //, ul, li, a, i, txtValue;
        input = D.getElementById("myInput");
        filter = input.value.toUpperCase().replaceAll(' ', '');
        if (e.key === "Escape") { // escape key maps to keycode `27`
            // <DO YOUR WORK HERE>
            await onFocus();
            count.innerText = "";
        }
        if (((e.key === "Enter") || (e.key === "Backspace")) && ((filter.length == 0))) {
            count.innerText = "";
        }
    });

    D.addEventListener('DOMContentLoaded', async() => {
        // handle DOMContentLoaded event
        res = await fetch('http://8-aris-bs:8083/form/findAll').then((response) => response.json());
        res = Object.entries(res).map(el => {
            // return el[1]
            const regionCode = el[1].login.split("_")[0];
            let regionText = regionCode;
            switch (regionCode) {
                case '1': // if (x === 'value1')
                    regionText = "Брест и Брестская область";
                    break

                case '8': // if (x === 'value1')
                    regionText = "Центральный аппарат или ЦСБО";
                    break

                case '2': // if (x === 'value1')
                    regionText = "Витебск и Витебская область";
                    break
                case '3': // if (x === 'value1')
                    regionText = "Гомель и Гомельская область";
                    break
                case '4': // if (x === 'value1')
                    regionText = "Гродно и Гродненская область";
                    break
                case '5': // if (x === 'value1')
                    regionText = "Минская область";
                    break
                case '6': // if (x === 'value1')
                    regionText = "Могилев и Могилевская область";
                    break
                case '7': // if (x === 'value1')
                    regionText = "РД по г. Минску";
                    break
                default:
                    regionText = "не определен"
                    break
            }
            return {
                iIDDivTenChar: el[1].iIDDivTenChar,
                iTabNumber: el[1].iTabNumber,
                iFamily: el[1].iFamily,
                iFName: el[1].iFName,
                iPatronymic: el[1].iPatronymic,
                iAdress: el[1].iAdress,
                iOffice: el[1].iOffice,
                iPhone: el[1].iPhone,
                iIntPhone: el[1].iIntPhone,
                iEmail: el[1].iEmail,
                iNamePosts: el[1].iNamePosts,
                iRegionHint: regionText
            }
        });
    });
    /*<!-- 
    iIDDivTenChar	"Сектор управления человеческими ресурсами"

    iTabNumber	"7852"
    iFamily	"Абаджян"
    iFName	"Людмила"
    iPatronymic	"Федоровна"
    iAdress	""
    iOffice	""
    iPhone	"(212)673941"
    iIntPhone	""
    iEmail	"l.abadzhyan@vitebsk.belapb.by"
    iNamePosts	"Начальник сектора" 
    */
    D.getElementById("myInput").addEventListener('onfocus', onFocus);
    D.getElementById("myInput").addEventListener('onclick', onFocus);
    async function onFocus() {
        let elem = D.getElementById("taddrbody");
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
        let input = D.getElementById("myInput");
        input.value = "";
    }
    let input = D.getElementById("myInput");
    input.addEventListener("keyup", async() => {

        let input, filter; //, ul, li, a, i, txtValue;
        input = D.getElementById("myInput");
        filter = input.value.toUpperCase().replaceAll(' ', '');
        let filteredres = [];
        const delim = " ";
        let table = D.getElementById("taddrbody");
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        if (filter.length > 2) {
            // filteredres = res.filter(e => (e.iFamily.toString().toUpperCase().includes(filter)) || (e.iFName.toString().toUpperCase().includes(filter)) ||
            //         (e.iNamePosts.toString().toUpperCase().includes(filter))
            //     )
            filteredres = res.filter(e => {
                let res = "";
                if (e.iFamily) res = res.concat(e.iFamily.toString().toUpperCase());
                if (e.iFName) res = res.concat(e.iFName.toString().toUpperCase());
                if (e.iPatronymic) res = res.concat(e.iPatronymic.toString().toUpperCase());
                return res.includes(filter) || e.iNamePosts.toString().toUpperCase().replaceAll(' ', '').includes(filter) || e.iIDDivTenChar.toString().toUpperCase().includes(filter)
            })

            for (i = 0; i < filteredres.length; i++) {
                let tr = D.createElement("tr");
                let td = D.createElement("td");
                td.setAttribute("title", filteredres[i].iRegionHint);
                td.innerText = filteredres[i].iFamily + delim + filteredres[i].iFName + delim + filteredres[i].iPatronymic;
                tr.appendChild(td);
                td = D.createElement("td");
                td.setAttribute("title", filteredres[i].iRegionHint);
                td.innerText = filteredres[i].iIDDivTenChar;
                tr.appendChild(td);
                td = D.createElement("td");
                td.setAttribute("title", filteredres[i].iRegionHint);
                td.innerText = filteredres[i].iNamePosts;
                tr.appendChild(td);

                td = D.createElement("td");
                td.setAttribute("title", filteredres[i].iRegionHint);
                if (filteredres[i].iPhone) {
                    td.innerText = "гор: " + filteredres[i].iPhone;
                } else {
                    td.innerText = "";
                }
                if (filteredres[i].iIntPhone) {

                    td.innerText = td.innerText + "\nвнутр: " + filteredres[i].iIntPhone;
                }

                tr.appendChild(td)
                td = D.createElement("td");
                td.setAttribute("title", filteredres[i].iRegionHint);
                let mail = document.createElement("a");
                mail.href = "mailto:" + filteredres[i].iEmail;
                // mail.setAttribute("class", "input-group-text");
                mail.innerText = filteredres[i].iEmail;
                td.appendChild(mail);
                tr.appendChild(td);
                table.appendChild(tr);
            }
        }
        let count = D.getElementById("count");
        count.innerText = "Найдено: " + filteredres.length + " из " + res.length

    })

})(document, document.body)