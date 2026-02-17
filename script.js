gsap.from(".animate",{
opacity:0,
y:50,
duration:1.5,
stagger:0.3
});


// Scroll Animation
gsap.utils.toArray("section").forEach(section=>{
gsap.from(section,{
scrollTrigger:section,
opacity:0,
y:100,
duration:1
});
});
// THREE JS Background
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({canvas:document.getElementById("bg"),alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);


const geometry=new THREE.IcosahedronGeometry(10,1);
const material=new THREE.MeshBasicMaterial({color:0xff00ff,wireframe:true});
const shape=new THREE.Mesh(geometry,material);
scene.add(shape);


camera.position.z=30;


function animate(){
requestAnimationFrame(animate);
shape.rotation.x+=0.01;
shape.rotation.y+=0.01;
renderer.render(scene,camera);
}
animate();
window.addEventListener('resize',()=>{
camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);
});


// Contact Form API Call
const form=document.getElementById("contactForm");
form.addEventListener("submit",async(e)=>{
e.preventDefault();
const formData=new FormData(form);
const data=Object.fromEntries(formData);


const response=await fetch("http://localhost:5000/contact",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
});


const result=await response.json();
document.getElementById("response").innerText=result.message;
});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/contact', (req, res) => {
const { name, email, message } = req.body;


console.log("New Message Received:");
console.log("Name:", name);
console.log("Email:", email);
console.log("Message:", message);


res.json({ message: "Your message has been sent successfully!" });
});


app.listen(5000, () => {
console.log('Server running on http://localhost:5000');
});