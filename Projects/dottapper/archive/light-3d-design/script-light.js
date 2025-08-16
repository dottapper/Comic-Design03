// ===== GLOBAL VARIABLES =====
let scene, camera, renderer;
let mainObject, particleSystem;
let workObjects = [];
let mouse = { x: 0, y: 0 };
let isThreeJSLoaded = false;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Three.jsが読み込まれているかチェック
    if (typeof THREE !== 'undefined') {
        isThreeJSLoaded = true;
        initThreeJS();
    } else {
        console.warn('Three.js not loaded, using fallback 3D effects');
        initFallback3D();
    }
    
    initNavigation();
    initASCIIAnimation();
    initScrollEffects();
    initModal();
    initInteractions();
    initMouseTracking();
}

// ===== THREE.JS SETUP =====
function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    const container = document.getElementById('three-canvas-container');
    
    if (!canvas || !container) return;
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = null; // 透明背景
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create floating objects
    createFloatingObjects();
    createParticleSystem();
    createMainHeroObject();
    createWorkObjects();
    
    // Start animation loop
    animate();
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

function createFloatingObjects() {
    // Create various 3D shapes that float in the background
    const shapes = [];
    
    // Torus
    const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 8, 16);
    const torusMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xff6b9d,
        transparent: true,
        opacity: 0.7
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-3, 2, -2);
    shapes.push(torus);
    
    // Sphere
    const sphereGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const sphereMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x4ecdc4,
        transparent: true,
        opacity: 0.8
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(3, -1, -1);
    shapes.push(sphere);
    
    // Cube
    const cubeGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const cubeMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x95e1d3,
        transparent: true,
        opacity: 0.6
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-2, -2, -3);
    shapes.push(cube);
    
    // Octahedron
    const octaGeometry = new THREE.OctahedronGeometry(0.5);
    const octaMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xa8e6cf,
        transparent: true,
        opacity: 0.7
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.set(2, 2, -2);
    shapes.push(octahedron);
    
    shapes.forEach(shape => {
        shape.userData = {
            originalPosition: shape.position.clone(),
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            floatSpeed: Math.random() * 0.02 + 0.01
        };
        scene.add(shape);
    });
    
    window.floatingShapes = shapes;
}

function createParticleSystem() {
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    
    const colors = [
        new THREE.Color(0xff6b9d),
        new THREE.Color(0x4ecdc4),
        new THREE.Color(0x95e1d3),
        new THREE.Color(0xa8e6cf),
        new THREE.Color(0xffaaa5)
    ];
    
    for (let i = 0; i < particleCount; i++) {
        // Position
        particlePositions[i * 3] = (Math.random() - 0.5) * 20;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        
        // Color
        const color = colors[Math.floor(Math.random() * colors.length)];
        particleColors[i * 3] = color.r;
        particleColors[i * 3 + 1] = color.g;
        particleColors[i * 3 + 2] = color.b;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });
    
    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
}

function createMainHeroObject() {
    const container = document.getElementById('main-3d-object');
    if (!container) return;
    
    // Create a dedicated scene for the hero object
    const heroScene = new THREE.Scene();
    const heroCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    const heroRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    heroRenderer.setSize(400, 400);
    heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(heroRenderer.domElement);
    
    // Lighting for hero object
    const heroAmbient = new THREE.AmbientLight(0xffffff, 0.4);
    heroScene.add(heroAmbient);
    
    const heroDirectional = new THREE.DirectionalLight(0xffffff, 0.8);
    heroDirectional.position.set(2, 2, 5);
    heroScene.add(heroDirectional);
    
    // Create main object - a complex geometric shape
    const group = new THREE.Group();
    
    // Central sphere
    const mainSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.8, 20, 20),
        new THREE.MeshPhongMaterial({ 
            color: 0xff6b9d,
            transparent: true,
            opacity: 0.9,
            shininess: 100
        })
    );
    group.add(mainSphere);
    
    // Orbiting elements
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const orbitRadius = 1.5;
        
        const orbitingSphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 8, 8),
            new THREE.MeshPhongMaterial({ 
                color: [0x4ecdc4, 0x95e1d3, 0xa8e6cf][i % 3],
                transparent: true,
                opacity: 0.8
            })
        );
        
        orbitingSphere.position.set(
            Math.cos(angle) * orbitRadius,
            Math.sin(angle) * orbitRadius * 0.3,
            Math.sin(angle) * orbitRadius
        );
        
        orbitingSphere.userData = { 
            angle: angle,
            orbitRadius: orbitRadius,
            speed: 0.02 + i * 0.005
        };
        
        group.add(orbitingSphere);
    }
    
    heroScene.add(group);
    heroCamera.position.z = 3;
    
    // Animation for hero object
    function animateHero() {
        requestAnimationFrame(animateHero);
        
        // Rotate main group
        group.rotation.y += 0.01;
        group.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;
        
        // Animate orbiting spheres
        group.children.forEach((child, index) => {
            if (child.userData.angle !== undefined) {
                child.userData.angle += child.userData.speed;
                const angle = child.userData.angle;
                const radius = child.userData.orbitRadius;
                
                child.position.set(
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius * 0.3,
                    Math.sin(angle) * radius
                );
            }
        });
        
        // Mouse interaction
        const mouseInfluence = 0.0005;
        group.rotation.y += mouse.x * mouseInfluence;
        group.rotation.x += mouse.y * mouseInfluence;
        
        heroRenderer.render(heroScene, heroCamera);
    }
    
    animateHero();
}

