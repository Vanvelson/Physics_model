const nuclei = {
 'H-1': {Z:1, N:0, name:'Водень-1', symbol:'¹₁H', mass:1.007825, isotopes:['H-1','H-2','H-3'], stable:true},
 'H-2': {Z:1, N:1, name:'Дейтерій', symbol:'²₁H', mass:2.014102, isotopes:['H-1','H-2','H-3'], stable:true, group:'H'},
 'H-3': {Z:1, N:2, name:'Тритій', symbol:'³₁H', mass:3.016049, isotopes:['H-1','H-2','H-3'], stable:false, group:'H'},
 'He-3': {Z:2, N:1, name:'Гелій-3', symbol:'³₂He', mass:3.016029, isotopes:['He-3','He-4'], stable:true, group:'He'},
 'He-4': {Z:2, N:2, name:'Гелій-4', symbol:'⁴₂He', mass:4.002602, isotopes:['He-3','He-4'], stable:true},
 'C-12': {Z:6, N:6, name:'Карбон-12', symbol:'¹²₆C', mass:12.000000, isotopes:['C-12','C-13','C-14'], stable:true},
 'C-13': {Z:6, N:7, name:'Карбон-13', symbol:'¹³₆C', mass:13.003355, isotopes:['C-12','C-13','C-14'], stable:true, group:'C'},
 'C-14': {Z:6, N:8, name:'Карбон-14', symbol:'¹⁴₆C', mass:14.003242, isotopes:['C-12','C-13','C-14'], stable:false, group:'C'},
 'N-14': {Z:7, N:7, name:'Азот-14', symbol:'¹⁴₇N', mass:14.003074, isotopes:['N-14','N-15'], stable:true},
 'N-15': {Z:7, N:8, name:'Азот-15', symbol:'¹⁵₇N', mass:15.000109, isotopes:['N-14','N-15'], stable:true, group:'N'},
 'O-16': {Z:8, N:8, name:'Кисень-16', symbol:'¹⁶₈O', mass:15.994915, isotopes:['O-16','O-17','O-18'], stable:true},
 'O-17': {Z:8, N:9, name:'Кисень-17', symbol:'¹⁷₈O', mass:16.999132, isotopes:['O-16','O-17','O-18'], stable:true, group:'O'},
 'O-18': {Z:8, N:10, name:'Кисень-18', symbol:'¹⁸₈O', mass:17.999160, isotopes:['O-16','O-17','O-18'], stable:true, group:'O'},
 'Si-28': {Z:14, N:14, name:'Силіцій-28', symbol:'²⁸₁₄Si', mass:27.976927, isotopes:['Si-28','Si-29','Si-30'], stable:true},
 'Si-29': {Z:14, N:15, name:'Силіцій-29', symbol:'²⁹₁₄Si', mass:28.976495, isotopes:['Si-28','Si-29','Si-30'], stable:true, group:'Si'},
 'Si-30': {Z:14, N:16, name:'Силіцій-30', symbol:'³⁰₁₄Si', mass:29.973770, isotopes:['Si-28','Si-29','Si-30'], stable:true, group:'Si'},
 'Fe-54': {Z:26, N:28, name:'Залізо-54', symbol:'⁵⁴₂₆Fe', mass:53.939611, isotopes:['Fe-54','Fe-56','Fe-58'], stable:true, group:'Fe'},
 'Fe-56': {Z:26, N:30, name:'Залізо-56', symbol:'⁵⁶₂₆Fe', mass:55.934939, isotopes:['Fe-54','Fe-56','Fe-58'], stable:true},
 'Fe-58': {Z:26, N:32, name:'Залізо-58', symbol:'⁵⁸₂₆Fe', mass:57.933275, isotopes:['Fe-54','Fe-56','Fe-58'], stable:true, group:'Fe'},
 'Cu-63': {Z:29, N:34, name:'Мідь-63', symbol:'⁶³₂₉Cu', mass:62.929601, isotopes:['Cu-63','Cu-65'], stable:true},
 'Cu-65': {Z:29, N:36, name:'Мідь-65', symbol:'⁶⁵₂₉Cu', mass:64.927794, isotopes:['Cu-63','Cu-65'], stable:true, group:'Cu'},
 'Ag-107': {Z:47, N:60, name:'Срібло-107', symbol:'¹⁰⁷₄₇Ag', mass:106.905097, isotopes:['Ag-107','Ag-109'], stable:true},
 'Ag-109': {Z:47, N:62, name:'Срібло-109', symbol:'¹⁰⁹₄₇Ag', mass:108.904752, isotopes:['Ag-107','Ag-109'], stable:true, group:'Ag'},
 'Au-197': {Z:79, N:118, name:'Золото-197', symbol:'¹⁹⁷₇₉Au', mass:196.966569, isotopes:['Au-197'], stable:true},
 'U-235': {Z:92, N:143, name:'Уран-235', symbol:'²³⁵₉₂U', mass:235.043930, isotopes:['U-235','U-238'], stable:false, group:'U'},
 'U-238': {Z:92, N:146, name:'Уран-238', symbol:'²³⁸₉₂U', mass:238.050788, isotopes:['U-235','U-238'], stable:false}
};

