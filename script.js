// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Gallery Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
            if(filter==='all' || item.getAttribute('data-category')===filter){
                item.style.display='block';
                setTimeout(()=>{ item.style.opacity='1'; item.style.transform='scale(1)'; },10);
            } else {
                item.style.opacity='0';
                item.style.transform='scale(0.8)';
                setTimeout(()=>{ item.style.display='none'; },300);
            }
        });
    });
});

// WhatsApp Form Submission
document.getElementById('eventForm').addEventListener('submit', function(e){
    e.preventDefault(); // prevent page reload

    const name = this.querySelector('[name="name"]').value;
    const email = this.querySelector('[name="email"]').value;
    const phone = this.querySelector('[name="phone"]').value;
    const eventType = this.querySelector('[name="eventType"]').value;
    const eventDate = this.querySelector('[name="eventDate"]').value;
    const message = this.querySelector('[name="message"]').value;

    if(name === '' || email === '' || message === ''){
        alert('Please fill all required fields!');
        return;
    }

    const whatsappNumber = '919835099372';
    const text = `New Event Inquiry:%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AEvent Type: ${eventType}%0AEvent Date: ${eventDate}%0AMessage: ${message}`;

    // Open WhatsApp link
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');

    this.reset();
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click',function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior:'smooth' });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', ()=>{
    const navbar=document.querySelector('.navbar');
    if(window.scrollY>50){
        navbar.style.background='rgba(255,255,255,0.98)';
        navbar.style.boxShadow='0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background='rgba(255,255,255,0.95)';
        navbar.style.boxShadow='0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Quote buttons scroll
document.querySelectorAll('.quote-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        document.getElementById('contact').scrollIntoView({behavior:'smooth'});
    });
});

// Animation on scroll
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.style.opacity='1';
            entry.target.style.transform='translateY(0)';
        }
    });
},{threshold:0.1});

document.querySelectorAll('.service-card,.testimonial,.team-member,.service-detail-item,.gallery-item').forEach(el=>{
    observer.observe(el);
});

// ---------- 3D Hero Section ----------
const heroContainer=document.getElementById('three-hero');
if(heroContainer){
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    heroContainer.appendChild(renderer.domElement);

    const geometry=new THREE.BoxGeometry(2,2,2);
    const material=new THREE.MeshStandardMaterial({color:0x00ff00,wireframe:false});
    const cube=new THREE.Mesh(geometry,material);
    scene.add(cube);

    const light=new THREE.DirectionalLight(0xffffff,1);
    light.position.set(5,5,5);
    scene.add(light);

    camera.position.z=5;

    function animateHero(){
        requestAnimationFrame(animateHero);
        cube.rotation.x+=0.01;
        cube.rotation.y+=0.01;
        renderer.render(scene,camera);
    }
    animateHero();

    window.addEventListener('resize',()=>{
        camera.aspect=window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth,window.innerHeight);
    });
}
