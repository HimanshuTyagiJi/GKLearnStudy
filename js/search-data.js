window.GKApp=window.GKApp||{};window.GKApp.dataReady=fetch('/js/search-data.json').then(response=>{if(!response.ok){throw new Error(`HTTP error! status: ${response.status}`)}
return response.json()}).then(data=>{window.GKApp.searchData=data}).catch(error=>{console.error("Could not load search data:",error);throw error});window.GKApp.transliterateRomanToHindi=(input)=>{const map={consonants:{'ksh':'क्ष','gy':'ज्ञ','dny':'ज्ञ','jn':'ज्ञ','shr':'श्र','kh':'ख','gh':'घ','chh':'छ','jh':'झ','th':'थ','dh':'ध','ph':'फ','bh':'भ','shh':'ष','sh':'श','tr':'त्र','gn':'ङ','ny':'ञ','k':'क','g':'ग','c':'क','j':'ज','t':'त','d':'द','n':'न','p':'प','b':'ब','m':'म','y':'य','r':'र','l':'ल','v':'व','w':'व','s':'स','h':'ह','z':'ज़','f':'फ़','q':'क़','x':'क्ष'},vowels:{'aa':'आ','ee':'ई','ii':'ई','oo':'ऊ','uu':'ऊ','ai':'ऐ','au':'औ','ri':'ऋ','a':'अ','i':'इ','e':'ए','o':'ओ','u':'उ'},matras:{'aa':'ा','ee':'ी','ii':'ी','oo':'ू','uu':'ू','ai':'ै','au':'ौ','ri':'ृ','a':'','i':'ि','e':'े','o':'ो','u':'ु'},symbols:{'an':'ं','am':'ं','ah':'ः','om':'ॐ','shree':'श्री'}};let output='';let i=0;while(i<input.length){let matched=!1;if(i+3<input.length){const fourChar=input.substring(i,i+4).toLowerCase();if(map.consonants[fourChar]||map.vowels[fourChar]||map.symbols[fourChar]){output+=map.consonants[fourChar]||map.vowels[fourChar]||map.symbols[fourChar];i+=4;matched=!0}}
if(!matched&&i+2<input.length){const threeChar=input.substring(i,i+3).toLowerCase();if(map.consonants[threeChar]||map.vowels[threeChar]||map.symbols[threeChar]){output+=map.consonants[threeChar]||map.vowels[threeChar]||map.symbols[threeChar];i+=3;matched=!0}}
if(!matched&&i+1<input.length){const twoChar=input.substring(i,i+2).toLowerCase();if(map.consonants[twoChar]||map.vowels[twoChar]||map.matras[twoChar]||map.symbols[twoChar]){const lastChar=output.slice(-1);const lastIsConsonant=Object.values(map.consonants).includes(lastChar);if(lastIsConsonant&&map.matras[twoChar]!==undefined){if(output.endsWith('्'))output=output.slice(0,-1);output+=map.matras[twoChar]}else{output+=map.consonants[twoChar]||map.vowels[twoChar]||map.symbols[twoChar]}i+=2;matched=!0}}
if(!matched){const oneChar=input.charAt(i).toLowerCase();const lastChar=output.slice(-1);const lastIsConsonant=Object.values(map.consonants).includes(lastChar);if(lastIsConsonant&&map.matras[oneChar]!==undefined){if(output.endsWith('्'))output=output.slice(0,-1);output+=map.matras[oneChar]}else if(map.vowels[oneChar]){output+=map.vowels[oneChar]}else if(map.consonants[oneChar]){output+=map.consonants[oneChar];if(i+1<input.length&&map.consonants[input.charAt(i+1)]){output+='्'}}else{output+=oneChar}i++}}
return output};window.GKApp.levenshtein=(s1,s2)=>{if(s1.length>s2.length){[s1,s2]=[s2,s1]}
const distances=Array(s1.length+1).fill(0).map((_,i)=>i);for(let i=0;i<s2.length;i++){let prev=i+1;for(let j=0;j<s1.length;j++){const current=distances[j];distances[j]=prev;prev=s1[j]===s2[i]?current:1+Math.min(current,prev,distances[j+1])}
distances[s1.length]=prev}
return distances[s1.length]};window.GKApp.fuzzySearch=function(query,items){const lowerCaseQuery=query.toLowerCase().trim();if(!lowerCaseQuery)return[];const hindiQuery=window.GKApp.transliterateRomanToHindi(lowerCaseQuery);const queryWords=lowerCaseQuery.split(/[\s,،।.]+/).filter(w=>w);const hindiQueryWords=hindiQuery.split(/[\s,،।.]+/).filter(w=>w);const allQueryWords=[...new Set([...queryWords,...hindiQueryWords])];const results=items.map(item=>{let score=0;const matchedWords=new Set();const content=`${item.title} ${item.paragraph}`;const contentWords=content.split(/[\s,،।.]+/);allQueryWords.forEach(qWord=>{let bestMatchScore=0;contentWords.forEach(cWord=>{const distance=window.GKApp.levenshtein(qWord.toLowerCase(),cWord.toLowerCase());const threshold=qWord.length>4?2:1;if(distance<=threshold){let currentScore=0;if(item.title.toLowerCase().includes(cWord.toLowerCase())){currentScore=15}else{currentScore=5}currentScore-=distance*2;if(currentScore>bestMatchScore){bestMatchScore=currentScore}}});if(bestMatchScore>0){score+=bestMatchScore;matchedWords.add(qWord)}});if(matchedWords.size===allQueryWords.length){score*=1.5}
return{item,score}}).filter(result=>result.score>2).sort((a,b)=>b.score-a.score).map(result=>result.item);return[...new Map(results.map((item)=>[item.url,item])).values()]};window.GKApp.generatePlaceholderSVG=(title='G')=>{const text=title.charAt(0).toUpperCase();let hash=0;for(let i=0;i<title.length;i++){hash=title.charCodeAt(i)+((hash<<5)-hash)}
const h=Math.abs(hash%360);const color=`hsl(${h}, 65%, 55%)`;return `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="${color}" /><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle" dy=".3em">${text}</text></svg>`};window.GKApp.generateConceptImage=(()=>{let createImageFor=null;return(title)=>{if(!createImageFor){const W=640,H=360,BASE_W=1280,BASE_H=720,S=W/BASE_W;const palettes=[{bg1:'#6a11cb',bg2:'#2575fc',primary:'#ffffff',accent:'#f5d142'},{bg1:'#00c6ff',bg2:'#0072ff',primary:'#ffffff',accent:'#fefefe'},{bg1:'#f7971e',bg2:'#ffd200',primary:'#434343',accent:'#ffffff'},{bg1:'#34e89e',bg2:'#08aeea',primary:'#ffffff',accent:'#f6f0ea'},{bg1:'#ff4b1f',bg2:'#ff9068',primary:'#ffffff',accent:'#f7f2b2'},{bg1:'#1a2a6c',bg2:'#b21f1f',bg3:'#fdbb2d',primary:'#ffffff',accent:'#eeeeee'},{bg1:'#8e2de2',bg2:'#4a00e0',primary:'#ffffff',accent:'#d4d4d4'},{bg1:'#1d2b64',bg2:'#f8cdda',primary:'#ffffff',accent:'#f0f0f0'},{bg1:'#2193b0',bg2:'#6dd5ed',primary:'#ffffff',accent:'#f5f5f5'},{bg1:'#ff512f',bg2:'#dd2476',primary:'#ffffff',accent:'#fdd835'},{bg1:'#43cea2',bg2:'#185a9d',primary:'#ffffff',accent:'#e0f2f1'},{bg1:'#c33764',bg2:'#1d2671',primary:'#ffffff',accent:'#fce4ec'},{bg1:'#5614B0',bg2:'#dbd65c',primary:'#ffffff',accent:'#f3e5f5'},{bg1:'#0f2027',bg2:'#203a43',bg3:'#2c5364',primary:'#ffffff',accent:'#cfd8dc'},{bg1:'#141E30',bg2:'#243B55',primary:'#ffffff',accent:'#90a4ae'},{bg1:'#2b5876',bg2:'#4e4376',primary:'#ffffff',accent:'#e8eaf6'},{bg1:'#e52d27',bg2:'#b31217',primary:'#ffffff',accent:'#ffebee'},{bg1:'#00416A',bg2:'#799F0C',bg3:'#FFE000',primary:'#ffffff',accent:'#f1f8e9'},{bg1:'#373B44',bg2:'#4286f4',primary:'#ffffff',accent:'#e3f2fd'},{bg1:'#1e3c72',bg2:'#2a5298',primary:'#ffffff',accent:'#d1d9ff'},{bg1:'#3a6186',bg2:'#89253e',primary:'#ffffff',accent:'#fbe9e7'},{bg1:'#16222A',bg2:'#3A6073',primary:'#ffffff',accent:'#eceff1'},{bg1:'#4b6cb7',bg2:'#182848',primary:'#ffffff',accent:'#e7e9f8'},{bg1:'#7b4397',bg2:'#dc2430',primary:'#ffffff',accent:'#fae8ff'},{bg1:'#360033',bg2:'#0b8793',primary:'#ffffff',accent:'#e0f7fa'}];const getPalette=(titleStr)=>{let hash=0;for(let i=0;i<titleStr.length;i++)hash=titleStr.charCodeAt(i)+((hash<<5)-hash);return palettes[Math.abs(hash%palettes.length)]}
const drawBackground=(ctx,palette,w,h)=>{const gradient=ctx.createLinearGradient(0,0,w,h);gradient.addColorStop(0,palette.bg1);gradient.addColorStop(1,palette.bg2);if(palette.bg3)gradient.addColorStop(0.5,palette.bg3);ctx.fillStyle=gradient;ctx.fillRect(0,0,w,h)}
const drawGeometricPattern=(ctx,w,h)=>{ctx.save();ctx.globalAlpha=0.04;for(let i=0;i<60;i++){const x=Math.random()*w,y=Math.random()*h,size=Math.random()*80+20;ctx.fillStyle='white';ctx.beginPath();const type=Math.random();if(type<0.3)ctx.arc(x,y,size/2,0,2*Math.PI);else if(type<0.6)ctx.rect(x-size/2,y-size/2,size,size);else{ctx.moveTo(x,y-size/2);ctx.lineTo(x+size/2,y+size/2);ctx.lineTo(x-size/2,y+size/2);ctx.closePath()}ctx.fill()}ctx.restore()}
const wrapText=(ctx,text,x,y,maxWidth,lineHeight,palette)=>{const fontSize=text.length>30?75:90;ctx.font=`bold ${fontSize}px 'Arial', sans-serif`;ctx.fillStyle=palette.primary;ctx.strokeStyle='rgba(0,0,0,0.2)';ctx.lineWidth=8;ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor='rgba(0,0,0,0.35)';ctx.shadowBlur=12;ctx.shadowOffsetX=6;ctx.shadowOffsetY=6;const words=text.split(' ');let line='',lines=[];for(let n=0;n<words.length;n++){const testLine=line+words[n]+' ';if(ctx.measureText(testLine).width>maxWidth&&n>0){lines.push(line);line=words[n]+' '}else line=testLine}lines.push(line);const startY=y-(lineHeight*(lines.length-1))/2;lines.forEach((currentLine,i)=>{currentLine=currentLine.trim();ctx.strokeText(currentLine,x,startY+i*lineHeight);ctx.fillText(currentLine,x,startY+i*lineHeight)});ctx.shadowColor='transparent'}
createImageFor=(imgTitle)=>{const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;const ctx=canvas.getContext('2d');ctx.clearRect(0,0,W,H);ctx.scale(S,S);const palette=getPalette(imgTitle);drawBackground(ctx,palette,BASE_W,BASE_H);drawGeometricPattern(ctx,BASE_W,BASE_H);wrapText(ctx,imgTitle,BASE_W/2,BASE_H/2,BASE_W*0.8,100,palette);ctx.font="600 28px 'Arial', sans-serif";ctx.fillStyle=palette.primary;ctx.textAlign="right";ctx.textBaseline="bottom";ctx.globalAlpha=0.7;ctx.fillText("gklearnstudy.in",BASE_W-30,BASE_H-25);ctx.globalAlpha=1;return canvas.toDataURL('image/png')}}
return createImageFor(title)}})();