const mainElements = ['H-1','He-4','C-12','N-14','O-16','Si-28','Fe-56','Cu-63','Ag-107','Au-197','U-238'];

const mp = 1.007276, mn = 1.008665, amu2MeV = 931.5;

function calcBinding(key){
 const n = nuclei[key]; if(!n||!n.mass) return null;
 const A = n.Z+n.N;
 const dm = (n.Z*mp + n.N*mn) - n.mass;
 const Eb = dm*amu2MeV;
 const f = A>0 ? Eb/A : 0;
 return {dm,Eb,f,mass:n.mass,A};
}

function showPage(id, btn){
 document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
 document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
 document.getElementById('page-'+id).classList.add('active');
 if(btn) btn.classList.add('active');
 if(id==='table') buildTable();
 if(id==='history') buildTimeline();
 if(id==='quiz') startQuiz();
 if(id==='model') setTimeout(()=>onWindowResize(),50);
}

let currentNucleus = 'C-12';
let scene,camera,renderer,nucleusGroup;
let targetRotation={x:0,y:0};

function init3D(){
 const container = document.getElementById('canvas3d');
 scene = new THREE.Scene();
 camera = new THREE.PerspectiveCamera(75, container.clientWidth/container.clientHeight, 0.1, 1000);
 camera.position.z = 150;
 renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
 renderer.setPixelRatio(window.devicePixelRatio);
 renderer.setSize(container.clientWidth, container.clientHeight);
 container.appendChild(renderer.domElement);
 scene.add(new THREE.AmbientLight(0xffffff,0.65));
 const l1=new THREE.PointLight(0xffcc00,1.4); l1.position.set(200,200,200); scene.add(l1);
 const l2=new THREE.PointLight(0x4477ff,0.8); l2.position.set(-200,-200,-200); scene.add(l2);
 nucleusGroup=new THREE.Group(); scene.add(nucleusGroup);
 window.addEventListener('mousemove',onMouseMove);
 window.addEventListener('resize',onWindowResize);
 drawNucleus3D(); animate();
}

function drawNucleus3D(){
 while(nucleusGroup.children.length>0) nucleusGroup.remove(nucleusGroup.children[0]);
 const nucleus=nuclei[currentNucleus];
 const total=nucleus.Z+nucleus.N;
 const nucleusRadius=Math.pow(total,1/3)*3.5;
 const pr=5.5;
 const pGeo=new THREE.SphereGeometry(pr,32,32);
 const nGeo=new THREE.SphereGeometry(pr,32,32);
 const pMat=new THREE.MeshStandardMaterial({color:0xff4444,emissive:0xff5555,emissiveIntensity:.7,metalness:.45,roughness:.2});
 const nMat=new THREE.MeshStandardMaterial({color:0x4477ff,emissive:0x6699ff,emissiveIntensity:.7,metalness:.45,roughness:.2});
 const positions=[];
 for(let i=0;i<total;i++){
 let x,y,z,d;
 do{x=(Math.random()-.5)*2;y=(Math.random()-.5)*2;z=(Math.random()-.5)*2;d=Math.sqrt(x*x+y*y+z*z);}while(d>1);
 positions.push({x:x*nucleusRadius,y:y*nucleusRadius,z:z*nucleusRadius});
 }
 for(let i=0;i<nucleus.Z;i++){const p=positions[i];const m=new THREE.Mesh(pGeo,pMat);m.position.set(p.x,p.y,p.z);nucleusGroup.add(m);}
 for(let i=nucleus.Z;i<total;i++){const p=positions[i];const m=new THREE.Mesh(nGeo,nMat);m.position.set(p.x,p.y,p.z);nucleusGroup.add(m);}
 const sGeo=new THREE.SphereGeometry(nucleusRadius+8,64,64);
 const sMat=new THREE.MeshBasicMaterial({color:0xffcc00,wireframe:true,transparent:true,opacity:.18});
 nucleusGroup.add(new THREE.Mesh(sGeo,sMat));
}

