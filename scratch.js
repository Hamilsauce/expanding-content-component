seriesContainers.forEach(elm => {
	elm.addEventListener('click', e => {
		console.log('curtar');
		console.log(e.currentTarget);
		let el = e.currentTarget
		e.target.classList.toggle("active");
		let content = e.target.nextElementSibling;
		if (el.style.maxHeight) {
			// el.style.maxHeight = null;
			el.style.zIndex = 30;
			el.style.maxHeight = content.scrollHeight + "px";
		} else {
			el.style.zIndex = 30;
			el.style.maxHeight = content.scrollHeight + "px";
		}
	});
});
