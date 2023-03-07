((D, B, log = (arg) => console.log(arg)) => {
    let res = {};
    D.addEventListener('DOMContentLoaded', async() => {
        // handle DOMContentLoaded event
        res = await fetch('http://8-aris-bs:8083/form/findAll').then((response) => response.json());
        res = Object.entries(res).map(el => {
            return el[1]
        });
    });
    B.addEventListener('load', async() => {
        console.info('loaded');

    }, false);
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
        input = document.getElementById("myInput");
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

                return res.includes(filter) || e.iNamePosts.toString().toUpperCase().replaceAll(' ', '').includes(filter)
            })

            for (i = 0; i < filteredres.length; i++) {
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                td.innerText = filteredres[i].iFamily + delim + filteredres[i].iFName + delim + filteredres[i].iPatronymic;
                tr.appendChild(td);
                td = document.createElement("td");
                td.innerText = filteredres[i].iIDDivTenChar;
                tr.appendChild(td);
                td = document.createElement("td");
                td.innerText = filteredres[i].iNamePosts;
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerText = filteredres[i].iPhone;
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerText = filteredres[i].iEmail;
                tr.appendChild(td);


                table.appendChild(tr);
            }
        }
        let count = D.getElementById("count");
        count.innerText = "Найдено: " + filteredres.length + " из " + res.length

    })

})(document, document.body)