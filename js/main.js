const BASE_URL = location.origin + location.pathname.replace(/\/[^/]*$/, '');

// 예시 미리보기 파라미터
const DEMO = {
  'gif-embed': '?url=https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif&radius=12&bg=%23f7f6f3',
  'clock': '?type=digital&theme=notion',
  'countdown': '?target=2027-01-01&title=2027년 새해까지&theme=notion&color=%232eaadc',
  'progress-bar': '?value=73&max=100&label=프로젝트 진행률&color=%232eaadc&theme=notion',
  'quote': '?text=작은 것에도 감사하면 큰 행복이 찾아옵니다&author=속담&theme=notion&font=serif',
  'image-slider': '?images=https://picsum.photos/seed/cute1/600/300,https://picsum.photos/seed/cute2/600/300,https://picsum.photos/seed/cute3/600/300&interval=2500&radius=4',
  'weather': '?lat=37.5665&lon=126.978&theme=notion'
};

// ===== 큐레이션 GIF 갤러리 (API 불필요) =====
const GIF_GALLERY = {
  '🐱 고양이': [
    'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    'https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif',
    'https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif',
    'https://media.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif',
    'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
    'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif'
  ],
  '🐶 강아지': [
    'https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif',
    'https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif',
    'https://media.giphy.com/media/Y4pAQv58ETJgRwoME8/giphy.gif',
    'https://media.giphy.com/media/bbshzgyFQDqPHXBo4c/giphy.gif',
    'https://media.giphy.com/media/9rtpurjbqiqZXbBBet/giphy.gif',
    'https://media.giphy.com/media/5i7umUqAOYYEw/giphy.gif'
  ],
  '💖 하트 / 사랑': [
    'https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif',
    'https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif',
    'https://media.giphy.com/media/3oEjI4sFlp73fvEYgw/giphy.gif',
    'https://media.giphy.com/media/l0HlStmmPGaCNDJeg/giphy.gif',
    'https://media.giphy.com/media/xUPGcMzfkOPQB3IohO/giphy.gif',
    'https://media.giphy.com/media/FnsbvgMCVbEqXP5mxy/giphy.gif'
  ],
  '✨ 반짝이 / 별': [
    'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
    'https://media.giphy.com/media/3oKIPjzfv0sI2p7fDW/giphy.gif',
    'https://media.giphy.com/media/xT0xeMA62E1XIlup68/giphy.gif',
    'https://media.giphy.com/media/l1J9EdzfOSgfyueLm/giphy.gif',
    'https://media.giphy.com/media/l0HlPwMAzh13pcZ20/giphy.gif',
    'https://media.giphy.com/media/26tPplGWjN83xDL4A/giphy.gif'
  ],
  '🎉 축하 / 파티': [
    'https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif',
    'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif',
    'https://media.giphy.com/media/s2qXK8wAvkHTO/giphy.gif',
    'https://media.giphy.com/media/lMameLIF8voLu8HxWV/giphy.gif',
    'https://media.giphy.com/media/26tOZ42Mg6r734gKI/giphy.gif',
    'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif'
  ],
  '🌸 자연 / 꽃': [
    'https://media.giphy.com/media/lo4Mz1IFKLOQE/giphy.gif',
    'https://media.giphy.com/media/SKGo6OYe24EBG/giphy.gif',
    'https://media.giphy.com/media/l378plm1gFMmFx3uo/giphy.gif',
    'https://media.giphy.com/media/xT5LMFZDsj0AKUDYTS/giphy.gif',
    'https://media.giphy.com/media/xUPGGDNsLvqsBOhuU0/giphy.gif',
    'https://media.giphy.com/media/3ohs7KViF6rA4aan5u/giphy.gif'
  ],
  '😂 재미 / 밈': [
    'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif',
    'https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif',
    'https://media.giphy.com/media/3ndAvECaexYHu/giphy.gif',
    'https://media.giphy.com/media/ZqlvCTNHpqrio/giphy.gif',
    'https://media.giphy.com/media/l0HlvtIPdijJT1Eq4/giphy.gif',
    'https://media.giphy.com/media/H4DjXQXamtTiIuCcRU/giphy.gif'
  ],
  '☕ 감성 / 코지': [
    'https://media.giphy.com/media/xT9IgDEI1iZyb2wqo8/giphy.gif',
    'https://media.giphy.com/media/xUOxeZn47mrdKqFhmM/giphy.gif',
    'https://media.giphy.com/media/3oriNPdeu2W1aelciY/giphy.gif',
    'https://media.giphy.com/media/l0MYGb1LuZ3n7dRnO/giphy.gif',
    'https://media.giphy.com/media/26FPJGjhefSJuaRhu/giphy.gif',
    'https://media.giphy.com/media/l0Iy5fjHyedk3pGiQ/giphy.gif'
  ]
};

