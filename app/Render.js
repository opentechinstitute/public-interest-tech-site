import _ from 'underscore';
import util from './Util';

const render = {
  result: function(data) {
    // var ifdead = "";
    // if (data.dead == true) {
    //   var ifdead = "dead";
    //   var tense = "was";
    // }
    if (data.description.length < 20 || data.description.length > 100) {
      return;
    }
    if (data.dead == true) {
      var result = '<li class="result dead"><div class="result-preview"><h2>' + util.truncate(data.name, 40) + '</h2><p class="result-description">' + util.truncate(data.description, 132) + '</p>';
      if (data.howtechlength > 1) {
        result = result + '<p>How they used tech: ' + data.howtech + '</p>';
      }
      result = result + '</div><div class="result-info dead"><h3>This ' + data.whatisit + ' is no longer functioning, and is archived here for educational and research purposes.</h3>';
      if (data.state.length > 0) {
        result = result + '<h5>Was based in ' + data.state + '</h5>';
      }
      if (data.categories.length > 0) {
        result = result + '<h5>' + data.categories.join(', ') + '</h5>';
      }
      if (data.website.length > 0) {
        result = result + '<div class="result-actions"><a target="_blank" href="' + data.website + '">Visit their Website</a></div>'; 
      }
      result = result + '</div></li>';
        return result;
    }
    else {
      var result = '<li class="result"><div class="result-preview"><h2><span>' + util.truncate(data.name, 40) + '</span></h2><p class="result-description">' + util.truncate(data.description, 132) + '</p>';
      if (data.howtech.length > 1) {
        result = result + '<br><p>How they use tech: ' + data.howtech + '</p>';
      }
      result = result + '</div><div class="result-info">';
      if (data.services.length > 0) {
        result = result + '<h3>This ' + data.whatisit + ' accepts' + util.joinAnd(_.map(data.services, s => ` <span class="result-service">${s.toLowerCase()}</span>`)) + '.</h3>';
      }
      else {
        result = result + '<h3>Visit this ' + data.whatisit + '\'s <a class="result-service" href="' + data.website + '">website</a>.</h3>';
      }
      if (data.state.length > 0) {
        result = result + '<h5>Based in ' + data.state + '</h5>';
      }
      if (data.categories.length > 0) {
        result = result + '<h5>' + data.categories.join(', ') + '</h5>';
      }
      if (data.website.length > 0) {
        result = result + '<div class="result-actions"><a target="_blank" href="' + data.website + '">Visit their website</a></div>'; 
      }
      result = result + '</div></li>';
    }
      return result;
    // if (data.services.length > 0) {
    //   var ifaccepting = " accepts";
    // }
    // else {
    //   var ifaccepting = "";
    // }
    // else {
    //   return `
    //     <li class="result">
    //         <div class="result-preview">
    //           <h2><span>${util.truncate(data.name, 40)}</span></h2>
    //           <p class="result-description">${util.truncate(data.description, 132)}</p>
    //         </div>
    //         <div class="result-info">
    //             <h3>This ${data.whatisit}${ifaccepting}${util.joinAnd(_.map(data.services, s => ` <span class="result-service">${s.toLowerCase().replace('esl', 'ESL')}</span>`))}${data.additionalServices.length > 0 ? '' : ''}.</h3>
    //             <div class="result-meta">
    //               <div class="result-meta-info">
    //                 ${data.state ? `<h5><span class="result-meta-lead">Based in </span><span class="result-state" data-state="${data.state}">${data.state}</span></h5>` : ''}
    //                 <h5>${data.categories.join(', ')}</h5>
    //               </div>
    //             </div>
    //             <div class="result-actions">
    //               ${data.donatelink ? `<a target="_blank" href="${data.donatelink}">Donate</a>` : ''}
    //               ${data.volunteerlink ? `<a target="_blank" href="${data.volunteerlink}">Volunteer</a>` : ''}
    //               ${data.contributelink ? `<a target="_blank" href="${data.contributelink}">Contribute</a>` : ''}
    //               ${data.joblink ? `<a target="_blank" href="${data.joblink}">Apply</a>` : ''}
    //             </div>
    //         </div>
    //         <div class="result-sharing"></div>
    //     </li>`;

  },

  // For buttons at bottom of each result:
  // ${data.donatelink ? `<a target="_blank" href="${data.donatelink}">Donate</a>` : ''}
  // ${data.volunteerlink ? `<a target="_blank" href="${data.volunteerlink}">Volunteer</a>` : ''}
  // ${data.contributelink ? `<a target="_blank" href="${data.contributelink}">Contribute</a>` : ''}
  // ${data.joblink ? `<a target="_blank" href="${data.joblink}">Apply</a>` : ''}

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
