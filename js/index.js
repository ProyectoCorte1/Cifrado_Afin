function cipherText()
{
    var textToCipher = document.getElementById("TextToCipher").value;
    var zeroEspaces = zeroEspacesMethod(textToCipher);
    var zeroAccents = replaceLettersMethod(zeroEspaces);
    var deleteEspecialCharacters = removeEspecialCharactersMethod(zeroAccents);
    var a = document.getElementById("a").value;
    var b = document.getElementById("b").value;
    var validateNumbers = validateNumbersMethod(a, b);
    if(validateNumbers == true)
    {
        var n = 27
        var validateCoprimos = validateCoprimosMethod(a, b, n);
        if(validateCoprimos == true)
        {
            var finalChain = afinAlgorithm(a, b, n, deleteEspecialCharacters)
            /*alert(finalChain)*/
            var texto = document.getElementById("textToCipher");
            var texArea = document.getElementById("Text_Area_Cipher");
            texArea.textContent = finalChain
        }
        
    }
}

function decodeText(){
    var textToDecode = document.getElementById("textD").value;
    var zeroEspaces = zeroEspacesMethod(textToDecode);
    var deleteEspecialCharacters = removeEspecialCharactersMethod(zeroEspaces);
    var text = deleteEspecialCharacters.toUpperCase();
    var frecuence = frecuenceAnalice(text)
    var abcedary = abc()
    var lf = listLetterFrecuency(frecuence)
    var ln = listNumberC(lf, abcedary)
    var wN = wordNumbers(text, abcedary)
    var worDecode = decode(abcedary, ln, wN)
}

function zeroEspacesMethod(chain){
    var zeroEspaces = chain.split(" ").join("");
    return zeroEspaces;
}

function replaceLettersMethod(chain){
    var accents = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return chain.split('').map( letter => accents[letter] || letter).join('').toString();
}

function removeEspecialCharactersMethod(chain){
    var finalChain = ""
    for(i = 0; i < chain.length; i++)
    {
        var ascii = chain[i].charCodeAt(0);
        if(((ascii >= 65) && (ascii <= 90)) || ((ascii >= 97) && (ascii <= 122)) || ((ascii == 241) || (ascii == 209))){
            finalChain = finalChain + chain[i];
        }
        else{
            chain.replace(chain[i], "");
        }
    }
    return finalChain;
}

function validateNumbersMethod(a, b){
    var n = 27
    var flag = false
    if(a >= 0){
        if(b <= n){
            alert("LOS NÚMEROS SON VALIDOS")
            flag = true
        }
        else{
            alert("EL NÚMERO B NO PUEDE SER MAYOR A N")
            alert(b + " ES MAYOR QUE "+ n )
        }
    }
    else{
        alert("EL NÚMERO A NO PUEDE SER MENOR A 0")
        alert(str(a)+" ES MENOR QUE "+str(0))
    }
    return flag
}

function gcdMethod(a, b){
    if(a == 0 || b == 0){
        return 0;
    }
    if(a == b){
        return a;
    }
    if(a > b){
        return gcdMethod(a - b, b);
    }
    return gcdMethod(a, b - a);
}

function validateCoprimosMethod(a, b, n){
    var flag = false
    if(gcdMethod(a, n) == 1){
        alert("SON NUMEROS COPRIMOS")
        flag = true;
    }
    else{
        alert("NO SON NUMEROS COPRIMOS")
    }
    return flag;
}

function afinAlgorithm(a, b, n, chain){
    var cipherChain = ""
    var alphabetMay = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    var alphabetMin = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"]
    for(i = 0; i < chain.length; i++){
        var ascii = chain[i].charCodeAt(0);
        ascii = parseFloat(ascii);
        a = parseFloat(a);
        b = parseFloat(b);
        n = parseFloat(n);
        if((ascii >= 65) && (ascii <= 78)){
            ascii = ascii - 65;
            var result = (a * ascii + b) % n;
            var finalLetter = alphabetMay[result];
            cipherChain = cipherChain + finalLetter;
        }
        else if((ascii >= 79) && (ascii <= 90)){
            ascii = ascii + 1;
            ascii = ascii - 65;
            var result = (a * ascii + b) % n;
            var finalLetter = alphabetMay[result];
            cipherChain = cipherChain + finalLetter;
        }
        else if(ascii == 241){
            ascii = 14;
            var result = (a * ascii + b) % n;
            var finalLetter = alphabetMin[result];
            cipherChain = cipherChain + finalLetter;
        }
        else if((ascii >= 97) && (ascii <= 110)){
            ascii = ascii - 97;
            var result = (a * ascii + b) % n;
            var finalLetter = alphabetMin[result];
            cipherChain = cipherChain + finalLetter;
        }
        else if((ascii >= 111) && (ascii <= 122)){
            ascii = ascii + 1;
            ascii = ascii - 97;
            var result = (a * ascii + b) % n;
            var finalLetter = alphabetMin[result];
            cipherChain = cipherChain + finalLetter;
        }
        else{
            ascii = 14;
            var result = (a * ascii + b) % n;
            var finalLetter = alphabetMay[result];
            cipherChain = cipherChain + finalLetter;
        }
    }
    return cipherChain;
}




