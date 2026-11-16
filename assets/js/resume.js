// 글자색 비교용: 주소 끝에 ?text=black 을 붙이면 포인트 색 위 글자가 검정이 된다
if (new URLSearchParams(location.search).get('text') === 'black') document.body.classList.add('on-black');

// 이력 목록: 누른 행을 강조
const rows = [...document.querySelectorAll('.index .index-row')];
rows.forEach(row => row.addEventListener('click', () => { rows.forEach(r => r.classList.remove('selected')); row.classList.add('selected'); }));

// 첫 문장 후보 바꿔 보기 (미확정)
const line = document.getElementById('hook-line'), note = document.getElementById('hook-note');
document.querySelectorAll('.hook-pick button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.hook-pick button').forEach(x => x.classList.toggle('on', x === b));
  line.textContent = b.dataset.hook; note.textContent = b.dataset.note || '';
}));

// 성과 그래프: 화면에 처음 들어올 때 한 번만 움직임
document.querySelectorAll('.dots i').forEach((d, i) => d.style.setProperty('--i', i));
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
  document.documentElement.classList.add('js-motion');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animate'); io.unobserve(e.target); } }), { threshold: .25 });
  document.querySelectorAll('.results').forEach(el => io.observe(el));
}
