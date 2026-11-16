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

// 큰 숫자: 화면에 처음 들어올 때 0부터 한 번만 올라감 (스크립트가 없으면 최종값이 그대로 보임)
(function () {
  const nums = [...document.querySelectorAll('.results .count')];
  if (!nums.length || !document.documentElement.classList.contains('js-motion')) return;
  nums.forEach(n => { n.dataset.final = n.textContent; n.textContent = '0'; });
  const run = () => {
    const t0 = performance.now(), dur = 1100;
    const step = t => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      nums.forEach(n => { n.textContent = Math.round(+n.dataset.to * e); });
      if (p < 1) requestAnimationFrame(step); else nums.forEach(n => { n.textContent = n.dataset.final; });
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { run(); io.disconnect(); } }, { threshold: .25 });
  io.observe(document.getElementById('results'));
})();
