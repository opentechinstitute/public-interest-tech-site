import $ from 'jquery';
import _ from 'underscore';
import util from './Util';
import render from './Bibliography-render';
import search from './Bibliography-search';
import sheet from './Sheet';

const SPREADSHEET_ID = '1056cinZ2uYjomUOTF70unqeUjYkYc-z3Usmsq0_9fU4';//'1056cinZ2uYjomUOTF70unqeUjYkYc-z3Usmsq0_9fU4'; //'1kq6z9cEeqqGL5R5mdclkj5HjD-w9dvL8xCYmhG1UziQ';
const NO_RESULTS_COPY = "Nothing found :( <br><br> Think this is an error? Let us know by emailing maya@opentechinstitute.org"

class Bib {
  constructor() {
    this.resetFilters(); 
  }

  resetFilters() {
    this.filters = {
      flags: [],
      rating: -1,
      categories: [],
      subcategories: [],
      services: [],
      state: false,
      sortByRating: false
    };
  }

  loadOrgs(onLoad) {
    sheet.load(SPREADSHEET_ID, 1, rows => {
      this.orgs = _.chain(rows).map((row, i) => {
        var obj = sheet.parseRow(row);

        // skip if no name
        //if (!obj.name) return;

        // skip if not ready
        if (obj.readyyn !== 'y') return;

        // some extra parsing
        obj.id = i;
        obj.whatisit = obj.whatisit;
        obj.rating = util.parseRating(obj.charitynavigatorrating);
        //obj.deductible = util.parseBool(obj.taxdeductibleyn);
        //obj.accredited = util.parseBool(obj.accreditedbusinessyn);
        obj.categories = _.compact([obj.category1, obj.category2, obj.category3]);
        obj.subcategories = _.compact([obj.subcategory1, obj.subcategory2]);
        obj.additionalServices = _.compact([obj.filter1, obj.filter2, obj.filter3]);
        obj.description = obj.description100characters;
        obj.descriptionlength = obj.descriptionlength;
        obj.author = obj.author;
        obj.date = obj.date;
        obj.annotation = obj.annotation;
        obj.annotationauthor = obj.annotationauthor;
        //obj.number = util.parseNumber(obj.numbers);
        obj.dead = util.parseBool(obj.dead);
        obj.services = [];
        if (obj.donatelink) obj.services.push('donations');
        if (obj.volunteerlink) obj.services.push('volunteers');
        if (obj.contributelink) obj.services.push('open source contributions');
        if (obj.joblink) obj.services.push('applications');
        obj.services = obj.services.concat(obj.additionalServices);
        obj.state = obj.location; //a cheat to make it so spreadsheet header can be "location" while variable is still "state" (leftover from togetherlist)

        console.log(obj); // debug

        return obj;
      }).compact().value();
      onLoad();
    });
  }

  updateAvailableFilters(results) {
    var filters = [];
    //$('[data-flag=deductible]').attr('disabled', !_.some(results, r => r.deductible));
    //$('[data-flag=accredited]').attr('disabled', !_.some(results, r => r.accredited));
    //$('.filters-services button').each(function() {
    //   var service = $(this).data('service');
    //   $(this).attr('disabled',
    //     !_.some(results, r => _.contains(r.services, service)));
    // });
    $('.filters-subcategories button').each(function() {
      var cat = $(this).data('subcategory');
      $(this).attr('disabled',
        !_.some(results, r => _.contains(r.subcategories, cat)));
    });
  }

  loadCategories() {
    sheet.load(SPREADSHEET_ID, 2, rows => {
      this.categories = _.map(rows, row => {
        var cat = sheet.parseRow(row).category;
        $('.filters-categories').append(
          `<button data-category="${cat}">${cat}</button>`);
        return cat;
      });
    });
  }

  loadSubCategories() {
    sheet.load(SPREADSHEET_ID, 3, rows => {
      this.categories = _.map(rows, row => {
        var cat = sheet.parseRow(row)['sub-category'];
        $('.filters-subcategories').append(
          `<button data-subcategory="${cat}">${cat}</button>`);
        return cat;
      });
    });
  }

