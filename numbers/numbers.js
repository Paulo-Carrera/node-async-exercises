url = 'http://numbersapi.com/';

axios.get(url + 14)
    .then(res => console.log(res))



////////////////////////////////////////////////////////////////////////////////////


async function getNumbers(){
    const numbers = [1,2,3,4,5];

    const res1 = axios.get(url + numbers[0]);
    const res2 = axios.get(url + numbers[1]);
    const res3 = axios.get(url + numbers[2]);
    const res4 = axios.get(url + numbers[3]);
    const res5 = axios.get(url + numbers[4]);

    const res = await axios.all([res1, res2, res3, res4, res5]);
    console.log(res);
}

// getNumbers();



//////////////////////////////////////////////////////////////////////////////////////


async function favNumFacts(num){
    try{
        const res = await axios.get(url + num + '/trivia');
        const res2 = await axios.get(url + num + '/math');
        const res3 = await axios.get(url + num + '/date');
        const res4 = await axios.get(url + num + '/year');
        
        // console.log(res.data);
        // console.log(res2.data);
        // console.log(res3.data);
        // console.log(res4.data);

        document.querySelector('#output').innerHTML = 
        res.data + '<br>' + res2.data + '<br>' + res3.data + '<br>' + res4.data;

    }catch(err){
        console.log("~ Please enter a number ~", err);
    }
}

favNumFacts(14);






document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault();
    const num = document.querySelector('#fav-num').value;
    favNumFacts(num);
})

document.querySelector('#clear').addEventListener('click', function(){
    document.querySelector('#output').innerHTML = '';
})




