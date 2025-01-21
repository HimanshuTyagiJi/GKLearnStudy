const questions=document.querySelectorAll(".questions");function getPageNumber(){let e=window.location.href,t=e.match(/page(\d+)/);return t?parseInt(t[1]):1}function autoNumberQuestions(e){let t=document.querySelectorAll(".questions"),a=e;t.forEach(e=>{e.querySelector("h3").textContent=`Q-${a}: ${e.querySelector("h3").textContent}`,a++})}questions.forEach(e=>{let t=e.querySelectorAll(".options li"),a=e.querySelector(".explanation");t.forEach(e=>{e.addEventListener("click",()=>{t.forEach(e=>{e.style.pointerEvents="none"}),"true"===e.getAttribute("data-correct")?e.classList.add("correct"):(e.classList.add("wrong"),t.forEach(e=>{"true"===e.getAttribute("data-correct")&&e.classList.add("correct")})),a.style.display="block"})})});const pageNumber=getPageNumber();let startingNumber=1;autoNumberQuestions(startingNumber=1===pageNumber?1:2===pageNumber?31:(pageNumber-1)*31+1);const styles=`
        .pagination a:link, 
        .pagination a:visited {
            color: white;
        }
        .button:hover {
            background-color: #0056b3;
            transform: scale(1.05);
        }
        .button.active {
            background-color: green;
        }
        .active {
            pointer-events: none;
        }
    `,styleSheet=document.createElement("style");styleSheet.type="text/css",styleSheet.innerText=styles,document.head.appendChild(styleSheet);const totalPages=6,currentPage=parseInt(window.location.href.match(/page(\d+)/)?.[1])||1;function renderPagination(e,t){let a=document.querySelector(".pagination");a.innerHTML="";let n=document.createElement("a");n.href="page1",n.innerText="First",n.className="button",1===e&&n.classList.add("active"),a.appendChild(n);let r=Math.max(2,e-2),o=Math.min(t-1,e+2);o-r<4&&(2===r?o=Math.min(t-1,r+4):o===t-1&&(r=Math.max(2,o-4)));for(let s=r;s<=o;s++){let l=document.createElement("a");l.href=`page${s}`,l.innerText=s,l.className="button",s===e&&l.classList.add("active"),a.appendChild(l)}let c=document.createElement("a");c.href=`page${t}`,c.innerText="Last",c.className="button",e===t&&c.classList.add("active"),a.appendChild(c)}renderPagination(currentPage,6);
