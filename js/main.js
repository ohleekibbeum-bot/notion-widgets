const BASE_URL = location.origin + location.pathname.replace(/\/[^/]*$/, '');

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
        <iframe src="widgets/${w.id}/" loading="lazy" id="preview-${w.id}"></iframe>
      </div>
      <div class="widget-config" id="config-${w.id}">
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
