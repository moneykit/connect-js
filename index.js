var k={colors:{accent:"#0077ff",primaryBackground:{light:"#fff",dark:"#212124"},secondaryBackground:{light:"#f2f2f5",dark:"#212124"},primaryContent:{light:"#fff",dark:"#343438"},secondaryContent:{light:"#f5f5f5",dark:"#343438"},primaryForeground:{light:"#111",dark:"#fff"},secondaryForeground:{light:"rgba(67, 67, 76, 0.6)",dark:"rgba(235, 235, 245, 0.6)"},tertiaryForeground:{light:"rgba(67, 67, 76, 0.3)",dark:"rgba(235, 234, 244, 0.3)"},primaryFill:{light:"rgba(120, 120, 128, 0.2)",dark:"rgba(120, 120, 128, 0.36)"},secondaryFill:{light:"rgba(120, 120, 128, 0.16)",dark:"rgba(120, 120, 128, 0.32)"},tertiaryFill:{light:"rgba(118, 118, 128, 0.12)",dark:"rgba(118, 118, 128, 0.24)"},success:{light:"#00ca32",dark:"#35DE5F"},warning:{light:"#ff9500",dark:"#FF9400"},error:{light:"#dd2424",dark:"#FA4242"},separator:{light:"rgba(60, 60, 67, 0.06)",dark:"rgba(84, 84, 88, 0.4)"},selection:{light:"rgba(120, 120, 128, 0.28)",dark:"rgba(120, 120, 128, 0.48)"}},typography:{fontFamily:"Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",largeTitle:{size:"34px",lineHeight:"41px",letterSpacing:"-0.01em",weight:700},title1:{size:"28px",lineHeight:"34px",letterSpacing:"-0.03em",weight:700},title2:{size:"22px",lineHeight:"28px",letterSpacing:"0",weight:700},title3:{size:"20px",lineHeight:"24px",letterSpacing:"0",weight:700},body:{size:"17px",lineHeight:"24px",letterSpacing:"-0.01em",weight:500},smallBody:{size:"11px",lineHeight:"16px",letterSpacing:"-0.0225em",weight:400},button:{size:"18px",lineHeight:"24px",letterSpacing:"-1%",weight:700},input:{size:"19px",lineHeight:"24px",letterSpacing:"-0.02em",weight:500}},images:{close:"/images/close.svg",search:"/images/search.svg",spinner:"/images/spinner.png"},spacing:{contentHorizontalInset:"32px",buttonHorizontalInset:"24px"},components:{navigationBar:{height:"64px"},contentView:{borderRadius:"16px",boxShadow:{light:"none",dark:"inset 0 0 0 1px rgba(228, 227, 243, 0.04)"},border:null,separatorStyle:"all_except_last"},buttonPrimary:{height:"48px",borderRadius:"24px",inheritInstitutionColor:!0},searchInput:{backgroundColor:{light:"rgba(118, 118, 128, 0.12)",dark:"rgba(118, 118, 128, 0.24)"},height:"50px",borderRadius:"16px",border:null,alignment:"center",focus:{glow:!0,backgroundColor:null,border:null,boxShadow:null}},textField:{backgroundColor:null,height:"54px",borderRadius:"0px",boxShadow:null,focus:{glow:!0,backgroundColor:null,border:null,boxShadow:null}},progressSpinner:{strokeWidth:8,diameter:56,lineCap:"round"},separator:{height:"1px"}},screens:{finder:{title:"Connect Your Bank",subtitle:null,searchPlaceholder:"Search Banks",institutionCellBoxShadow:null,institutionCellBorderRadius:"16px",institutionCellBorder:{light:"1px solid rgba(60, 60, 67, 0.1)",dark:"1px solid rgba(84, 84, 88, 0.4)"},institutionCellSpacing:"16px",institutionCellBackgroundColor:{light:"#fff",dark:"#212124"}}},modal:{borderRadius:"20px",boxShadow:{light:"0px 2px 4px rgba(0, 0, 0, 0.1), 0 40px 80px rgba(0,0,0,.15)",dark:"inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 0 1px black, 0px 6px 18px rgba(0, 0, 0, 0.3)"},overlayBackgroundColor:{light:"rgba(0, 0, 0, 0.4)",dark:"rgba(0, 0, 0, 0.75)"},overlayBackdropFilter:null},popover:{borderRadius:"24px",boxShadow:{light:"0px 0px 80px rgba(0, 0, 0, 0.16)",dark:"inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 0 1px black, 0px 6px 18px rgba(0, 0, 0, 0.3)"}}},m=k;var d=(n=>(n[n.largeTitle=0]="largeTitle",n[n.title1=1]="title1",n[n.title2=2]="title2",n[n.title3=3]="title3",n[n.body=4]="body",n[n.smallBody=5]="smallBody",n[n.button=6]="button",n[n.input=7]="input",n))(d||{});import c from"query-string";var y="0.1.9";var s="https://connect.moneykit.com";function x(o,t){let e=document.createElement("iframe");e.src=o,e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.width="100%",e.style.height="100%",e.style.zIndex="999999";let r=t?document.getElementById(t):document.body;if(!r)throw new Error(`MoneyKit could not find container element with ID "${t}".`);return r.appendChild(e),e}function h(o){o.remove()}var C="moneykit.linkSessionToken",g=class{constructor(t={}){this.options={...t}}link(t,e,r,l){let a={...this.linkParametersFromOptions(),linkSessionToken:t,origin:window.location.origin},i=c.stringifyUrl({url:`${s}/start`,query:a});this.launch(i,e,r,l)}relink(t,e,r,l){let a={...this.linkParametersFromOptions(),linkSessionToken:t,origin:window.location.origin},i=c.stringifyUrl({url:`${s}/relink`,query:a});this.launch(i,e,r,l)}continue(t,e,r,l){if(window.opener){window.opener.postMessage({moneykit:!0,type:"link.resume",eventData:{redirectURL:t}},s);return}let a=localStorage.getItem(C);a||console.warn("Unable to get MoneyKit link session token from local storage.");let i={...this.linkParametersFromOptions(),linkSessionToken:a,redirectURL:t,origin:window.location.origin},p=c.stringifyUrl({url:`${s}/continue`,query:i});this.launch(p,e,r,l)}linkParametersFromOptions(){let t=this.options.applicationName??"",e=this.options.theme??m,r=this.options.device??null,l=this.options.stepTimers??!0;return{applicationName:t,theme:JSON.stringify(e),device:r,stepTimers:l,launcherVersion:y}}launch(t,e,r,l){let a=x(t,this.options.containerID),i=new AbortController,p=S(a,i,e,r,l);window.addEventListener("message",p,{signal:i.signal})}};function S(o,t,e,r,l){return a=>{if(a.origin!=s||!("moneykit"in a.data||"__moneykitDemo"in a.data))return;let i=a.data;switch(i.type){case"link.complete":e&&i.data.exchangeableToken&&e(i.data.exchangeableToken,i.data.institution),h(o),t.abort();break;case"relink.complete":e&&e(i.data.institution),h(o),t.abort();break;case"link.exit":h(o),r&&r(),t.abort();break;case"link.close_oauth":window.close();break;case"link.event":case"demo.link.event":l&&l(i.data);break}}}var u=g;var R=(o,t)=>{switch(t){case 0:return o.typography.largeTitle;case 1:return o.typography.title1;case 2:return o.typography.title2;case 3:return o.typography.title3;case 5:return o.typography.smallBody;case 6:return o.typography.button;case 7:return o.typography.input;default:return o.typography.body}};var _=u;export{d as ThemeTypographyTextStyle,_ as default,m as moneyui,R as themeTypographyStyleForTextStyle};