function onMouseMove(e){
 targetRotation.y=((e.clientX/window.innerWidth)*2-1)*1.8;
 targetRotation.x=(-(e.clientY/window.innerHeight)*2+1)*1.8;
}
function onWindowResize(){
 const c=document.getElementById('canvas3d');
 if(!c||!renderer) return;
 camera.aspect=c.clientWidth/c.clientHeight;
 camera.updateProjectionMatrix();
 renderer.setSize(c.clientWidth,c.clientHeight);
}
function animate(){
 requestAnimationFrame(animate);
 nucleusGroup.rotation.x+=(targetRotation.x-nucleusGroup.rotation.x)*0.05;
 nucleusGroup.rotation.y+=(targetRotation.y-nucleusGroup.rotation.y)*0.05;
 renderer.render(scene,camera);
}

function updateCalc(key){
 const r=calcBinding(key); if(!r) return;
 document.getElementById('nucMass').textContent=r.mass.toFixed(6);
 document.getElementById('massDefect').textContent=r.dm.toFixed(6)+' а.м.о.';
 document.getElementById('bindingEnergy').textContent=r.Eb.toFixed(2)+' МеВ';
 document.getElementById('specificBinding').textContent=r.f.toFixed(2)+' МеВ/нуклон';
}

function updateIsotopes(key){
 const n=nuclei[key];
 const isos=n.isotopes||[key];
 document.getElementById('isotopeInfo').textContent=
 isos.length>1
 ? `Ізотопи мають однакове Z=${n.Z}, але різну кількість нейтронів.`
 : 'Лише один відомий стабільний ізотоп.';
 const row=document.getElementById('isotopeRow');
 row.innerHTML='';
 isos.forEach(k=>{
 if(!nuclei[k]) return;
 const b=document.createElement('button');
 b.className='iso-btn'+(k===key?' active':'');
 b.textContent=nuclei[k].symbol; b.title=nuclei[k].name;
 b.onclick=()=>selectNucleus(k);
 row.appendChild(b);
 });
}

const chartData=[
 [1,0],[2,1.11],[3,2.57],[4,7.07],[6,5.33],[7,5.6],[8,7.06],
 [9,6.46],[10,6.75],[12,7.68],[14,7.48],[16,7.98],[20,8.03],
 [24,8.26],[28,8.45],[32,8.48],[40,8.55],[48,8.63],[56,8.79],
 [60,8.78],[63,8.75],[80,8.71],[100,8.64],[120,8.5],[140,8.36],
 [150,8.21],[160,8.15],[180,7.98],[197,7.92],[208,7.87],[238,7.57]
];