const widgets = [
  {
    id: 'gif-embed',
    icon: '🎞️',
    name: 'GIF 임베드',
    desc: 'GIF 또는 이미지를 노션에 임베드합니다',
    tag: 'media', tagLabel: '미디어',
    configs: [
      { key: 'url', label: 'GIF URL', type: 'text', placeholder: 'https://media.giphy.com/...' },
      { key: 'width', label: '너비', type: 'text', placeholder: '100%' },
      { key: 'radius', label: '둥근 모서리 (px)', type: 'number', placeholder: '0' },
      { key: 'bg', label: '배경색', type: 'color', default: '#ffffff' }
    ]
  },
  {
    id: 'clock',
    icon: '🕐',
    name: '실시간 시계',
    desc: '아날로그 또는 디지털 시계를 표시합니다',
    tag: 'time', tagLabel: '시간',
    configs: [
      { key: 'type', label: '타입', type: 'select', options: ['digital', 'analog'] },
      { key: 'timezone', label: '타임존', type: 'select', options: ['Asia/Seoul', 'America/New_York', 'Europe/London', 'Asia/Tokyo'] },
      { key: 'theme', label: '테마', type: 'select', options: ['light', 'dark', 'notion'] },
      { key: 'showDate', label: '날짜 표시', type: 'select', options: ['true', 'false'] }
    ]
  },
  {
    id: 'countdown',
    icon: '⏳',
    name: '카운트다운 타이머',
    desc: '특정 날짜까지 남은 시간을 표시합니다',
    tag: 'time', tagLabel: '시간',
    configs: [
      { key: 'target', label: '목표 날짜', type: 'date' },
      { key: 'title', label: '제목', type: 'text', placeholder: '프로젝트 마감' },
      { key: 'theme', label: '테마', type: 'select', options: ['light', 'dark', 'notion'] },
      { key: 'color', label: '강조 색상', type: 'color', default: '#2eaadc' }
    ]
  },
  {
    id: 'progress-bar',
    icon: '📊',
    name: '진행률 바',
    desc: '목표 달성률을 시각적으로 표시합니다',
    tag: 'data', tagLabel: '데이터',
    configs: [
      { key: 'value', label: '현재 값', type: 'number', placeholder: '75' },
      { key: 'max', label: '최대 값', type: 'number', placeholder: '100' },
      { key: 'label', label: '라벨', type: 'text', placeholder: '프로젝트 진행률' },
      { key: 'color', label: '바 색상', type: 'color', default: '#2eaadc' },
      { key: 'theme', label: '테마', type: 'select', options: ['light', 'dark', 'notion'] }
    ]
  },
  {
    id: 'quote',
    icon: '💬',
    name: '명언 / 인용구',
    desc: '커스텀 문구 또는 랜덤 명언을 표시합니다',
    tag: 'text', tagLabel: '텍스트',
    configs: [
      { key: 'text', label: '문구 (비우면 랜덤)', type: 'text', placeholder: '오늘도 화이팅!' },
      { key: 'author', label: '저자', type: 'text', placeholder: '' },
      { key: 'theme', label: '테마', type: 'select', options: ['light', 'dark', 'notion'] },
      { key: 'font', label: '폰트 스타일', type: 'select', options: ['sans', 'serif', 'handwriting'] }
    ]
  },
  {
    id: 'image-slider',
    icon: '🖼️',
    name: '이미지 슬라이더',
    desc: '여러 이미지를 슬라이드쇼로 표시합니다',
    tag: 'media', tagLabel: '미디어',
    configs: [
      { key: 'images', label: '이미지 URL (쉼표로 구분)', type: 'text', placeholder: 'url1, url2, url3' },
      { key: 'interval', label: '전환 간격 (ms)', type: 'number', placeholder: '3000' },
      { key: 'effect', label: '전환 효과', type: 'select', options: ['fade', 'slide'] },
      { key: 'radius', label: '둥근 모서리 (px)', type: 'number', placeholder: '0' }
    ]
  },
  {
    id: 'weather',
    icon: '🌤️',
    name: '날씨',
    desc: '실시간 날씨 정보를 표시합니다 (Open-Meteo)',
    tag: 'info', tagLabel: '정보',
    configs: [
      { key: 'lat', label: '위도', type: 'text', placeholder: '37.5665 (서울)' },
      { key: 'lon', label: '경도', type: 'text', placeholder: '126.978 (서울)' },
      { key: 'theme', label: '테마', type: 'select', options: ['light', 'dark', 'notion'] },
      { key: 'unit', label: '온도 단위', type: 'select', options: ['celsius', 'fahrenheit'] }
    ]
  }
];