window.GKApp.generateAuthorAvatar = (name = 'G') => {
    if (name === "Mr. Himanshu Tyagi" || name === "Owner") {
        return `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GK Learn Study white-blue-red circular logo" style="isolation:isolate; display:inline-block;"><defs><linearGradient id="avatar-profile-unique12345" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ffffff"/><stop offset="70%" stop-color="#ffffff"/><stop offset="100%" stop-color="#ff9999"/></linearGradient></defs><circle cx="20" cy="20" r="20" fill="url(#avatar-profile-unique12345)" stroke="#ffffff" stroke-width="1" style="vector-effect:non-scaling-stroke; shape-rendering:geometricPrecision;" /><text x="50%" y="38%" dominant-baseline="middle" text-anchor="middle" font-size="14" font-weight="bold" fill="#e40707" font-family="Arial, sans-serif" style="paint-order:stroke; isolation:isolate;">GK</text><text x="50%" y="68%" dominant-baseline="middle" text-anchor="middle" font-size="6" fill="#e40707" font-family="Arial, sans-serif" style="paint-order:stroke; isolation:isolate;">Learn Study</text></svg>`;
    }

    const words = name.split(' ').filter(Boolean);
    let initials = words.length > 0 ? words[0][0] : '';
    if (words.length > 1) {
        initials += words[words.length - 1][0];
    }
    initials = initials.toUpperCase();

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    const hue = Math.abs(hash % 360);
    const color = `hsl(${hue}, 65%, 55%)`;

    const fontSize = initials.length > 1 ? '16' : '20';

    return `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="${color}" />
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" font-weight="bold" fill="#fff" font-family="Arial, sans-serif">${initials}</text>
            </svg>`;
};

