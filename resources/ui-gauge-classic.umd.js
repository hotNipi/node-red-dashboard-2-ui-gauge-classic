(function(){"use strict";try{if(typeof document<"u"){var a=document.createElement("style");a.appendChild(document.createTextNode(".ui-gauge-cl-wrapper[data-v-965fc46a]{padding:10px;margin:10px;border:1px solid black}.ui-gauge-cl-class[data-v-965fc46a]{color:green;font-weight:700}.cl-gauge[data-v-965fc46a]{position:relative}.cl-gauge .label[data-v-965fc46a]{fill:currentColor;font-size:.5rem;dominant-baseline:hanging}.cl-gauge .value[data-v-965fc46a]{fill:currentColor}.cl-gauge .units[data-v-965fc46a]{fill:currentColor;font-size:.4rem}.cl-gauge .measurement[data-v-965fc46a]{fill:currentColor;font-size:.5rem}.cl-gauge .num-wrap[data-v-965fc46a]{transform-origin:calc(var(--to-x) * 1%) calc(var(--to-y) * 1%);transform:rotate(calc(var(--t-r) * 1deg)) translate(calc(var(--tt-x) * 1%),calc(var(--tt-y) * 1%))}.cl-gauge .num[data-v-965fc46a]{fill:currentColor;fill-opacity:.6;font-size:.35rem}.cl-gauge .tick-minor[data-v-965fc46a]{fill:none;stroke:currentColor;stroke-opacity:.6}.cl-gauge .tick-major[data-v-965fc46a]{fill:none;stroke:currentColor}.cl-gauge .sector[data-v-965fc46a]{fill:none;stroke:transparent}.cl-gauge .o-needle[data-v-965fc46a]{transition:.5s}")),document.head.appendChild(a)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
(function(l,h){typeof exports=="object"&&typeof module<"u"?h(exports,require("vuex"),require("vue")):typeof define=="function"&&define.amd?define(["exports","vuex","vue"],h):(l=typeof globalThis<"u"?globalThis:l||self,h(l["ui-gauge-classic"]={},l.vuex,l.Vue))})(this,function(l,h,s){"use strict";const p=(t,e)=>{const a=t.__vccOpts||t;for(const[r,i]of e)a[r]=i;return a},f={name:"UIGaugeClassic",inject:["$socket"],props:{id:{type:String,required:!0},props:{type:Object,default:()=>({})},state:{type:Object,default:()=>({enabled:!1,visible:!1})}},setup(t){},data(){return{min:0,max:1,majorDivision:10,minorDivision:5,units:"",label:"",measurement:"",valueDecimalPlaces:2,scaleDecimalPlaces:1,width:4,height:4,sectors:[],arc:{cx:50,cy:64,radius:47.5,startDegrees:-123,endDegrees:123,sweepAngle:246,startx:10,starty:90,endx:90,endy:90,arcLength:100},class:"",value:null,needles:[],widgetSizeRatio:1,unitsTextY:0,valueTextY:0,sectorStrokeStyles:[],majorTickStyle:"",minorTickStyle:"",formattedValue:null}},computed:{...h.mapState("data",["messages"]),wrapperStyle:function(){let t=this.props.height;return t||(t="null"),`grid-row-end: span ${t};`},arcspec:function(){const e=this.arc.endDegrees-this.arc.startDegrees>180?1:0;return`M ${this.arc.startx} ${this.arc.starty} A ${this.arc.radius} ${this.arc.radius} 0 ${e} 1 ${this.arc.endx} ${this.arc.endy}`},displayValue:function(){let t=this.formattedValue;return t||(t=this.value!==null?this.value.toFixed(this.valueDecimalPlaces):"---"),t},numbers:function(){return this.generateNumbers(this.min,this.max,this.majorDivision)},theViewBox(){let t=100*this.props.height/this.props.width;return(isNaN(t)||!t)&&(t=100),`0 0 100 ${t}`}},mounted(){this.$socket.on("widget-load:"+this.id,t=>{this.processMsg(t)}),this.$socket.on("msg-input:"+this.id,t=>{this.processMsg(t),this.$store.commit("data/bind",{widgetId:this.id,msg:t})}),this.pickupProperties(),this.needles.forEach(t=>{t.rotation=this.rotation(null)}),this.$socket.emit("widget-load",this.id)},unmounted(){var t,e;(t=this.$socket)==null||t.off("widget-load:"+this.id),(e=this.$socket)==null||e.off("msg-input:"+this.id)},methods:{pickupProperties:function(){const t=this.props;this.min=Number(t.min),this.max=Number(t.max),this.width=Number(t.width),this.height=Number(t.height),this.sectors=t.sectors,this.majorDivision=Number(t.major_division),this.minorDivision=Number(t.minor_division),this.valueDecimalPlaces=Number(t.value_decimal_places),this.scaleDecimalPlaces=Number(t.scale_decimal_places),this.label=t.label,this.units=t.units,this.measurement=t.measurement,this.needles=t.needles,this.arc.sweepAngle=t.sweep_angle||246,this.class=t.myclass,this.calculateDerivedValues()},calcStrokeStyle:function(t){const e=this.sectors[t],a={minIn:this.min,maxIn:this.max,minOut:0,maxOut:this.arc.arcLength},r=this.range(e.start,a,!1);let i;t>=this.sectors.length-1?i=Math.max(this.max,this.min):i=this.sectors[t+1].start;const c=this.range(i,a,!1),n=Math.min(r,c),o=Math.max(r,c)-n;return`stroke-dasharray: 0 ${n} ${o} var(--dash); stroke: ${e.color};`},calculateDerivedValues:function(){this.majorDivision=this.majorDivision<=0?1:this.majorDivision,this.minorDivision=this.minorDivision<=0?1:this.minorDivision,this.arc.radius=47.5,this.label&&this.label.length>0?this.arc.cy=64:(this.arc.cy=50,this.height/this.width==.5&&(this.arc.radius-=2,this.arc.cy-=2.5)),this.calcTextPositions(),this.arc.sweepAngle&&(this.arc.sweepAngle=Math.min(360,this.arc.sweepAngle),this.arc.startDegrees=-this.arc.sweepAngle/2,this.arc.endDegrees=this.arc.sweepAngle/2);const r=this.arc.startDegrees*Math.PI/180,i=this.arc.endDegrees*Math.PI/180;this.arc.startx=this.arc.cx-this.arc.radius*Math.sin(r-Math.PI),this.arc.starty=this.arc.cy+this.arc.radius*Math.cos(r-Math.PI),this.arc.endx=this.arc.cx+this.arc.radius*Math.sin(Math.PI-i),this.arc.endy=this.arc.cy+this.arc.radius*Math.cos(Math.PI-i),this.arc.arcLength=2*Math.PI*this.arc.radius*(this.arc.endDegrees-this.arc.startDegrees)/360,this.widgetSizeRatio=this.height/this.width,(isNaN(this.widgetSizeRatio)||!this.widgetSizeRatio)&&(this.widgetSizeRatio=1),this.calcSectorStyles(),this.minorTickStyle=this.calcTickStyle(this.minorDivision,.5),this.majorTickStyle=this.calcTickStyle(this.majorDivision,1),this.needles.forEach(c=>{c.path=this.calcNeedlePath(c.lengthPercent,c.color)})},processMsg:function(t){var e,a,r,i;Array.isArray((e=t.ui_update)==null?void 0:e.sectors)&&(this.sectors=t.ui_update.sectors,this.calcSectorStyles()),typeof((a=t.ui_update)==null?void 0:a.measurement)=="string"&&(this.measurement=t.ui_update.measurement,this.calcTextPositions()),typeof((r=t.ui_update)==null?void 0:r.units)=="string"&&(this.units=t.ui_update.units),t.ui_update&&"min"in t.ui_update&&(this.min=Number(t.ui_update.min)),t.ui_update&&"max"in t.ui_update&&(this.max=Number(t.ui_update.max)),"ui_update"in t&&(this.calcSectorStyles(),this.minorTickStyle=this.calcTickStyle(this.minorDivision,.5),this.majorTickStyle=this.calcTickStyle(this.majorDivision,1),this.recalcNeedlePositions()),typeof t.formattedValue=="string"&&(this.formattedValue=t.formattedValue),t.needles&&this.needles.forEach((c,n)=>{var d;const o=this.validate((d=t.needles[n])==null?void 0:d.value);c.value=o,n===0&&(this.value=o),c.rotation=this.rotation(o)}),typeof((i=t.ui_update)==null?void 0:i.class)=="string"&&this.updateDynamicClass(t.ui_update.class),"class"in t&&this.updateDynamicClass(t.class)},updateDynamicClass:function(t){console.log(`outer class: ${this.$refs.wrapper.parentNode.className}`);const e=this.$refs.wrapper.parentNode.className.split(" ");this.$refs.wrapper.parentNode.className=`${e[0]} ${e[1]} ${t}`,console.log(`now: ${this.$refs.wrapper.parentNode.className}`)},recalcNeedlePositions:function(){this.needles.forEach((t,e)=>{t.rotation=this.rotation(t.value)})},validate:function(t){let e;return typeof t!="number"?(e=parseFloat(t),isNaN(e)&&(e=null)):e=t,e},range:function(t,e,a){return e.maxIn>e.minIn?(t=Math.min(t,e.maxIn),t=Math.max(t,e.minIn)):(t=Math.min(t,e.minIn),t=Math.max(t,e.maxIn)),a?Math.round((t-e.minIn)/(e.maxIn-e.minIn)*(e.maxOut-e.minOut)+e.minOut):(t-e.minIn)/(e.maxIn-e.minIn)*(e.maxOut-e.minOut)+e.minOut},generateNumbers:function(t,e,a){let r,i,c;e>t?(r=this.arc.startDegrees,i=this.arc.endDegrees,c=t):(r=this.arc.endDegrees,i=this.arc.startDegrees,c=e);const n=Math.floor(Math.abs(e-t)/a+.1),d=(i-r)*a/Math.abs(e-t);let m=[];for(let u=0;u<=n;u++){let P=u*d+r;const E=(c+u*a).toFixed(this.scaleDecimalPlaces);m.push({r:P,n:E})}return m},rotation:function(t){this.arc.endDegrees-this.arc.startDegrees;let e=this.calcRotationLimitDegrees();e<this.arc.sweepAngle/2&&(e=this.arc.sweepAngle/2);const a=-e,r=e,i=(e-this.arc.sweepAngle/2)*(this.max-this.min)/this.arc.sweepAngle,c=this.min-i,n=this.max+i,o={minIn:c,maxIn:n,minOut:a,maxOut:r};return t===null&&(t=Math.min(c,n)),`${this.range(t,o,!1)}deg`},calcTickStyle:function(t,e){const a=this.arc.arcLength,r=Math.abs(this.max-this.min),i=t/r*a;return`stroke-dasharray: ${e} ${i-e}; stroke-dashoffset: ${e/2};`},calcSectorStyles:function(){this.sectors.forEach((t,e)=>{this.sectorStrokeStyles[e]=this.calcStrokeStyle(e)})},calcTextPositions:function(){this.measurement&&this.measurement.length>0?(this.unitsTextY=this.arc.cy+11,this.valueTextY=this.arc.cy+26):(this.unitsTextY=this.arc.cy-23,this.valueTextY=this.arc.cy-8)},calcNeedlePath:function(t,e){const a=this.arc.cx,r=this.arc.cy,i=(this.arc.radius-4.5)*t/100;return`<path d="M ${a},${r} ${a-1.5},${r} ${a-.15},${r-i} ${a+.15},${r-i} ${a+1.5},${r} z"
                fill="${e}"></path>`},calcRotationLimitDegrees:function(){let t=Math.min(this.arc.sweepAngle/2+15,180);if(this.height){const a=100*(this.height/this.width)-this.arc.cy,r=this.arc.radius-4.5;if(a<r)if(a>0){const i=Math.acos(a/r)*57.2958;t=Math.min(180-i,this.arc.sweepAngle/2+15)}else t=this.arc.sweepAngle/2}return t}}},y=["className"],g=["viewBox"],x=["d"],w=["d"],S=["d"],k=["y"],_={class:"label",y:"0",x:"50%","text-anchor":"middle"},D=["y"],$=["y"],N=["y"],M=["innerHTML"],b=["cx","cy"];function T(t,e,a,r,i,c){return s.openBlock(),s.createElementBlock("div",{className:t.ui-t.gauge-t.cl-t.wrapper,class:s.normalizeClass(i.class),style:s.normalizeStyle(c.wrapperStyle),ref:"wrapper"},[(s.openBlock(),s.createElementBlock("svg",{class:"cl-gauge",ref:"cl-gauge",width:"100%",height:"100%",viewBox:c.theViewBox,style:s.normalizeStyle(`--dash: ${this.arc.arcLength};`)},[s.createElementVNode("g",null,[(s.openBlock(!0),s.createElementBlock(s.Fragment,null,s.renderList(i.sectors,(n,o)=>(s.openBlock(),s.createElementBlock("path",{key:o,ref_for:!0,ref:"sector-"+o,class:"sector","stroke-width":"5",d:c.arcspec,style:s.normalizeStyle(this.sectorStrokeStyles[o])},null,12,x))),128)),s.createElementVNode("path",{class:"tick-minor","stroke-width":"5",d:c.arcspec,style:s.normalizeStyle(this.minorTickStyle)},null,12,w),s.createElementVNode("path",{ref:"arc",class:"tick-major","stroke-width":"5",d:c.arcspec,style:s.normalizeStyle(this.majorTickStyle)},null,12,S),(s.openBlock(!0),s.createElementBlock(s.Fragment,null,s.renderList(c.numbers,(n,o)=>(s.openBlock(),s.createElementBlock("g",{class:"num-wrap",key:o,style:s.normalizeStyle(`--to-x: ${this.arc.cx}; --to-y:${this.arc.cy/this.widgetSizeRatio}; --t-r:${n.r}; --tt-x:${this.arc.cx}; --tt-y:${this.arc.cy/i.widgetSizeRatio};`)},[s.createElementVNode("text",{class:"num","text-anchor":"middle",y:`${10.5-this.arc.radius}`},s.toDisplayString(n.n),9,k)],4))),128)),s.createElementVNode("text",_,s.toDisplayString(i.label),1),s.createElementVNode("text",{class:"measurement",y:`${this.arc.cy-16}`,x:"50%","text-anchor":"middle"},s.toDisplayString(i.measurement),9,D),s.createElementVNode("text",{class:"units",y:`${this.unitsTextY}`,x:"50%","text-anchor":"middle"},s.toDisplayString(i.units),9,$),s.createElementVNode("text",{class:"value",y:`${this.valueTextY}`,x:"50%","text-anchor":"middle"},s.toDisplayString(c.displayValue),9,N)]),(s.openBlock(!0),s.createElementBlock(s.Fragment,null,s.renderList(i.needles,(n,o)=>(s.openBlock(),s.createElementBlock("g",{class:s.normalizeClass(`o-needle o-needle-${o+1}`),style:s.normalizeStyle(`transform-box: fill-box; transform-origin: 50% 100%; rotate: ${n.rotation};`),innerHTML:n.path},null,14,M))),256)),s.createElementVNode("g",null,[s.createElementVNode("circle",{class:"hub",cx:`${this.arc.cx}`,cy:`${this.arc.cy}`,r:"3"},null,8,b)])],12,g))],14,y)}const I=p(f,[["render",T],["__scopeId","data-v-965fc46a"]]);l.UIGaugeClassic=I,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})});
