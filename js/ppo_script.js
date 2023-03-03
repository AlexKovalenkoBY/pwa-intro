//операции после загрузки страницы
document.addEventListener("DOMContentLoaded", () => {
    popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
    popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });
});

const obj = {
    cleanData: [],
    ownerFilter: [],
    dataForFiltering: [],
    analiticBP: '',
    valueOwnerBp: '',
    valueManagerPp: '',
    valueBpNum: '',
    valuePpName: '',
};


var popoverTriggerList;
var popoverList;

let i = 0;
let n = 0;
let ppCount = 0;

fetch("http://8-aris-bs:8083/form/findAllSortedBP")
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Что-то пошло не так');
    })
    .then((data) => {
        obj.cleanData = data.slice();

        //функция отрисовки таблицы
        function drawTable(data, value) {
            document.getElementsByClassName("count-bp-name")[0].innerHTML = 'Количество подроцессов:&nbsp';
            let bpTable = document.getElementsByClassName("all-bp-table")[0];

            if (data.length < 1) {
                bpTable.innerHTML = `<div class="no-matches-found">Совпадений не найдено</div>`;
            } else {

                if (value === false) {
                    bpTable.innerHTML = '';
                }

                n = (i + 30 > data.length) ? data.length : i + 30;
                for (i; i < n; i++) {
                    let div = document.createElement('div');
                    div.innerHTML = `<div id="${data[i].bpnum}" class="dropdown-bp" onclick="drawPP('${data[i].bpnum}', this)">
                                           <div class="select-bp">
                                               <span class="cell-num cell">
                                                 <span>${data[i].bpnum}</span>
                                                 <span class="iso" data-iso="${data[i].iso}"></span>
                                               </span>
                                               <div class="cell-name cell">
                                                   <span class="">${data[i].bpname}</span>
                                                   <span class="all-date"><span><small>Действует с: ${data[i].dateBegin}</small></span> ` +
                        (data[i].dateChange == null ? '' : "<span><small>Изменено: " + data[i].dateChange + "</small></span>") +
                        `<span><small>Действует по: ${data[i].dateEnd}</small></span></span>
                                               </div>
                                               <span class="cell-owner-bp cell">${data[i].bpownerName}</span>
                                               <span class="cell-analitic cell">${data[i].analitic}</span>
                                               <span class="cell-experts cell">${data[i].expertsShortStr}</span>
                                           </div>
                                           <ul id="${data[i].bpid}" class="dropdown-menu">
                                           </ul>
                                         </div>`;
                    bpTable.append(div);

                    if (obj.valuePpName !== '' && obj.valueManagerPp !== '') {
                        if (data[i].ppList[0]) {
                            let ul = document.getElementById(data[i].ppList[0].parentId);
                            let ppTableHeader = document.createElement('div');
                            ppTableHeader.classList.add('pp-table-header');
                            ppTableHeader.innerHTML = `<span class="pp-table-header__num cell-pp">№ ПП</span>
                                                       <span class="pp-table-header__name cell-pp">Наименование подпроцесса</span>
                                                       <span class="pp-table-header__manager cell-pp">Менеджер подпроцесса</span>
                                                       <span class="pp-table-header__analitic cell-pp">Процессный аналитик</span>
                                                       <span class="pp-table-header__phone cell-pp">Телефон</span>`;

                            ul.append(ppTableHeader);

                            for (let j = 0; j < data[i].ppList.length; j++) {
                                if (data[i].ppList[j].bpname.toLowerCase().includes(obj.valuePpName) &&
                                    data[i].ppList[j].managerName.toLowerCase().includes(obj.valueManagerPp)) {
                                    let strNew = show(data[i].ppList[j].bpname);
                                    let dropdownMenuPp = document.createElement('ul');
                                    dropdownMenuPp.classList.add('dropdown-menu__pp');
                                    dropdownMenuPp.innerHTML = `<li id="" class="cell-pp cell-pp-num">${data[i].ppList[j].bpnum}</li>
                                                           <li id="${data[i].ppList[j].bpid}" class="cell-pp cell-pp-name">${strNew}</li>
                                                           <li id="" class="cell-pp cell-pp-manager">${data[i].ppList[j].manager}</li>
                                                           <li id="" class="cell-pp cell-pp-analitic">${getFIO(data[i].ppList[j].analitic)}</li>
                                                           <li id="" class="cell-pp cell-pp-phone">${getPhone(data[i].ppList[j].analitic)}</li>`;
                                    ul.append(dropdownMenuPp);
                                    ppCount++;
                                }
                                document.getElementById(`${data[i].bpid}`).style.display = 'block';
                            }
                        }
                    } else if (obj.valuePpName !== '') {
                        if (data[i].ppList[0]) {
                            let ul = document.getElementById(data[i].ppList[0].parentId);
                            let ppTableHeader = document.createElement('div');
                            ppTableHeader.classList.add('pp-table-header');
                            ppTableHeader.innerHTML = `<span class="pp-table-header__num cell-pp">№ ПП</span>
                                                       <span class="pp-table-header__name cell-pp">Наименование подпроцесса</span>
                                                       <span class="pp-table-header__manager cell-pp">Менеджер подпроцесса</span>
                                                       <span class="pp-table-header__analitic cell-pp">Процессный аналитик</span>
                                                       <span class="pp-table-header__phone cell-pp">Телефон</span>`;

                            ul.append(ppTableHeader);

                            for (let j = 0; j < data[i].ppList.length; j++) {
                                if (data[i].ppList[j].bpname.toLowerCase().includes(obj.valuePpName)) {
                                    let strNew = show(data[i].ppList[j].bpname);
                                    let dropdownMenuPp = document.createElement('ul');
                                    dropdownMenuPp.classList.add('dropdown-menu__pp');
                                    dropdownMenuPp.innerHTML = `<li id="" class="cell-pp cell-pp-num">${data[i].ppList[j].bpnum}</li>
                                                           <li id="${data[i].ppList[j].bpid}" class="cell-pp cell-pp-name">${strNew}</li>
                                                           <li id="" class="cell-pp cell-pp-manager">${data[i].ppList[j].manager}</li>
                                                           <li id="" class="cell-pp cell-pp-analitic">${getFIO(data[i].ppList[j].analitic)}</li>
                                                           <li id="" class="cell-pp cell-pp-phone">${getPhone(data[i].ppList[j].analitic)}</li>`;

                                    ul.append(dropdownMenuPp);
                                    ppCount++;
                                }
                                document.getElementById(`${data[i].bpid}`).style.display = 'block';
                            }
                        }
                        //выводим количество ПП
                        document.getElementById("ppCount").innerHTML = ppCount;
                        document.getElementsByClassName("count-bp-name")[0].innerHTML = 'Отображено подроцессов:&nbsp';
                    }
                }
            }

            let iso = document.getElementsByClassName("iso");
            for (let i = 0; i < iso.length; i++) {
                if (iso[i].dataset.iso === "true") {
                    iso[i].innerHTML = `<img class="rounded mx-auto d-block iso" src="assets/searchBP&SP/images/iso.gif" alt="ISO">`;
                }
            }

            //выводим количество ПП
            document.getElementById("ppCount").innerHTML = ppCount;

            document.getElementsByClassName('spinner-border')[0].style.display = 'none';
        }

        //запускаем отрисовку и прохождение по фильтрам при открытии страницы
        onFilters();
        //функция прохождения по всем фильтрам
        function onFilters() {
            i = 0;
            obj.dataForFiltering = obj.cleanData.filter(function(e) { return e });
            if (obj.analiticBP !== '' && obj.analiticBP !== 'All') {
                obj.dataForFiltering = obj.dataForFiltering.filter((e) => obj.analiticBP.includes(e.analitic));
            }
            if (obj.valueOwnerBp !== '') {
                obj.dataForFiltering = obj.dataForFiltering.filter((e) => e.bpownerName.toLowerCase().includes(obj.valueOwnerBp));
            }
            if (obj.valueBpNum !== '') {
                obj.dataForFiltering = obj.dataForFiltering.filter((e) => e.bpnum.toLowerCase().indexOf(obj.valueBpNum) === 0);
            }
            ppCount = 0;
            //считаем количество ПП
            for (let i = 0; i < obj.dataForFiltering.length; i++) {
                ppCount += obj.dataForFiltering[i].ppList.length
            }
            if (obj.valueManagerPp !== '' && obj.valuePpName !== '') {
                ppCount = 0;
                obj.dataForFiltering = obj.dataForFiltering.filter(function(e) {
                    if (e.ppList[0]) {
                        for (let i = 0; i < e.ppList.length; i++) {
                            if (e.ppList[i].managerName.toLowerCase().includes(obj.valueManagerPp) && e.ppList[i].bpname.toLowerCase().includes(obj.valuePpName)) { return e; }
                        }
                    }
                });
                $("html, body").animate({ scrollTop: 0, }, 100);
                drawTable(obj.dataForFiltering, false);
                //выводим количество БП
                document.getElementById("bpCount").innerHTML = obj.dataForFiltering.length;
                return;
            }
            if (obj.valueManagerPp !== '') {
                ppCount = 0;
                obj.dataForFiltering = obj.dataForFiltering.filter(function(e) {
                    if (e.ppList[0]) {
                        for (let i = 0; i < e.ppList.length; i++) {
                            if (e.ppList[i].managerName.toLowerCase().includes(obj.valueManagerPp)) {
                                for (let i = 0; i < e.ppList.length; i++) {
                                    if (e.ppList[i].managerName.toLowerCase().includes(obj.valueManagerPp)) {
                                        ppCount++;
                                    }
                                }
                                return e;
                            }
                        }
                    }
                });

            }
            if (obj.valuePpName !== '') {
                ppCount = 0;
                obj.dataForFiltering = obj.dataForFiltering.filter(function(e) {
                    if (e.ppList[0]) {
                        for (let i = 0; i < e.ppList.length; i++) {
                            if (e.ppList[i].bpname.toLowerCase().includes(obj.valuePpName)) { return e; }
                        }
                    }
                });
            }

            //выводим количество БП
            document.getElementById("bpCount").innerHTML = obj.dataForFiltering.length;
            $("html, body").animate({ scrollTop: 0, }, 100);
            drawTable(obj.dataForFiltering, false);

        }

        //        $(".owner-bp").keyup(function (event) {
        //            if (event.keyCode == 13) {
        //                reset();
        //                onFilters();
        //            }
        //        });
        //        $(".manager-bp").keyup(function (event) {
        //            if (event.keyCode == 13) {
        //                reset();
        //                onFilters();
        //            }
        //        });
        //
        //        $(".bp-num").keyup(function (event) {
        //            if (event.keyCode == 13) {
        //                reset();
        //                onFilters();
        //            }
        //        });
        //        $(".pp-name").keyup(function (event) {
        //            if (event.keyCode == 13) {
        //                reset();
        //                onFilters();
        //            }
        //        });

        let selectAnalitic = document.getElementsByClassName('select-analytics-content')[0]
            //вешаем событие на выбор аналитиков
        selectAnalitic.onchange = function() {
            obj.analiticBP = this.value;
            onFilters();
        };

        //событие ввода в поисковую строку
        const startSearching = document.getElementsByClassName("start-searching")[0];
        startSearching.onclick = () => {
            reset();
            onFilters();
        };

        //событие сброса фильтров
        const startReset = document.getElementsByClassName("start-reset")[0];
        startReset.onclick = () => {

            document.getElementsByClassName("owner-bp")[0].value = '';
            obj.valueOwnerBp = '';

            document.getElementsByClassName("manager-bp")[0].value = '';
            obj.valueManagerPp = '';

            document.getElementsByClassName("bp-num")[0].value = '';
            obj.valueBpNum = '';

            document.getElementsByClassName("pp-name")[0].value = '';
            obj.valuePpName = '';
            onFilters();
        };

        //событие сброса фильтров на крестик
        const searchResetOwner = document.getElementsByClassName("close")[0];
        searchResetOwner.onclick = () => {
            document.getElementsByClassName("owner-bp")[0].value = '';
            obj.valueOwnerBp = '';
            //            onFilters();
        }
        const searchResetManager = document.getElementsByClassName("close")[1];
        searchResetManager.onclick = () => {
            document.getElementsByClassName("manager-bp")[0].value = '';
            obj.valueManagerPp = '';
            //            onFilters();
        }
        const searchResetBP = document.getElementsByClassName("close")[2];
        searchResetBP.onclick = () => {
            document.getElementsByClassName("bp-num")[0].value = '';
            obj.valueBpNum = '';
            //            onFilters();
        }
        const searchResetPP = document.getElementsByClassName("close")[3];
        searchResetPP.onclick = () => {
            document.getElementsByClassName("pp-name")[0].value = '';
            obj.valuePpName = '';
            //            onFilters();
        }

        ;
        (() => {
            window.addEventListener('scroll', throttle(checkPosition, 250))
            window.addEventListener('resize', throttle(checkPosition, 250))
        })()

        function checkPosition() {
            // Нам потребуется знать высоту документа и высоту экрана:
            const height = document.body.offsetHeight
            const screenHeight = window.innerHeight

            // Они могут отличаться: если на странице много контента,
            // высота документа будет больше высоты экрана (отсюда и скролл).

            // Записываем, сколько пикселей пользователь уже проскроллил:
            const scrolled = window.scrollY

            // Обозначим порог, по приближении к которому
            // будем вызывать какое-то действие.
            // В нашем случае — четверть экрана до конца страницы:
            const threshold = height - screenHeight / 4

            // Отслеживаем, где находится низ экрана относительно страницы:
            const position = scrolled + screenHeight

            if (position >= threshold) {
                // Если мы пересекли полосу-порог, вызываем нужное действие.
                if (obj.dataForFiltering.length > i) {
                    drawTable(obj.dataForFiltering, true);
                }

            }
        }

        function throttle(callee, timeout) {
            let timer = null

            return function perform(...args) {
                if (timer) return

                timer = setTimeout(() => {
                    callee(...args)

                    clearTimeout(timer)
                    timer = null
                }, timeout)
            }
        }
    })
    .catch((error) => {
        console.log(error)
    });

