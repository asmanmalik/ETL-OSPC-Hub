async function fetchJSON(path) {
	const opts = { cache: 'no-store' };
	try {
		const res = await fetch(path, opts);
		if (!res.ok) throw 0;
		return await res.json();
	} catch (e) {
		return null;
	}
}

function animateCounter(id, end) {
	const el = document.getElementById(id);
	if (!el) return;
	let current = 0;
	const step = Math.max(1, Math.ceil((end || 0) / 40));
	const timer = setInterval(() => {
		current += step;
		if (current >= end) {
			current = end;
			clearInterval(timer);
		}
		el.textContent = String(current);
	}, 30);
}

function dedupe(arr) {
	return Array.from(new Set(arr)).filter(Boolean).sort();
}

async function initPeople() {
	const onPeoplePage =
		location.pathname.endsWith('/people.html') || location.pathname.endsWith('people.html');
	if (!onPeoplePage) return;

	const people = (await fetchJSON('./data/people.json')) || [];
	const projects = (await fetchJSON('./data/projects.json')) || { projects: [] };

	animateCounter('countContributors', people.length);
	animateCounter('countProjects', (projects.projects || []).length);
	animateCounter(
		'countUniversities',
		new Set(people.map((p) => p.university).filter(Boolean)).size
	);

	const uSel = document.getElementById('universityFilter');
	const sSel = document.getElementById('skillFilter');

	dedupe(people.map((p) => p.university)).forEach((x) => {
		const opt = document.createElement('option');
		opt.value = x;
		opt.textContent = x;
		uSel.appendChild(opt);
	});

	dedupe(people.flatMap((p) => p.skills || [])).forEach((x) => {
		const opt = document.createElement('option');
		opt.value = x;
		opt.textContent = x;
		sSel.appendChild(opt);
	});

	const grid = document.getElementById('people-grid');

	function card(p) {
		const d = document.createElement('div');
		d.className = 'card';
		d.innerHTML = `
			<h3>${p.name}</h3>
			<p><b>GitHub:</b> @${p.github}</p>
			<p><b>University:</b> ${p.university || '-'}</p>
			<p><b>Skills:</b> ${(p.skills || []).join(', ') || '-'}</p>
			<p><a href='../contributors/${p.github}.md'>View portfolio →</a></p>
		`;
		return d;
	}

	function render(list) {
		grid.innerHTML = '';
		const frag = document.createDocumentFragment();
		list.forEach((p, i) => {
			const c = card(p);
			setTimeout(() => c.classList.add('visible'), 60 * i);
			frag.appendChild(c);
		});
		grid.appendChild(frag);
	}

	function apply() {
		const q = (document.getElementById('search')?.value || '').toLowerCase();
		const uf = (uSel?.value || '').toLowerCase();
		const sf = (sSel?.value || '').toLowerCase();

		const out = people.filter((p) => {
			const name = p.name.toLowerCase();
			const uni = (p.university || '').toLowerCase();
			const skills = (p.skills || []).map((x) => x.toLowerCase());

			const mq =
				!q || name.includes(q) || uni.includes(q) || skills.some((x) => x.includes(q));
			const mu = !uf || uni === uf;
			const ms = !sf || skills.includes(sf);

			return mq && mu && ms;
		});

		render(out);
	}

	render(people);

	['search', 'universityFilter', 'skillFilter'].forEach((id) => {
		const el = document.getElementById(id);
		if (el) {
			el.addEventListener('input', apply);
			el.addEventListener('change', apply);
		}
	});
}

async function initMentors() {
	const onMentorsPage =
		location.pathname.endsWith('/mentors.html') || location.pathname.endsWith('mentors.html');
	if (!onMentorsPage) return;

	const data = (await fetchJSON('../data/mentors.json')) || [];

	animateCounter('countMentors', data.length);
	animateCounter(
		'countAffiliations',
		new Set(data.map((x) => x.affiliation).filter(Boolean)).size
	);

	const affiliationSel = document.getElementById('affiliationFilter');
	const expertiseSel = document.getElementById('expertiseFilter');

	dedupe(data.map((x) => x.affiliation)).forEach((x) => {
		const opt = document.createElement('option');
		opt.value = x;
		opt.textContent = x;
		affiliationSel.appendChild(opt);
	});

	dedupe(data.flatMap((x) => x.expertise || [])).forEach((x) => {
		const opt = document.createElement('option');
		opt.value = x;
		opt.textContent = x;
		expertiseSel.appendChild(opt);
	});

	const grid = document.getElementById('mentors-grid');

	function card(x) {
		const d = document.createElement('div');
		d.className = 'card mentor-card';

		const badges = (x.badges || []).join(' • ');

		d.innerHTML = `
			<div class='ribbon'>MENTOR</div>
			<h3>${x.name}</h3>
			<p><b>Role:</b> ${x.role || '-'}</p>
			<p><b>Affiliation:</b> ${x.affiliation || '-'}</p>
			<p><b>Expertise:</b> ${(x.expertise || []).join(', ') || '-'}</p>
			${badges ? `<p><b>Badges:</b> ${badges}</p>` : ''}
			${x.bio ? `<p>${x.bio}</p>` : ''}
			${x.github ? `<p><a href='https://github.com/${x.github}' target='_blank'>GitHub ↗</a></p>` : ''}
		`;
		return d;
	}

	function render(list) {
		grid.innerHTML = '';
		const frag = document.createDocumentFragment();
		list.forEach((x, i) => {
			const c = card(x);
			setTimeout(() => c.classList.add('visible'), 60 * i);
			frag.appendChild(c);
		});
		grid.appendChild(frag);
	}

	function apply() {
		const q = (document.getElementById('mentorSearch')?.value || '').toLowerCase();
		const af = (affiliationSel?.value || '').toLowerCase();
		const ef = (expertiseSel?.value || '').toLowerCase();

		const out = data.filter((x) => {
			const name = (x.name || '').toLowerCase();
			const aff = (x.affiliation || '').toLowerCase();
			const ex = (x.expertise || []).map((y) => y.toLowerCase());

			const mq = !q || name.includes(q) || aff.includes(q) || ex.some((y) => y.includes(q));
			const ma = !af || aff === af;
			const me = !ef || ex.includes(ef);

			return mq && ma && me;
		});

		render(out);
	}

	render(data);

	['mentorSearch', 'affiliationFilter', 'expertiseFilter'].forEach((id) => {
		const el = document.getElementById(id);
		if (el) {
			el.addEventListener('input', apply);
			el.addEventListener('change', apply);
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	initPeople();
	initMentors();
});