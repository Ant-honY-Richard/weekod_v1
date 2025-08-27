'use client';

import { useEffect, useRef, FC } from "react";
import * as THREE from "three";
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  SMAAEffect,
  SMAAPreset,
} from "postprocessing";

interface Distortion {
  uniforms: Record<string, { value: any }>;
  getDistortion: string;
  getJS?: (progress: number, time: number) => THREE.Vector3;
}

interface Distortions {
  [key: string]: Distortion;
}

interface Colors {
  roadColor: number;
  islandColor: number;
  background: number;
  shoulderLines: number;
  brokenLines: number;
  leftCars: number[];
  rightCars: number[];
  sticks: number;
}

interface HyperspeedOptions {
  onSpeedUp?: (ev: MouseEvent | TouchEvent) => void;
  onSlowDown?: (ev: MouseEvent | TouchEvent) => void;
  distortion?: string | Distortion;
  length: number;
  roadWidth: number;
  islandWidth: number;
  lanesPerRoad: number;
  fov: number;
  fovSpeedUp: number;
  speedUp: number;
  carLightsFade: number;
  totalSideLightSticks: number;
  lightPairsPerRoadWay: number;
  shoulderLinesWidthPercentage: number;
  brokenLinesWidthPercentage: number;
  brokenLinesLengthPercentage: number;
  lightStickWidth: [number, number];
  lightStickHeight: [number, number];
  movingAwaySpeed: [number, number];
  movingCloserSpeed: [number, number];
  carLightsLength: [number, number];
  carLightsRadius: [number, number];
  carWidthPercentage: [number, number];
  carShiftX: [number, number];
  carFloorSeparation: [number, number];
  colors: Colors;
  isHyper?: boolean;
}

interface HyperspeedProps {
  effectOptions?: Partial<HyperspeedOptions>;
}

const defaultOptions: HyperspeedOptions = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: "turbulentDistortion",
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks: 0x03b3c3,
  },
};

function nsin(val: number) {
  return Math.sin(val) * 0.5 + 0.5;
}

const mountainUniforms = {
  uFreq: { value: new THREE.Vector3(3, 6, 10) },
  uAmp: { value: new THREE.Vector3(30, 30, 20) },
};

const xyUniforms = {
  uFreq: { value: new THREE.Vector2(5, 2) },
  uAmp: { value: new THREE.Vector2(25, 15) },
};

const LongRaceUniforms = {
  uFreq: { value: new THREE.Vector2(2, 3) },
  uAmp: { value: new THREE.Vector2(35, 10) },
};

const turbulentUniforms = {
  uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
  uAmp: { value: new THREE.Vector4(25, 5, 10, 10) },
};

const deepUniforms = {
  uFreq: { value: new THREE.Vector2(4, 8) },
  uAmp: { value: new THREE.Vector2(10, 20) },
  uPowY: { value: new THREE.Vector2(20, 2) },
};

