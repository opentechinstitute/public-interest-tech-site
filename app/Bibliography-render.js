import _ from 'underscore';
import util from './Util';

const render = {
  result: function(data) {
    var resource = '<li class="resource"><article class="entry"><div class="meta"><a href="' + data.url + '"><h1>' + data.name + '</h1></a>';
    if (data.author.length > 0) {
      resource = resource + '<h2>' + data.author + '</h2>';
    }
    if (data.date.length > 0) {
      resource = resource + '<h3>' + data.date + '</h3>';
    }
    if (data.whatisit.length > 0) {
      resource = resource + '<h3>' + data.whatisit + '</h3>';
    }
    if (data.categories.length > 0) {
      resource = resource + '<h3>Tags: ' + data.categories.join(', ') + '</h3></div>';
    }
    if (data.annotation.length > 0) {
      resource = resource + '<aside class="annotation"><p>' + data.annotation + '</p>';
      if (data.annotationauthor.length > 0) {
        resource = resource + '<h4>—' + data.annotationauthor + '</h4>';
      }
      resource = resource + '</aside>';
    }
    resource = resource + '</article></li>';
      return resource;
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
