!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),a=document.querySelector("body"),n=null;t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,n=setInterval((function(){var t,e;t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0)),e=t,a.style.display="inline",a.style.background=e}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.b5fa8e9a.js.map