const distortions: Distortions = {
  mountainDistortion: {
    uniforms: mountainUniforms,
    getDistortion: `
      uniform vec3 uAmp;
      uniform vec3 uFreq;
      #define PI 3.14159265358979
      float nsin(float val){
        return sin(val) * 0.5 + 0.5;
      }
      vec3 getDistortion(float progress){
        float movementProgressFix = 0.02;
        return vec3( 
          cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
          nsin(progress * PI * uFreq.y + uTime) * uAmp.y - nsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,
          nsin(progress * PI * uFreq.z + uTime) * uAmp.z - nsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z
        );
      }
    `,
    getJS: (progress: number, time: number) => {
      const movementProgressFix = 0.02;
      const uFreq = mountainUniforms.uFreq.value;
      const uAmp = mountainUniforms.uAmp.value;
      const distortion = new THREE.Vector3(
        Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
          Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,
        nsin(progress * Math.PI * uFreq.y + time) * uAmp.y -
          nsin(movementProgressFix * Math.PI * uFreq.y + time) * uAmp.y,
        nsin(progress * Math.PI * uFreq.z + time) * uAmp.z -
          nsin(movementProgressFix * Math.PI * uFreq.z + time) * uAmp.z
      );
      const lookAtAmp = new THREE.Vector3(2, 2, 2);
      const lookAtOffset = new THREE.Vector3(0, 0, -5);
      return distortion.multiply(lookAtAmp).add(lookAtOffset);
    },
  },
  xyDistortion: {
    uniforms: xyUniforms,
    getDistortion: `
      uniform vec2 uFreq;
      uniform vec2 uAmp;
      #define PI 3.14159265358979
      vec3 getDistortion(float progress){
        float movementProgressFix = 0.02;
        return vec3( 
          cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
          sin(progress * PI * uFreq.y + PI/2. + uTime) * uAmp.y - sin(movementProgressFix * PI * uFreq.y + PI/2. + uTime) * uAmp.y,
          0.
        );
      }
    `,
    getJS: (progress: number, time: number) => {
      const movementProgressFix = 0.02;
      const uFreq = xyUniforms.uFreq.value;
      const uAmp = xyUniforms.uAmp.value;
      const distortion = new THREE.Vector3(
        Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
          Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,
        Math.sin(progress * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y -
          Math.sin(
            movementProgressFix * Math.PI * uFreq.y + time + Math.PI / 2
          ) *
            uAmp.y,
        0
      );
      const lookAtAmp = new THREE.Vector3(2, 0.4, 1);
      const lookAtOffset = new THREE.Vector3(0, 0, -3);
      return distortion.multiply(lookAtAmp).add(lookAtOffset);
    },
  },
  LongRaceDistortion: {
    uniforms: LongRaceUniforms,
    getDistortion: `
      uniform vec2 uFreq;
      uniform vec2 uAmp;
      #define PI 3.14159265358979
      vec3 getDistortion(float progress){
        float camProgress = 0.0125;
        return vec3( 
          sin(progress * PI * uFreq.x + uTime) * uAmp.x - sin(camProgress * PI * uFreq.x + uTime) * uAmp.x,
          sin(progress * PI * uFreq.y + uTime) * uAmp.y - sin(camProgress * PI * uFreq.y + uTime) * uAmp.y,
          0.
        );
      }
    `,
    getJS: (progress: number, time: number) => {
      const camProgress = 0.0125;
      const uFreq = LongRaceUniforms.uFreq.value;
      const uAmp = LongRaceUniforms.uAmp.value;
      const distortion = new THREE.Vector3(
        Math.sin(progress * Math.PI * uFreq.x + time) * uAmp.x -
          Math.sin(camProgress * Math.PI * uFreq.x + time) * uAmp.x,
        Math.sin(progress * Math.PI * uFreq.y + time) * uAmp.y -
          Math.sin(camProgress * Math.PI * uFreq.y + time) * uAmp.y,
        0
      );
      const lookAtAmp = new THREE.Vector3(1, 1, 0);
      const lookAtOffset = new THREE.Vector3(0, 0, -5);
      return distortion.multiply(lookAtAmp).add(lookAtOffset);
    },
  },
  turbulentDistortion: {
    uniforms: turbulentUniforms,
    getDistortion: `
      uniform vec4 uFreq;
      uniform vec4 uAmp;
      float nsin(float val){
        return sin(val) * 0.5 + 0.5;
      }
      #define PI 3.14159265358979
      float getDistortionX(float progress){
        return (
          cos(PI * progress * uFreq.r + uTime) * uAmp.r +
          pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
        );
      }
      float getDistortionY(float progress){
        return (
          -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +
          -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a
        );
      }
      vec3 getDistortion(float progress){
        return vec3(
          getDistortionX(progress) - getDistortionX(0.0125),
          getDistortionY(progress) - getDistortionY(0.0125),
          0.
        );
      }
    `,
    getJS: (progress: number, time: number) => {
      const uFreq = turbulentUniforms.uFreq.value;
      const uAmp = turbulentUniforms.uAmp.value;

      const getX = (p: number) =>
        Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +
        Math.pow(
          Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)),
          2
        ) *
          uAmp.y;

      const getY = (p: number) =>
        -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -
        Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) *
          uAmp.w;

      const distortion = new THREE.Vector3(
        getX(progress) - getX(progress + 0.007),
        getY(progress) - getY(progress + 0.007),
        0
      );
      const lookAtAmp = new THREE.Vector3(-2, -5, 0);
      const lookAtOffset = new THREE.Vector3(0, 0, -10);
      return distortion.multiply(lookAtAmp).add(lookAtOffset);
    },
  },
  turbulentDistortionStill: {
    uniforms: turbulentUniforms,
    getDistortion: `
      uniform vec4 uFreq;
      uniform vec4 uAmp;
      float nsin(float val){
        return sin(val) * 0.5 + 0.5;
      }
      #define PI 3.14159265358979
      float getDistortionX(float progress){
        return (
          cos(PI * progress * uFreq.r) * uAmp.r +
          pow(cos(PI * progress * uFreq.g * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
        );
      }
      float getDistortionY(float progress){
        return (
          -nsin(PI * progress * uFreq.b) * uAmp.b +
          -pow(nsin(PI * progress * uFreq.a / (uFreq.b / uFreq.a)), 5.) * uAmp.a
        );
      }
      vec3 getDistortion(float progress){
        return vec3(
          getDistortionX(progress) - getDistortionX(0.02),
          getDistortionY(progress) - getDistortionY(0.02),
          0.
        );
      }
    `,
  },
  deepDistortionStill: {
    uniforms: deepUniforms,
    getDistortion: `
      uniform vec4 uFreq;
      uniform vec4 uAmp;
      uniform vec2 uPowY;
      float nsin(float val){
        return sin(val) * 0.5 + 0.5;
      }
      #define PI 3.14159265358979
      float getDistortionX(float progress){
        return (
          sin(progress * PI * uFreq.x) * uAmp.x * 2.
        );
      }
      float getDistortionY(float progress){
        return (
          pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y) * uAmp.y
        );
      }
      vec3 getDistortion(float progress){
        return vec3(
          getDistortionX(progress) - getDistortionX(0.02),
          getDistortionY(progress) - getDistortionY(0.05),
          0.
        );
      }
    `,
  },
  deepDistortion: {
    uniforms: deepUniforms,
    getDistortion: `
      uniform vec4 uFreq;
      uniform vec4 uAmp;
      uniform vec2 uPowY;
      float nsin(float val){
        return sin(val) * 0.5 + 0.5;
      }
      #define PI 3.14159265358979
      float getDistortionX(float progress){
        return (
          sin(progress * PI * uFreq.x + uTime) * uAmp.x
        );
      }
      float getDistortionY(float progress){
        return (
          pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y + uTime) * uAmp.y
        );
      }
      vec3 getDistortion(float progress){
        return vec3(
          getDistortionX(progress) - getDistortionX(0.02),
          getDistortionY(progress) - getDistortionY(0.02),
          0.
        );
      }
    `,
    getJS: (progress: number, time: number) => {
      const uFreq = deepUniforms.uFreq.value;
      const uAmp = deepUniforms.uAmp.value;
      const uPowY = deepUniforms.uPowY.value;

      const getX = (p: number) =>
        Math.sin(p * Math.PI * uFreq.x + time) * uAmp.x;
      const getY = (p: number) =>
        Math.pow(p * uPowY.x, uPowY.y) +
        Math.sin(p * Math.PI * uFreq.y + time) * uAmp.y;

      const distortion = new THREE.Vector3(
        getX(progress) - getX(progress + 0.01),
        getY(progress) - getY(progress + 0.01),
        0
      );
      const lookAtAmp = new THREE.Vector3(-2, -4, 0);
      const lookAtOffset = new THREE.Vector3(0, 0, -10);
      return distortion.multiply(lookAtAmp).add(lookAtOffset);
    },
  },
};