//функция отрисовки подпроцессов при клике по БП
function drawPP(value, el) {
    for (let i = 0; i < obj.dataForFiltering.length; i++) {
        if (value === obj.dataForFiltering[i].bpnum) {
            if (obj.dataForFiltering[i].ppList[0]) {
                let ul = document.getElementById(obj.dataForFiltering[i].ppList[0].parentId);
                ul.innerHTML = '';
                let ppTableHeader = document.createElement('div');
                ppTableHeader.classList.add('pp-table-header');
                ppTableHeader.innerHTML = `<span class="pp-table-header__num cell-pp">№ ПП</span>
                                           <span class="pp-table-header__name cell-pp">Наименование подпроцесса</span>
                                           <span class="pp-table-header__manager cell-pp">Менеджер подпроцесса</span>
                                           <span class="pp-table-header__analitic cell-pp">Процессный аналитик</span>
                                           <span class="pp-table-header__phone cell-pp">Телефон</span>`;

                ul.append(ppTableHeader);

                for (let j = 0; j < obj.dataForFiltering[i].ppList.length; j++) {
                    if (obj.valueManagerPp !== '' && obj.valuePpName !== '') {
                        if (obj.dataForFiltering[i].ppList[j].managerName.toLowerCase().includes(obj.valueManagerPp) &&
                            obj.dataForFiltering[i].ppList[j].bpname.toLowerCase().includes(obj.valuePpName)) {
                            let dropdownMenuPp = document.createElement('ul');
                            dropdownMenuPp.classList.add('dropdown-menu__pp');
                            dropdownMenuPp.innerHTML += `<li id="" class="cell-pp cell-pp-num">${obj.dataForFiltering[i].ppList[j].bpnum}</li>
                                                         <li id="" class="cell-pp cell-pp-name">${obj.dataForFiltering[i].ppList[j].bpname}</li>
                                                         <li id="" class="cell-pp cell-pp-manager">${obj.dataForFiltering[i].ppList[j].manager}</li>
                                                         <li id="" class="cell-pp cell-pp-analitic">${getFIO(obj.dataForFiltering[i].ppList[j].analitic)}</li>
                                                         <li id="" class="cell-pp cell-pp-phone">${getPhone(obj.dataForFiltering[i].ppList[j].analitic)}</li>`;

                            ul.append(dropdownMenuPp);
                        }
                    } else if (obj.valueManagerPp !== '') {
                        if (obj.dataForFiltering[i].ppList[j].managerName.toLowerCase().includes(obj.valueManagerPp)) {
                            let dropdownMenuPp = document.createElement('ul');
                            dropdownMenuPp.classList.add('dropdown-menu__pp');
                            dropdownMenuPp.innerHTML += `<li id="" class="cell-pp cell-pp-num">${obj.dataForFiltering[i].ppList[j].bpnum}</li>
                                                         <li id="" class="cell-pp cell-pp-name">${obj.dataForFiltering[i].ppList[j].bpname}</li>
                                                         <li id="" class="cell-pp cell-pp-manager">${obj.dataForFiltering[i].ppList[j].manager}</li>
                                                         <li id="" class="cell-pp cell-pp-analitic">${getFIO(obj.dataForFiltering[i].ppList[j].analitic)}</li>
                                                         <li id="" class="cell-pp cell-pp-phone">${getPhone(obj.dataForFiltering[i].ppList[j].analitic)}</li>`;

                            ul.append(dropdownMenuPp);
                        }
                    } else if (obj.valuePpName !== '') {
                        if (obj.dataForFiltering[i].ppList[j].bpname.toLowerCase().includes(obj.valuePpName)) {
                            let dropdownMenuPp = document.createElement('ul');
                            dropdownMenuPp.classList.add('dropdown-menu__pp');
                            dropdownMenuPp.innerHTML += `<li id="" class="cell-pp cell-pp-num">${obj.dataForFiltering[i].ppList[j].bpnum}</li>
                                                         <li id="" class="cell-pp cell-pp-name">${obj.dataForFiltering[i].ppList[j].bpname}</li>
                                                         <li id="" class="cell-pp cell-pp-manager">${obj.dataForFiltering[i].ppList[j].manager}</li>
                                                         <li id="" class="cell-pp cell-pp-analitic">${getFIO(obj.dataForFiltering[i].ppList[j].analitic)}</li>
                                                         <li id="" class="cell-pp cell-pp-phone">${getPhone(obj.dataForFiltering[i].ppList[j].analitic)}</li>`;

                            ul.append(dropdownMenuPp);
                        }
                    } else {
                        let dropdownMenuPp = document.createElement('ul');
                        dropdownMenuPp.classList.add('dropdown-menu__pp');
                        dropdownMenuPp.innerHTML += `<li id="" class="cell-pp cell-pp-num">${obj.dataForFiltering[i].ppList[j].bpnum}</li>
                                                     <li id="" class="cell-pp cell-pp-name">${obj.dataForFiltering[i].ppList[j].bpname}</li>
                                                     <li id="" class="cell-pp cell-pp-manager">${obj.dataForFiltering[i].ppList[j].manager}</li>
                                                     <li id="" class="cell-pp cell-pp-analitic">${getFIO(obj.dataForFiltering[i].ppList[j].analitic)}</li>
                                                     <li id="" class="cell-pp cell-pp-phone">${getPhone(obj.dataForFiltering[i].ppList[j].analitic)}</li>`;

                        ul.append(dropdownMenuPp);
                    }
                }
                /*Dropdown Menu*/
                $(el).attr('tabindex', 1).focus();
                $(el).toggleClass('active');
                $(el).find('.dropdown-menu').slideToggle(300);
            }

        }

    }
    /*Dropdown Menu*/
    $(el).focusout(function() {
        $(el).removeClass('active');
        $(el).find('.dropdown-menu').slideUp(300);
    });
}

