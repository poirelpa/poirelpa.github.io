// see https://github.com/DerDemystifier/SmarterTypeField/blob/master/src/utils.mjs

function betterCompare(){
	// return if there is no typed text
	if(!document.querySelector('span#typearrow')) return;
	
	const typeSpans = [...document.querySelectorAll('code#typeans > span[class^="type"]')];
	const answerSpans = [...document.querySelectorAll('code#typeans > br ~ span[class^="type"]')];
	const entrySpans = typeSpans.filter((x) => !answerSpans.includes(x));

	entrySpans.forEach((entrySpan, i) => {
		console.log(entrySpan, i);
		let answerSpan = answerSpans[i];
		let entry = entrySpan.innerText;
		let answer = answerSpan.innerText;
		// ignore case
		if(entrySpan.classList.contains('typeBad') && entry.toLowerCase() == answer.toLowerCase()){
			entrySpan.classList.remove('typeBad');
			entrySpan.classList.add('typeGood');
			answerSpan.classList.remove('typeBad');
			answerSpan.classList.add('typeGood');
		}
		
		console.log(answer, answer.match(/^[\u064B-\u065F]+$/));
		// ignore missing diacritics
		if(entrySpan.classList.contains('typeMissing') && answer.match(/^[\u064B-\u065F]+$/)){
			entrySpan.classList.remove('typeMissing');
			entrySpan.classList.add('typeGood');
			answerSpan.classList.remove('typeMissing');
			answerSpan.classList.add('typeGood');
		}
		// ignore arabic heh vs teh marbuta
		if(entrySpan.classList.contains('typeBad') && answer=='ة' && entry=='ه'){
			entrySpan.classList.remove('typeBad');
			entrySpan.classList.add('typeGood');
			answerSpan.classList.remove('typeBad');
			answerSpan.classList.add('typeGood');
		}
	});
}