// ===== 갤러리 모달 상태 =====
let galleryTarget = null;
let activeCategory = null;

function buildWidgetURL(widget) {
  const params = new URLSearchParams();
  const form = document.getElementById(`config-${widget.id}`);
  if (!form) return `${BASE_URL}/widgets/${widget.id}/`;

  form.querySelectorAll('input, select').forEach(el => {
    const val = el.value.trim();
    if (val && val !== el.getAttribute('data-default')) {
      params.set(el.name, val);
    }
  });

  const qs = params.toString();
  return `${BASE_URL}/widgets/${widget.id}/${qs ? '?' + qs : ''}`;
}

function renderWidgets() {
  const grid = document.getElementById('widget-grid');
  grid.innerHTML = widgets.map(w => `
    <div class="widget-card" id="card-${w.id}">
      <div class="widget-card-header">
        <div class="widget-icon">${w.icon}</div>
        <div class="info">
          <h3>${w.name}</h3>
          <p class="desc">${w.desc}</p>
          <span class="widget-tag tag-${w.tag}">${w.tagLabel}</span>
        </div>
      </div>
      <div class="widget-preview">
        <iframe src="widgets/${w.id}/${DEMO[w.id] || ''}" loading="lazy" id="preview-${w.id}"></iframe>
      </div>
      <div class="widget-config" id="config-${w.id}">
        ${w.id === 'gif-embed' ? `
          <div class="config-group">
            <label>GIF 선택</label>
            <button class="btn-search" onclick="openGallery('gif-embed')">🎨 GIF 갤러리에서 선택...</button>
          </div>
        ` : ''}
        ${w.id === 'image-slider' ? `
          <div class="config-group">
            <label>이미지 추가</label>
            <button class="btn-search" onclick="openGallery('image-slider')">🎨 GIF 갤러리에서 추가...</button>
          </div>
        ` : ''}
        ${w.configs.map(c => `
          <div class="config-group">
            <label>${c.label}</label>
            ${c.type === 'select'
              ? `<select name="${c.key}">${c.options.map(o => `<option value="${o}">${o}</option>`).join('')}</select>`
              : `<input type="${c.type}" name="${c.key}" placeholder="${c.placeholder || ''}" value="${c.default || ''}" data-default="${c.default || ''}">`
            }
          </div>
        `).join('')}
      </div>
      <div class="widget-actions">
        <button class="btn btn-config" id="toggle-${w.id}" onclick="toggleConfig('${w.id}')">⚙ 설정</button>
        <button class="btn btn-copy" id="copy-${w.id}" onclick="copyURL('${w.id}')">URL 복사</button>
      </div>
    </div>
  `).join('');

  widgets.forEach(w => {
    const form = document.getElementById(`config-${w.id}`);
    form.querySelectorAll('input, select').forEach(el => {
      el.addEventListener('change', () => updatePreview(w.id));
      el.addEventListener('input', debounce(() => updatePreview(w.id), 500));
    });
  });
}

