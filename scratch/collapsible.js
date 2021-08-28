import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const app = document.querySelector('.app')
const series = [...document.querySelectorAll('.series')]
const games = [...document.querySelectorAll('.game')]
const seriesColls = [...document.querySelectorAll('.series-collapsible')]
const gameColls = [...document.querySelectorAll('.game-collapsible')]
const colls = [...document.querySelectorAll('.collapsible')]

series.forEach((s, i) => {
  /* 
   *  'Series handle CHILD clicked 
   */
  s.addEventListener("game-clicked", e => {
    const targ = e.target
    const childHeight = e.detail.childMaxHeight
    const content = s.querySelector('.series-content')
    content.style.maxHeight = `${parseInt(content.scrollHeight) + parseInt(childHeight)}px`;
  });
});

seriesColls.forEach((s, i) => {
  /* 
   *  Only handles SERIES COLLAPSIBLE clicked
   */
  s.addEventListener("click", e => {
    const content = e.target.nextElementSibling;

    e.target.classList.toggle("active");

    if (content.style.maxHeight) {
      const childContents = [...ham.qsa('.content', content)];
      const childColls = [...ham.qsa('.collapsible', content)];
      content.style.maxHeight = null;
      childContents.forEach(ch => ch.style.maxHeight = null);
      childColls.forEach(ch => ch.classList.remove("active"));
    } else content.style.maxHeight = `${content.scrollHeight}px`;
  });
})

gameColls.forEach((game, i) => {
  /* 
   *  Only handles GAME COLLAPSIBLE clicked
   */
  game.addEventListener("click", e => {
    const targ = e.target
    const content = e.target.nextElementSibling;
    targ.classList.toggle("active");
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }

    const gameClickEvent = new CustomEvent('game-clicked', { bubbles: true, detail: { childMaxHeight: content.style.maxHeight } })
    targ.dispatchEvent(gameClickEvent)
  }, true);
});