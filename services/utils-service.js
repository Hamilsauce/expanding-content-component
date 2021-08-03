//UTILS
export const $ = (targetEl, selector) => {
	const selectedEl = targetEl.querySelector(selector)
	return selectedEl;
}

export const $$ = (targetEl, selector) => {
	const selectedEls = targetEl.querySelectorAll(selector)
	return selectedEls;
}

export const findRelatedElement = (el, className) => {
	const relatedEl = [...$(document, `.${className}`)]
		.find(rel => {
			return el.dataset.series == relatedEl.dataset.series
		})
}

// END UTILS
{
	$,
	$$,
	findRelatedElement
}