function drawChart(highlightA){
 const cvs=document.getElementById('bindingChart');
 if(!cvs) return;
 const ctx=cvs.getContext('2d');
 const W=cvs.width=cvs.offsetWidth;
 const H=cvs.height=cvs.offsetHeight||130;
 ctx.clearRect(0,0,W,H);
 const pad={l:26,r:6,t:6,b:6};
 const gW=W-pad.l-pad.r, gH=H-pad.t-pad.b;
 const maxA=245,maxF=10;
 function tx(a){return pad.l+(a/maxA)*gW;}
 function ty(f){return pad.t+gH-(f/maxF)*gH;}
 ctx.strokeStyle='rgba(255,255,255,0.05)';ctx.lineWidth=1;
 [2,4,6,8,10].forEach(f=>{
 ctx.beginPath();ctx.moveTo(pad.l,ty(f));ctx.lineTo(W-pad.r,ty(f));ctx.stroke();
 ctx.fillStyle='rgba(255,255,255,0.28)';ctx.font='9px Segoe UI';ctx.fillText(f,2,ty(f)+3);
 });
 const grad=ctx.createLinearGradient(pad.l,0,W-pad.r,0);
 grad.addColorStop(0,'#4d7dff');grad.addColorStop(0.3,'#ffcc00');
 grad.addColorStop(0.55,'#ff4444');grad.addColorStop(1,'#ff7700');
 ctx.beginPath();
 chartData.forEach(([a,f],i)=>{ if(i===0) ctx.moveTo(tx(a),ty(f)); else ctx.lineTo(tx(a),ty(f)); });
 ctx.strokeStyle=grad;ctx.lineWidth=2.5;ctx.lineJoin='round';ctx.stroke();
 if(highlightA){
 let fVal=0;
 for(let i=0;i<chartData.length-1;i++){
 const[a1,f1]=chartData[i],[a2,f2]=chartData[i+1];
 if(highlightA>=a1&&highlightA<=a2){fVal=f1+(f2-f1)*(highlightA-a1)/(a2-a1);break;}
 }
 ctx.beginPath();ctx.arc(tx(highlightA),ty(fVal),5,0,Math.PI*2);
 ctx.fillStyle='#ffcc00';ctx.fill();
 ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();
 const r=calcBinding(currentNucleus);
 document.getElementById('chartCurrentLabel').innerHTML=
 `${nuclei[currentNucleus].name} — <span>${r?r.f.toFixed(2):'—'} МеВ/нуклон</span>`;
 }
}

function selectNucleus(key){
 currentNucleus=key;
 document.querySelectorAll('.element-btn').forEach(b=>{
 b.classList.remove('active');
 if(b.dataset.nucleus===key) b.classList.add('active');
 });
 const n=nuclei[key];
 document.getElementById('elementName').textContent=n.name;
 document.getElementById('massNumber').textContent=n.Z+n.N;
 document.getElementById('notation').textContent=n.symbol;
 document.getElementById('protonCount').textContent=n.Z;
 document.getElementById('neutronCount').textContent=n.N;
 updateCalc(key); updateIsotopes(key); drawNucleus3D();
 requestAnimationFrame(()=>drawChart(n.Z+n.N));
}

function initElements(){
 const list=document.getElementById('elementList');
 mainElements.forEach(key=>{
 const btn=document.createElement('button');
 btn.className='element-btn'+(key==='C-12'?' active':'');
 btn.textContent=nuclei[key].name.split('-')[0];
 btn.dataset.nucleus=key;
 btn.onclick=()=>selectNucleus(key);
 list.appendChild(btn);
 });
}