const distortion_uniforms = {
  uDistortionX: { value: new THREE.Vector2(80, 3) },
  uDistortionY: { value: new THREE.Vector2(-40, 2.5) },
};

const distortion_vertex = `
  #define PI 3.14159265358979
  uniform vec2 uDistortionX;
  uniform vec2 uDistortionY;
  float nsin(float val){
    return sin(val) * 0.5 + 0.5;
  }
  vec3 getDistortion(float progress){
    progress = clamp(progress, 0., 1.);
    float xAmp = uDistortionX.r;
    float xFreq = uDistortionX.g;
    float yAmp = uDistortionY.r;
    float yFreq = uDistortionY.g;
    return vec3( 
      xAmp * nsin(progress * PI * xFreq),
      yAmp * nsin(progress * PI * yFreq),
      0.
    );
  }
`;

class App {
  private options: HyperspeedOptions;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private composer!: EffectComposer;
  private road!: THREE.Group;
  private leftCarLights!: THREE.Group;
  private rightCarLights!: THREE.Group;
  private leftSticks!: THREE.Group;
  private rightSticks!: THREE.Group;
  private fovTarget!: number;
  private speedUpTarget!: number;
  private speedUp!: number;
  private timeOffset!: number;
  private tick!: number;
  private prevTime!: number;
  private distortion!: Distortion;