function frecuenceAnalice(chain)
{
    var list = [];
    var listLetter = [];
    for (var i = 0; i < chain.length; i++)
    {
        var search = false;
        while(search == false)
        {
            if(list.length == 0)
            {
                listLetter = [1, chain[i]];
                list.splice(0, 0, listLetter);
                break;
            }
            else
            {
                a = 0;
                numElements = list.length;
                while(a < numElements)
                {
                    listLetter = list[a];
                    if(listLetter[1] == chain[i])
                    {
                        listLetter[0] = listLetter[0] + 1;
                        search = true;
                        break;
                    }
                    else
                    {
                        a = a + 1;
                    }
                }
                if(search == false)
                {
                    listLetter = [1, chain[i]];
                    list.splice((list.length + 1), 0, listLetter);
                }
                break;
            }
        }
    }
    var sum = 0;
    var prom = 0;
    sum = parseFloat(sum);
    prom = parseFloat(prom);
    for(var i = 0; i < list.length; i++)
    {
        sum = sum + list[i][0];
    }
    for(var i = 0; i < list.length; i++)
    {
        prom = list[i][0] / sum;
        prom = prom * 100;
        list[i].push(prom);
    }
    list.sort();
    return list;
}

function abc()
{
    abecedario = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    return abecedario
}

function inverseMultiplicative(a, m)
{
    for(let x = 1; x < m; x++)
    {
        if (((a % m) * (x % m)) % m == 1)
        {
            return x;
        }
    }
}

function listLetterFrecuency(analize)
{
    listLetter = []
    var cont = analize.length;
    cont = parseFloat(cont);
    while(cont >= analize.length - 2)
    {
        listLetter.push(analize?.[cont]?.[1]);
        cont = cont - 1;
    }
    return listLetter;
}

function listNumberC(list, abc)
{
    var listN = [];
    var cont = 0;
    cont = parseFloat(cont);
    for(var i = 0; i < list.length; i++)
    {
        cont = 0;
        while(cont < abc.length)
        {
            if(list[i] == abc[cont])
            {
                listN.push(cont);
                break;
            }
            cont = cont + 1;
        }
    }
    return listN;
}

function wordNumbers(word, abc)
{
    var list = [];
    var cont = 0;
    cont = parseFloat(cont);
    for(var i = 0; i < word.length; i++)
    {
        cont = 0;
        while(cont < abc.length)
        {
            if(word[i] == abc[cont])
            {
                list.push(cont);
                break;
            }
            cont = cont + 1;
        }
    }
    return list;
}

function decode(abc, ln, word)
{
    var a = 0;
    var b = 0;
    var n = 27;
    var wordDecode = "";
    a = parseFloat(a)
    b = parseFloat(b)
    n = parseFloat(n)
    while(a >= 0 && a <= n)
    {
        while(b <= n)
        {
            var inv = inverseMultiplicative(a,n);
            inv = parseFloat(inv)
            if(inv != -1)
            {
                var m1 = 0;
                m1 = parseFloat(m1)
                m1 = (ln[0] - b);
                m1 = m1 * inv;
                m1 = m1 % n;
                console.log(m1);
                var m2 = 0;
                m2 = parseFloat(m2)
                m2 = (ln[0] - b) * inv % n
                if(m1 == 4 && m2 == 0)
                {
                    console.log("UNA COMBINACIÓN DE NÚMEROS A Y B SON: a = "+str(a)+ " y b = "+str(b))
                    for(var i = 0; i < word.length; i++)
                    {
                        m = (parseFloat(word[i]) - b) * inv % n
                        wordDecode = wordDecode + abc[m]
                    }
                    console.log(wordDecode)
                }
                else if(m1 == 0 && m2 == 4)
                {
                    console.log("UNA COMBINACIÓN DE NÚMEROS A Y B SON: a = "+str(a)+ " y b = "+str(b))
                    for(var i = 0; i < word.length; i++)
                    {
                        m = (parseFloat(word[i]) - b) * inv % n
                        wordDecode = wordDecode + abc[m]
                    }
                    console.log(wordDecode)
                }
                else if(m1 == 15 && m2 == 0)
                {
                    console.log("UNA COMBINACIÓN DE NÚMEROS A Y B SON: a = "+str(a)+ " y b = "+str(b))
                    for(var i = 0; i < word.length; i++)
                    {
                        m = (parseFloat(word[i]) - b) * inv % n
                        wordDecode = wordDecode + abc[m]
                    }
                    console.log(wordDecode)
                }
                else if(m1 == 15 && m2 == 4)
                {
                    console.log("UNA COMBINACIÓN DE NÚMEROS A Y B SON: a = "+str(a)+ " y b = "+str(b))
                    for(var i = 0; i < word.length; i++)
                    {
                        m = (parseFloat(word[i]) - b) * inv % n
                        wordDecode = wordDecode + abc[m]
                    }
                    console.log(wordDecode)
                }
                else if(m1 == 0 && m2 == 15)
                {
                    console.log("UNA COMBINACIÓN DE NÚMEROS A Y B SON: a = "+str(a)+ " y b = "+str(b))
                    for(var i = 0; i < word.length; i++)
                    {
                        m = (parseFloat(word[i]) - b) * inv % n
                        wordDecode = wordDecode + abc[m]
                    }
                    console.log(wordDecode)
                }
                else if(m1 == 4 && m2 == 15)
                {
                    console.log("UNA COMBINACIÓN DE NÚMEROS A Y B SON: a = "+str(a)+ " y b = "+str(b))
                    for(var i = 0; i < word.length; i++)
                    {
                        m = (parseFloat(word[i]) - b) * inv % n
                        wordDecode = wordDecode + abc[m]
                    }
                    console.log(wordDecode)
                }
                else if(m1 == 0 && m2 == 18)
                {
                    console.log("UNA COMBINACIÓN DE NÚMEROS A Y B SON: a = "+str(a)+ " y b = "+str(b))
                    for(var i = 0; i < word.length; i++)
                    {
                        m = (parseFloat(word[i]) - b) * inv % n
                        wordDecode = wordDecode + abc[m]
                    }
                    console.log(wordDecode)
                }
            }
            wordDecode = "";
            b = b + 1;
        }
        b = 0;
        a = a + 1;
    }
}