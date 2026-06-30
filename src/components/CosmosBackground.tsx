import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

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

      // Per-star twinkle phase so opacity oscillates out of sync across the field
      const phases = new Float32Array(starCount);
      for (let j = 0; j < starCount; j++) phases[j] = Math.random() * Math.PI * 2;
      geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          spin: { value: 0 },
          time: { value: 0 },
          depth: { value: i },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          attribute float phase;
          varying vec3 vColor;
          varying float vTwinkle;
          uniform float spin;
          uniform float time;
          uniform float depth;
          void main() {
            vColor = color;
            vTwinkle = 0.6 + 0.4 * sin(time * 1.6 + phase);
            vec3 pos = position;
            float angle = spin * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            pos.xy = rot * pos.xy;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vTwinkle;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float opacity = (1.0 - smoothstep(0.0, 0.5, dist)) * vTwinkle;
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

    // Foreground dust — sparse, larger particles close to the camera's
    // flight path, giving the scene a near-field layer instead of pure
    // background glow (desktop only, cheap: a few hundred points).
    let dustField: THREE.Points | null = null;
    if (!lite) {
      const dustCount = 400;
      const dustGeo = new THREE.BufferGeometry();
      const dustPositions = new Float32Array(dustCount * 3);
      const dustSizes = new Float32Array(dustCount);
      for (let j = 0; j < dustCount; j++) {
        dustPositions[j * 3] = (Math.random() - 0.5) * 600;
        dustPositions[j * 3 + 1] = Math.random() * 200 - 20;
        dustPositions[j * 3 + 2] = (Math.random() - 0.5) * 1100;
        dustSizes[j] = Math.random() * 3 + 1.5;
      }
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
      dustGeo.setAttribute('size', new THREE.BufferAttribute(dustSizes, 1));

      const dustMat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          attribute float size;
          uniform float time;
          varying float vOpacity;
          void main() {
            vec3 pos = position;
            pos.x += sin(time * 0.08 + pos.z * 0.02) * 6.0;
            pos.y += cos(time * 0.06 + pos.x * 0.02) * 4.0;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (180.0 / -mvPosition.z);
            vOpacity = clamp(1.0 - (-mvPosition.z) / 700.0, 0.0, 1.0);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying float vOpacity;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float opacity = (1.0 - smoothstep(0.0, 0.5, dist)) * vOpacity * 0.5;
            gl_FragColor = vec4(0.6, 0.9, 1.0, opacity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      dustField = new THREE.Points(dustGeo, dustMat);
      scene.add(dustField);
    }

    // Nebula — desktop only (shader complexity not worth it on mobile)
    const nebulaGeo = new THREE.PlaneGeometry(lite ? 1 : 8000, lite ? 1 : 4000, lite ? 1 : 100, lite ? 1 : 100);
    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x001a4d) },
        color2: { value: new THREE.Color(0x00b4d8) }, // close to cyan-400
        color3: { value: new THREE.Color(0x7c1fd1) }, // violet accent for cloud depth
        opacity: { value: 0.3 },
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
        uniform vec3 color3;
        uniform float opacity;
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;

        // Cheap layered noise (no texture lookups) for a turbulent, cloud-like look
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }
        void main() {
          vec2 p = vUv * 6.0 + vec2(time * 0.06, time * 0.03);
          float n1 = noise(p);
          float n2 = noise(p * 2.3 + 4.2) * 0.5;
          float n3 = noise(p * 4.7 - 1.7) * 0.25;
          float turbulence = n1 + n2 + n3;

          vec3 color = mix(color1, color2, smoothstep(0.3, 0.9, turbulence));
          color = mix(color, color3, smoothstep(0.7, 1.1, turbulence * 0.9));

          float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
          alpha *= 0.5 + turbulence * 0.6;
          alpha *= 1.0 + vElevation * 0.01;
          gl_FragColor = vec4(color, max(alpha, 0.0));
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

    // Mountains (layered silhouettes) — brightened so they read as distinct
    // shapes during the flythrough instead of dissolving into the bloom glow
    const layers = [
      { distance: -50, height: 60, color: 0x0a1a33, opacity: 1 },
      { distance: -100, height: 80, color: 0x122544, opacity: 0.88 },
      { distance: -150, height: 100, color: 0x1c3a6b, opacity: 0.72 },
      { distance: -200, height: 120, color: 0x2a4f8f, opacity: 0.55 },
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

    // Camera waypoints — one per portfolio section. Each segment gets its
    // own GSAP ease + a touch of roll so transitions feel directed rather
    // than a flat linear follow of the scrollbar.
    const waypoints = [
      { x: 0, y: 20, z: 100, roll: 0 },          // Hero: horizon view
      { x: -15, y: 38, z: -60, roll: -0.028 },   // About: entering the range
      { x: 10, y: 58, z: -450, roll: 0.032 },    // Projects: deep cosmos
      { x: 0, y: 78, z: -880, roll: 0 },         // Contact: infinite space
    ];
    const eases = ['power2.inOut', 'power3.inOut', 'power2.inOut'];

    const cameraTarget = {
      x: waypoints[0].x,
      y: waypoints[0].y,
      z: waypoints[0].z,
      roll: waypoints[0].roll,
    };

    // scrub: 1 gives the timeline a 1s catch-up smoothing baked into GSAP's
    // own ticker — frame-rate independent, no manual lerp/jank like before.
    const cameraTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });
    for (let i = 1; i < waypoints.length; i++) {
      const wp = waypoints[i];
      cameraTimeline.to(
        cameraTarget,
        { x: wp.x, y: wp.y, z: wp.z, roll: wp.roll, ease: eases[i - 1], duration: 1 },
        i - 1
      );
    }

    // Animation loop
    let animId: number;
    let spinAccum = 0;
    let lastFrame = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - lastFrame) / 1000, 0.1);
      lastFrame = now;
      const time = now * 0.001;

      // Scroll velocity makes the star field streak past faster — cheap,
      // high perceived-motion payoff tied to Lenis's smoothed velocity.
      const velocity = Math.abs(getLenis()?.velocity ?? 0);
      const speedBoost = Math.min(velocity * 0.004, 0.4);
      spinAccum += dt * (0.05 + speedBoost);

      stars.forEach((s) => {
        const mat = s.material as THREE.ShaderMaterial;
        mat.uniforms.spin.value = spinAccum;
        mat.uniforms.time.value = time;
      });

      nebulaMat.uniforms.time.value = time * 0.5;
      atmMat.uniforms.time.value = time;
      if (dustField) {
        (dustField.material as THREE.ShaderMaterial).uniforms.time.value = time;
      }

      camera.position.set(
        cameraTarget.x + Math.sin(time * 0.1) * 2,
        cameraTarget.y + Math.cos(time * 0.15) * 1,
        cameraTarget.z
      );
      camera.lookAt(0, 10, -600);
      camera.rotateZ(cameraTarget.roll);

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
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      cameraTimeline.scrollTrigger?.kill();
      cameraTimeline.kill();
      stars.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });
      mountains.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      if (dustField) {
        dustField.geometry.dispose();
        (dustField.material as THREE.Material).dispose();
      }
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
