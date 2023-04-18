let scroll = 0;
let currentPage ="Main";
let pageSize=1000;
let isClik=false;
let cursorState = "static";

let HBold;
let HNF;

function preload(){
  HBold = loadFont('Fonts/HelveticaforTarget-Bold.ttf');
  HNF = loadFont('Fonts/HelveticaNeueRoman.otf');
}

function setup() {
  console.log("hello");
  createCanvas(window.innerWidth, window.innerHeight);
  
}

class element {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class inputElement extends element {
  constructor(x, y, w, texS) {
    super(x, y);
    this.w = w;
    this.texS = texS;
  }
  printElem() {
    let upX = innerWidth / 2 - this.w / 2;
    upX = upX + this.x;
    let upY = this.y - scroll;


    let inp = createInput('');
    inp.position(upX, upY);
    inp.size(this.w);
  }
}

class textList extends element{
  constructor(x, y,list,lineDist,texS) {
    super(x, y);
    this.texS = texS;
    this.list=list;
    this.lineDist=lineDist
  }
  printElem(){
    let upX = innerWidth/2;
    let upY = this.y - scroll;
    for (let i = 0; i < this.list.length; i++) {
      textSize(this.texS);
      fill(255)
      text(this.list[i],upX,upY)
      upY=upY+this.lineDist
    }
  }
}

class textListLink extends textList{
  constructor(x, y,list,links,lineDist,texS) {
    super(x, y,list,lineDist,texS);
    this.links=links;
  }
  printElem(){
    let upX = innerWidth/2;
    let upY = this.y - scroll;
    for (let i = 0; i < this.list.length; i++) {
      textSize(this.texS);
      fill(255)
      text(this.list[i],upX,upY)
      
      const openLink = () => {
       window.open(this.links[i]);
    }
      
      
      
      if(mouseX>=upX&&mouseX<=upX+textWidth(this.list[i])&&mouseY>=upY-this.texS&&mouseY<=upY+this.texS/2){
      cursorState="click";
        let m = 0;
      if (mouseIsPressed === true&&isClik==false) {
        isClik=true;
        m=1;
        if (m>1){
          m=1;
        }
        if(m==1){
        openLink();
        }
      }
      
      
    }
      upY=upY+this.lineDist
  }
}
}

class textListButton extends textList{
  constructor(x, y,list,nextPage,lineDist,texS) {
    super(x, y,list,lineDist,texS);
    this.nextPage=nextPage;
  }
  printElem(){
    let upX = innerWidth/2-textWidth(this.list[0])/2;
    let upY = this.y - scroll;
    for (let i = 0; i < this.list.length; i++) {
      textSize(this.texS);
      fill(255)
      text(this.list[i],upX,upY)
      
      if(mouseX>=upX&&mouseX<=upX+textWidth(this.list[i])&&mouseY>=upY-this.texS&&mouseY<=upY+this.texS/2){
      cursorState="click";
        let m = 0;
      if (mouseIsPressed === true&&isClik==false) {
        isClik=true;
        m=1;
        if (m>1){
          m=1;
        }
        if(m==1){
        // currentPage=this.nextPage[i];
          window.location.href = this.nextPage[i]+".html";
        }
      }
      
      
    }
      upY=upY+this.lineDist
  }
}
}

class textElement extends element {
  constructor(x, y, tex,font, texS) {
    super(x, y);
    this.tex = tex;
    this.texS=texS;
    this.font=font;
  }
  printElem(){
    let textW = textWidth(this.tex);
    let upY = this.y - scroll;
    
    textSize(this.texS)
    fill(255);
    textFont(HBold);
    if(this.font=="HNF"){
      textFont(HNF);
    }
    if(this.font=="HBold"){
      textFont(HBold);
    }
    let upXTex=innerWidth/2-textWidth(this.tex)/2+this.x;
    
    text(this.tex,upXTex,upY);
    
  }
}

class textButton extends textElement{
   constructor(x, y, tex,font, texS, nextPage) {
    super(x, y, tex, font, texS);
     this.nextPage=nextPage
  }
  
  printElem(){
    let textW = textWidth(this.tex);
    let upY = this.y - scroll;
    
    textSize(this.texS)
    textFont(HBold);
    if(this.font=="HNF"){
      textFont(HNF);
    }
    if(this.font=="HBold"){
      textFont(HBold);
    }
    let upXTex=innerWidth/2-textWidth(this.tex)/2+this.x;
    text(this.tex,upXTex,upY);
    
    const openLink = () => {
       window.open(this.link);
    }
    
     if(mouseX>=upXTex&&mouseX<=upXTex+textWidth(this.tex)&&mouseY>=upY-this.texS&&mouseY<=upY+this.texS/2){
      cursorState="click";
      let m = 0;
      if (mouseIsPressed === true&&isClik==false) {
        isClik=true;
        m=1;
        if (m>1){
          m=1;
        }
        if(m==1){
        currentPage=this.nextPage;
           window.location.href = this.nextPage+".html";
        scroll=0;
        }
       
    }
   
    
  }
}
}

class textLinkElement extends textElement{
   constructor(x, y, tex,font, texS, link) {
    super(x, y, tex, font, texS);
     this.link=link
  }
  
