function search(event){
	event.preventDefault();
	const ck = event.currentTarget;
    const id = ck.dataset.choice;
	console.log(id);
	switch(id){
	case "food":
		a.classList.add('hidden');
		b.classList.remove('hidden');
		c.classList.add('hidden');
		d.classList.add('hidden');
		const form = document.querySelector('#food');
		form.addEventListener('submit', ricette);
		break;
		console.log(token);
	case "cont":
		a.classList.add('hidden');
		b.classList.add('hidden');
		c.classList.remove('hidden');
		d.classList.add('hidden');
		const x = document.querySelectorAll('#social img');
			for(let y of x){
			y.addEventListener('click', redirect);
			}
		break;
	case "video":
		a.classList.add('hidden');
		b.classList.add('hidden');
		c.classList.add('hidden');
		d.classList.remove('hidden');
		fetch("https://api.vimeo.com/videos?page=1&per_page=6&query=arancia%20sicilia",
			{
			headers:
			 {
			 'Authorization': 'Bearer ' + token
			 }}).then(onResponse).then(onJsonV);
		break;
	default:
		a.classList.remove('hidden');
		b.classList.add('hidden');
		c.classList.add('hidden');
		d.classList.add('hidden');
		break;
	}
	
}

function ricette(event){
	 event.preventDefault();
	 const val = encodeURIComponent(document.querySelector('#content').value);
	 console.log('Eseguo ricerca: ' + val);
	 rest_url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey='+ cibo + '&query=' + val + '&includeIngredients=orange&number=6';
	 fetch(rest_url).then(onResponse).then(onJsonR);
}

function onJsonR(json) {
  console.log(json);
  const r = document.querySelector('#recipe');
  r.innerHTML = '';
  for(let i=0; i<6; i++) {
    const lib = document.createElement('div');
    const data = json.results[i];
    let img_rec = data['image'];
	let img_tit = data['title'];
    const a = document.createElement('p');
    const img = document.createElement('img');
    img.src = img_rec;
    a.textContent = img_tit;
    lib.appendChild(img);
    lib.appendChild(a);
	r.appendChild(lib);
  }
}

function play(event){
	let click = event.currentTarget.src;
	const video = urls[click];
	document.getElementById("player").src = video;
	console.log(video);
}

function onJsonV(json) {
	console.log(json);
	const v = document.querySelector('#preview');
	v.innerHTML = '';
	for(let i=1; i<6; i++) {
		const lib = document.createElement('div');
		const data = json.data[i];
		let nome_vid = data['name'];
		let img_vid = data['pictures'].base_link;
		let url = data['player_embed_url'];
		const a = document.createElement('p');
		const img = document.createElement('img');
		img.src = img_vid;
		a.textContent = nome_vid;
		urls[img.src] = url;   
		lib.appendChild(img);
		lib.appendChild(a);
		img.addEventListener('click', play);
		v.appendChild(lib);
	}

}

function redirect(event){
	const out = event.currentTarget.dataset.src;
	switch(out){
			case '1': location.assign("https://www.facebook.com/oranfrutta/"); break;
			case '2': location.assign("https://twitter.com/oranfrizer"); break;
			case '3': location.assign("https://www.instagram.com/oranfrutta/"); break;
			default: break;
	}
}

function onResponse(response){
	console.log(response.status);
    return response.json();
}

function onJToken(json){
    console.log(json);
    token = json.access_token;
}

console.log("start\n");
	const a = document.querySelector("article");
	const b = document.getElementById("food");
	const c = document.getElementById("cont");
	const d = document.getElementById("video");
	const secret_vimeo = 'H9rBF8ltTwFiBzCvjT0HTNO1Di7nJBX5jzJPtBjg23O1bao1hR6d5y6VAypplkI/nh1nFtTTjQbk+hCC851HXvKWhPRIiJxL1lqDJI+jQFwj38G3oC4Cea63l3mdjvLP';
	const client_vimeo = '44168c823297effefd1fc5f20a6ce926f12fafa3';
	const cibo = '8c21cf7cd55d47f1a45d203cfd0ece56';
	const vimeo_token = 'https://api.vimeo.com/oauth/authorize/client'; 
	const st = {grant_type: "client_credentials", scope: "public"}
	const bodytype = JSON.stringify(st);
	let token;
	const urls = {};
fetch(vimeo_token, {
	method: 'POST',
	body: bodytype,
	headers:
	{
    'Authorization': 'Basic ' + btoa(client_vimeo + ':' + secret_vimeo),
	'Content-Type': 'application/json',
	'Accept': '	application/vnd.vimeo.*+json;version=3.4'
	}
	}).then(onResponse).then(onJToken);
const x = document.querySelectorAll('a');
for(let y of x){
	y.addEventListener('click', search);
}
