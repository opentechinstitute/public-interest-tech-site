import _ from 'underscore';
import util from './Util';

const render = {
  result: function(data) {
    return `
        <li class="result">
            <div class="result-preview">
              <h2><span>${util.truncate(data.name, 40)}</span></h2>
              <p class="result-description">${util.truncate(data.description, 132)}</p>
            </div>
        </li>`;
  },

  rating: function(rating) {
    var els = [],
        r = rating;
    if (rating < 0) {
      return 'N/A';
    } else {
      _.each(_.range(Math.floor(rating)), () => {
        els.push('<i class="fa fa-star"></i>');
        r--;
      });
      if (r > 0) {
        els.push('<i class="fa fa-star-half-o"></i>');
      }
      _.each(_.range(5 - Math.ceil(rating)), () => {
        els.push('<i class="fa fa-star-o"></i>');
      });
      return els.join('');
    }
  },

  sharing: function(org) {
    var twitter = `https://twitter.com/intent/tweet?text=${encodeURI('Support: ')}&url=${encodeURI(org.website)}&via=thetogetherlist`,
        facebook = `https://www.facebook.com/sharer.php?u=${encodeURI(org.website)}`,
        tumblr = `http://tumblr.com/widgets/share/tool?title=${encodeURI(org.name)}&canonicalUrl=${encodeURI(org.website)}&caption=${encodeURI(org.description)}`,
        email = `mailto:?&subject=Check out ${org.name}&body=${encodeURI([org.website, org.description].join('\n\n'))}`;
    return `
      <li><a href="${twitter}" title="Share via Twitter" target="_blank"><i class="fa fa-twitter"></i></a></li>
      <li><a href="${facebook}" title="Share via Facebook" target="_blank"><i class="fa fa-facebook"></i></a></li>
      <li><a href="${tumblr} title="Share via Tumblr" target="_blank"><i class="fa fa-tumblr"></i></a></li>
      <li><a href="${email}" title="Share via Email" target="_blank"><i class="fa fa-envelope"></i></a></li>
    `;
  }
};

export default render;
