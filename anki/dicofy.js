function dicofy(el, url){
  let text = el.innerHTML.split(' ')
  el.replaceChildren();
  for(let i=0;i<text.length;i++){
    let a = document.createElement('a');
    a.setAttribute('href',url.replace('?',text[i].replace(/[\s.,?!]/gi,'').replace(/<ruby>(?:(?!<\/ruby>).)*<rt>((?:(?!<\/ruby>).)*)<\/rt><\/ruby>/gi,'$1')));
    a.innerHTML=text[i];
    el.appendChild(a);
    el.append(' ');
  }
}

//example :
// dicofy(document.getElementById("verso"),'http://wordreference.com/defr/?')
