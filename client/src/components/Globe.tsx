import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Globe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const cloudsRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    cameraRef.current = camera;

    // Initialize renderer with high quality settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // High detail Earth geometry
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    
    // Load High-Quality Earth textures
    const textureLoader = new THREE.TextureLoader();
    let loadedItems = 0;
    const totalItems = 3; // Number of textures to load
    
    const checkAllLoaded = () => {
      loadedItems++;
      if (loadedItems === totalItems) {
        setIsLoading(false);
      }
    };
    
    // Earth texture (day map)
    const earthTexture = textureLoader.load(
      'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_earth_daymap.jpg',
      checkAllLoaded
    );
    
    // Normal map for 3D terrain effect
    const normalMap = textureLoader.load(
      'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_earth_normal_map.jpg',
      checkAllLoaded
    );
    
    // Specular map for shiny water
    const specularMap = textureLoader.load(
      'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_earth_specular_map.jpg',
      checkAllLoaded
    );
    
    // Cloud texture
    const cloudTexture = textureLoader.load(
      'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2k_earth_clouds.jpg',
      checkAllLoaded
    );
    
    // Use PhongMaterial for better lighting effects
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(0.5, 0.5),
      specularMap: specularMap,
      specular: new THREE.Color(0x333333),
      shininess: 15
    });
    
    // Create Earth
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    earthRef.current = earth;
    
    // Create clouds layer
    const cloudGeometry = new THREE.SphereGeometry(5.1, 64, 64);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.6
    });
    
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);
    cloudsRef.current = clouds;
    
    // Add ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);
    
    // Directional light for sun effect
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);
    
    // Initial rotation - tilt similar to Earth's axis
    earth.rotation.x = 0.41; // ~23.5 degrees

    // Scroll-based animation control
    let targetRotationY = 0; 
    let currentRotationY = 0;
    
    const handleScroll = () => {
      if (!earthRef.current) return;
      // Convert scroll position to rotation value
      targetRotationY = window.scrollY * 0.002;
    };
    
    window.addEventListener('scroll', handleScroll);

    // Animation function
    const animate = () => {
      if (earthRef.current && cloudsRef.current) {
        // Base rotation - always happening
        currentRotationY += 0.001;
        
        // Scroll-based rotation
        currentRotationY = currentRotationY * 0.95 + targetRotationY * 0.05;
        
        earthRef.current.rotation.y = currentRotationY;
        
        // Clouds rotate slightly faster for realism
        cloudsRef.current.rotation.y = currentRotationY * 1.1;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full"></div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-primary">تحميل الكرة الأرضية...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Globe;
