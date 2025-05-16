import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const Globe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const cloudsRef = useRef<THREE.Mesh | null>(null);
  const atmosphereRef = useRef<THREE.Mesh | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // تهيئة المشهد
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // تهيئة الكاميرا مع زاوية رؤية أوسع
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    // تعديل موضع الكاميرا ليكون أقرب للكرة الأرضية
    camera.position.z = 12;
    cameraRef.current = camera;

    // تهيئة العرض مع تمكين التنعيم والشفافية
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // خلفية شفافة
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // إنشاء الكرة الأرضية
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    
    // مدير التحميل لتتبع تقدم تحميل الأصول
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progress = Math.floor((itemsLoaded / itemsTotal) * 100);
      setLoadingProgress(progress);
    };
    
    loadingManager.onLoad = () => {
      setIsLoaded(true);
    };

    // تحميل الملمس والخرائط
    const textureLoader = new THREE.TextureLoader(loadingManager);
    
    // ملمس الأرض
    const earthTexture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'
    );
    
    // خريطة التضاريس
    const earthBumpMap = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'
    );
    
    // خريطة الانعكاس للمحيطات
    const earthSpecularMap = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg'
    );
    
    // ملمس الغيوم
    const earthCloudsTexture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
    );
    
    // إنشاء الأرض باستخدام المواد المحسنة
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      normalMap: earthBumpMap,
      normalScale: new THREE.Vector2(0.15, 0.15),
      roughnessMap: earthSpecularMap, // استخدام خريطة الانعكاس كخريطة خشونة بدلاً من ذلك
      roughness: 0.7,
      metalness: 0.1
    });
    
    const earth = new THREE.Mesh(geometry, earthMaterial);
    earth.castShadow = true;
    earth.receiveShadow = true;
    // إمالة الأرض كما هي في الواقع
    earth.rotation.x = THREE.MathUtils.degToRad(23.5);
    scene.add(earth);
    earthRef.current = earth;
    
    // إضافة طبقة الغيوم
    const cloudsGeometry = new THREE.SphereGeometry(5.15, 64, 64);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: earthCloudsTexture,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    clouds.rotation.x = THREE.MathUtils.degToRad(23.5);
    scene.add(clouds);
    cloudsRef.current = clouds;

    // إضافة طبقة الغلاف الجوي
    const atmosphereGeometry = new THREE.SphereGeometry(5.3, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x0077ff,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.scale.set(1.05, 1.05, 1.05);
    scene.add(atmosphere);
    atmosphereRef.current = atmosphere;

    // إضافة إضاءة محيطة
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // إضافة إضاءة اتجاهية (تمثل الشمس)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(15, 5, 8);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // إضافة إضاءة نقطية للتفاصيل
    const pointLight = new THREE.PointLight(0x3399ff, 1.5, 20);
    pointLight.position.set(-10, 8, 5);
    scene.add(pointLight);
    pointLightRef.current = pointLight;
    
    // إضافة نجوم للخلفية
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    
    const starsVertices = [];
    for (let i = 0; i < 5000; i++) {
      const x = THREE.MathUtils.randFloatSpread(400);
      const y = THREE.MathUtils.randFloatSpread(400);
      const z = THREE.MathUtils.randFloatSpread(400);
      // تجنب النجوم القريبة جدًا للكاميرا
      if (Math.sqrt(x*x + y*y + z*z) < 20) continue;
      starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    starsRef.current = stars;

    // حلقة الحركة
    const animate = () => {
      if (earthRef.current) {
        // دوران الأرض حول نفسها ببطء
        earthRef.current.rotation.y += 0.0005;
        
        // تحريك الأرض استنادًا إلى موضع المؤشر
        earthRef.current.rotation.y += (mouseRef.current.x * 0.0005);
        earthRef.current.rotation.x = THREE.MathUtils.degToRad(23.5) + (mouseRef.current.y * 0.001);
      }
      
      if (cloudsRef.current) {
        // دوران الغيوم بسرعة أعلى قليلاً من الأرض
        cloudsRef.current.rotation.y += 0.0008;
        cloudsRef.current.rotation.x = earthRef.current?.rotation.x || 0;
      }
      
      if (atmosphereRef.current && earthRef.current) {
        // جعل الغلاف الجوي يتبع الأرض
        atmosphereRef.current.rotation.y = earthRef.current.rotation.y;
        atmosphereRef.current.rotation.x = earthRef.current.rotation.x;
      }
      
      if (starsRef.current) {
        // تدوير النجوم ببطء شديد
        starsRef.current.rotation.y += 0.0001;
      }
      
      if (pointLightRef.current) {
        // حركة الإضاءة النقطية
        const time = Date.now() * 0.001;
        pointLightRef.current.position.x = Math.sin(time * 0.2) * 15;
        pointLightRef.current.position.z = Math.cos(time * 0.2) * 15;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    // بدء الحركة
    animate();
    
    // تتبع حركة المؤشر للتفاعل مع الكرة الأرضية
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      // احسب موضع المؤشر النسبي إلى حجم الحاوية
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      const y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
      
      // تخزين موضع المؤشر للاستخدام في حلقة الحركة
      mouseRef.current = { x, y };
    };
    
    // التفاعل مع التمرير
    const handleScroll = () => {
      if (earthRef.current && cameraRef.current) {
        // حساب نسبة التمرير
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        const sectionElement = document.getElementById('discover');
        
        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop;
          const sectionHeight = sectionElement.offsetHeight;
          const distanceFromTop = scrollY - sectionTop;
          
          // حدد ما إذا كنا في منطقة القسم
          if (distanceFromTop >= -windowHeight && distanceFromTop <= sectionHeight) {
            const progress = distanceFromTop / (sectionHeight + windowHeight);
            const clampedProgress = Math.max(0, Math.min(1, progress + 0.5));
            
            // تطبيق تأثيرات التمرير
            earth.rotation.y = clampedProgress * Math.PI;
            camera.position.z = 12 - (clampedProgress * 2);
            camera.updateProjectionMatrix();
          }
        }
      }
    };
    
    // إضافة مستمعي الأحداث
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // التعامل مع تغيير حجم النافذة
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // تنظيف
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      
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
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/40 backdrop-blur-sm">
          <motion.div 
            className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <div className="text-white text-lg font-medium">
            {loadingProgress < 100 ? `تحميل... ${loadingProgress}%` : 'اكتمل التحميل!'}
          </div>
        </div>
      )}
      
      {/* توهج خلف الكرة الأرضية */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 z-0">
        <div className="w-[60%] h-[60%] rounded-full bg-accent/10 blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default Globe;