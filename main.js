var camera, renderer, cssRenderer;
var currentScene = null;
var cards = [];

//Animation Loop
function update(renderer, cssRenderer, controls, scene, cssScene, camera) {
    controls.update();
    renderer.render(scene, camera);
    cssRenderer.render(cssScene, camera);
    if(currentScene == 'term'){
        animateCards(cards);
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

var start = switchScene('term');