function show(value) {
    let word = obj.valuePpName;
    let text = value;

    let a = text.toLowerCase().indexOf(word);
    let b = a + word.length;
    let arrText = text.split('');
    for (let i = a; i < b; i++) {
        arrText[i] = "<font color=red>" + arrText[i] + "</font>"
    }

    let newText = arrText.join('');
    return newText;
    //document.getElementById(value).innerHTML = newText;
}



function getPhone(analitic) {
    let phone;
    switch (analitic) {
        case 'Лякина Н.А.':
            phone = "309 29 19";
            break;
        case 'Пацкевич Д.А.':
            phone = "309 29 18";
            break;
        case 'Стасюк А.М.':
            phone = "309 36 84";
            break;
        case 'Клещук Н.В.':
            phone = "309 29 20";
            break;
        case 'Звонарев Д.А.':
            phone = "309 36 84";
            break;
        case 'Безверхова М.Ю.':
            phone = "309 35 43";
            break;
        case 'Сергель Н.Н.':
            phone = "309 36 81";
            break;
    }
    return phone;
}

function getFIO(analitic) {
    let fio;
    switch (analitic) {
        case 'Лякина Н.А.':
            fio = "Лякина Наталья Александровна";
            break;
        case 'Пацкевич Д.А.':
            fio = "Пацкевич Дмитрий Александрович";
            break;
        case 'Стасюк А.М.':
            fio = "Стасюк Александр Михайлович";
            break;
        case 'Клещук Н.В.':
            fio = "Клещук Наталия Васильевна";
            break;
        case 'Безверхова М.Ю.':
            fio = "Безверхова Марина Юрьевна";
            break;
        case 'Сергель Н.Н.':
            fio = "Сергель Наталья Николаевна";
            break;
        case 'Звонарев Д.А.':
            fio = "Звонарев Дмитрий Анатольевич";
            break;
    }
    return fio;
}