  printElem(){
    let textW = textWidth(this.tex);
    let upY = this.y - scroll;
    
    textSize(this.texS)
    textFont(HBold);
    if(this.font=="HNF"){
      textFont(HNF);
    }
    if(this.font=="HBold"){
      textFont(HBold);
    }
    let upXTex=innerWidth/2-textWidth(this.tex)/2+this.x;
    text(this.tex,upXTex,upY);
    
    const openLink = () => {
       window.open(this.link);
    }
    
     if(mouseX>=upXTex&&mouseX<=upXTex+textWidth(this.tex)&&mouseY>=upY-this.texS&&mouseY<=upY+this.texS/2){
      cursorState="click";
      let m = 0;
      if (mouseIsPressed === true&&isClik==false) {
        isClik=true;
        m=1;
        if (m>1){
          m=1;
        }
        if(m==1){
        openLink();
        }
       
    }
   
    
  }
}
}

class button extends element {
  constructor(x, y,w,h,nextPage,center) {
    super(x, y);
    this.w=w;
    this.h=h
    this.nextPage=nextPage;
    this.center=center;
  }
  printElem() {
    let upX = innerWidth/2-this.w/2;
    upX = upX+this.x;
    let upY = this.y - scroll;
    
    if(mouseX>=upX&&mouseX<=upX+this.w&&mouseY>=upY&&mouseY<=upY+this.h){
      fill(0);
      cursorState = "click"
      let m = 0;
      if (mouseIsPressed === true&&isClik==false) {
        isClik=true;
        m=1;
        if (m>1){
          m=1;
        }
        if(m==1){
        currentPage=this.nextPage;
        scroll=0;
        }
      }
    }else{
      fill(255);
    }
    rect(upX, this.y - scroll, this.w, this.h);
  }
}

class textBoxButton extends button {
  constructor(x, y,w,h,tex,font,texS,nextPage,pos) {
    super(x, y,w,h,nextPage);
    this.tex=tex;
    this.texS=texS;
    this.font=font;
  }
  printElem() {
    let upX = innerWidth/2-this.w/2;
    let upY = this.y - scroll;
    upX = upX+this.x;
    if(mouseX>=upX&&mouseX<=upX+this.w&&mouseY>=upY&&mouseY<=upY+this.h){
      fill(255);
       cursorState="click";
      let m = 0;
      if (mouseIsPressed === true&&isClik==false) {
        isClik=true;
        m=1;
        if (m>1){
          m=1;
        }
        if(m==1){
        // currentPage=this.nextPage;
          window.location.href = this.nextPage+(".html");
        scroll=0;
        }
      }
    }else{
      fill(0);
      
    }
    rect(upX, this.y - scroll, this.w, this.h);
    if(mouseX>=upX&&mouseX<=upX+this.w&&mouseY>=upY&&mouseY<=upY+this.h){
      fill(0);
    }else{
      fill(255);
    }
    
    
    textSize(this.texS);
    let textW = textWidth(this.tex);
    let upXTex=innerWidth/2-textW/2+this.x;
    text(this.tex,upXTex,this.y - scroll+this.h/2+this.texS/4);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
  scroll += event.delta;
  if (scroll < 0) {
    scroll = 0;
  }
  if (scroll >pageSize) {
    scroll = pageSize;
  }
}

function scrollBar() {
  let scrollbarWidth = 15;
  let scrollbarHeight = innerHeight;
  let scrollbarTrackWidth = scrollbarWidth * 0.5;
  let scrollbarThumbHeight = scrollbarHeight * innerHeight / pageSize;
  let scrollbarThumbY = scroll /pageSize * (scrollbarHeight - scrollbarThumbHeight);
  
  fill(255);
  rect(innerWidth - scrollbarWidth, 0, scrollbarWidth, scrollbarHeight);
  
  fill(130);
  noStroke();
  rect(innerWidth - 15, scrollbarThumbY, 30, scrollbarThumbHeight);
}

function cursorManager(){
  if (cursorState == "static"){
     cursor(); 
  }
   if (cursorState == "click"){
    cursor('pointer');
  }
}

function mouseReleased() {
  isClik = false;
}
