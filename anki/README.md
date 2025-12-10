# rubify.js

Transforms chinese Pinyin + Hanzi into ruby, with colored tones

# dicofy.js
adds links to a dictionary

# compare.js
transforms the comparison for typed answers to ignore case, and ignore problems with stt arabic (ignore missing diacritics)

# example
dynamic loading : https://www.reddit.com/r/Anki/comments/e005jx/comment/f8bwh8i/?utm_source=share&utm_medium=web2x
```html
<div id="recto">Le Feu</div>
<div id="verso">das Feuer, die Feuer</div>
<style>
a {
  text-decoration:none;
  color:black;
}
</style>

<div id="hanzi">我可以、 问你吗?</div>
<div id="pinyin">wǒkěyǐ  wènnǐma?</div>
<style>
.ton1{color:red}
.ton2{color:green}
.ton3{color:purple}
.ton4{color:blue}
.ton5{color:gray}
</style>


<style>
	.typeGood {background-color:green}
	.typeBad {background-color:red}
	.typeMissed {background-color:gray}
</style>
<code id="typeans">
	<span class="typeBad">n</span><span class="typeGood">a</span><span class="typeMissed">---------</span><span class="typeGood">م</span><span class="typeMissed">-</span><span class="typeGood">ل</span><span class="typeMissed">-</span><span class="typeGood">ك</span><span class="typeBad">ه</span>
	<br><span id="typearrow">↓</span><br>
	<span class="typeBad">N</span><span class="typeGood">a</span><span class="typeMissed"> esquerda</span><span class="typeGood">م</span><span class="typeMissed"> َ</span><span class="typeGood">ل</span><span class="typeMissed"> ِ</span><span class="typeGood">ك</span><span class="typeBad">ة</span>
</code>

<script>
var injectScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

(async () => {
  if (typeof dicofy === 'undefined') {
    await injectScript('https://poirelpa.github.io/anki/dicofy.js');
  }
  dicofy(document.getElementById('verso'), 'https://de.wiktionary.org/wiki/%s');
  if (typeof rubify === 'undefined') {
    await injectScript('https://poirelpa.github.io/anki/rubify.js');
  }
  rubify(document.getElementById('pinyin'), document.getElementById('hanzi'));
  if (typeof betterCompare === 'undefined') {
    await injectScript('https://poirelpa.github.io/anki/compare.js');
  }
  betterCompare();
})();
</script>
```
