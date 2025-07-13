var camera, renderer, cssRenderer;
var currentScene = null;
var cards = [];
var musicCards = [];
var currentTime = new THREE.Clock();

//Animation Loop
function update(renderer, cssRenderer, controls, scene, cssScene, camera) {
    controls.update();
    renderer.render(scene, camera);
    cssRenderer.render(cssScene, camera);

    if(currentScene == 'term'){
        animateCards(cards);
    } else if (currentScene == 'music'){
        animateCards(musicCards,2000,30,.0001);
    }
    requestAnimationFrame(function () {
        update(renderer, cssRenderer, controls, scene, cssScene, camera);
    });
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
});

document.getElementById('video').addEventListener('click', () => {
  switchScene('video');
});

document.getElementById('term').addEventListener('click', () => {
  switchScene('term');
});

document.getElementById('music').addEventListener('click', () => {
  switchScene('music');
});

document.addEventListener('keydown', (event) => {
    const tag = document.activeElement.tagName.toLowerCase();

    if (tag === 'input' || tag === 'textarea') return;

    switch (event.key.toLowerCase()) {
        case 'w': 
            camera.position.z -= 100;
            break;
        case 's':
            camera.position.z += 100;
            break;
        case 'a': 
            camera.position.x -= 100;
            break;
        case 'd':
            camera.position.x += 100;
            break;
        case 'q': 
            camera.position.y += 100;
            break;
        case 'e': 
            camera.position.y -= 100;
            break;
    }
});

var start = switchScene('music');