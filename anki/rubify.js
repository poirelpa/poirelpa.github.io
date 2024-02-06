
//https://www.npmjs.com/package/pinyin-separate?activeTab=code

var ponctuation = '.。?？!！，，、';
function separate(pinyin) {
  var vowels = 'aāáǎăàeēéěĕèiīíǐĭìoōóǒŏòuūúǔŭùüǖǘǚǚü̆ǜvv̄v́v̆v̌v̀';
  var tones = 'ā|á|ǎ|ă|à|ē|é|ě|ĕ|è|ī|í|ǐ|ĭ|ì|ō|ó|ǒ|ŏ|ò|ū|ú|ǔ|ŭ|ù|ǖ|ǘ|ǚ|ǚ|ü̆|ǜ|v̄|v́|v̆|v̌|v̀';
  var initials = 'b|p|m|f|d|t|n|l|g|k|h|j|q|x|zh|ch|sh|r|z|c|s';
  return pinyin.replace(/'/g, ' ') // single quote used for separation
    .replace(new RegExp('[' + ponctuation + ']', 'gi'), '') // remove ponctuation
    .replace(new RegExp('(' + tones + ')(' + tones + ')', 'gi'), '$1 $2') // split two consecutive tones
    .replace(new RegExp('([' + vowels + '])([^' + vowels + 'nr])', 'gi'), '$1 $2') // This line does most of the work
    .replace(new RegExp('(\\w)([csz]h)', 'gi'), '$1 $2') // double-consonant initials
    .replace(new RegExp('([' + vowels + ']{2}(ng? )?)([^\\snr])', 'gi'), '$1 $3') // double-vowel finals
    .replace(new RegExp('([' + vowels + ']{2})(n[' + vowels + '])', 'gi'), '$1 $2') // double-vowel followed by n initial
    .replace(new RegExp('(n)([^' + vowels + 'vg])', 'gi'), '$1 $2') // cleans up most n compounds
    .replace(new RegExp('((ch|sh|(y|b|p|m|f|d|t|n|l|j|q|x)i)(a|\u0101|\xE1|\u01CE|\u0103|\xE0)) (o)', 'gi'), '$1$5') // fix https://github.com/Connum/npm-pinyin-separate/issues/1
    .replace(new RegExp('(w|gu|ku|hu|zhu|chu|shu)(a|\u0101|\xE1|\u01CE|\u0103|\xE0) (i)', 'gi'), '$1$2$3') // fix "i" being split from syllables ending in (u)ai
    .replace(new RegExp('((a|\u0101|\xE1|\u01CE|\u0103|\xE0)o)(' + initials + ')', 'gi'), '$1 $3') // fix syllable ending in ao followed by another syllable
    .replace(new RegExp('((o|\u014D|\xF3|\u01D2|\u014F|\xF2)u)(' + initials + ')', 'gi'), '$1 $3') // fix syllable ending in ou followed by another syllable
    .replace(new RegExp('(y(u|\u016B|\xFA|\u01D4|\u016D|\xF9|\xFC|\u01D6|\u01D8|\u01DA|u\u0308\u030C|u\u0308\u0306|\u01DC|v|v\u0304|v\u0301|v\u0306|v\u030C|v\u0300))(n)(u|\u016B|\xFA|\u01D4|\u016D|\xF9|\xFC|\u01D6|\u01D8|\u01DA|u\u0308\u030C|u\u0308\u0306|\u01DC|v|v\u0304|v\u0301|v\u0306|v\u030C|v\u0300)', 'gi'), '$1 $3$4') // fix two "u" (or "ü") separated by an "n" not being split
    .replace(new RegExp('([' + vowels + 'v])([^' + vowels + '\\w\\s])([' + vowels + 'v])', 'gi'), '$1 $2$3') // assumes correct Pinyin (i.e., no missing apostrophes)
    .replace(new RegExp('([' + vowels + 'v])(n)(g)([' + vowels + 'v])', 'gi'), '$1$2 $3$4') // assumes correct Pinyin, i.e. changan = chan + gan
    .replace(new RegExp('([gr])([^' + vowels + '])', 'gi'), '$1 $2') // fixes -ng and -r finals not followed by vowels
    .replace(new RegExp('([^eēéěĕè\\w\\s])(r)', 'gi'), '$1 $2') // r an initial, except in er
    .replace(new RegExp('([^\\w\\s])([eēéěĕè]r)', 'gi'), '$1 $2') // er
    .replace(/\s{2,}/g, ' ') // remove double-spaces
    .split(' ')
}


function rubify(pinyinEl, hanziEl){
  let pinyinTokens = separate(pinyinEl.textContent);
  let hanzi = hanziEl.textContent;
  hanziEl.replaceChildren()
  for(let i = 0, j=0; i< hanzi.length; i++) {
    if(ponctuation.includes(hanzi[i]) || hanzi[i]===' '){
      hanziEl.append(hanzi[i])
    } else {
      var rubyEl = document.createElement('ruby');
      hanziEl.appendChild(rubyEl);
      rubyEl.append(hanzi[i]);
      rtEl = document.createElement('rt');
      let py = pinyinTokens[j++];
      let ton = 0;
      if(py.match(/[āēīōūǖ]/gi)) ton = 1;
      else if(py.match(/[áéíóúǘ]/gi)) ton = 2;
      else if(py.match(/[ǎěǐǒǔǚ]/gi)) ton = 3;
      else if(py.match(/[àèìòùǜ]/gi)) ton = 4;
      else ton = 5;
      rtEl.append(py);
      rubyEl.append(rtEl);
      rubyEl.className='ton'+ton;
    }
  }
  pinyinEl.setAttribute('style','display:none')
}

let pinyin_el = document.getElementById("pinyin")
let hanzi_el = document.getElementById("hanzi")

//example :
// rubify(document.getElementById("pinyin"),document.getElementById("hanzi"))
