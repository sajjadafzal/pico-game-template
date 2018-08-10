export default class GameObject{constructor(a){this.type=a.type,this.x=a.x,this.y=a.y,this.radius=a.radius,this.startAngle=a.startAngle||0,this.endAngle=a.endAngle||360,this.antiClockwise=a.antiClockwise||!1,this.fill=a.fill,this.stroke=a.stroke}draw(a){switch(a.fillStyle=this.fill||'red',a.strokeStyle=this.stroke||'black',this.type){case'line':a.goto(this.x,this.y),a.lineTo(this.x2,this.y2);break;case'arc':a.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle,this.antiClockwise);break;case'rect':console.log('rect',this.x,this.y,this.width,this.height),a.fillRect(this.x,this.y,this.width,this.height);break;case'img':case'image':default:a.drawImage(this.image,this.x,this.y,this.width,this.height);}}handleInput(a){console.log('Object input: ',this.type,a)}}