/*
    Creates a Plane Object. Currently not used anymore. 
*/
function getPlane(size) {
	var geometry = new THREE.PlaneGeometry(size,size,20,20);
    var material = new THREE.MeshBasicMaterial({ 
                side: THREE.DoubleSide, 
                transparent: false,
                opacity: 1,
                color: 0x00ff00,
            });

	var mesh = new THREE.Mesh(
		geometry,
		material 
	);
	mesh.receiveShadow=true;
	mesh.castShadow = true;

	return mesh;
}

/*
    Function to Create a Search Bar
*/
function searchBar() {
    const bar = document.createElement('input');
    bar.type = 'search';
    bar.placeholder = 'Enter Text';
    bar.style.width = '300px';
    bar.style.height = '30px';
    bar.style.fontSize = '16px';
    bar.style.padding = '5px 10px';
    bar.style.borderRadius = '5px';
    bar.style.border = '1px solid #ccc';
    bar.style.background = 'white';
    bar.style.zIndex = '10'; 

    const cssBar = new THREE.CSS3DObject(bar);
    cssBar.position.set(0, -400, 0); 

    return cssBar;
}

/*
    Function to Create simple Card panel used in the Term Search Functions
*/
function createPanel(color) {
  const div = document.createElement('div');
  div.style.width = '300';
  div.style.height = 'auto';
  div.style.minHeight = '400';
  div.style.overflowWrap= 'break-word';
  div.style.background = color;
  div.style.borderRadius = '10px';
  div.style.padding = '10px';
  div.style.overflowY = 'auto';
  div.style.fontFamily = 'Arial, sans-serif';
  div.style.fontSize = '14px';
  div.textContent = '';
  var obj = new THREE.CSS3DObject(div)

  var time = currentTime.getElapsedTime();

  obj.userData = {
    angle:.6*time,
    rotate : .005+Math.random()*.005
  };

  return obj;
}


/*
    Music Cards
*/
function createSongPanel(song,color){
    var card = document.createElement('div');
    card.style.width = '300';
    card.style.height = 'auto';
    card.style.minHeight = '400';
    card.style.overflowWrap= 'break-word';
    card.style.background = color;
    card.style.borderRadius = '10px';
    card.style.padding = '10px';
    card.style.overflowY = 'auto';
    card.style.fontFamily = 'Arial, sans-serif';
    card.style.fontSize = '14px';
    card.textContent = '';
    //Image
    var image = document.createElement('img');
    image.src = song.artwork?.['150x150'];
    image.alt = song.title;
    card.append(image);
    //Title

    const title = document.createElement('h4');
    title.textContent = song.title;
    title.style.margin = '10px 0 5px';
    card.appendChild(title);

    // Artist
    const artist = document.createElement('p');
    artist.textContent = `By ${song.user.name}`;
    card.appendChild(artist);

    // Audio
    const audio = document.createElement('audio');
    audio.src = `https://api.audius.co/v1/tracks/${song.id}/stream`;
    audio.controls = true;
    audio.style.marginTop = '12px';
    audio.style.width = '100%';
    card.appendChild(audio);

    const obj = new THREE.CSS3DObject(card);

    return obj;
}

/*
    YoutubeCube Object
*/
async function CreateVideoBox(query,scene){

    const apiKey = 'AIzaSyAog1yfIq3ecWrzZsMJ-O03RZToMP-VTBc';
    const maxResults = 9;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&order=date&maxResults=${maxResults}&key=${apiKey}`);
    if (!response.ok) {
    console.error('YouTube API Error:', response.statusText);
    return []; 
    }

    
    const data = await response.json();
    console.log("Returned items:", data.items.length, data.items);

    const objs = [];
    var counter_x =-1;
    var counter_y =0;
    if(data.items.length===1){
        counter_x =0;
    }
    data.items.forEach((result,i) => {
        const id = result.id.videoId;
        const title = result.snippet.title;
        const thumbnail = result.snippet.thumbnails.default.url;

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&controls=1&playsinline=0`;
        iframe.width = '1280';
        iframe.height = '720';
        iframe.allowFullscreen = true;
        iframe.allow = 'encrypted-media';

        const obj = new THREE.CSS3DObject(iframe);
        obj.position.set(counter_x * 1350, counter_y * 800, 0);
        scene.add(obj);
        objs.push(obj);

        counter_x++;
        if(counter_x>1){
            counter_x = -1;
            counter_y +=1;
        }

    });
    return objs;
}

//Make Cards Orbit Camera after being summoned
function animateCards(cards,orbitRadius=1600,jumps=15,orbitSpeed = 0.0005){

    cards.forEach((card, index) => {
        const data = card.userData;

        if (index < jumps) {
            data.angle += orbitSpeed;

            card.position.x = camera.position.x + orbitRadius * Math.cos(card.userData.angle);
            card.position.z = camera.position.z + orbitRadius * Math.sin(card.userData.angle);
            card.position.y = camera.position.y;  

        card.lookAt(camera.position);

        card.rotation.z += card.userData.rotate;

        } else if (index < jumps*2) {
           data.angle += orbitSpeed;

            card.position.x = camera.position.x + orbitRadius * Math.cos(card.userData.angle);
            card.position.z = camera.position.z + orbitRadius * Math.sin(card.userData.angle);
            card.position.y = camera.position.y + 500;  

            card.lookAt(camera.position);

            card.rotation.z += card.userData.rotate;
        } else {
            card.position.y = camera.position.y + -500;  
            data.angle += orbitSpeed;
            card.position.x = camera.position.x + orbitRadius * Math.cos(card.userData.angle);
            card.position.z = camera.position.z + orbitRadius * Math.sin(card.userData.angle);
            card.lookAt(camera.position);

            card.rotation.z += card.userData.rotate;

        }
    });
}

/*
    Function to switch Between Scenes
*/
function switchScene(sceneName){
   if(sceneName != currentScene){
     document.getElementById('webgl').innerHTML = '';
     document.getElementById('css3d').innerHTML = '';

     switch(sceneName){
        case 'music': 
                    musicLauncher();
                    break;
        case 'term' : 
                    termLauncher();
                    break;
        case 'video': 
                    videoLauncher();
                    break;
     }
   }
   currentScene = sceneName;
}
