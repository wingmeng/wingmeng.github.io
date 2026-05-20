---
# Jekyll 不会处理此文件中的 Liquid 标签，纯 JS
---
requestAnimationFrame(() => {
  const expBar = document.querySelector('.exp-bar');
  if (expBar) expBar.classList.add('loaded');
});

const chartInstances = [];
const chartEl = document.querySelector('.ability-charts');

if (chartEl) {
  const chart = echarts.init(chartEl, 'dark');

  const radarData = {{ site.data.radar | jsonify }};

  const option = {
    backgroundColor: 'transparent',
    color: '#66d9e8',
    tooltip: {
      confine: true,
      backgroundColor: 'rgba(10, 16, 24, 0.96)',
      borderColor: 'rgba(102, 217, 232, 0.18)',
      borderWidth: 1,
      textStyle: { color: '#c8f1ff' },
      formatter(params) {
        const indicators = option.radar.indicator;
        const values = params.data.value;
        let result = '';
        indicators.forEach((indicator, index) => {
          result += `<div style="margin-bottom: 8px;">
            <div>
              <strong style="color: #66d9e8">${indicator.name}</strong>
              <span style="color: #c8f1ff; margin-left: 8px;">${values[index]}</span>
            </div>
            <p style="color: #888; font-size: 12px;">${indicator.descp}</p>
          </div>`;
        });
        return result;
      }
    },
    radar: {
      radius: '70%',
      indicator: radarData.indicators.map(i => ({
        name: i.name,
        descp: i.descp,
        max: i.max
      })),
      axisName: {
        color: '#c8f1ff',
        backgroundColor: 'rgba(10, 16, 24, 0.96)',
        borderRadius: 20,
        padding: [2, 8],
        lineHeight: 20,
        borderWidth: 1,
        borderColor: 'rgba(102, 217, 232, 0.18)'
      }
    },
    series: [{
      type: 'radar',
      data: [{
        label: { show: true, fontSize: 15, fontWeight: 'bold' },
        value: radarData.values,
        areaStyle: {
          color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
            { offset: 0, color: 'rgba(102, 217, 232, 0.1)' },
            { offset: 1, color: 'rgba(102, 217, 232, 0.5)' }
          ])
        }
      }]
    }],
    media: [
      { query: { maxWidth: 460 }, option: { radar: { radius: '50%' } } },
      { query: { minWidth: 460 }, option: { radar: { radius: '70%' } } }
    ]
  };

  chart.setOption(option);
  chartInstances.push(chart);
}

function throttle(fn, delay) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) { last = now; fn.apply(this, args); }
  };
}

window.addEventListener('resize', throttle(() => {
  chartInstances.forEach(c => c.resize());
}, 100));

function openMail(event) {
  event.preventDefault();
  const social = {{ site.data.social | jsonify }};
  const emailMethod = social.methods.find(m => m.type === 'email');
  if (emailMethod) {
    window.location.href = `mailto:${emailMethod.email_name}@${emailMethod.email_domain}`;
  }
}
