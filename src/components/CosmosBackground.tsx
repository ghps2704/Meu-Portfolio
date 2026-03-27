import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface Props {
  lite?: boolean; // reduced quality for mobile (no bloom, fewer stars)
}

export default function CosmosBackground({ lite = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 20, 100);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(lite ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;

    // Post-processing (desktop only — bloom is GPU-heavy on mobile)
    let composer: EffectComposer | null = null;
    if (!lite) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.4,
        0.85
      );
      composer.addPass(bloomPass);
    }

    // Star field — 3 layers on desktop, 1 lighter layer on mobile
    const stars: THREE.Points[] = [];
    const layerCount = lite ? 1 : 3;
    for (let i = 0; i < layerCount; i++) {
      const starCount = lite ? 1800 : 5000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);

      for (let j = 0; j < starCount; j++) {
        const radius = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[j * 3 + 2] = radius * Math.cos(phi);

        const color = new THREE.Color();
        const pick = Math.random();
        if (pick < 0.7) {
          color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
        } else if (pick < 0.9) {
          color.setHSL(0.08, 0.5, 0.8);
        } else {
          color.setHSL(0.55, 0.8, 0.9); // cyan tint to match portfolio
        }

        colors[j * 3] = color.r;
        colors[j * 3 + 1] = color.g;
        colors[j * 3 + 2] = color.b;
        sizes[j] = Math.random() * 2 + 0.5;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          depth: { value: i },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float depth;
          void main() {
            vColor = color;
            vec3 pos = position;
            float angle = time * 0.05 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            pos.xy = rot * pos.xy;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(vColor, opacity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const starField = new THREE.Points(geometry, material);
      scene.add(starField);
      stars.push(starField);
    }

    // Nebula — desktop only (shader complexity not worth it on mobile)
    const nebulaGeo = new THREE.PlaneGeometry(lite ? 1 : 8000, lite ? 1 : 4000, lite ? 1 : 100, lite ? 1 : 100);
    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x001a4d) },
        color2: { value: new THREE.Color(0x00b4d8) }, // close to cyan-400
        opacity: { value: 0.25 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
          pos.z += elevation;
          vElevation = elevation;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float opacity;
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        void main() {
          float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
          vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
          float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
          alpha *= 1.0 + vElevation * 0.01;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebula.position.z = -1050;
    scene.add(nebula);

    // Mountains (layered silhouettes)
    const layers = [
      { distance: -50, height: 60, color: 0x060d1a, opacity: 1 },
      { distance: -100, height: 80, color: 0x0a1628, opacity: 0.85 },
      { distance: -150, height: 100, color: 0x0d2040, opacity: 0.65 },
      { distance: -200, height: 120, color: 0x0f3460, opacity: 0.45 },
    ];

    const mountains: THREE.Mesh[] = [];

    layers.forEach((layer, idx) => {
      const points: THREE.Vector2[] = [];
      const segments = 60;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * 1200;
        const y =
          Math.sin(i * 0.1) * layer.height +
          Math.sin(i * 0.05 + idx * 1.3) * layer.height * 0.5 +
          Math.sin(i * 0.22 + idx * 0.7) * layer.height * 0.2 -
          80;
        points.push(new THREE.Vector2(x, y));
      }
      points.push(new THREE.Vector2(6000, -400));
      points.push(new THREE.Vector2(-6000, -400));

      const shape = new THREE.Shape(points);
      const geo = new THREE.ShapeGeometry(shape);
      const mat = new THREE.MeshBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: layer.opacity,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.z = layer.distance;
      mesh.position.y = layer.distance;
      mesh.userData = { baseZ: layer.distance, index: idx };
      scene.add(mesh);
      mountains.push(mesh);
    });

    // Atmosphere glow
    const atmGeo = new THREE.SphereGeometry(600, 32, 32);
    const atmMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float time;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 atmosphere = vec3(0.1, 0.83, 1.0) * intensity;
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          atmosphere *= pulse;
          gl_FragColor = vec4(atmosphere, intensity * 0.2);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmGeo, atmMat);
    scene.add(atmosphere);

    // Camera waypoints — one per portfolio section
    const waypoints = [
      { x: 0, y: 20, z: 100 },    // Hero: horizon view
      { x: -15, y: 38, z: -60 },  // About: entering the range
      { x: 10, y: 58, z: -450 },  // Projects: deep cosmos
      { x: 0, y: 78, z: -880 },   // Contact: infinite space
    ];

    const smooth = { x: 0, y: 20, z: 100 };
    let target = { x: 0, y: 20, z: 100 };

    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0
        ? Math.max(0, Math.min(1, window.scrollY / maxScroll))
        : 0;

      const total = waypoints.length - 1;
      const floatIdx = progress * total;
      const idx = Math.floor(floatIdx);
      const t = floatIdx - idx;

      const from = waypoints[Math.min(idx, total)];
      const to = waypoints[Math.min(idx + 1, total)];

      target = {
        x: from.x + (to.x - from.x) * t,
        y: from.y + (to.y - from.y) * t,
        z: from.z + (to.z - from.z) * t,
      };
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Animation loop
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      stars.forEach((s) => {
        const mat = s.material as THREE.ShaderMaterial;
        mat.uniforms.time.value = time;
      });

      nebulaMat.uniforms.time.value = time * 0.5;
      atmMat.uniforms.time.value = time;

      // Smooth camera lerp
      const lerp = 0.04;
      smooth.x += (target.x - smooth.x) * lerp;
      smooth.y += (target.y - smooth.y) * lerp;
      smooth.z += (target.z - smooth.z) * lerp;

      camera.position.set(
        smooth.x + Math.sin(time * 0.1) * 2,
        smooth.y + Math.cos(time * 0.15) * 1,
        smooth.z
      );
      camera.lookAt(0, 10, -600);

      // Mountain subtle parallax
      mountains.forEach((m, i) => {
        const f = 1 + i * 0.5;
        m.position.x = Math.sin(time * 0.1) * 2 * f;
        m.position.y = 50 + Math.cos(time * 0.15) * f;
      });

      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer?.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      stars.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });
      mountains.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      nebulaGeo.dispose();
      nebulaMat.dispose();
      atmGeo.dispose();
      atmMat.dispose();
      renderer.dispose();
      composer?.dispose();
    };
  }, [lite]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