function createWorkObjects() {
    // Create 3D objects for work items
    const workItems = document.querySelectorAll('.work-3d');
    
    workItems.forEach((container, index) => {
        if (!container) return;
        
        const workScene = new THREE.Scene();
        const workCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        const workRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        workRenderer.setSize(300, 250);
        workRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(workRenderer.domElement);
        
        // Lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        workScene.add(ambient);
        
        const directional = new THREE.DirectionalLight(0xffffff, 0.7);
        directional.position.set(1, 1, 1);
        workScene.add(directional);
        
        // Create different objects for different work types
        let object;
        
        if (index === 0) {
            // Photogrammetry - Complex mesh
            const geometry = new THREE.IcosahedronGeometry(0.8, 1);
            const material = new THREE.MeshPhongMaterial({ 
                color: 0x4ecdc4,
                transparent: true,
                opacity: 0.8,
                wireframe: true
            });
            object = new THREE.Mesh(geometry, material);
        } else if (index === 1) {
            // WebAR - Augmented cube
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshPhongMaterial({ 
                color: 0xff6b9d,
                transparent: true,
                opacity: 0.7
            });
            object = new THREE.Mesh(geometry, material);
            
            // Add wireframe overlay
            const wireframe = new THREE.WireframeGeometry(geometry);
            const wireMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
            const wireframeMesh = new THREE.LineSegments(wireframe, wireMaterial);
            object.add(wireframeMesh);
        }
        
        if (object) {
            workScene.add(object);
            workCamera.position.z = 2;
            
            // Animation
            function animateWork() {
                requestAnimationFrame(animateWork);
                
                object.rotation.x += 0.01;
                object.rotation.y += 0.02;
                
                workRenderer.render(workScene, workCamera);
            }
            
            animateWork();
        }
    });
}

function animate() {
    if (!isThreeJSLoaded) return;
    
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Animate floating shapes
    if (window.floatingShapes) {
        window.floatingShapes.forEach((shape, index) => {
            // Rotation
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;
            
            // Floating motion
            shape.position.y = shape.userData.originalPosition.y + 
                               Math.sin(time * shape.userData.floatSpeed + index) * 0.5;
            
            // Mouse interaction
            const mouseInfluence = 0.001;
            shape.position.x = shape.userData.originalPosition.x + mouse.x * mouseInfluence * (index + 1);
            shape.position.z = shape.userData.originalPosition.z + mouse.y * mouseInfluence * (index + 1);
        });
    }
    
    // Animate particle system
    if (particleSystem) {
        particleSystem.rotation.y += 0.001;
        
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(time + i) * 0.001;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
    }
    
    // Camera movement based on mouse
    camera.position.x = mouse.x * 0.0005;
    camera.position.y = mouse.y * 0.0005;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    if (!isThreeJSLoaded) return;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ===== FALLBACK 3D EFFECTS =====
function initFallback3D() {
    // CSS-based 3D effects when Three.js is not available
    const containers = document.querySelectorAll('#main-3d-object, .work-3d, #profile-3d, #contact-3d');
    
    containers.forEach((container, index) => {
        const fallbackElement = document.createElement('div');
        fallbackElement.className = 'fallback-3d';
        fallbackElement.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, 
                ${['#ff6b9d', '#4ecdc4', '#95e1d3', '#a8e6cf'][index % 4]}, 
                ${['#ffaaa5', '#ff6b9d', '#4ecdc4', '#95e1d3'][index % 4]});
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2rem;
            font-weight: 300;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            animation: fallbackFloat 6s ease-in-out infinite;
            animation-delay: ${index * 0.5}s;
        `;
        
        const symbols = ['◉', '◈', '◯', '▲'];
        fallbackElement.textContent = symbols[index % symbols.length];
        
        container.appendChild(fallbackElement);
    });
    
    // Add CSS animation
    if (!document.querySelector('#fallback-styles')) {
        const style = document.createElement('style');
        style.id = 'fallback-styles';
        style.textContent = `
            @keyframes fallbackFloat {
                0%, 100% { 
                    transform: translateY(0px) rotateY(0deg); 
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                }
                50% { 
                    transform: translateY(-20px) rotateY(180deg); 
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                updateActiveNav(targetId);
            }
        });
    });
    
    // Update active nav on scroll
    let ticking = false;
    function updateNavOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const sections = document.querySelectorAll('section[id]');
                const scrollPosition = window.scrollY + 100;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        updateActiveNav(`#${sectionId}`);
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateNavOnScroll);
}

