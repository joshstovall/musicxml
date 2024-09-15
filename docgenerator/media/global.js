(function(){
    var mq = window.matchMedia('(max-width: 800px)');
    if (mq.matches) {
        document.body.classList.remove("has-sidenav");
    }
    mq.addEventListener('change', (e) => {
        if(mq.matches) {
            document.body.classList.remove("has-sidenav");
        }
    });
    var toggle = document.getElementById('toggle');
    toggle.addEventListener('click', (e) => {
        document.body.classList.toggle("has-sidenav");
    });
})();

function syntaxHighlighter(elmnt) {
    if (elmnt.classList.contains('nohighlight'))
        return
    let xmlText = elmnt.innerHTML;
    const comments = [];
    xmlText = xmlText.replace(/&lt;!--([\s\S]*?)--&gt;/g, (_, comment) => {
        comments.push(comment);
        return `<!--comment_${comments.length - 1}-->`;
    });
    xmlText = xmlText.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;');
    xmlText = xmlText.replace(/&lt;(\!?\/?)([a-zA-Z0-9\-]+|\?)(.*?)(\/?)&gt;([^&lt;]*)/g, (_, p1, p2, p3, p4, p5) => {
        let tag = `<span class="bracket">&lt;${p1}</span><span class="tag">${p2}</span>`;
        if (p3.trim() && p1 !== '!') {
            tag += p3.replace(/([a-zA-Z0-9\-]+)(\s*)(=)(\s*)("[^"]*")/g, (_, attrName, space1, equals, space2, attrValue) => {
                const valueText = attrValue.replace(/"([^"]*)"/, '<span class="quote">"</span><span class="attrval">$1</span><span class="quote">"</span>');
                return `<span class="attrname">${attrName}</span>${space1}<span class="equals">${equals}</span>${space2}${valueText}`;
            });
        }
        if (p4 === '/') tag += `<span class="slash">/</span>`;
        tag += `<span class="bracket">&gt;</span>`;
        return `<span class="element">${tag}</span>${p5}`;
    });
    xmlText = xmlText.replace(/<!--comment_(\d+)-->/g, (_, index) => {
        const comment = comments[index].replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;');
        return `<span class="comment">&lt;!--${comment}--&gt;</span>`;
    });
    if (!elmnt.classList.contains('boldtags')) elmnt.classList.add('xmlmarkup');
    elmnt.innerHTML = xmlText;
}