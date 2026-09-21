```javascript
import * as THREE from "three";

/* =========================================
   GIRLVERSE 3D
   ========================================= */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x9fd6ef);

scene.fog = new THREE.Fog(
  0x9fd6ef,
  45,
  180
);


/* =========================================
   CÁMARA
   ========================================= */

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);


/* =========================================
   RENDERER
   ========================================= */

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

document.body.appendChild(
  renderer.domElement
);


/* =========================================
   ILUMINACIÓN
   ========================================= */

const ambient = new THREE.HemisphereLight(
  0xffffff,
  0x607080,
  2.2
);

scene.add(ambient);


const sun = new THREE.DirectionalLight(
  0xffffff,
  3
);

sun.position.set(
  -30,
  50,
  25
);

sun.castShadow = true;

sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;

sun.shadow.camera.left = -100;
sun.shadow.camera.right = 100;
sun.shadow.camera.top = 100;
sun.shadow.camera.bottom = -100;

scene.add(sun);


/* =========================================
   MATERIALES
   ========================================= */

function material(color) {

  return new THREE.MeshStandardMaterial({
    color,
    roughness: .78,
    metalness: .05
  });

}


/* =========================================
   SUELO
   ========================================= */

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(
    220,
    220
  ),
  material(0x73a86c)
);

ground.rotation.x = -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);


/* =========================================
   CARRETERAS
   ========================================= */

function createRoad(
  x,
  z,
  width,
  length,
  rotation = 0
) {

  const road = new THREE.Mesh(
    new THREE.BoxGeometry(
      width,
      .08,
      length
    ),
    material(0x555960)
  );

  road.position.set(
    x,
    .04,
    z
  );

  road.rotation.y = rotation;

  road.receiveShadow = true;

  scene.add(road);

  return road;
}


createRoad(
  0,
  0,
  14,
  190
);


createRoad(
  0,
  0,
  190,
  14
);


/* =========================================
   ACERAS
   ========================================= */

function createSidewalk(
  x,
  z,
  width,
  length,
  rotation = 0
) {

  const sidewalk = new THREE.Mesh(
    new THREE.BoxGeometry(
      width,
      .12,
      length
    ),
    material(0xc8c8c8)
  );

  sidewalk.position.set(
    x,
    .1,
    z
  );

  sidewalk.rotation.y = rotation;

  sidewalk.receiveShadow = true;

  scene.add(sidewalk);
}


createSidewalk(
  -10,
  0,
  3,
  190
);

createSidewalk(
  10,
  0,
  3,
  190
);

createSidewalk(
  0,
  -10,
  190,
  3
);

createSidewalk(
  0,
  10,
  190,
  3
);


/* =========================================
   CASA
   ========================================= */

function createHouse(
  x,
  z,
  color
) {

  const group =
    new THREE.Group();

  group.position.set(
    x,
    0,
    z
  );


  const body =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        13,
        7,
        10
      ),
      material(color)
    );

  body.position.y = 3.5;

  body.castShadow = true;
  body.receiveShadow = true;

  group.add(body);


  const roof =
    new THREE.Mesh(
      new THREE.ConeGeometry(
        9,
        5,
        4
      ),
      material(0x8e5360)
    );

  roof.rotation.y =
    Math.PI / 4;

  roof.position.y = 9.5;

  roof.castShadow = true;

  group.add(roof);


  const door =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        2,
        4,
        .25
      ),
      material(0x684936)
    );

  door.position.set(
    0,
    2,
    5.1
  );

  group.add(door);


  for (
    let i = -1;
    i <= 1;
    i += 2
  ) {

    const window =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          2.5,
          2,
          .2
        ),
        material(0x9ddcf4)
      );

    window.position.set(
      i * 3.5,
      4.5,
      5.1
    );

    group.add(window);
  }


  scene.add(group);

  return group;
}


createHouse(
  -28,
  -25,
  0xe9b7c8
);

createHouse(
  28,
  -25,
  0xd8b8e8
);

createHouse(
  -28,
  28,
  0xf0d5a5
);

createHouse(
  28,
  28,
  0xb7d7ec
);


/* =========================================
   ÁRBOLES
   ========================================= */

function createTree(
  x,
  z
) {

  const group =
    new THREE.Group();


  const trunk =
    new THREE.Mesh(
      new THREE.CylinderGeometry(
        .7,
        .9,
        5,
        10
      ),
      material(0x704a32)
    );

  trunk.position.y = 2.5;

  trunk.castShadow = true;

  group.add(trunk);


  const leaves =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        3.5,
        16,
        12
      ),
      material(0x4f914f)
    );

  leaves.position.y = 6.5;

  leaves.castShadow = true;

  group.add(leaves);


  group.position.set(
    x,
    0,
    z
  );

  scene.add(group);
}


const treePositions = [
  [-45,-40],
  [-45,-20],
  [-45,20],
  [-45,40],
  [45,-40],
  [45,-20],
  [45,20],
  [45,40],
  [-20,45],
  [0,45],
  [20,45],
  [-20,-45],
  [0,-45],
  [20,-45]
];


treePositions.forEach(
  ([x,z]) =>
    createTree(x,z)
);


/* =========================================
   PARQUE
   ========================================= */

const park =
  new THREE.Mesh(
    new THREE.BoxGeometry(
      35,
      .15,
      35
    ),
    material(0x80bd75)
  );

park.position.set(
  55,
  .08,
  0
);

park.receiveShadow = true;

scene.add(park);


/* =========================================
   FUENTE
   ========================================= */

function createFountain() {

  const base =
    new THREE.Mesh(
      new THREE.CylinderGeometry(
        5,
        5,
        .7,
        32
      ),
      material(0xb7b7bd)
    );

  base.position.set(
    55,
    .4,
    0
  );

  base.castShadow = true;

  scene.add(base);


  const water =
    new THREE.Mesh(
      new THREE.CylinderGeometry(
        4.4,
        4.4,
        .12,
        32
      ),
      material(0x66c7e8)
    );

  water.position.set(
    55,
    .8,
    0
  );

  scene.add(water);
}

createFountain();


/* =========================================
   CAFETERÍA
   ========================================= */

function createCafe() {

  const cafe =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        15,
        7,
        10
      ),
      material(0xe8c7b3)
    );

  cafe.position.set(
    -35,
    3.5,
    55
  );

  cafe.castShadow = true;

  scene.add(cafe);


  const sign =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        9,
        2,
        .3
      ),
      material(0xd86c9f)
    );

  sign.position.set(
    -35,
    8,
    49.8
  );

  scene.add(sign);
}

createCafe();


/* =========================================
   PERSONAJE
   ========================================= */

const player =
  new THREE.Group();

scene.add(player);


/* cuerpo */

const body =
  new THREE.Mesh(
    new THREE.CapsuleGeometry(
      0.75,
      1.5,
      8,
      16
    ),
    material(0xd96f9d)
  );

body.position.y = 1.7;

body.castShadow = true;

player.add(body);


/* cabeza */

const head =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      .72,
      24,
      18
    ),
    material(0xf1c4a8)
  );

head.position.y = 3.35;

head.castShadow = true;

player.add(head);


/* cabello */

const hair =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      .78,
      24,
      18,
      0,
      Math.PI * 2,
      0,
      Math.PI * .65
    ),
    material(0x4e3027)
  );

hair.position.y = 3.5;

hair.castShadow = true;

player.add(hair);


/* piernas */

function createLeg(x) {

  const leg =
    new THREE.Mesh(
      new THREE.CapsuleGeometry(
        .28,
        1.2,
        6,
        12
      ),
      material(0x4a5570)
    );

  leg.position.set(
    x,
    .65,
    0
  );

  leg.castShadow = true;

  player.add(leg);

  return leg;
}

const leftLeg =
  createLeg(-.38);

const rightLeg =
  createLeg(.38);


/* posición inicial */

player.position.set(
  0,
  0,
  25
);


/* =========================================
   CONTROLES
   ========================================= */

const keys = {};

window.addEventListener(
  "keydown",
  event => {

    keys[event.key.toLowerCase()] = true;

  }
);


window.addEventListener(
  "keyup",
  event => {

    keys[event.key.toLowerCase()] = false;

  }
);


/* =========================================
   MOVIMIENTO
   ========================================= */

const clock =
  new THREE.Clock();

let walkTime = 0;

function updatePlayer(delta) {

  let forward = 0;
  let sideways = 0;


  if (
    keys["w"] ||
    keys["arrowup"]
  ) forward += 1;

  if (
    keys["s"] ||
    keys["arrowdown"]
  ) forward -= 1;

  if (
    keys["a"] ||
    keys["arrowleft"]
  ) sideways -= 1;

  if (
    keys["d"] ||
    keys["arrowright"]
  ) sideways += 1;


  const direction =
    new THREE.Vector3(
      sideways,
      0,
      -forward
    );


  if (
    direction.length() > 0
  ) {

    direction.normalize();


    const speed = 8;


    player.position.addScaledVector(
      direction,
      speed * delta
    );


    player.rotation.y =
      Math.atan2(
        direction.x,
        direction.z
      );


    walkTime += delta * 10;


    leftLeg.rotation.x =
      Math.sin(walkTime) * .35;

    rightLeg.rotation.x =
      -Math.sin(walkTime) * .35;

  }


  /* límites */

  player.position.x =
    THREE.MathUtils.clamp(
      player.position.x,
      -90,
      90
    );

  player.position.z =
    THREE.MathUtils.clamp(
      player.position.z,
      -90,
      90
    );
}


/* =========================================
   CÁMARA EN TERCERA PERSONA
   ========================================= */

function updateCamera() {

  const offset =
    new THREE.Vector3(
      0,
      6,
      9
    );

  offset.applyAxisAngle(
    new THREE.Vector3(0,1,0),
    player.rotation.y
  );


  const target =
    player.position
      .clone()
      .add(offset);


  camera.position.lerp(
    target,
    .08
  );


  const lookAt =
    player.position
      .clone();

  lookAt.y += 2.2;

  camera.lookAt(
    lookAt
  );
}


/* =========================================
   MONEDAS
   ========================================= */

let coins =
  Number(
    localStorage.getItem(
      "girlverseCoins"
    )
  ) || 100;


function updateCoins() {

  document.getElementById(
    "coins"
  ).textContent = coins;

  localStorage.setItem(
    "girlverseCoins",
    coins
  );
}

updateCoins();


/* =========================================
   MENSAJES
   ========================================= */

function showMessage(text) {

  const box =
    document.getElementById(
      "message"
    );

  box.textContent = text;

  box.style.display = "block";

  setTimeout(
    () => {
      box.style.display = "none";
    },
    2500
  );
}


/* =========================================
   INTERACCIÓN
   ========================================= */

window.addEventListener(
  "keydown",
  event => {

    if (
      event.key.toLowerCase()
      !== "e"
    ) return;


    const distanceToCafe =
      player.position.distanceTo(
        new THREE.Vector3(
          -35,
          0,
          55
        )
      );


    if (
      distanceToCafe < 10
    ) {

      coins += 10;

      updateCoins();

      showMessage(
        "☕ Visitaste la cafetería. +10 💎"
      );

      return;
    }


    const distanceToPark =
      player.position.distanceTo(
        new THREE.Vector3(
          55,
          0,
          0
        )
      );


    if (
      distanceToPark < 18
    ) {

      coins += 15;

      updateCoins();

      showMessage(
        "🌳 Disfrutaste del parque. +15 💎"
      );

      return;
    }


    showMessage(
      "✨ Explora GirlVerse y descubre nuevos lugares."
    );

  }
);


/* =========================================
   INICIO
   ========================================= */

document
  .getElementById("playButton")
  .addEventListener(
    "click",
    () => {

      document
        .getElementById("start")
        .style.display = "none";

      showMessage(
        "🌸 Bienvenida a GirlVerse"
      );

    }
  );


/* =========================================
   ANIMACIÓN
   ========================================= */

function animate() {

  requestAnimationFrame(
    animate
  );


  const delta =
    Math.min(
      clock.getDelta(),
      .05
    );


  updatePlayer(
    delta
  );

  updateCamera();


  renderer.render(
    scene,
    camera
  );
}


animate();


/* =========================================
   RESIZE
   ========================================= */

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);
```