function reset() {
    const ownerBp = document.getElementsByClassName("owner-bp")[0];
    if (ownerBp.value.length > 1) { obj.valueOwnerBp = ownerBp.value.toLowerCase(); } else { obj.valueOwnerBp = '' };
    const managerBp = document.getElementsByClassName("manager-bp")[0];
    if (managerBp.value.length > 1) { obj.valueManagerPp = managerBp.value.toLowerCase(); } else { obj.valueManagerPp = '' };
    const ppName = document.getElementsByClassName("pp-name")[0];
    if (ppName.value.length > 2) { obj.valuePpName = ppName.value.toLowerCase(); } else { obj.valuePpName = '' };

    const bpNum = document.getElementsByClassName("bp-num")[0];
    obj.valueBpNum = bpNum.value.toLowerCase();
}

$(function() {
    // при нажатии на кнопку scrollup
    $(".scrollup").click(function() {
        // переместиться в верхнюю часть страницы
        $("html, body").animate({
                scrollTop: 0,
            },
            1000
        );
    });
});
$(function() {
    // при нажатии на кнопку scrolldown
    $(".scrolldown").click(function() {
        // переместиться в нижнюю часть страницы
        $("html, body").animate({
                scrollTop: $(document).height(),
            },
            1000
        );
    });
});

