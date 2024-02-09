function dicofy(el, url){
  let text = el.innerHTML.split(' ')
  el.replaceChildren();
  for(let i=0;i<text.length;i++){
    let a = document.createElement('a');
    a.setAttribute('href',url.replace('?',text[i].replace(/[\s.,?!]/gi,'').replace(/<ruby>.*<rt>((?!<\/ruby>).*)<\/rt><\/ruby>/i,'$1')));
    a.append(text[i]);
    el.appendChild(a);
    el.append(' ');
  }
}

//example :
// dicofy(document.getElementById("verso"),'http://wordreference.com/defr/?')