const questions=[
 {q:'Що таке нуклонне (масове) число A?',
 opts:['Кількість протонів у ядрі','Кількість нейтронів у ядрі','Сумарна кількість протонів і нейтронів','Заряд ядра'],
 ans:2,
 ex:'A = Z + N — це загальна кількість нуклонів (протонів і нейтронів) у ядрі.'},
 {q:'Яку формулу описує дефект маси ядра?',
 opts:['Δm = m·c²','Δm = Z·mₚ + N·mₙ − mя','Δm = Eзв / A','Δm = A − Z'],
 ans:1,
 ex:'Дефект маси — різниця між сумою мас вільних нуклонів і масою ядра: Δm = Z·mₚ + N·mₙ − mя.'},
 {q:'Яка речовина-елемент має найбільшу питому енергію зв\'язку?',
 opts:['Уран-238','Водень-1','Залізо-56','Гелій-4'],
 ans:2,
 ex:'Fe-56 має f ≈ 8,79 МеВ/нуклон — найвище значення серед усіх ядер. Саме тому ядра навколо заліза є найстабільнішими.'},
 {q:'Ізотопи одного елемента відрізняються:',
 opts:['Кількістю протонів','Кількістю нейтронів','Зарядовим числом Z','Хімічними властивостями'],
 ans:1,
 ex:'Ізотопи мають однакове Z (протони), але різну кількість нейтронів N. Їхні хімічні властивості майже однакові.'},
 {q:'Чому дорівнює 1 а.м.о. в МеВ?',
 opts:['1,6·10⁻¹⁹ МеВ','938 МеВ','931,5 МеВ','1 МеВ'],
 ans:2,
 ex:'1 а.м.о. · c² = 931,5 МеВ — це зручна формула для переходу між одиницями в ядерній фізиці.'},
 {q:'Ядерні сили діють:',
 opts:['На всіх відстанях однаково','Тільки між протонами','На відстанях ~10⁻¹⁵ м (розмір нуклона)','Лише між протоном і нейтроном'],
 ans:2,
 ex:'Ядерні сили — короткодійні: вони діють лише на відстанях ~10⁻¹⁵ м, що приблизно дорівнює розміру нуклона.'},
 {q:'Формула питомої енергії зв\'язку:',
 opts:['f = Δm · c²','f = Eзв / A','f = A · Z','f = Z · mₚ'],
 ans:1,
 ex:'Питома енергія зв\'язку f = Eзв / A показує, скільки МеВ припадає на один нуклон.'},
 {q:'Якщо ядро містить 6 протонів і 8 нейтронів, що це за елемент і який його ізотоп?',
 opts:['Азот-14','Карбон-12','Карбон-14','Кисень-14'],
 ans:2,
 ex:'Z=6 → Карбон. A = Z+N = 6+8 = 14 → Карбон-14 (¹⁴₆C). Це радіоактивний ізотоп, який використовують для радіовуглецевого датування.'},
];

let qIdx=0, score=0, answered=false;

function startQuiz(){
 qIdx=0; score=0; answered=false;
 document.getElementById('quizScoreCard').classList.remove('show');
 document.getElementById('quizNextBtn').classList.remove('show');
 document.getElementById('quizCardArea').innerHTML='';
 renderQuestion();
}

function renderQuestion(){
 if(qIdx>=questions.length){showScore();return;}
 const q=questions[qIdx];
 answered=false;
 document.getElementById('quizProgress').style.width=((qIdx/questions.length)*100)+'%';
 document.getElementById('quizNextBtn').classList.remove('show');
 const area=document.getElementById('quizCardArea');
 area.innerHTML=`
 <div class="quiz-card">
 <div class="quiz-q-num">ПИТАННЯ ${qIdx+1} / ${questions.length}</div>
 <div class="quiz-question">${q.q}</div>
 <div class="quiz-options">
 ${q.opts.map((o,i)=>`<button class="quiz-option" onclick="checkAnswer(${i})">${o}</button>`).join('')}
 </div>
 <div class="quiz-explain" id="quizExplain">${q.ex}</div>
 </div>`;
}

function checkAnswer(chosen){
 if(answered) return;
 answered=true;
 const q=questions[qIdx];
 const btns=document.querySelectorAll('.quiz-option');
 btns.forEach((b,i)=>{
 b.disabled=true;
 if(i===q.ans) b.classList.add('correct');
 else if(i===chosen) b.classList.add('wrong');
 });
 if(chosen===q.ans) score++;
 document.getElementById('quizExplain').classList.add('show');
 const nb=document.getElementById('quizNextBtn');
 nb.textContent=qIdx<questions.length-1?'Наступне питання →':'Показати результат';
 nb.classList.add('show');
}

function nextQuestion(){
 qIdx++;
 renderQuestion();
}

function showScore(){
 document.getElementById('quizProgress').style.width='100%';
 document.getElementById('quizCardArea').innerHTML='';
 document.getElementById('quizNextBtn').classList.remove('show');
 const pct=score/questions.length;
 const sc=document.getElementById('quizScoreCard');
 document.getElementById('scoreEmoji').textContent=pct>=0.85?'':pct>=0.6?'':'';
 document.getElementById('scoreNum').textContent=`${score} / ${questions.length}`;
 document.getElementById('scoreMsg').textContent=
 pct>=0.85?'Відмінно! Ти чудово знаєш будову атомного ядра!':
 pct>=0.6?'Добре! Повтори формули — і буде ще краще.':
 'Ще раз перечитай §39 — знання прийдуть!';
 sc.classList.add('show');
}