function initializePostRendering(){
    const POSTS_INITIAL_LOAD=30;
    const POSTS_PER_PAGE=20;
    const PAGES_WITH_RANDOM_RELATED=['kaise-karen'];
    const postsContainer=document.getElementById("post-grid");
    const postFilterInput=document.getElementById("post-filter-input");
    const categoryListContainer=document.querySelector(".category-list");
    const loadMoreBtn=document.getElementById("load-more-btn");
    const relatedPostsGrid=document.getElementById("related-posts-grid");
    const path=window.location.pathname;
    let pageSlug=path.substring(path.lastIndexOf('/')+1)||'index';
    const dotIndex=pageSlug.lastIndexOf('.');
    if(dotIndex>-1)pageSlug=pageSlug.substring(0,dotIndex);
    if(pageSlug===''||pageSlug==='index'||pageSlug.endsWith('index.html'))pageSlug='index';

    const debounce = (func, delay = 250) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };
    
    const createPostCard=(post,index)=>{
        const card=document.createElement('article');
        card.className='card';
        card.setAttribute('aria-label',post.title);
        card.dataset.index=index;
        
        let imageHtml;
        if (post.svg) {
            imageHtml = post.svg;
        } else if (post.icon) {
            imageHtml = `<div class="icon-thumbnail">${post.icon}</div>`;
        } else {
            imageHtml = `<img class="lazy-concept-image" data-title="${post.title}" alt="${post.title}" loading="lazy" width="320" height="180" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23e9e9e9'/%3E%3C/svg%3E">`;
        }
        
        const readingTimeLabel = post.readingTime 
            ? `<span class="reading-time-label">${post.readingTime}</span>` 
            : '';

        const authorAvatarHTML = window.GKApp.generateAuthorAvatar(post.author);

        const metaBlock=`
            <div class="post-meta-container">
                <div class="byline">
                    <div class="author-avatar">
                        ${authorAvatarHTML}
                    </div>
                    <div class="author-details">
                        <span class="author vcard">by <a href="profile.html?author=${encodeURIComponent(post.author)}" class="name">${post.author}</a></span>
                        <span class="entry-modified-date">Updated on <time class="entry-date updated">${post.date}</time></span>
                    </div>
                </div>
                <div class="share-button-wrapper">
                    <button class="share-button" title="Share this page"><svg class="share-icon" viewBox="0 0 24 24" width="20" height="20"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path></svg><span>Share</span></button>
                </div>
            </div>`;
        card.innerHTML=`<div class="card-thumbnail"><a href="categories.html?category=${encodeURIComponent(post.category)}" class="category-badge">${post.category}</a>${readingTimeLabel}<a href="${post.url}" class="card-image-link" tabindex="-1">${imageHtml}</a></div><div class="card-content"><h3 class="card-title"><a href="${post.url}">${post.title}</a></h3><p class="card-summary"><a href="${post.url}">${post.paragraph}</a></p></div>${metaBlock}`;
        return card
    };
    window.GKApp.createPostCard = createPostCard;

    let imageObserver;
    const initializeLazyLoading = (container) => {
        const lazyImages = container.querySelectorAll('.lazy-concept-image');
        if (!("IntersectionObserver" in window)) {
            // Fallback for older browsers: load all images immediately
            lazyImages.forEach(img => {
                const title = img.dataset.title;
                if (title) img.src = window.GKApp.generateConceptImage(title);
            });
            return;
        }

        if (imageObserver) imageObserver.disconnect();

        imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const title = img.dataset.title;
                    if (title) {
                        img.src = window.GKApp.generateConceptImage(title);
                        img.classList.remove('lazy-concept-image');
                        observer.unobserve(img);
                    }
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    };
    window.GKApp.initializeLazyLoading = initializeLazyLoading;

    if(postsContainer&&loadMoreBtn){
        const pageKeys = ['vyakaran', 'conversion', 'computer', 'kaise-karen', 'gk-quiz'];
        let pageKeyForFiltering = 'index';
        if (pageKeys.includes(pageSlug)) {
            pageKeyForFiltering = pageSlug;
        }

        const allPostsForPage=(pageKeyForFiltering==='index')?window.GKApp.searchData:window.GKApp.searchData.filter(p=>p.page&&p.page.split(';').includes(pageKeyForFiltering));
        let currentFilteredPosts=[...allPostsForPage];
        let visiblePostCount=POSTS_INITIAL_LOAD;

        const renderPosts=(posts)=>{
            postsContainer.innerHTML="";
            if(posts.length===0){
                postsContainer.innerHTML='<p class="no-posts-found">No articles match your filter.</p>';
                return;
            }
            const fragment=document.createDocumentFragment();
            posts.forEach((post,index)=>{fragment.appendChild(createPostCard(post,index))});
            postsContainer.appendChild(fragment);
            initializeLazyLoading(postsContainer);
        };

        const updatePostsDisplay=()=>{
            const postsToRender=currentFilteredPosts.slice(0,visiblePostCount);
            renderPosts(postsToRender);
            loadMoreBtn.style.display=(visiblePostCount>=currentFilteredPosts.length)?"none":"block"
        };
        const handleFilter=(filteredPosts)=>{
            currentFilteredPosts=filteredPosts;
            visiblePostCount=POSTS_INITIAL_LOAD;
            updatePostsDisplay()
        };
        const applyFilters=()=>{
            const category=document.querySelector(".category-list a.active-category")?.dataset.category||"all";
            const query=postFilterInput?postFilterInput.value.trim().toLowerCase():"";
            let filtered=allPostsForPage;
            if(category.toLowerCase()!=="all"){
                filtered=filtered.filter((post)=>post.category===category)
            }
            if(query){
                filtered=window.GKApp.fuzzySearch(query,filtered)
            }
            handleFilter(filtered)
        };
        postsContainer.addEventListener('click',(event)=>{
            const card=event.target.closest('.card');
            if(!card)return;
            const shareButton=event.target.closest('.share-button');
            if(shareButton){
                event.preventDefault();
                const postIndex=parseInt(card.dataset.index,10);
                const post=currentFilteredPosts[postIndex];
                if(post&&navigator.share){
                    navigator.share({title:post.title,text:post.paragraph,url:new URL(post.url,window.location.origin).href}).catch(console.log)
                } else {
                    alert('Share functionality not supported.')
                }
            }
        });

        if(postFilterInput){
            postFilterInput.addEventListener("input", debounce(applyFilters, 300));
        }
        
        const generateCategories=()=>{
            if(!categoryListContainer)return;
            const categoryCounts=allPostsForPage.reduce((acc,post)=>{
                if(post.category){acc[post.category]=(acc[post.category]||0)+1}
                return acc
            },{});
            const categoryDisplayNames={'Conversion':'Unit Conversion','Vyakaran':'Vyakaran','Kaise Karen':'How To','Computer':'Computer Guides'};
            let categoryHTML=`<li><a href="#" data-category="all" class="active-category">All Articles <span class="category-count">${allPostsForPage.length}</span></a></li>`;
            Object.entries(categoryCounts).forEach(([category,count])=>{
                const displayName=categoryDisplayNames[category]||category;
                categoryHTML+=`<li><a href="#" data-category="${category}">${displayName} <span class="category-count">${count}</span></a></li>`
            });
            categoryListContainer.innerHTML=categoryHTML;
            const categoryLinks=categoryListContainer.querySelectorAll("a");
            categoryLinks.forEach((link)=>{
                link.addEventListener("click",(e)=>{
                    e.preventDefault();
                    categoryLinks.forEach((l)=>l.classList.remove("active-category"));
                    link.classList.add("active-category");
                    applyFilters()
                })
            })
        };
        loadMoreBtn.addEventListener("click",()=>{
            visiblePostCount+=POSTS_PER_PAGE;
            updatePostsDisplay()
        });
        generateCategories();
        applyFilters()
    }
    if(relatedPostsGrid){
        const MAX_RELATED_POSTS=6;
        const renderPostsToGrid=(posts,grid)=>{
            const fragment=document.createDocumentFragment();
            posts.slice(0,MAX_RELATED_POSTS).forEach((post,index)=>{
                fragment.appendChild(createPostCard(post,index))
            });
            grid.innerHTML='';
            grid.appendChild(fragment);
            initializeLazyLoading(grid);
        };
        const renderContextualPosts=(currentUrlPath)=>{
            const allPosts=window.GKApp.searchData;
            const currentArticle=allPosts.find(p=>p.url===currentUrlPath||p.url===`/${currentUrlPath}`||p.url.endsWith(currentUrlPath));
            const stopwords=new Set(['a','an','the','in','on','off','is','are','to','and','or','was','it','this','that','kaise','karen','how','to','do','get','kya','hai','mein','ko','of','for','with','html','in-hindi','kren','chalaye','definition','use','what','for','with','परिभाषा','भेद','उदाहरण','लेखन','शब्द','विचार']);
            const urlKeywords=new Set(pageSlug.split('-').filter(word=>word.length>2&&!stopwords.has(word)));
            const currentArticleTags=new Set(currentArticle&&currentArticle.page?currentArticle.page.split(';'):[]);
            const scoredPosts=allPosts.filter(p=>p.url!==currentArticle?.url).map(post=>{
                let score=0;
                const postContent=`${post.title.toLowerCase()} ${post.url.toLowerCase()}`;
                const postTags=new Set(post.page?post.page.split(';'):[]);
                urlKeywords.forEach(keyword=>{if(postContent.includes(keyword)){score+=15}});
                postTags.forEach(tag=>{if(currentArticleTags.has(tag)){score+=10}});
                if(score>15&&score%10!==0){score+=5}
                return{post,score}
            }).filter(item=>item.score>0).sort((a,b)=>b.score-a.score);
            let stickyPosts=scoredPosts.map(p=>p.post);
            const stickyUrls=new Set(stickyPosts.map(p=>p.url));
            let finalRelatedList=[...stickyPosts];
            if(finalRelatedList.length<MAX_RELATED_POSTS){
                let fillerCandidates=[];
                if(currentArticleTags.size>0){
                    const primaryTag=Array.from(currentArticleTags)[0];
                    fillerCandidates=allPosts.filter(p=>!stickyUrls.has(p.url)&&p.url!==currentArticle?.url&&p.page&&p.page.split(';').includes(primaryTag))
                }
                finalRelatedList.push(...fillerCandidates.sort(()=>0.5-Math.random()))
            }
            finalRelatedList=[...new Map(finalRelatedList.map(item=>[item.url,item])).values()];
            if(finalRelatedList.length<MAX_RELATED_POSTS){
                const existingUrls=new Set(finalRelatedList.map(p=>p.url));
                if(currentArticle)existingUrls.add(currentArticle.url);
                const randomFill=allPosts.filter(p=>!existingUrls.has(p.url)).sort(()=>0.5-Math.random());
                finalRelatedList.push(...randomFill.slice(0,MAX_RELATED_POSTS-finalRelatedList.length))
            }
            renderPostsToGrid(finalRelatedList,relatedPostsGrid)
        };
        if(pageSlug==='index'||PAGES_WITH_RANDOM_RELATED.includes(pageSlug)){
            const allPosts=[...window.GKApp.searchData];
            renderPostsToGrid(allPosts.sort(()=>0.5-Math.random()),relatedPostsGrid)
        }else{
            const mainPageSlugs=['vyakaran','conversion','computer'];
            const isCategoryPage=mainPageSlugs.includes(pageSlug)&&(path===`/${pageSlug}`||path===`/${pageSlug}.html`);
            if(isCategoryPage){
                const postsForCategory=window.GKApp.searchData.filter(p=>p.page&&p.page.split(';').includes(pageSlug));
                renderPostsToGrid(postsForCategory.sort(()=>0.5-Math.random()),relatedPostsGrid)
            }else if(pageSlug){
                renderContextualPosts(path.substring(1))
            }else{
                renderPostsToGrid([...window.GKApp.searchData].sort(()=>0.5-Math.random()),relatedPostsGrid)
            }
        }
    }
}
document.addEventListener("DOMContentLoaded",()=>{
    window.GKApp.dataReady.then(initializePostRendering).catch(error=>{
        console.error("Failed to initialize post rendering due to data loading error:",error);
        const postsContainer=document.getElementById("post-grid");
        if(postsContainer){
            postsContainer.innerHTML='<p class="no-posts-found">Could not load articles. Please check your connection and try again.</p>'
        }
    })
})