function updateActiveNav(targetId) {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ===== ASCII ANIMATION =====
function initASCIIAnimation() {
    const asciiFrame = document.getElementById('ascii-frame');
    if (!asciiFrame) return;
    
    const patterns = [
        '◉ ◈ ◯\n◈ ◯ ◉\n◯ ◉ ◈',
        '◯ ◉ ◈\n◉ ◈ ◯\n◈ ◯ ◉',
        '◈ ◯ ◉\n◯ ◉ ◈\n◉ ◈ ◯',
        '● ◆ ○\n◆ ○ ●\n○ ● ◆'
    ];
    
    let currentPattern = 0;
    setInterval(() => {
        asciiFrame.textContent = patterns[currentPattern];
        currentPattern = (currentPattern + 1) % patterns.length;
    }, 2000);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations
                if (entry.target.classList.contains('work-item')) {
                    animateWorkItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elements = document.querySelectorAll('.work-item, .section-container, .floating-skill');
    elements.forEach(el => observer.observe(el));
}

function animateWorkItem(item) {
    const delay = Array.from(item.parentElement.children).indexOf(item) * 200;
    
    setTimeout(() => {
        item.style.animation = 'slideInUp 0.8s ease-out forwards';
    }, delay);
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#work-animations')) {
        const style = document.createElement('style');
        style.id = 'work-animations';
        style.textContent = `
            @keyframes slideInUp {
                0% {
                    transform: translateY(50px);
                    opacity: 0;
                }
                100% {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== MODAL =====
function initModal() {
    const modal = document.getElementById('work-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.modal-close');
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        item.addEventListener('click', function() {
            const workType = this.dataset.work;
            const title = this.querySelector('.work-info h3').textContent;
            const description = this.querySelector('.work-info p').textContent;
            const tech = this.querySelector('.work-tech').textContent;
            
            openModal(workType, title, description, tech);
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function openModal(workType, title, description, tech) {
        if (!modalBody || !modal) return;
        
        modalBody.innerHTML = generateModalContent(workType, title, description, tech);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function generateModalContent(workType, title, description, tech) {
        const baseContent = `
            <h2 style="font-size: 2.5rem; font-weight: 300; color: var(--text-primary); margin-bottom: 1rem;">
                ${title}
            </h2>
            <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 2rem;">
                ${description}
            </p>
            <div style="display: inline-block; background: rgba(255, 107, 157, 0.1); padding: 0.5rem 1rem; border-radius: 15px; color: var(--accent-pink); font-size: 0.9rem; margin-bottom: 3rem;">
                ${tech}
            </div>
        `;
        
        if (workType === 'photogrammetry') {
            return baseContent + `
                <div style="height: 300px; background: var(--gradient-cool); border-radius: 20px; margin: 2rem 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">◉ ◈ ◯</div>
                        <div>3D Model Viewer</div>
                        <div style="font-size: 1rem; margin-top: 0.5rem; opacity: 0.8;">[Three.js Implementation]</div>
                    </div>
                </div>
                <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Project Details</h3>
                <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
                    このプロジェクトでは、高精度フォトグラメトリー技術を使用して古建築を3Dデジタル化しています。
                    現実の物理的構造を仮想空間に保存し、文化遺産の保護と教育に活用しています。
                </p>
                <h4 style="color: var(--accent-blue); margin-bottom: 0.5rem;">技術仕様:</h4>
                <ul style="color: var(--text-secondary); line-height: 1.6; padding-left: 1.5rem;">
                    <li>高解像度写真撮影（500-1000枚）</li>
                    <li>Agisoft Metashapeによる3D再構築</li>
                    <li>Three.jsによるWeb表示最適化</li>
                    <li>リアルタイムレンダリング対応</li>
                </ul>
            `;
        } else if (workType === 'watercolor') {
            return baseContent + `
                <div style="height: 300px; background: var(--gradient-warm); border-radius: 20px; margin: 2rem 0; display: flex; align-items: center; justify-content: center;">
                    <img src="images/スクリーンショット 2025-08-16 18.21.32.png" style="max-width: 100%; max-height: 100%; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);" alt="Watercolor Art" />
                </div>
                <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Artistic Process</h3>
                <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
                    デジタルツールを使用した水彩技法の探求。伝統的な水彩画の有機的な色彩表現を
                    デジタル環境で再現し、新しい表現の可能性を追求しています。
                </p>
                <h4 style="color: var(--accent-pink); margin-bottom: 0.5rem;">使用ツール:</h4>
                <ul style="color: var(--text-secondary); line-height: 1.6; padding-left: 1.5rem;">
                    <li>Procreate（iPad Pro + Apple Pencil）</li>
                    <li>Adobe Photoshop（色彩調整・合成）</li>
                    <li>カスタムブラシ設定</li>
                    <li>レイヤーブレンディング技法</li>
                </ul>
            `;
        } else if (workType === 'webaar') {
            return baseContent + `
                <div style="height: 300px; background: var(--gradient-soft); border-radius: 20px; margin: 2rem 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">◯ ◉ ◯</div>
                        <div>WebAR Experience</div>
                        <div style="font-size: 1rem; margin-top: 0.5rem; opacity: 0.8;">[Browser-based AR]</div>
                    </div>
                </div>
                <h3 style="color: var(--text-primary); margin-bottom: 1rem;">次世代ウェブ体験</h3>
                <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
                    WebXR APIを活用したブラウザベースのAR体験。アプリインストール不要で、
                    ユーザーは即座に拡張現実コンテンツを体験できます。
                </p>
                <h4 style="color: var(--accent-green); margin-bottom: 0.5rem;">主な機能:</h4>
                <ul style="color: var(--text-secondary); line-height: 1.6; padding-left: 1.5rem;">
                    <li>リアルタイム環境認識</li>
                    <li>3Dオブジェクト配置・操作</li>
                    <li>マルチプラットフォーム対応</li>
                    <li>プログレッシブウェブアプリ対応</li>
                </ul>
            `;
        } else if (workType === 'installation') {
            return baseContent + `
                <div style="height: 300px; background: var(--bg-secondary); border-radius: 20px; margin: 2rem 0; overflow: hidden;">
                    <img src="images/スクリーンショット 2025-08-16 18.21.39.png" style="width: 100%; height: 100%; object-fit: cover;" alt="Interactive Installation" />
                </div>
                <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Interactive Environment</h3>
                <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
                    物理空間とデジタル技術を融合したインタラクティブインスタレーション。
                    人の動きや存在に反応し、リアルタイムで変化する環境を創出します。
                </p>
                <h4 style="color: var(--accent-purple); margin-bottom: 0.5rem;">技術構成:</h4>
                <ul style="color: var(--text-secondary); line-height: 1.6; padding-left: 1.5rem;">
                    <li>TouchDesigner（ビジュアルプログラミング）</li>
                    <li>Arduino + センサー（動作検知）</li>
                    <li>プロジェクションマッピング</li>
                    <li>サウンドリアクティブ機能</li>
                </ul>
            `;
        }
        
        return baseContent;
    }
}

// ===== INTERACTIONS =====
function initInteractions() {
    // Smooth hover effects for work items
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, { 
                    duration: 0.3, 
                    y: -10, 
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                    ease: "power2.out"
                });
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, { 
                    duration: 0.3, 
                    y: 0, 
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                    ease: "power2.out"
                });
            }
        });
    });
    
    // Contact link interactions
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    x: 10,
                    ease: "power2.out"
                });
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    x: 0,
                    ease: "power2.out"
                });
            }
        });
    });
}

// ===== MOUSE TRACKING =====
function initMouseTracking() {
    document.addEventListener('mousemove', function(e) {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        
        // Apply mouse parallax to floating objects
        const floatingObjects = document.querySelectorAll('.floating-object');
        floatingObjects.forEach((obj, index) => {
            const speed = (index + 1) * 0.02;
            const x = mouse.x * speed * 20;
            const y = mouse.y * speed * 20;
            
            if (typeof gsap !== 'undefined') {
                gsap.to(obj, {
                    duration: 1,
                    x: x,
                    y: y,
                    ease: "power2.out"
                });
            } else {
                obj.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    });
}

// ===== WINDOW EVENTS =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && typeof gsap !== 'undefined') {
            gsap.fromTo(heroTitle, 
                { y: 50, opacity: 0 },
                { duration: 1, y: 0, opacity: 1, ease: "power2.out" }
            );
        }
    }, 500);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (isThreeJSLoaded) {
            onWindowResize();
        }
    }, 100);
});