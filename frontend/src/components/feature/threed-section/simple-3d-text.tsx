'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Simple3DText() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x1fc3ff, 2, 50);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Create 3D text using boxes
    const letters = "PROJECTS".split('');
    const letterSpacing = 1.2;
    const totalWidth = letters.length * letterSpacing;
    const startX = -totalWidth / 2;

    const textMeshes: THREE.Mesh[] = [];

    letters.forEach((letter, index) => {
      const geometry = new THREE.BoxGeometry(0.8, 1.2, 0.3);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x1fc3ff,
        shininess: 100,
        specular: 0x444444
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = startX + index * letterSpacing;
      mesh.position.y = 0;
      mesh.position.z = 0;
      
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      textMeshes.push(mesh);
      scene.add(mesh);
    });

    // Add glow effect
    const glowGeometry = new THREE.BoxGeometry(0.9, 1.3, 0.1);
    const glowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x1fc3ff,
      transparent: true,
      opacity: 0.3
    });

    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    glowMesh.position.z = -0.2;
    scene.add(glowMesh);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.01;
      
      textMeshes.forEach((mesh, index) => {
        mesh.rotation.y = Math.sin(time * 0.3 + index * 0.2) * 0.08;
        mesh.rotation.x = Math.sin(time * 0.2 + index * 0.15) * 0.04;
        mesh.position.y = Math.sin(time * 0.5 + index * 0.3) * 0.03;
      });

      glowMesh.rotation.y = Math.sin(time * 0.3) * 0.08;
      glowMesh.rotation.x = Math.sin(time * 0.2) * 0.04;
      glowMesh.position.y = Math.sin(time * 0.5) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full min-h-[400px]"
    />
  );
}
