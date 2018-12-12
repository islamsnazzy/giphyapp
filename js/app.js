window.onload = trending;

let date = new Date();
let footer = document.getElementById('footer');
let input = document.getElementById('input-search');
let button = document.getElementById('button-search');
let displaySection = document.getElementById('display-section');
let image = document.getElementById('image');
let category = document.getElementById('category-heading');
let pageChange = document.getElementById('pagination');
let resultLimit = document.getElementById('result-number');

button.addEventListener('click', gifSearch);
const ul = document.getElementById('team-info');
const API = '8J0rfplSJwHtCTenCLm9FBHHGa6NO1Sk';


function createNode(el){
    return document.createElement(el);
}

function append(element, child){
    return element.appendChild(child);
}

function giphyUrlTrending(apiKey){
    return `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=12`
}
function trending(){
    let h1 = createNode('h1');
    h1.innerHTML = `Currently Trending GIF's`;
    h1.className = "category-heading"
    append(displaySection, h1);
    footer.innerHTML = `Copyright &copy; Abdulsalam Ibrahim ${date.getFullYear()}`;
    fetch(giphyUrlTrending(API)).then(
        (resp)=>resp.json()
    ).then((response)=>{
        trendingGifs = response.data;
        trendingGifs.map((gif)=>{
            let img = document.createElement('img');
            img.src = gif.images.downsized_large.url;
            img.className = "images";
            append(displaySection, img);
        })
    }).catch((error)=> console.log(error));
}

function giphyUrlSearch(inputValue, apiKey, limit){
    return `https://api.giphy.com/v1/gifs/search?q=${inputValue}&api_key=${apiKey}&limit=${limit}`;
}
// function createElement(element,divName, innerAttributeValue, innerHtmlValue){
//     let newElement = element;
//     newElement.href = innerAttributeValue;
//     newElement.innerHTML = innerHtmlValue;
//     return divName.appendChild(newElement);
// }
function gifSearch(){
    reset();
    fetch(giphyUrlSearch(input.value, API, resultLimit.value)).then(
        (resp)=>resp.json()
    ).then((response)=>{
        let gifs = response.data;
        let h1 = createNode('h1')
        h1.innerHTML = `<b>CATEGORY OF ${input.value.toUpperCase()}</b>`;
        h1.className = "category-heading";
        append(displaySection, h1)
        for(i in gifs){
            let img = document.createElement('img');
            img.src = gifs[i].images.downsized_large.url;
            img.className = "images";
            // category.innerHTML = `Category of ${input.value}`;
            append(displaySection, img);
        }
        // let count = 0;
        // for(let i = 0; i < 4; i++){
        //     let a = document.createElement('a')[i];
        //     a.href = '#';
        //     a.innerHTML = `${i+1}`;
        // }
    }).catch((error)=>alert(error));
}

function reset(){
    displaySection.innerHTML = "";
}