  // loadServices() {
  //   sheet.load(SPREADSHEET_ID, 4, rows => {
  //     this.services = _.map(rows, row => {
  //       var service = sheet.parseRow(row).service;
  //       $('.filters-services').append(
  //         `<button data-service="${service}">${util.slugify(service)}</button>`);
  //       return service;
  //     });
  //   });
  // }

  // bindRatingFilter() {
  //   $('.filters-rating').on('click', ev => {
  //     var el = $(ev.target);
  //     el.toggleClass('selected');
  //     this.filters.sortByRating = el.hasClass('selected');
  //     this.renderResults();
  //   });
  // }

  // bindSharing() {
  //   $('.results').on('click', '.action-share', ev => {
  //     var id = $(ev.target).data('id'),
  //         parent = $(ev.target).closest('.result'),
  //         org = this.orgs[id],
  //         html = render.sharing(org);
  //     parent.find('.result-sharing').html(html).show();
  //   }).on('mouseleave', '.result', ev => {
  //     $('.result-sharing').hide();
  //   });
  // }

  bindFilter(sel, dataName, filterType) {
    $(sel).on('click', 'button', ev => {
      var el = $(ev.target),
          filter = el.data(dataName);
      el.toggleClass('selected');
      if (el.hasClass('selected')) {
        this.filters[filterType].push(filter);
      } else {
        this.filters[filterType] = _.without(this.filters[filterType], filter);
      }
      this.renderResults();
      return false;
    });
  }

  bindClear() {
    $('.clear-filters').on('click', ev => {
      this.results = this.orgs;
      this.resetFilters();
      this.renderResults();
      $('.selected').removeClass('selected');
      $('input[name=search]').val('');
    });
  }

  bindSearch() {
    $('input[name=search]').on('keyup', ev => {
      this.search();
    });
  }

  bindStateFilter() {
    $('.results').on('click', '.result-state', ev => {
      var state = $(ev.target).data('state');
      this.filters.state = state;
      this.renderResults();
    });
  }

  bindSearchDropdown() {
    $('.search-dropdown').on('click', 'li', ev => {
      var name = $(ev.target).data('name');
      $('input[name=search]').val(name);
      this.search();
      $('.search-dropdown').hide();
    });
    $('.search-wrapper').on('mouseleave', ev => {
      $('.search-dropdown').hide();
    });
  }

  bindFiltersToggle() {
    $('.toggle-filters').on('click', ev => {
      $('.filters-all-content').toggle();
    });
  }

  search() {
    var query = $('input[name=search]').val();
    if (query) {
      this.results = _.map(search.search(query), res => {
        return this.orgs[res.ref];
      });
      this.renderResults();
      this.renderSearchNames();
    } else {
      $('.search-dropdown').hide();
      this.results = this.orgs;
      this.renderResults();
    }
  }

  renderSearchNames() {
    var names = _.pluck(this.results, 'name').slice(0, 5),
        html = _.map(names, name => `<li data-name="${name}">${name}</li>`);
    $('.search-dropdown').html(html.join('')).show();
  }

  renderResults() {
    var html = [],
        results = search.filter(this.results, this.filters);
    if (results.length > 0) {
      _.each(results, result => {
        html.push(render.result(result));
      });
      if (this.filters.state) {
        html = [`<h2 class="filters-state">Showing organizations for <b>${this.filters.state}</b></h2>`].concat(html);
      }
      $('.results > ul').html(html.join(''));
    } else {
      $('.results > ul').html(`<h1 class="no-results">${NO_RESULTS_COPY}</h1>`);
    }
    this.updateAvailableFilters(results);
  }

  run() {
    this.loadOrgs(() => {
      this.results = this.orgs;
      this.renderResults();
      search.index(this.orgs);
    });
    // this.loadServices();
    this.loadCategories();
    this.loadSubCategories();

    this.bindSearch();
    this.bindClear();
    // this.bindSharing();
    // this.bindRatingFilter();
    this.bindFiltersToggle();
    this.bindSearchDropdown();
    this.bindStateFilter();
    // this.bindFilter('.filters-flags', 'flag', 'flags');
    this.bindFilter('.filters-categories', 'category', 'categories');
    // this.bindFilter('.filters-services', 'service', 'services');
    this.bindFilter('.filters-subcategories', 'subcategory', 'subcategories');
  }
}

export default Bib;
