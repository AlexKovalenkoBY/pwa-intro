((D, B, log = (arg) => console.log(arg)) => {
    var res;
    // body.addEventListener("load", init, false);
    D.body.addEventListener('load', () => {
        console.info('loaded');
    }, false);
    window.onreadystatechange = async function() {
        // your code here
        res = await fetch('http://8-aris-bs:8083/form/findAll').then((response) => response.json());
        res = Object.entries(res).map(el => {
            return el[1]
        });
    }
    D.getElementById("myInput").addEventListener('onfocus', onFocus);
    D.getElementById("myInput").addEventListener('onclick', onFocus);
    async function onFocus() {
        elem = D.getElementById("taddrbody");
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
        let input = D.getElementById("myInput");
        input.value = "";
    }
    let input = D.getElementById("myInput");
    input.addEventListener("keyup", async() => {
        // async function myFunction() {

        let input, filter; //, ul, li, a, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase().replaceAll(' ', '');
        let filteredres = [];
        const delim = " ";
        table = document.getElementById("taddrbody");
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
                // res = res.concat(e.iNamePosts);
                return res.includes(filter) || e.iNamePosts.toString().toUpperCase().replaceAll(' ', '').includes(filter)
            })

            // ul = document.getElementById("myUL");

            for (i = 0; i < filteredres.length; i++) {

                tr = document.createElement("tr");

                td = document.createElement("td");
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