// ===== GIF 갤러리 모달 =====
function openGallery(target) {
  galleryTarget = target;
  const modal = document.getElementById('gallery-modal');
  const cats = document.getElementById('gallery-categories');
  const grid = document.getElementById('gallery-grid');

  // 카테고리 탭 렌더링
  const categoryNames = Object.keys(GIF_GALLERY);
  cats.innerHTML = categoryNames.map((name, i) =>
    `<button class="cat-chip ${i === 0 ? 'active' : ''}" data-cat="${name}">${name}</button>`
  ).join('');

  // 카테고리 클릭 이벤트
  cats.onclick = function(e) {
    const chip = e.target.closest('.cat-chip');
    if (!chip) return;
    cats.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    renderGalleryGrid(chip.dataset.cat);
  };

  // 첫 카테고리 로드
  renderGalleryGrid(categoryNames[0]);

  modal.classList.add('active');
}

function renderGalleryGrid(category) {
  const grid = document.getElementById('gallery-grid');
  const gifs = GIF_GALLERY[category] || [];
  activeCategory = category;

  grid.innerHTML = gifs.map((url, i) => `
    <div class="gallery-item" data-index="${i}">
      <img src="${url}" alt="GIF" loading="lazy">
    </div>
  `).join('');

  // 이벤트 위임
  grid.onclick = function(e) {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const idx = parseInt(item.dataset.index);
    const url = GIF_GALLERY[activeCategory][idx];
    if (url) selectGalleryGif(url);
  };
}

function selectGalleryGif(url) {
  if (galleryTarget === 'gif-embed') {
    const input = document.querySelector('#config-gif-embed input[name="url"]');
    if (input) {
      input.value = url;
      updatePreview('gif-embed');
    }
  } else if (galleryTarget === 'image-slider') {
    const input = document.querySelector('#config-image-slider input[name="images"]');
    if (input) {
      const current = input.value.trim();
      input.value = current ? current + ', ' + url : url;
      updatePreview('image-slider');
    }
  }

  closeGallery();
  showToast('GIF가 적용되었습니다!');
}

function closeGallery() {
  document.getElementById('gallery-modal').classList.remove('active');
  galleryTarget = null;
}

function toggleConfig(id) {
  const el = document.getElementById(`config-${id}`);
  const btn = document.getElementById(`toggle-${id}`);
  const isActive = el.classList.toggle('active');
  btn.classList.toggle('active', isActive);
}

function updatePreview(id) {
  const widget = widgets.find(w => w.id === id);
  const url = buildWidgetURL(widget);
  const iframe = document.getElementById(`preview-${id}`);
  const relative = url.replace(BASE_URL + '/', '');
  iframe.src = relative;
}

function copyURL(id) {
  const widget = widgets.find(w => w.id === id);
  const url = buildWidgetURL(widget);
  navigator.clipboard.writeText(url).then(() => {
    const btn = document.getElementById(`copy-${id}`);
    btn.textContent = '✓ 복사됨';
    btn.classList.add('copied');
    showToast('URL이 클립보드에 복사되었습니다');
    setTimeout(() => {
      btn.textContent = 'URL 복사';
      btn.classList.remove('copied');
    }, 2000);
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

document.addEventListener('DOMContentLoaded', renderWidgets);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeGallery();
});
