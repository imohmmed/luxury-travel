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
  const [isLoaded, setIsLoaded] = useState(false);

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
    // تحديد موقع الكاميرا بناءً على نسبة العرض إلى الارتفاع لضمان رؤية الكرة كاملة
    const aspectRatio = containerRef.current.clientWidth / containerRef.current.clientHeight;
    camera.position.z = aspectRatio < 1 ? 21 : 18; // إبعاد الكاميرا أكثر للشاشات الطويلة
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create Earth - جعل الكرة أكبر
    const geometry = new THREE.SphereGeometry(6.5, 64, 64);
    
    // Load Earth texture and bump map
    const textureLoader = new THREE.TextureLoader();
    
    // Earth texture
    const earthTexture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
      () => {
        setIsLoaded(true);
      }
    );
    
    // Earth bump map for terrain
    const earthBumpMap = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'
    );
    
    // Earth specular map for oceans
    const earthSpecularMap = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg'
    );
    
    // Earth clouds texture for second layer
    const earthCloudsTexture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
    );
    
    // Create main Earth sphere with physical material
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: earthBumpMap,
      bumpScale: 0.1,
      specularMap: earthSpecularMap,
      specular: new THREE.Color('grey'),
      shininess: 5
    });
    
    const earth = new THREE.Mesh(geometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;
    
    // Add clouds layer
    const cloudsGeometry = new THREE.SphereGeometry(5.1, 64, 64);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: earthCloudsTexture,
      transparent: true,
      opacity: 0.4
    });
    
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    scene.add(clouds);
    cloudsRef.current = clouds;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light (simulating sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 6, 8);
    scene.add(directionalLight);
    
    // Add background stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true
    });
    
    const starsVertices = [];
    for (let i = 0; i < 3000; i++) {
      const x = THREE.MathUtils.randFloatSpread(300);
      const y = THREE.MathUtils.randFloatSpread(300);
      const z = THREE.MathUtils.randFloatSpread(300);
      starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Animation loop
    const animate = () => {
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.001;
      }
      
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += 0.0015;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // دالة تحريك وتكبير الكرة الأرضية بناءً على اتجاه التمرير
    const handleScroll = () => {
      if (earthRef.current && cameraRef.current && containerRef.current) {
        // قياس موقع العنصر بالنسبة لنافذة العرض
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // حساب نسبة رؤية العنصر في النافذة
        const visibleRatio = Math.min(Math.max((windowHeight - rect.top) / windowHeight, 0), 1);

        // تطبيق التغييرات على الكرة الأرضية
        
        // تكبير الكرة عند التمرير للأعلى
        const scale = 0.8 + (visibleRatio * 0.4); // يبدأ بـ 0.8 ويصل إلى 1.2
        earthRef.current.scale.set(scale, scale, scale);
        cloudsRef.current?.scale.set(scale, scale, scale);
        
        // تدوير الكرة
        earthRef.current.rotation.y = visibleRatio * Math.PI;
        
        // تقريب الكاميرا مع التمرير للأعلى
        cameraRef.current.position.z = 17 - (visibleRatio * 5);
        cameraRef.current.updateProjectionMatrix();
      }
    };
    
    // إضافة مستمع حدث التمرير
    window.addEventListener('scroll', handleScroll);
    
    // Handle window resize
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
    <div ref={containerRef} className="w-full h-full relative">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
      )}
    </div>
  );
};

export default Globe;