  constructor(container: HTMLElement, options: Partial<HyperspeedOptions> = {}) {
    this.options = { ...defaultOptions, ...options };
    this.tick = 0;
    this.prevTime = 0;
    this.speedUp = 0;
    this.speedUpTarget = 0;
    this.timeOffset = 0;
    this.fovTarget = this.options.fov;

    this.init(container);
    this.createScene();
    this.createCamera(container);
    this.createRenderer(container);
    this.createComposer();
    this.createRoad();
    this.createIsland();
    this.createCarLights();
    this.createLightSticks();
    this.addEventListeners(container);
    this.render();
  }

  private init(container: HTMLElement) {
    this.distortion = typeof this.options.distortion === 'string' 
      ? distortions[this.options.distortion] 
      : this.options.distortion!;
  }

  private createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.options.colors.background);
    this.scene.fog = new THREE.Fog(this.options.colors.background, 0, this.options.length);
  }

  private createCamera(container: HTMLElement) {
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(this.options.fov, aspect, 0.1, this.options.length);
    this.camera.position.z = 0;
    this.camera.position.y = 8;
    this.camera.position.x = 0;
  }

  private createRenderer(container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);
  }

  private createComposer() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    
    const bloomEffect = new BloomEffect({
      intensity: 0.4,
      luminanceThreshold: 0.15,
      luminanceSmoothing: 0.9,
    });
    
    const smaaEffect = new SMAAEffect({
      preset: SMAAPreset.HIGH,
    });

    this.composer.addPass(new EffectPass(this.camera, bloomEffect, smaaEffect));
  }

  private createRoad() {
    const roadGeometry = new THREE.PlaneGeometry(this.options.roadWidth, this.options.length);
    const roadMaterial = new THREE.MeshBasicMaterial({ color: this.options.colors.roadColor });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.z = -this.options.length / 2;
    this.scene.add(road);

    this.road = new THREE.Group();
    this.scene.add(this.road);
  }

  private createIsland() {
    const islandGeometry = new THREE.PlaneGeometry(this.options.islandWidth, this.options.length);
    const islandMaterial = new THREE.MeshBasicMaterial({ color: this.options.colors.islandColor });
    const island = new THREE.Mesh(islandGeometry, islandMaterial);
    island.rotation.x = -Math.PI / 2;
    island.position.z = -this.options.length / 2;
    island.position.y = 0.01;
    this.scene.add(island);
  }

  private createCarLights() {
    this.leftCarLights = new THREE.Group();
    this.rightCarLights = new THREE.Group();
    this.scene.add(this.leftCarLights);
    this.scene.add(this.rightCarLights);

    const nPairs = this.options.lightPairsPerRoadWay;
    
    for (let i = 0; i < nPairs; i++) {
      const carLightLeft = this.createCarLight('left', i);
      const carLightRight = this.createCarLight('right', i);
      this.leftCarLights.add(carLightLeft);
      this.rightCarLights.add(carLightRight);
    }
  }

  private createCarLight(side: 'left' | 'right', index: number) {
    const colors = side === 'left' ? this.options.colors.leftCars : this.options.colors.rightCars;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const geometry = new THREE.CylinderGeometry(
      this.options.carLightsRadius[0],
      this.options.carLightsRadius[1],
      this.options.carLightsLength[0] + Math.random() * (this.options.carLightsLength[1] - this.options.carLightsLength[0])
    );
    
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    
    const laneWidth = this.options.roadWidth / this.options.lanesPerRoad;
    const laneIndex = Math.floor(Math.random() * this.options.lanesPerRoad);
    const laneX = side === 'left' 
      ? -this.options.roadWidth / 2 + laneWidth * laneIndex + laneWidth / 2
      : this.options.roadWidth / 2 - laneWidth * laneIndex - laneWidth / 2;
    
    mesh.position.x = laneX + (Math.random() - 0.5) * laneWidth * 0.5;
    mesh.position.z = -this.options.length + (index / this.options.lightPairsPerRoadWay) * this.options.length;
    mesh.rotation.x = Math.PI / 2;
    
    return mesh;
  }

  private createLightSticks() {
    this.leftSticks = new THREE.Group();
    this.rightSticks = new THREE.Group();
    this.scene.add(this.leftSticks);
    this.scene.add(this.rightSticks);

    for (let i = 0; i < this.options.totalSideLightSticks; i++) {
      const stickLeft = this.createLightStick('left', i);
      const stickRight = this.createLightStick('right', i);
      this.leftSticks.add(stickLeft);
      this.rightSticks.add(stickRight);
    }
  }

  private createLightStick(side: 'left' | 'right', index: number) {
    const geometry = new THREE.CylinderGeometry(
      this.options.lightStickWidth[0],
      this.options.lightStickWidth[1],
      this.options.lightStickHeight[0] + Math.random() * (this.options.lightStickHeight[1] - this.options.lightStickHeight[0])
    );
    
    const material = new THREE.MeshBasicMaterial({ color: this.options.colors.sticks });
    const mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.x = side === 'left' ? -this.options.roadWidth / 2 - 2 : this.options.roadWidth / 2 + 2;
    mesh.position.z = -this.options.length + (index / this.options.totalSideLightSticks) * this.options.length;
    mesh.position.y = geometry.parameters.height / 2;
    
    return mesh;
  }

  private addEventListeners(container: HTMLElement) {
    const onPointerDown = (ev: MouseEvent | TouchEvent) => {
      this.options.onSpeedUp?.(ev);
      this.fovTarget = this.options.fovSpeedUp;
      this.speedUpTarget = this.options.speedUp;
    };

    const onPointerUp = (ev: MouseEvent | TouchEvent) => {
      this.options.onSlowDown?.(ev);
      this.fovTarget = this.options.fov;
      this.speedUpTarget = 0;
    };

    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown);
    container.addEventListener('touchend', onPointerUp);

    window.addEventListener('resize', () => {
      const aspect = container.clientWidth / container.clientHeight;
      this.camera.aspect = aspect;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.composer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  private updateCamera() {
    const time = this.tick * 0.016;
    const progress = ((this.tick * this.options.movingAwaySpeed[0] * (1 + this.speedUp)) % this.options.length) / this.options.length;
    
    if (this.distortion.getJS) {
      const distortion = this.distortion.getJS(progress, time);
      this.camera.lookAt(distortion);
    }
    
    this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, this.fovTarget, 0.05);
    this.camera.updateProjectionMatrix();
  }

  private updateLights() {
    const time = this.tick * 0.016;
    
    this.leftCarLights.children.forEach((light, i) => {
      const mesh = light as THREE.Mesh;
      mesh.position.z += this.options.movingCloserSpeed[0] * (1 + this.speedUp) * 0.016;
      
      if (mesh.position.z > 0) {
        mesh.position.z = -this.options.length;
      }
      
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = 1 - this.options.carLightsFade * this.speedUp;
    });

    this.rightCarLights.children.forEach((light, i) => {
      const mesh = light as THREE.Mesh;
      mesh.position.z += this.options.movingAwaySpeed[0] * (1 + this.speedUp) * 0.016;
      
      if (mesh.position.z > 0) {
        mesh.position.z = -this.options.length;
      }
      
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = 1 - this.options.carLightsFade * this.speedUp;
    });
  }

  private render = () => {
    this.tick++;
    this.speedUp = THREE.MathUtils.lerp(this.speedUp, this.speedUpTarget, 0.05);
    
    this.updateCamera();
    this.updateLights();
    
    this.composer.render();
    requestAnimationFrame(this.render);
  };

  public dispose() {
    this.renderer.dispose();
    this.composer.dispose();
  }
}

const Hyperspeed: FC<HyperspeedProps> = ({ effectOptions }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    appRef.current = new App(containerRef.current, effectOptions);

    return () => {
      if (appRef.current) {
        appRef.current.dispose();
      }
    };
  }, [effectOptions]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0
      }} 
    />
  );
};

export default Hyperspeed;