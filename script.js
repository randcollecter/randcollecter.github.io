import ignoreWords from "./ignoreWords.js";
import key from "./getKey.js";
import data from "./dataWords.js";
import shopData from "./shopData.js";
function game(){
    function isMobileDevice() {
        var mobileRegex = /Mobi|Android|iPhone|iPad|iPod/i;
        return mobileRegex.test(navigator.userAgent);
    }

    if (!isMobileDevice()) {
        alert("GO Mobile Mode");
        return;
    }

    const element = document.getElementById("wordCol");
    const randomButtonElm = document.getElementById('randButton');
    const levelElm = document.querySelectorAll('.levelNumber');
    const wordCol = document.getElementById('wordCol');
    const wordCollectElm = document.getElementById('wordCollectElm');
    const wordCollectButton = document.getElementById("wordCollect");
    const notCompletedElm = document.getElementById('notCompleted');
    const allElm = document.getElementById('all');
    const wordInfo = document.getElementById('wordInfo');
    const closeElms = document.querySelectorAll('.close');
    const notCompletedButton = document.getElementById('notCompletedButton');
    const allButton = document.getElementById('allButton');
    const foundedWord = document.getElementById('foundedWord');
    const balanceScore = document.getElementById('balanceScore');
    const levelUpElm = document.getElementById('levelUp');
    const toolButton = document.getElementById('toolButton');
    const toolsElm = document.getElementById('tools');
    const wordChangeToolCount = document.getElementById("wordChangeToolCount");
    const wordChangeDiv = document.getElementById('wordChangeDiv');
    const encodeTool = document.getElementById('encodeTool');
    const encodeToolCount = document.getElementById('encodeToolCount');
    const encodeElm = document.getElementById('encode');
    const encodeElms = document.getElementById('encodeElms');
    const shopButton = document.getElementById('store');
    const shopElm = document.getElementById('shop');
    const shopElmContent = document.getElementById('contentShop');
    if(!randomButtonElm || !(levelElm.length) || !element || !wordCol || !wordCollectElm || !notCompletedElm || !allElm || !wordInfo || !(closeElms.length) || !notCompletedButton || !allButton || !foundedWord || !balanceScore || !levelUpElm || !toolButton || !toolsElm || !wordChangeToolCount || !wordChangeDiv || !encodeTool || !encodeToolCount || !encodeElms || !encodeElm || !shopButton || !shopElm || !shopElmContent) {
        alert("ERROR please refresh website!");
        return;
    }

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let dataLocalStorage = localStorage.getItem('randCollecter');
    dataLocalStorage = dataLocalStorage ? JSON.parse(CryptoJS.AES.decrypt(dataLocalStorage, key).toString(CryptoJS.enc.Utf8)) : null;
    
    
    const userData = dataLocalStorage || {balance: 0, level: 1, complatedElms: [], tools: {
            "changeWord" : {
                length: 0,
                active: false,
            },
            "encode" : {
                length: 0,
                active: false,
            }
        }};
    
    let inProcces = false;
    let length =  userData.level + 1;
    let text = "";
    let changedWordCollect = true;
    let sortedData = {};
    let first = true;

    function render(){
        element.innerHTML = '';
        let html = "";
       for(let i = 0; i < length; i++){
           html += `<div id="n_${i}" data-i="${i}"></div>`;
       }
        element.innerHTML = html;
    }
    render()
    function htmlStruct(el){
        return `<div class="card level${el.level}">
                        <div class="img" style="background-image: url('${el.image.toLowerCase()}')"></div>
                        <div><p>Find "${el.isSecret ? "?".repeat(el.word.length) : el.word.toUpperCase()}" word</p></div>
                        <div><p>+${el.level * 2} <span class="ticket icon"></span></p></div>
                    </div>`
    }
    function openWordCollect(){
        if(inProcces){
            return;
        }
        wordInfo.classList.remove('none');
        const arr = data[userData.level-1] || [];
        function notCompleted() {
            notCompletedElm.classList.remove('none');
            allElm.classList.add('none');

            notCompletedButton.classList.add('selected');
            allButton.classList.remove('selected');
            if(!changedWordCollect){
                return;
            }
            let html = "";
            arr.map((el) => {
                if(el.complated){
                    return;
                }
                html += htmlStruct(el);
            })
            notCompletedElm.innerHTML = html;
        }
        function showAll(){
            notCompletedElm.classList.add('none');
            allElm.classList.remove('none');

            notCompletedButton.classList.remove('selected');
            allButton.classList.add('selected');
            if(!changedWordCollect){
                return;
            }
            changedWordCollect = false;
            let htmlContent = '';

            for (let i = userData.level - 1; i >= 0; i--) {
                const arr = data[i] || [];
                arr.forEach((el) => {
                    htmlContent += `
            <div class="card level${el.level}" style="${el.complated ? 'filter: brightness(0.5);':''}">
                <div class="img" style="background-image: url('${el.image.toLowerCase()}');"></div>
                <div><p>Find "${el.isSecret ? "?".repeat(el.word.length):el.word.toUpperCase()}" word</p></div>
                <div><p>+${el.level * 2} <span class="ticket icon"></span></p></div>
            </div>`;
                });
            }
            allElm.innerHTML = htmlContent;
        }
        notCompleted();
        notCompletedButton.onclick = notCompleted;
        allButton.onclick = showAll;
    }
    function setBalanceScore(){
        balanceScore.innerText =  userData.balance;
    }
    setBalanceScore();
    function setLength(lvl){
        length = lvl + 1;
    }
    function checkLevelIsCompleted(){
        for (let i = 0; i < userData.level - 1; i++) {
            data[i].map((el) => {
                if(el.complated === false){
                    userData.level = i+1;
                    setLength(userData.level);
                    render();
                    sortingData();
                    return;
                }
            })
        }
    }
    function random(){
        const elms = document.querySelectorAll("#wordCol > div");
        text = randomGetElm(elms); //array
    }
    function save(){
        localStorage.setItem("randCollecter", CryptoJS.AES.encrypt(JSON.stringify(userData), key));
    }
    function randomGetElm(elms, index){
        if(inProcces){
            return;
        }
        first = false;
        inProcces = true
        const elementsDisable = [randomButtonElm, wordCollectButton, shopButton, toolButton,toolsElm];
        elementsDisable.forEach((el) => el.classList.add("disableButton"));

        randomButtonElm.classList.remove("activeButton");
        const genText = generateText(elms.length, index);
        const randomText = genText[0];//test
        let completed =  0;
        function rec(){
            const length = elms.length;
            if(completed >= length){
                /* end random generation */
                inProcces = false;
                elementsDisable.forEach((el) => el.classList.remove("disableButton"));

                randomButtonElm.classList.add("activeButton");
                const orText = genText[1];
                const elem = sortedData[orText[0].toLowerCase()];

                if(elem){
                    const txt = orText.toLowerCase();
                    for(let i = 0; i < elem.length; i++){
                        const elm = elem[i];
                        if(elm.word === txt){
                            foundedWord.classList.remove('none');
                            elm.complated = true;
                            userData.complatedElms.push(elm);
                            elem.splice(i, 1);
                            changedWordCollect = true;
                             userData.balance += elm.level * 2;
                            setBalanceScore();
                            if(elem.length === 0){
                                levelUp();
                            }
                            save();
                            break;
                        }
                    }
                }
                return;
            }
            for(let j = 0; j < alphabet.length; j++){
                (function(jKey){
                    setTimeout(() => {
                        for(let k = completed; k < length; k++){
                            elms[k].innerText = alphabet[j];
                        }
                        if(jKey === alphabet.length - 1){
                            elms[completed++].innerText = randomText[completed-1] || '';
                            rec();
                        }
                    }, 50 * jKey)
                })(j);
            }
        }
        rec();
        return randomText;
    } //animation
    function generateText(length, index){ //text generation
        if(index === undefined){
            text = "";
        }
        let newText = "";
        for(let i = 0; i < length; i++){
            newText += randomWord();
        }

        if(index !== undefined){
            text = [...(text||'')]
            text.splice(index, length, newText);
            text = text.join("")
        }
        else{
            text = newText;
        }
        console.log(text)
        // text = "ARM"
        // newText = "ARM"
        if(ignoreWords.includes(text.toLowerCase())){
            return generateText(length, index);
        }

        return [newText, text];
    }
    function sortingData(){
        const origData = data[userData.level-1];
        sortedData = {};
        for(let i = 0; i < origData.length; i++){
            const elm = origData[i];
            if(elm.complated){
                continue;
            }
            const first = elm.word[0].toLowerCase();
            if(sortedData[first] === undefined){
                sortedData[first] = [elm];
                continue;
            }
            sortedData[first].push(elm);
        }
    }
    sortingData();
    function randomWord(){
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    function renderLevel(){
        // checkLevelIsCompleted(); //open this code after test
        levelElm.forEach((_) => _.innerText = userData.level);
    }
    function levelUp(){
        userData.level++;
        let nextLvlCompleted = true;
        const d = data[userData.level-1];
        for(let i = 0; i < d.length; i++){
            if(d[i].complated === false){
                nextLvlCompleted = false;
                break;
            }
        }
        if(nextLvlCompleted){
            return levelUp();
        }
        renderLevel();
        changedWordCollect = true;
        setLength(userData.level);
        levelUpElm.classList.remove('none');
        render();
        sortingData();
    }
    function toggleTools(){
        if(first){
            alert("Click at least 1 RandButton")
            return;
        }// open this code after test
        if(inProcces){
            return;
        }
        toolsElm.classList.toggle('none');
        wordChangeToolCount.innerText =  userData.tools.changeWord.length;
        encodeToolCount.innerText =  userData.tools.encode.length;
    }
    function closeTools(){
        toolsElm.classList.add('none');
    }
    renderLevel();
    wordCol.querySelectorAll("div").forEach((el, i) => {
        el.addEventListener('click', () => {
            if(first ||  userData.tools.changeWord.active === false ||  userData.tools.changeWord.length <= 0){
                return;
            }
             userData.tools.changeWord.active = false;
             userData.tools.changeWord.length--;
            save();
            randomGetElm([el], i);
        });
    })//test
    randomButtonElm.addEventListener('click', random);
    closeElms.forEach((el) => {
        el.addEventListener('click', () => {
            if(el.id === "closeFoundedWord"){
                foundedWord.classList.add('none');
            }
            else if(el.id === "closeLevelUp") {
                levelUpElm.classList.add('none');
            }
            else if(el.id === "closeEncode"){
                encodeElm.classList.add('none');
            }
            else if(el.id === "closeShop"){
                shopElm.classList.add('none');
            }
            else{
                wordInfo.classList.add('none');
            }


        })
    })
    let shopIsRendered = false;
    function openShop(){
        if(inProcces){
            return;
        }

        shopElm.classList.remove('none');
        if(!shopIsRendered){
            let html = "";
            for(let i = 0; i < shopData.length; i++) {
                const elm = shopData[i];
                html += `<div class="shopElm ${elm.type}">
                    <div class="center topAbs itmCent upper">
                        <p>for you</p>
                    </div>
                    <div class="flex around">
                        ${elm.elms.map((el) => {
                            el.word  = el.word.replaceAll("wCh", "changeWord");
                            return `<div class="flex itmCent"><span class="buyLength">${el.length}</span><span class="icon buyLengthImg ${el.word}"></span></div>`;
                }).join("")}
                    </div>
                    <div class="center bottomAbs buy itmCent" data-i="${i}">
                          <span>${elm.price}</span> <span class="icon ticket"></span>        
                    </div>
                </div>`
            }
            shopElmContent.innerHTML = html;
            document.querySelectorAll(".buy").forEach((el) => {
                el.addEventListener("click", () => {
                    const dat = shopData[el.dataset.i];
                    if(userData.balance < dat.price){
                        alert("NO MONEY");
                        return;
                    }
                    dat.elms.map((el) => {
                        userData.tools[el.word].length += el.length || 0;
                    })
                    userData.balance -= dat.price;
                    save();
                    setBalanceScore();
                    alert("SUCCES")
                });
            })
            shopIsRendered = true;
        }
    }
    wordCollectButton.addEventListener("click", () => {openWordCollect()})
    shopButton.addEventListener("click", () => {openShop()})
    toolButton.addEventListener("click", toggleTools);
    wordChangeDiv.addEventListener("click", () => {
        if( userData.tools.changeWord.length > 0 && !inProcces){
             userData.tools.changeWord.active = true;
             closeTools();
        }
    })
    function activeEncode(){
        encodeElms.innerHTML = "";
        function click(el){
            el.isSecret = false;
            encodeElm.classList.add('none');
            userData.tools.encode.length--;
            userData.complatedElms.push(el);
            changedWordCollect = true;
            save();
        }
        for(let i = 0; i < userData.level; i++){
            data[i].filter((el) => el.isSecret).forEach((el) => {
                const newElm = document.createElement("div");
                newElm.className = `card level${el.level}`;
                newElm.addEventListener("click", () => click(el));
                newElm.innerHTML = ` <div class="img" style="background-image: url('${el.image.toLowerCase()}')"></div>
                        <div><p>Find "${el.isSecret ? "?".repeat(el.word.length) : el.word.toUpperCase()}" word</p></div>
                        <div><p>+${el.level * 2} <span class="ticket icon"></span></p></div>`
                encodeElms.append(newElm);
            });
        }
    }
    encodeTool.addEventListener("click", () => {
        if(inProcces){return;}
        if(userData.tools.encode.length > 0){
            activeEncode();
            encodeElm.classList.remove('none');
            closeTools();
        }
    })
}
game();