const timelineData=[
 {year:'1897',name:'Дж. Дж. Томсон',badge:'Електрон',text:'Відкриття електрона. Томсон запропонував "пудинговну" модель атома — позитивний заряд рівномірно розподілений, всередині — електрони.'},
 {year:'1909–1911',name:'Ернест Резерфорд',badge:'Планетарна модель',text:'Досліди з α-частинками та золотою фольгою. Відкриття атомного ядра — щільного позитивно зарядженого центру атома.'},
 {year:'1913',name:'Генрі Мозлі',badge:'Зарядове число Z',text:'Встановив, що порядковий номер елемента в таблиці Менделєєва дорівнює кількості протонів у ядрі (заряд ядра).'},
 {year:'1919',name:'Резерфорд',badge:'Протон',text:'Відкриття протона — позитивно зарядженої частинки у ядрі. Отримано в реакції з α-частинками на ядрах азоту.'},
 {year:'1920',name:'Резерфорд (гіпотеза)',badge:'Нейтрон (гіпотеза)',text:'Резерфорд передбачив існування нейтральної частинки в ядрі — нейтрона. Пояснено, чому маса ядра більша за суму мас протонів.'},
 {year:'1932',name:'Джеймс Чедвік',badge:'Нейтрон',text:'Експериментальне відкриття нейтрона — нейтральної частинки з масою, близькою до маси протона. Нобелівська премія 1935 р.'},
 {year:'1932',name:'Іваненко та Гейзенберг',badge:'Протонно-нейтронна модель',text:'Незалежно запропонували протонно-нейтронну модель ядра, яка є загальноприйнятою й сьогодні.'},
 {year:'1935',name:'Хідекі Юкава',badge:'Ядерні сили',text:'Теорія ядерних сил через обмін мезонами. Пояснено природу короткодійних ядерних сил. Нобелівська премія 1949 р.'},
];

function buildTimeline(){
 const tl=document.getElementById('timeline');
 if(tl.children.length>0) return;
 timelineData.forEach((item,i)=>{
 const div=document.createElement('div');
 div.className='tl-item';
 div.innerHTML=`
 <div class="tl-line">
 ${i>0?'<div class="tl-stem-top"></div>':'<div style="height:22px"></div>'}
 <div class="tl-dot"></div>
 ${i<timelineData.length-1?'<div class="tl-stem"></div>':''}
 </div>
 <div class="tl-content">
 <div class="tl-year">${item.year}</div>
 <span class="tl-badge">${item.badge}</span>
 <div class="tl-name">${item.name}</div>
 <div class="tl-text">${item.text}</div>
 </div>`;
 tl.appendChild(div);
 });
}

function buildTable(){
 const tbody=document.getElementById('nucTableBody');
 if(tbody.children.length>0) return;
 const all=Object.keys(nuclei);
 const maxEb=Math.max(...all.map(k=>{const r=calcBinding(k);return r?r.f:0;}));
 all.forEach(key=>{
 const n=nuclei[key];
 const r=calcBinding(key);
 if(!r) return;
 const barW=Math.round((r.f/maxEb)*120);
 const tr=document.createElement('tr');
 tr.innerHTML=`
 <td>${n.name}</td>
 <td class="td-symbol">${n.symbol}</td>
 <td class="td-protons">${n.Z}</td>
 <td class="td-neutrons">${n.N}</td>
 <td>${r.A}</td>
 <td class="td-mass">${n.mass.toFixed(6)}</td>
 <td>${r.dm.toFixed(6)}</td>
 <td>${r.Eb.toFixed(2)}</td>
 <td><div class="td-bar"><div class="bar-fill" style="width:${barW}px"></div><span class="bar-val">${r.f.toFixed(2)}</span></div></td>
 <td><span class="stable-badge ${n.stable?'stable-yes':'stable-no'}">${n.stable?'Так':'Ні'}</span></td>`;
 tbody.appendChild(tr);
 });
}

window.addEventListener('DOMContentLoaded',()=>{
 initElements();
 init3D();
 selectNucleus('C-12');
 setTimeout(()=>drawChart(12),150);
 window.addEventListener('resize',()=>drawChart(nuclei[currentNucleus].Z+nuclei[currentNucleus].N));
});
