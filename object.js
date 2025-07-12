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
    Fnction to Create a Search Bar
*/
function searchBar() {
    const bar = document.createElement('input');
    bar.type = 'search';
    bar.placeholder = 'Term Look-up';
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
  obj.userData = {
    angle:Math.random()*180,
    x: Math.random()*1050,
    y: Math.random()*1250,
    rotate : .005+Math.random()*.005
  };

  return obj;
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
