(function() {
  'use strict';

  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
    console.warn('React not loaded. Skipping sample-chart component.');
    return;
  }

  function SampleChart(props) {
    var label = props.label || 'Sample Data';
    var values = props.values || [65, 78, 90, 82, 95];
    var maxVal = Math.max.apply(null, values);

    return React.createElement('div', { className: 'sample-chart' },
      React.createElement('h3', { className: 'sample-chart__title' }, label),
      React.createElement('div', { className: 'sample-chart__bars' },
        values.map(function(val, i) {
          var height = (val / maxVal) * 100;
          return React.createElement('div', {
            key: i,
            className: 'sample-chart__bar',
            style: { height: height + '%' },
            title: String(val)
          });
        })
      )
    );
  }

  // Mount into all elements with data-component="sample-chart"
  document.querySelectorAll('[data-component="sample-chart"]').forEach(function(el) {
    var props = {};
    try {
      props = JSON.parse(el.getAttribute('data-props') || '{}');
    } catch(e) {
      console.warn('Invalid data-props JSON:', e);
    }
    var root = ReactDOM.createRoot(el);
    root.render(React.createElement(SampleChart, props));
  });
})();