// при прокрутке окна (window)
$(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
        // то сделать кнопку scrollup видимой
        $(".scrollup").fadeIn();
        $(".scrolldown").fadeIn();
        $(".hideThead").fadeIn();
    }
    // иначе скрыть кнопку scrollup
    else {
        $(".scrollup").fadeOut();
        $(".scrolldown").fadeOut();
        $(".hideThead").fadeOut();
    }
});

//функция выгрузки отчета exl (плагин sheetjs)
function htmlTableToExcel(type) {
    const wb = XLSX.utils.book_new();
    let arr = [];
    let arrIndex = [];
    let count = 0;
    let countPp = 0;
    if (obj.valuePpName !== '') {
        obj.dataForFiltering.forEach((elem, index) => {
            arr.push([
                { v: "№ БП", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Наименование бизнес-процесса", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Владелец бизнес-процесса", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Процессный аналитик", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Эксперты БП", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
            ]);
            count++;
            arr.push([
                { v: elem.bpnum, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.bpname, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.bpownerName, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.analitic, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.expertsShortStr, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
            ]);
            count++;
            arr.push([
                { v: '№ ПП', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Наименование подпроцесса', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Менеджер подпроцесса', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Процессный аналитик', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Телефон', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
            ]);
            count++;
            countPp = 0;
            if (elem.ppList.length) {
                elem.ppList.forEach((e) => {
                    if (e.bpname.toLowerCase().includes(obj.valuePpName.toLowerCase())) {
                        arr.push([
                            { v: e.bpnum, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                            { v: e.bpname, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                            { v: e.manager, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                            { v: e.analitic, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                            { v: getPhone(e.analitic), t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                        ]);
                        countPp++;
                        count++;
                    }
                });
            }
            arrIndex.push(count - countPp);
        });
    } else {
        obj.dataForFiltering.forEach((elem, index) => {
            arr.push([
                { v: "№ БП", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Наименование бизнес-процесса", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Владелец бизнес-процесса", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Процессный аналитик", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Эксперты БП", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
            ]);
            count++;
            arr.push([
                { v: elem.bpnum, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.bpname, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.bpownerName, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.analitic, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.expertsShortStr, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
            ]);
            count++;
            arr.push([
                { v: '№ ПП', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Наименование подпроцесса', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Менеджер подпроцесса', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Процессный аналитик', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Телефон', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
            ]);
            count++;
            countPp = 0;
            if (elem.ppList.length) {
                elem.ppList.forEach((e) => {
                    arr.push([
                        { v: e.bpnum, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                        { v: e.bpname, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                        { v: e.manager, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                        { v: e.analitic, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                        { v: getPhone(e.analitic), t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                    ]);
                    countPp++;
                    count++;
                })
            }
            console.log(count);
            arrIndex.push(count - countPp);
        });
    }
    const ws = XLSX.utils.aoa_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, "sheet1");
    wb.Sheets['sheet1']['!cols'] = [];
    wb.Sheets['sheet1']['!cols'].push({ 'wch': 9, });
    wb.Sheets['sheet1']['!cols'].push({ 'wch': 60, });
    wb.Sheets['sheet1']['!cols'].push({ 'wch': 42, });
    wb.Sheets['sheet1']['!cols'].push({ 'wch': 25, });
    wb.Sheets['sheet1']['!cols'].push({ 'wch': 40, });


    //страницы для каждого БП
    if (obj.valuePpName !== '') {
        obj.dataForFiltering.forEach((elem, index) => {
            arr = [];
            arr.push([
                { v: "№ БП", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Наименование бизнес-процесса", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Владелец бизнес-процесса", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Процессный аналитик", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Эксперты БП", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "ᐊ НА ГЛАВНУЮ", t: "s", s: { font: { bold: true, sz: 16 }, fill: { fgColor: { rgb: "FFFFAA00" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } }, l: { Target: '#sheet1!A' + arrIndex[index] } }
            ]);
            arr.push([
                { v: elem.bpnum, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.bpname, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.bpownerName, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.analitic, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.expertsShortStr, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
            ]);
            arr.push([
                { v: '№ ПП', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Наименование подпроцесса', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Менеджер подпроцесса', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Процессный аналитик', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Телефон', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
            ]);
            if (elem.ppList.length) {
                elem.ppList.forEach((e) => {
                    if (e.bpname.toLowerCase().includes(obj.valuePpName.toLowerCase()))
                        arr.push([
                            { v: e.bpnum, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                            { v: e.bpname, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                            { v: e.manager, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                            { v: e.analitic, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                            { v: getPhone(e.analitic), t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                        ]);
                })
            }
            const ws = XLSX.utils.aoa_to_sheet(arr);
            XLSX.utils.book_append_sheet(wb, ws, elem.bpnum);
            wb.Sheets[elem.bpnum]['!cols'] = [];
            wb.Sheets[elem.bpnum]['!cols'].push({ 'wch': 9, });
            wb.Sheets[elem.bpnum]['!cols'].push({ 'wch': 60, });
            wb.Sheets[elem.bpnum]['!cols'].push({ 'wch': 42, });
            wb.Sheets[elem.bpnum]['!cols'].push({ 'wch': 25, });
            wb.Sheets[elem.bpnum]['!cols'].push({ 'wch': 40, });
            wb.Sheets[elem.bpnum]['!cols'].push({ 'wch': 22, });
        });
    } else {
        obj.dataForFiltering.forEach((elem, index) => {
            arr = [];
            arr.push([
                { v: "№ БП", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Наименование бизнес-процесса", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Владелец бизнес-процесса", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Процессный аналитик", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "Эксперты БП", t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "f6b786" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: "ᐊ НА ГЛАВНУЮ", t: "s", s: { font: { bold: true, sz: 16 }, fill: { fgColor: { rgb: "FFFFAA00" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } }, l: { Target: '#sheet1!A' + arrIndex[index] } }
            ]);
            arr.push([
                { v: elem.bpnum, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.bpname, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.bpownerName, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.analitic, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
                { v: elem.expertsShortStr, t: "s", s: { font: { sz: 12 }, fill: { fgColor: { rgb: "d4d4d4" } }, alignment: { wrapText: true, vertical: 'center' } }, l: { Target: `#${elem.bpnum}!A1` } },
            ]);
            arr.push([
                { v: '№ ПП', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Наименование подпроцесса', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Менеджер подпроцесса', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Процессный аналитик', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
                { v: 'Телефон', t: "s", s: { font: { bold: true, sz: 12 }, fill: { fgColor: { rgb: "fbe6d5" } }, alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } } },
            ]);
            if (elem.ppList.length) {
                elem.ppList.forEach((e) => {
                    arr.push([
                        { v: e.bpnum, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                        { v: e.bpname, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                        { v: e.manager, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                        { v: e.analitic, t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                        { v: getPhone(e.analitic), t: "s", s: { font: { sz: 12 }, alignment: { wrapText: true, vertical: 'center' } } },
                    ]);
                })
            }

            const ws = XLSX.utils.aoa_to_sheet(arr);
            XLSX.utils.book_append_sheet(wb, ws, elem.bpnum);
            wb.Sheets[elem.bpnum]['!cols'] = [];
            wb.Sheets[elem.bpnum]['!cols'].push({ 'wch': 9, });
            wb.Sheets[elem.bpnum]['!cols'].push({ 'wch': 60, });
            wb.Sheets[elem.bpnum]['!cols'].push({ 'wch': 42, });
            wb.Sheets[elem.bpnum]['!cols'].push({ 'wch': 25, });
            wb.Sheets[elem.bpnum]['!cols'].push({ 'wch': 40, });
            wb.Sheets[elem.bpnum]['!cols'].push({ 'wch': 22, });
        });
    }

    XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64', cellStyles: true });
    XLSX.writeFile(wb, 'Список бизнес-процессов и подпроцессов.' + type);
}