/*
    Music Player via Auduius API
*/
function musicLauncher(){
    //Scene Creation
    var scene = new THREE.Scene(); //Three.js Mesh Objects
    var cssScene = new THREE.Scene(); //Html Objects

    //Light
    var lights = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(lights);

    // Search Bar
    var obj = searchBar();
    cssScene.add(obj);




    //API Work




    // Camera
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.set(0, 0, 1500);
    camera.lookAt(0, 0, 0);

    cssScene.add(camera);

    // WebGL Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(179, 175, 175)');
    renderer.domElement.style.pointerEvents = 'none';
	document.getElementById('webgl').appendChild(renderer.domElement);

    // CSS3D Renderer
    cssRenderer = new THREE.CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    cssRenderer.domElement.style.pointerEvents = 'auto';
	document.getElementById('css3d').appendChild(cssRenderer.domElement);

    // Controls
    var controls = new THREE.OrbitControls(camera, cssRenderer.domElement);
   
    obj.element.addEventListener('pointerdown', () => {
    controls.enabled = false;
    });

    obj.element.addEventListener('pointerup', () => {
        controls.enabled = true;
    });

    update(renderer, cssRenderer, controls, scene, cssScene, camera,cards);

    return scene;
}

/*
    Watch Vides in 3D using Youtube Api
*/
function videoLauncher(){
    //Scene Creation
    var scene = new THREE.Scene(); //Three.js Mesh Objects
    var cssScene = new THREE.Scene(); //Html Objects

    //Light
    var lights = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(lights);

    // Search Bar
    var obj = searchBar();
    cssScene.add(obj);


    //API Work






    // Camera
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.set(0, 0, 1500);
    camera.lookAt(0, 0, 0);

    cssScene.add(camera);

    // WebGL Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(179, 175, 175)');
    renderer.domElement.style.pointerEvents = 'none';
	document.getElementById('webgl').appendChild(renderer.domElement);

    // CSS3D Renderer
    cssRenderer = new THREE.CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    cssRenderer.domElement.style.pointerEvents = 'auto';
	document.getElementById('css3d').appendChild(cssRenderer.domElement);

    // Controls
    var controls = new THREE.OrbitControls(camera, cssRenderer.domElement);
   
    obj.element.addEventListener('pointerdown', () => {
    controls.enabled = false;
    });

    obj.element.addEventListener('pointerup', () => {
        controls.enabled = true;
    });

    update(renderer, cssRenderer, controls, scene, cssScene, camera,cards);

    return scene;
}



    
/*
    A Basic Web Search turned 3D using Wikipedia and Google Api's
*/
function termLauncher(){
    //Scene Creation
    var scene = new THREE.Scene(); //Three.js Mesh Objects
    var cssScene = new THREE.Scene(); //Html Objects

    //Light
    var lights = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(lights);

    // Search Bar
    var obj = searchBar();
    cssScene.add(obj);

    //HTML Panel Objects
    var panels = createPanel(`rgb(166, 142, 211)`);
    cssScene.add(panels);

    // Search handler
    obj.element.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const term = obj.element.value.trim(); 
        if (!term) return;
        const r = Math.floor(Math.random() * 75)+180; 
        const g = Math.floor(Math.random() * 75)+180; 
        const b = Math.floor(Math.random() * 75)+180;
        
        cards.push(panels);
        panels = createPanel(`rgb(${r}, ${g}, ${b})`);
        panels.position.set(0, 0, 0);
        cssScene.add(panels);

        panels.element.textContent = 'Loading...';

        try {
            const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`);
            if (!response.ok) throw new Error('Not found');

            const data = await response.json();
            if(data.extract == `${term} may refer to:` || data.extract.length < 200)   throw new Error("Disambiguation or too short");

            panels.element.textContent = data.extract || 'No summary found.';

        } catch (err) {
            try{
            const apiKey = 'AIzaSyA9jfj9bgjiSmF2nkCVGGL-jLXKdljDIKg'; //Reminder to remove/Deactivate Key
            const cx = '978ff031cbe8a4848'; 
            const googleUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(term)}`;

            const googleResponse = await fetch(googleUrl);
            if (!googleResponse.ok) throw new Error('Google search failed');
                
                const googleData = await googleResponse.json();
                if (googleData.items && googleData.items.length > 0) {
                    var data = googleData.items[0];
                    panels.element.innerHTML = `
                    <h2 style="margin: 0 0 8px 0;">${data.title}</h2>
                    <p style="margin: 0 0 12px 0;">${data.snippet}</p>
                    <hr>
                    <a href="${data.link}" target="_blank" rel="noopener noreferrer">${data.formattedUrl}</a>`;
                } else {
                    panels.element.textContent = 'No results found on Google.';
                }        
            } catch(err) {
                console.error("Google API Error: ", err);
                panels.element.textContent = `No results found for "${term}".`;

            }
        }
    }
});

    // Camera
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.set(0, 0, 1500);
    camera.lookAt(0, 0, 0);

    cssScene.add(camera);

    // WebGL Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(179, 175, 175)');
    renderer.domElement.style.pointerEvents = 'none';
	document.getElementById('webgl').appendChild(renderer.domElement);

    // CSS3D Renderer
    cssRenderer = new THREE.CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    cssRenderer.domElement.style.pointerEvents = 'auto';
	document.getElementById('css3d').appendChild(cssRenderer.domElement);

    // Controls
    var controls = new THREE.OrbitControls(camera, cssRenderer.domElement);
   
    obj.element.addEventListener('pointerdown', () => {
    controls.enabled = false;
    });

    obj.element.addEventListener('pointerup', () => {
        controls.enabled = true;
    });

    update(renderer, cssRenderer, controls, scene, cssScene, camera);

    return scene;
}


//Make Cards spin after being summoned
function animateCards(cards){
    cards.forEach(card => {
        const data = card.userData;

        if(card.position.z < 40) card.position.z = -400;
        if(card.position.x < 400 && card.position.x < -200) card.position.x = Math.random() < 0.5 ? -300 : 500;
        if(card.position.y < 300 && card.position.y < -200) card.position.y = Math.random() < 0.5 ? -300 : 300;

        card.rotation.x += data.rotate;
        card.rotation.y += data.rotate;
        card.position.x = data.x*Math.cos(data.angle);
        card.position.y = data.y*Math.sin(data.angle);

    });
}

