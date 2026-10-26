import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SceneId } from '../../types';
import { createHeartGeometry } from './HeartGeometry';

interface ThreeUniverseProps {
  activeScene: SceneId;
  isZooming: boolean;
  onZoomComplete?: () => void;
  onWebGLError?: () => void;
  reducedMotion?: boolean;
}

export const ThreeUniverse: React.FC<ThreeUniverseProps> = ({
  activeScene,
  isZooming,
  onZoomComplete,
  onWebGLError,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isZoomingRef = useRef(isZooming);
  isZoomingRef.current = isZooming;
  const activeSceneRef = useRef(activeScene);
  activeSceneRef.current = activeScene;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        onWebGLError?.();
        return;
      }
    } catch {
      onWebGLError?.();
      return;
    }

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x21172F, 0.035);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xdcd6ff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffd6e7, 2.5);
    mainLight.position.set(5, 8, 6);
    scene.add(mainLight);

    const roseFillLight = new THREE.PointLight(0xff8fb8, 3.5, 20);
    roseFillLight.position.set(-3, -1, 3);
    scene.add(roseFillLight);

    const lavenderBackLight = new THREE.PointLight(0xa99aef, 4.0, 25);
    lavenderBackLight.position.set(0, 4, -4);
    scene.add(lavenderBackLight);

    // 5. Central 3D Glass Heart
    const heartGroup = new THREE.Group();
    scene.add(heartGroup);

    const heartGeom = createHeartGeometry(1.25, 0.5);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffaecd,
      emissive: 0x48112d,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.72,
      thickness: 1.5,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.95,
    });
    const heartMesh = new THREE.Mesh(heartGeom, glassMaterial);
    heartGroup.add(heartMesh);

    // Internal inner glow heart
    const innerHeartGeom = createHeartGeometry(0.9, 0.35);
    const innerHeartMat = new THREE.MeshBasicMaterial({
      color: 0xffd6e7,
      transparent: true,
      opacity: 0.45,
      wireframe: false,
    });
    const innerHeart = new THREE.Mesh(innerHeartGeom, innerHeartMat);
    heartGroup.add(innerHeart);

    // 6. Orbiting Star Ring around the heart
    const ringParticlesCount = 90;
    const ringGeom = new THREE.BufferGeometry();
    const ringPositions = new Float32Array(ringParticlesCount * 3);
    const ringRadius = 2.4;
    for (let i = 0; i < ringParticlesCount; i++) {
      const angle = (i / ringParticlesCount) * Math.PI * 2;
      ringPositions[i * 3] = Math.cos(angle) * ringRadius + (Math.random() - 0.5) * 0.2;
      ringPositions[i * 3 + 1] = Math.sin(angle) * ringRadius * 0.4 + (Math.random() - 0.5) * 0.2;
      ringPositions[i * 3 + 2] = Math.sin(angle) * ringRadius + (Math.random() - 0.5) * 0.2;
    }
    ringGeom.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
    const ringMat = new THREE.PointsMaterial({
      color: 0xfff8fc,
      size: 0.07,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const ringPoints = new THREE.Points(ringGeom, ringMat);
    heartGroup.add(ringPoints);

    // 7. Glossy Reflective Floor Beneath the Heart
    const floorGeom = new THREE.PlaneGeometry(35, 35, 32, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1b1328,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    const floorMesh = new THREE.Mesh(floorGeom, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -2.8;
    scene.add(floorMesh);

    // 8. Galaxy Starfield Background (2,200 stars)
    const starCount = 2200;
    const starGeom = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    const palette = [
      new THREE.Color(0xffd6e7), // blush
      new THREE.Color(0xff8fb8), // rose
      new THREE.Color(0xdcd6ff), // lavender
      new THREE.Color(0xa99aef), // deep lavender
      new THREE.Color(0xfff8fc), // soft cream
    ];

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 60;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      starPos[i * 3 + 2] = -10 + (Math.random() - 0.5) * 45;

      const col = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;

      starSizes[i] = Math.random() * 0.08 + 0.02;
    }

    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeom.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.075,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeom, starMat);
    scene.add(stars);

    // 9. Floating 3D Rose Petals System
    const petalCount = 80;
    const petalsGroup = new THREE.Group();
    scene.add(petalsGroup);

    const petalGeom = new THREE.SphereGeometry(0.12, 6, 6);
    petalGeom.scale(1.4, 0.2, 0.8); // petal flake shape
    const petalMaterials = [
      new THREE.MeshStandardMaterial({ color: 0xff8fb8, roughness: 0.6, transparent: true, opacity: 0.85 }),
      new THREE.MeshStandardMaterial({ color: 0xffd6e7, roughness: 0.5, transparent: true, opacity: 0.9 }),
      new THREE.MeshStandardMaterial({ color: 0xdcd6ff, roughness: 0.5, transparent: true, opacity: 0.85 }),
    ];

    const petalMeshes: Array<{
      mesh: THREE.Mesh;
      speedY: number;
      speedX: number;
      rotSpeed: { x: number; y: number; z: number };
      initialY: number;
    }> = [];

    for (let i = 0; i < petalCount; i++) {
      const mat = petalMaterials[i % petalMaterials.length];
      const pMesh = new THREE.Mesh(petalGeom, mat);
      pMesh.position.set(
        (Math.random() - 0.5) * 16,
        Math.random() * 12 - 4,
        (Math.random() - 0.5) * 10
      );
      pMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      petalsGroup.add(pMesh);

      petalMeshes.push({
        mesh: pMesh,
        speedY: 0.008 + Math.random() * 0.014,
        speedX: 0.003 + Math.random() * 0.005,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        initialY: 8,
      });
    }

    // 10. Glowing Crescent Moon for Romantic Scenes
    const moonGroup = new THREE.Group();
    const moonGeom = new THREE.SphereGeometry(1.4, 32, 32);
    const moonMat = new THREE.MeshBasicMaterial({
      color: 0xf6f0ff,
      transparent: true,
      opacity: 0.88,
    });
    const moonMesh = new THREE.Mesh(moonGeom, moonMat);
    moonGroup.add(moonMesh);

    // Moon soft halo
    const haloGeom = new THREE.SphereGeometry(1.8, 24, 24);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xa99aef,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const haloMesh = new THREE.Mesh(haloGeom, haloMat);
    moonGroup.add(haloMesh);

    moonGroup.position.set(5.5, 4.0, -8);
    scene.add(moonGroup);

    // 11. Romantic Garden Heart Portal for Proposals (Scenes 5, 6, 7)
    const portalGroup = new THREE.Group();
    const portalArchGeom = createHeartGeometry(2.2, 0.2);
    const portalArchMat = new THREE.MeshStandardMaterial({
      color: 0xff8fb8,
      emissive: 0x8a385f,
      roughness: 0.3,
      metalness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const portalMesh = new THREE.Mesh(portalArchGeom, portalArchMat);
    portalGroup.add(portalMesh);

    // Glowing flower lantern markers along winding pathway
    const lanternCount = 14;
    for (let i = 0; i < lanternCount; i++) {
      const lantern = new THREE.PointLight(i % 2 === 0 ? 0xff8fb8 : 0xdcd6ff, 1.2, 4);
      const angle = (i / lanternCount) * Math.PI - Math.PI / 2;
      lantern.position.set(Math.sin(angle) * 3.5, -2.2, Math.cos(angle) * 4 - 2);
      portalGroup.add(lantern);

      const lanternMarker = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xfff8fc })
      );
      lanternMarker.position.copy(lantern.position);
      portalGroup.add(lanternMarker);
    }

    portalGroup.position.set(0, 0, -3);
    portalGroup.visible = false;
    scene.add(portalGroup);

    // 12. Parallax and Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      targetX = (clientX / window.innerWidth - 0.5) * 2;
      targetY = (clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 13. Main Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let zoomProgress = 0;
    let zoomFinished = false;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const currentScene = activeSceneRef.current;
      const zooming = isZoomingRef.current;

      // Smooth lerp mouse parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Parallax effect on camera or heart
      if (!reducedMotion) {
        camera.position.x = mouseX * 0.6;
        camera.position.y = -mouseY * 0.4;
      }

      // Stars slow rotation
      stars.rotation.y = elapsedTime * 0.02;
      stars.rotation.x = elapsedTime * 0.008;

      // Floating Petals drift
      petalMeshes.forEach(p => {
        p.mesh.position.y -= p.speedY;
        p.mesh.position.x += Math.sin(elapsedTime * 1.5 + p.mesh.position.z) * 0.004;
        p.mesh.rotation.x += p.rotSpeed.x;
        p.mesh.rotation.y += p.rotSpeed.y;
        p.mesh.rotation.z += p.rotSpeed.z;

        // Reset if drifted below floor
        if (p.mesh.position.y < -3.5) {
          p.mesh.position.y = 8 + Math.random() * 2;
          p.mesh.position.x = (Math.random() - 0.5) * 16;
        }
      });

      // Orbiting ring rotation
      ringPoints.rotation.y = elapsedTime * 0.45;
      ringPoints.rotation.z = Math.sin(elapsedTime * 0.5) * 0.15;

      // Adjust scene objects visibility & behavior according to activeScene
      const isGardenOrProposal =
        currentScene === 'garden' ||
        currentScene === 'proposal' ||
        currentScene === 'response-yes' ||
        currentScene === 'response-time';

      portalGroup.visible = isGardenOrProposal;

      if (currentScene === 'opening') {
        heartGroup.visible = true;
        heartGroup.position.set(0, 0, 0);

        // Heart gentle floating bob & tilt
        if (!zooming) {
          heartGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.15;
          heartMesh.rotation.y = Math.sin(elapsedTime * 0.8) * 0.2 + mouseX * 0.35;
          heartMesh.rotation.x = -mouseY * 0.25;
          innerHeart.rotation.y = heartMesh.rotation.y;
          innerHeart.rotation.x = heartMesh.rotation.x;
        } else {
          // Cinematic Zoom-through transition
          zoomProgress += 0.028;
          camera.position.z = THREE.MathUtils.lerp(7.5, 0.4, zoomProgress);
          heartGroup.scale.setScalar(1 + zoomProgress * 3.5);
          glassMaterial.opacity = Math.max(0, 1 - zoomProgress * 1.5);
          innerHeartMat.opacity = Math.max(0, 0.5 - zoomProgress);

          if (zoomProgress >= 1 && !zoomFinished) {
            zoomFinished = true;
            onZoomComplete?.();
          }
        }
      } else if (currentScene === 'worth' || currentScene === 'bubbles') {
        heartGroup.visible = true;
        // Position heart higher and slightly smaller as a romantic celestial ornament
        heartGroup.position.set(0, 1.8, -2);
        heartGroup.scale.setScalar(0.7);
        heartMesh.rotation.y = elapsedTime * 0.3;
        glassMaterial.opacity = 0.85;
      } else if (currentScene === 'letter') {
        heartGroup.visible = false;
        // Dim stars slightly to highlight paper desk feel
        starMat.opacity = 0.4;
      } else if (isGardenOrProposal) {
        heartGroup.visible = true;
        portalGroup.visible = true;
        portalGroup.rotation.y = Math.sin(elapsedTime * 0.2) * 0.05;

        // Position heart inside portal
        heartGroup.position.set(0, 0.2, -3);

        if (currentScene === 'response-yes') {
          // Blooming joyful celebration expansion!
          const pulse = 1 + Math.sin(elapsedTime * 4) * 0.15;
          heartGroup.scale.setScalar(1.4 * pulse);
          heartMesh.rotation.y = elapsedTime * 1.2;
          roseFillLight.intensity = 6.0;
          lavenderBackLight.intensity = 6.5;
        } else if (currentScene === 'response-time') {
          // Serene calm state
          heartGroup.scale.setScalar(0.95);
          heartMesh.rotation.y = elapsedTime * 0.15;
          roseFillLight.intensity = 2.0;
          lavenderBackLight.intensity = 2.5;
        } else {
          // Standard proposal / garden view
          heartGroup.scale.setScalar(1.0 + Math.sin(elapsedTime * 1.5) * 0.05);
          heartMesh.rotation.y = Math.sin(elapsedTime * 0.5) * 0.2;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 14. Resource Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries, materials
      heartGeom.dispose();
      innerHeartGeom.dispose();
      ringGeom.dispose();
      floorGeom.dispose();
      starGeom.dispose();
      petalGeom.dispose();
      moonGeom.dispose();
      haloGeom.dispose();
      portalArchGeom.dispose();

      glassMaterial.dispose();
      innerHeartMat.dispose();
      ringMat.dispose();
      floorMat.dispose();
      starMat.dispose();
      moonMat.dispose();
      haloMat.dispose();
      portalArchMat.dispose();

      renderer.dispose();
    };
  }, [reducedMotion, onWebGLError, onZoomComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
