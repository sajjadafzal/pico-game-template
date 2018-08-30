parcelRequire=function(e){var r="function"==typeof parcelRequire&&parcelRequire,n="function"==typeof require&&require,i={};function u(e,u){if(e in i)return i[e];var t="function"==typeof parcelRequire&&parcelRequire;if(!u&&t)return t(e,!0);if(r)return r(e,!0);if(n&&"string"==typeof e)return n(e);var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}return u.register=function(e,r){i[e]=r},i=e(u),u.modules=i,u}(function (require) {var g={};Object.defineProperty(g,"__esModule",{value:!0});var y={LEFT:"LEFT",RIGHT:"RIGHT",UP:"UP",DOWN:"DOWN"},M=y;g.default=M;var f={};Object.defineProperty(f,"__esModule",{value:!0});var B={ALIEN:"ALIEN",BULLET:"BULLET",DOOR:"DOOR",HACKER:"HACKER",HERO:"HERO",WALL:"WALL"},K=B;f.default=K;var i={};Object.defineProperty(i,"__esModule",{value:!0});var P={TEXT:"TEXT",RECT:"RECT",CIRCLE:"CIRCLE",IMAGE:"IMAGE",SPRITE:"SPRITE"},S=P;i.default=S;var n={};Object.defineProperty(n,"__esModule",{value:!0});var A=function(){function t(t,e){for(var a,r=0;r<e.length;r++)(a=e[r]).enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}return function(e,a,r){return a&&t(e.prototype,a),r&&t(e,r),e}}(),k=C(g);function C(t){return t&&t.__esModule?t:{default:t}}function D(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var E=function(){function t(e){D(this,t),this.img=e,this.w=e.naturalWidth,this.h=e.naturalHeight,this.pw=this.w,this.ph=this.h/4,this.frame=1,this.tickCount=0,this.ticksPerFrame=10}return A(t,[{key:"draw",value:function(t,e){var a=Math.PI,r=void 0,i=void 0;switch(t.save(),this.tickCount+=1,this.tickCount>this.ticksPerFrame&&(this.tickCount=0,this.frame+=1,3<this.frame&&(this.frame=1)),t.translate(t.canvas.width/2,t.canvas.height/2),e.direction){case k.default.LEFT:t.rotate(-a/2),r=-e.x-t.canvas.width,i=-e.y-this.ph-5-t.canvas.height/2;break;case k.default.UP:r=e.x-t.canvas.width/2,i=e.y-t.canvas.height/2;break;case k.default.RIGHT:t.rotate(-a/2);break;case k.default.DOWN:default:t.rotate(Math.PI),r=-e.x-this.pw-7+t.canvas.width/2,i=-e.y-this.ph-5+t.canvas.height/2;}t.drawImage(this.img,0,this.ph*this.frame,this.pw,this.ph,r,i,e.w,e.h),t.restore()}}]),t}(),H=E;n.default=H;var J,j={};Object.defineProperty(j,"__esModule",{value:!0});var L=function(){function e(e,t){for(var a,i=0;i<t.length;i++)(a=t[i]).enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),v=m(g),h=m(f),c=m(i),W=m(n);function m(e){return e&&e.__esModule?e:{default:e}}function V(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}function z(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var t=function(){function e(t){switch(z(this,e),this.children=t.children||[],this.dx=t.dx,this.dy=t.dy,this.family=t.family||h.default.WALL,this.fill=t.fill||"#000",this.h=t.h||2,this.img=t.img,this.name=t.name,this.sprite=t.sprite,this.text=t.text,this.type=t.type||c.default.RECT,this.w=t.w||2,this.x=t.x||0,this.y=t.y||0,this.zIndex=t.zIndex||1,this.id=++e.id,this.text?(this.font=t.font||4,this.text=t.text,this.type=c.default.TEXT):this.img?this.type=c.default.IMAGE:this.sprite&&(this.type=c.default.SPRITE),this.family){case h.default.HERO:this.x=15,this.y=50,this.direction=v.default.LEFT;case h.default.ALIEN:this.w=8,this.h=8,this.hp=t.hp||100,this.chp=this.hp,this.isInLineOfSight=!1,this.lastFireTime=0,this.direction=this.direction||v.default.UP;break;case h.default.BULLET:this.byHero=t.byHero,this.dmg=t.dmg||10,this.fill="orange",this.w=1,this.h=1,this.type=c.default.CIRCLE,this.isReal=t.isReal,this.src=t.src;break;case h.default.WALL:this.fill=t.fill||"#fff";}}return L(e,[{key:"draw",value:function(e){var t=this;if(!1!==this.isReal){var a=e.canvas.width/100,i=e.canvas.height/100;[Object.create(this)].concat(V(this.children.map(function(e){var a=Object.create(e);return a.x+=t.x,a.y+=t.y,a}))).forEach(function(t){switch(t.x*=a,t.y*=i,t.w*=a,t.h*=i,e.strokeStyle="#000",e.fillStyle=t.fill,t.type){case c.default.CIRCLE:t.x+=t.w/2,t.y+=t.w/2,e.beginPath(),e.arc(t.x,t.y,t.w/2,0,2*Math.PI,0),e.fill();break;case c.default.RECT:e.fillRect(t.x,t.y,t.w,t.h);break;case c.default.TEXT:t.font*=i,t.y+=t.font,e.font=t.font+"px arial",e.fillText(t.text,t.x,t.y);break;case c.default.SPRITE:t.sprite.draw(e,t);break;case c.default.IMAGE:default:t.img&&e.drawImage(t.img,t.x,t.y,t.w,t.h);}t.hp&&(e.fillStyle="#00e635",e.fillRect(t.x,t.y-6,t.chp*t.w/t.hp,4))})}}},{key:"isColliding",value:function(e){return!(this.x+this.w<e.x||this.x>e.x+e.w||this.y+this.h<e.y||this.y>e.y+e.h)}}]),e}();J=t,j.default=J,t.id=0;var r={};Object.defineProperty(r,"__esModule",{value:!0});var a=s(j),l=s(f);function s(e){return e&&e.__esModule?e:{default:e}}var F=[new a.default({family:l.default.ALIEN,hp:200,h:5,w:5,y:90,x:30}),new a.default({family:l.default.ALIEN,hp:150,h:5,w:5,y:90,x:40}),new a.default({family:l.default.ALIEN,hp:100,h:5,w:5,y:90,x:50}),new a.default({family:l.default.ALIEN,hp:50,h:5,w:5,y:90,x:60}),new a.default({w:100,fill:"#000"}),new a.default({y:98,w:100,fill:"#000"}),new a.default({h:100,fill:"#000"}),new a.default({x:98,h:100,fill:"#000"}),new a.default({name:"L270",x:15,y:15,h:20,children:[new a.default({w:20})]}),new a.default({name:"L180DegreePart1",x:80,y:15,h:20}),new a.default({name:"L180DegreePart2",x:60,y:15,w:20}),new a.default({name:"T180DegreePart1",x:46,y:15,h:20}),new a.default({name:"T180DegreePart2",x:37,y:35,w:20}),new a.default({name:"L2_270DegreePart1",x:15,y:65,h:20}),new a.default({name:"L2_270DegreePart2",x:15,y:65,w:26}),new a.default({name:"L2_180DegreePart1",x:80,y:65,h:20}),new a.default({name:"L2_180DegreePart2",x:55,y:65,w:25}),new a.default({name:"L3_270DegreePart1",x:32,y:50,h:17,children:[new a.default({name:"L3_270DegreePart2",w:30}),new a.default({name:"L3_270DegreePart2",x:30,h:17})]}),new a.default({name:"L3_270DegreePart2",x:15,y:65,w:20}),new a.default({name:"L3_180DegreePart1",x:80,y:65,h:20}),new a.default({name:"L3_180DegreePart2",x:60,y:65,w:20})],G=F;r.default=G;var p={};Object.defineProperty(p,"__esModule",{value:!0});var I=function(){function t(t,e){for(var i,r=0;r<e.length;r++)(i=e[r]).enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),o=e(g),d=e(f),u=e(j),q=e(r),N=e(i),O=e(n);function e(t){return t&&t.__esModule?t:{default:t}}function Q(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}function R(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var b={MAIN_MENU:"MAIN_MENU",IN_GAME:"IN_GAME",END_GAME:"END_GAME"},T=function(){function t(e,i,r,a){var s=this;R(this,t),this.assets=a,this.ctx=document.createElement("canvas").getContext("2d"),this.ctx.canvas.width=this.w=i,this.ctx.canvas.height=this.h=r,e.appendChild(this.ctx.canvas),this.topScore=localStorage.topScore||0,this.score=0,this.difficulty=1,this.screen=b.IN_GAME,this.objects=Object.create(q.default),this.bullets=[],this.hero=new u.default({family:d.default.HERO,sprite:new O.default(a.hero)}),this.keyState={},this.ctx.canvas.addEventListener("click",function(t){return s.handleInput(t)}),document.addEventListener("keydown",function(t){return s.handleInput(t)}),document.addEventListener("keyup",function(t){return s.handleInput(t)}),this.redraw()}return I(t,[{key:"redraw",value:function(){var t=this;this.clear(),this.screen===b.MAIN_MENU?this.drawMenu():this.screen===b.END_GAME?this.drawEnd():(this.updateState(),this.draw()),window.requestAnimationFrame(function(){t.redraw()})}},{key:"updateState",value:function(){var t=this,e=[this.hero].concat(Q(this.getObjects())),i=Object.create(this.hero),r=.33;1<Object.values(this.keyState).filter(function(t){return t}).length&&(r/=1.5),(this.keyState[37]||this.keyState[65])&&(i.x-=r,i.direction=o.default.LEFT),(this.keyState[38]||this.keyState[87])&&(i.y-=r,i.direction=o.default.UP),(this.keyState[39]||this.keyState[68])&&(i.x+=r,i.direction=o.default.RIGHT),(this.keyState[40]||this.keyState[83])&&(i.y+=r,i.direction=o.default.DOWN);for(var a,s=[],c=0;c<e.length;c+=1)if((a=e[c]).type!==N.default.TEXT){a.family===d.default.WALL&&i.isColliding(a)&&(i=this.hero);for(var h,l=0;l<this.bullets.length;l+=1)(!(h=this.bullets[l]).byHero||a.family!==d.default.HERO)&&(h.byHero||a.family!==d.default.ALIEN)&&h.isColliding(a)&&(h.src.isInLineOfSight=a.family!==d.default.WALL,h.isReal&&(a.chp-=h.dmg,0>=a.chp&&(a.family===d.default.HERO?(this.screen=b.END_GAME,l=this.bullets.length,c=e.length):s.push(a.id))),this.bullets.splice(l,1));if(a.family===d.default.ALIEN){var n=a.isInLineOfSight?1e3:50,$=Date.now();$-a.lastFireTime>n&&(this.addBullet(null,a),a.lastFireTime=$)}}this.bullets.forEach(function(t){t.x+=t.dx,t.y+=t.dy}),this.hero=i,this.objects=this.objects.filter(function(e){return!(-1<s.indexOf(e.id)&&(t.score+=e.hp/10*t.difficulty,1))}),0===this.objects.filter(function(t){return t.family===d.default.ALIEN}).length&&(this.difficulty+=1,this.hero.chp=100,this.hero.x=45,this.hero.y=5,this.objects=Object.create(q.default),this.screen=b.IN_GAME)}},{key:"clear",value:function(){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)}},{key:"draw",value:function(){var t=this;this.addFlooring(),this.addLighting(),this.bullets.forEach(function(e){e.draw(t.ctx)}),this.objects.sort(function(t,e){return t.zIndex-e.zIndex}).forEach(function(e){e.draw(t.ctx)}),this.hero.draw(this.ctx),this.drawHUD()}},{key:"addFlooring",value:function(){this.ctx.lineWidth=1,this.ctx.strokeStyle="rgba(1,14,4,0.2)",this.ctx.beginPath();for(var t=0;t<this.w-0;t+=20)for(var e=0;e<this.h-0;e+=20)this.ctx.rect(t,e,20,20);this.ctx.stroke()}},{key:"addLighting",value:function(){var t=this.w/2,e=this.h/2,i=this.ctx.createRadialGradient(t,e,50,t,e,this.w-100);i.addColorStop(0,"rgba(17,102,37,0.9)"),i.addColorStop(1,"rgba(1,14,4,1)"),this.ctx.fillStyle=i,this.ctx.fillRect(0,0,this.w,this.h)}},{key:"drawHUD",value:function(){var t=3.5*this.h/100;this.ctx.fillStyle="rgba(1,14,4,0.5)",this.ctx.fillRect(0,0,this.w,50),this.ctx.textAlign="center",this.ctx.font=t+"px arial",this.ctx.fillStyle="#fff",this.ctx.fillText("Score: "+this.score+"         Level: "+this.difficulty+"         Health: "+this.hero.chp+"         Top Score: "+this.topScore,this.w/2,33)}},{key:"drawMenu",value:function(){var t=8*this.h/100,e=this.w/2,i=40*this.h/100;this.ctx.fillStyle="rgba(1,14,4,1)",this.ctx.fillRect(0,0,this.w,this.h),this.ctx.textAlign="center",this.ctx.fillStyle="#fff",this.ctx.font=t+"px arial",this.ctx.fillText("Tony Hawk's Gun Smash",e,i),this.ctx.fillStyle="rgba(255,255,255,0.5)",this.ctx.font=t/2+"px arial",this.ctx.fillText("Click anywhere to start",e,1.75*i)}},{key:"drawEnd",value:function(){var t=8*this.h/100,e=this.w/2,i=40*this.h/100;this.ctx.fillStyle="rgba(1,14,4,1)",this.ctx.fillRect(0,0,this.w,this.h),this.ctx.textAlign="center",this.ctx.fillStyle="#fff",this.ctx.font=t+"px arial",this.score>this.topScore?this.ctx.fillText("You Pro!",e,i):this.ctx.fillText("What a Noob!",e,i),this.ctx.fillStyle="rgba(255,255,255,0.5)",this.ctx.font=t/2+"px arial",this.ctx.fillText("See you next time!",e,1.25*i),this.ctx.fillText("Click anywhere to restart",e,1.75*i)}},{key:"handleInput",value:function(t){t.preventDefault(),1===t.which?this.screen===b.MAIN_MENU?(this.hero.chp=100,this.hero.x=45,this.hero.y=5,this.screen=b.IN_GAME,this.objects=Object.create(q.default)):this.screen===b.IN_GAME?this.addBullet(t):this.screen===b.END_GAME&&(this.screen=b.MAIN_MENU,this.score>this.topScore&&(this.topScore=this.score,localStorage.topScore=this.topScore,this.score=0)):-1<t.type.indexOf("down")?this.keyState[t.which]=t:this.keyState[t.which]=!1}},{key:"addBullet",value:function(t,e){var i=Math.pow,r=void 0,a=void 0,s=void 0,c=void 0,h=!e;if(t){var l=this.ctx.canvas.getBoundingClientRect();r=this.hero.x,a=this.hero.y,s=-this.w/100+100*(t.clientX-l.left)/this.w,c=-this.h/100+100*(t.clientY-l.top)/this.h}else r=e.x,a=e.y,s=this.hero.x,c=this.hero.y;var n=s-r,$=c-a,o=Math.sqrt(i(n,2)+i($,2));r+=this.hero.w/2,a+=this.hero.h/2,this.bullets.push(new u.default({byHero:h,dx:n/o*1.5,dy:$/o*1.5,family:d.default.BULLET,x:r,y:a,src:e||this.hero,isReal:h||e.isInLineOfSight}))}},{key:"getObjects",value:function(){return this.objects.reduce(function(t,e){return t.push(e),e.children.forEach(function(i){var r=Object.create(i);r.x+=e.x,r.y+=e.y,t.push(r)}),t},[])}}]),t}(),U=T;p.default=U;var w=x(p);function x(e){return e&&e.__esModule?e:{default:e}}new w.default(document.querySelector("#game"),480,480,{hero:document.getElementById("hero"),enemy:document.getElementById("hero")});return{"Focm":{}};});