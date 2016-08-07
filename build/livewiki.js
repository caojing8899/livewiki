/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Container, Livewiki, Term, ready;

	Livewiki = __webpack_require__(1);

	Container = __webpack_require__(2);

	Term = __webpack_require__(3);

	__webpack_require__(5);

	__webpack_require__(7);

	__webpack_require__(8);

	__webpack_require__(9);

	__webpack_require__(10);

	__webpack_require__(11);

	__webpack_require__(12);

	ready = function(fn) {
	  if (document.readyState !== 'loading') {
	    return fn();
	  } else {
	    return document.addEventListener('DOMContentLoaded', fn);
	  }
	};

	ready(function() {
	  var a_tags, mouse_over_link;
	  mouse_over_link = false;
	  document.addEventListener('keyup', (function(_this) {
	    return function(e) {
	      if ((e.which === 27 || e.which === 91 || e.which === 93 || e.which === 17 || e.ctrlKey) && !mouse_over_link) {
	        return Container.prototype.remove_container();
	      }
	    };
	  })(this));
	  document.querySelector('body').addEventListener('click', function(e) {
	    return Container.prototype.remove_container();
	  });
	  a_tags = document.querySelectorAll('a[href^="/wiki/"]:not(.new)');
	  return Array.prototype.forEach.call(a_tags, function(element, i) {
	    var term;
	    term = '';
	    element.addEventListener('mouseover', function(e) {
	      var link;
	      mouse_over_link = true;
	      link = e.target.getAttribute('href');
	      term = new Term(link);
	      document.addEventListener('keyup', term.display);
	      return term.preload().then((function(term) {}), function(Error) {
	        return console.log(Error);
	      });
	    });
	    return element.addEventListener('mouseout', function(e) {
	      mouse_over_link = false;
	      return document.removeEventListener('keyup', term.display);
	    });
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Livewiki, default_options,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	default_options = {
	  selectors: {
	    wikipedia: {
	      headline: '#firstHeading',
	      paragraph: '#mw-content-text > p',
	      image: '.thumbimage'
	    },
	    term: '.livewiki_term',
	    cover: '.term__cover',
	    close_button: 'button',
	    headline: '.headline',
	    headline_overlay: '.headline__overlay',
	    paragraph: '.term__content',
	    image: '.term__image',
	    spinner: '.spinner',
	    spinner_image: '.spinner__image'
	  }
	};

	Livewiki = (function() {
	  function Livewiki(options) {
	    this.get_terms = bind(this.get_terms, this);
	    this.options = {};
	    this.container_element = '';
	    Object.assign(this.options, default_options, options);
	  }

	  Livewiki.prototype.add_term = function(term) {
	    return this.terms.push(term);
	  };

	  Livewiki.prototype.get_terms = function() {
	    return this.terms;
	  };

	  return Livewiki;

	})();

	module.exports = Livewiki;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Container, Livewiki,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Livewiki = __webpack_require__(1);

	Container = (function(superClass) {
	  extend(Container, superClass);

	  function Container() {
	    this.find_element = bind(this.find_element, this);
	    var body, element;
	    Container.__super__.constructor.call(this);
	    this.container_element = '';
	    body = document.querySelector('body');
	    element = this.find_or_create();
	    element.id = 'livewiki';
	    element.addEventListener('click', (function(_this) {
	      return function(e) {
	        return e.stopPropagation();
	      };
	    })(this));
	    element.addEventListener('mouseover', (function(_this) {
	      return function(e) {
	        var paragraph;
	        paragraph = document.querySelector(_this.options.selectors.paragraph);
	        if (e.target.classList.contains(_this.options.selectors.paragraph.substr(1)) && paragraph.clientHeight >= 200) {
	          return body.style.overflow = 'hidden';
	        }
	      };
	    })(this));
	    element.addEventListener('mouseout', (function(_this) {
	      return function(e) {
	        if (e.target.classList.contains(_this.options.selectors.paragraph.substr(1))) {
	          return body.style.overflow = 'scroll';
	        }
	      };
	    })(this));
	    document.querySelector('body').appendChild(element);
	    return element;
	  }

	  Container.prototype.find_or_create = function() {
	    this.container_element = this.find_element();
	    if (!this.container_element) {
	      this.container_element = document.createElement('div');
	    }
	    return this.container_element;
	  };

	  Container.prototype.find_element = function() {
	    return document.querySelector('#livewiki');
	  };

	  Container.prototype.remove_container = function() {
	    var container;
	    container = this.find_element();
	    if (container) {
	      return container.remove();
	    }
	  };

	  Container.prototype.remove_terms = function() {
	    var container;
	    container = this.find_element();
	    if (container) {
	      return container.innerHTML = '';
	    }
	  };

	  return Container;

	})(Livewiki);

	module.exports = Container;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Container, Livewiki, Term, get_parent_element, parser, term_html,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	parser = new DOMParser();

	Livewiki = __webpack_require__(1);

	Container = __webpack_require__(2);

	term_html = __webpack_require__(4);

	Term = (function(superClass) {
	  extend(Term, superClass);

	  function Term(link) {
	    this.display_term = bind(this.display_term, this);
	    this.set_values = bind(this.set_values, this);
	    this.to_html = bind(this.to_html, this);
	    this.html_element = bind(this.html_element, this);
	    this.update_html = bind(this.update_html, this);
	    this.remove_term = bind(this.remove_term, this);
	    this.display = bind(this.display, this);
	    this.preload = bind(this.preload, this);
	    Term.__super__.constructor.call(this);
	    this.link = link;
	    this.loaded = false;
	    this.displayed = false;
	    this.container = new Container();
	    this.headline = '';
	    this.paragraph = '';
	    this.image_src = '';
	  }

	  Term.prototype.preload = function() {
	    return new Promise((function(_this) {
	      return function(resolve, reject) {
	        var request;
	        if (_this.html_element()) {
	          resolve(_this);
	          return false;
	        }
	        request = new XMLHttpRequest();
	        request.open('GET', _this.link, true);
	        request.onload = function() {
	          var image, resp, response;
	          if (request.status === 200) {
	            resp = request.responseText;
	            response = parser.parseFromString(resp, 'text/html');
	            _this.headline = response.querySelector(_this.options.selectors.wikipedia.headline).textContent;
	            _this.paragraph = response.querySelector(_this.options.selectors.wikipedia.paragraph).textContent;
	            image = response.querySelector(_this.options.selectors.wikipedia.image);
	            if (image) {
	              _this.image_src = image.getAttribute('src');
	            }
	            if (_this.displayed) {
	              _this.update_html();
	            }
	            _this.display_term(document);
	            _this.loaded = true;
	            return resolve(_this);
	          } else {
	            return reject(Error('Term didn\'t load successfully; error code: ' + request.statusText));
	          }
	        };
	        request.onerror = function() {
	          return reject(Error("There was a network error."));
	        };
	        return request.send();
	      };
	    })(this));
	  };

	  Term.prototype.display = function(e) {
	    if (this.html_element()) {
	      return false;
	    }
	    Container.prototype.remove_terms();
	    if (e.which === 91 || e.which === 93 || e.ctrlKey) {
	      return this.append();
	    }
	  };

	  Term.prototype.append = function() {
	    var term;
	    term = this.to_html();
	    if (this.loaded) {
	      this.display_term(term);
	    }
	    this.displayed = true;
	    return this.container.appendChild(term);
	  };

	  Term.prototype.remove_term = function() {
	    return this.html_element().remove();
	  };

	  Term.prototype.update_html = function() {
	    var element;
	    element = this.html_element();
	    return this.set_values(element);
	  };

	  Term.prototype.html_element = function() {
	    return document.querySelector("[data-href='" + (encodeURIComponent(this.link)) + "']");
	  };

	  Term.prototype.to_html = function() {
	    var close_button, cover, div, headline, headline_overlay, image, ref, spinner_image, term_template;
	    term_template = parser.parseFromString(term_html, 'text/html');
	    close_button = term_template.querySelector(this.options.selectors.close_button);
	    div = term_template.querySelector(this.options.selectors.term);
	    cover = term_template.querySelector(this.options.selectors.cover);
	    headline = term_template.querySelector(this.options.selectors.headline);
	    headline_overlay = term_template.querySelector(this.options.selectors.headline_overlay);
	    image = term_template.querySelector(this.options.selectors.image);
	    spinner_image = term_template.querySelector(this.options.selectors.spinner_image);
	    spinner_image.setAttribute('src', chrome.extension.getURL('spinner.gif'));
	    this.set_values(term_template);
	    if (this.image_src) {
	      image.src = this.image_src;
	      cover.classList.add('cover--default_size');
	    } else if ((ref = this.image_src) === null || ref === '') {
	      headline.classList.add('color--black');
	      image.remove();
	      headline_overlay.remove();
	    }
	    close_button.addEventListener('click', this.remove_term);
	    div.setAttribute('data-href', encodeURIComponent(this.link));
	    return div;
	  };

	  Term.prototype.set_values = function(element) {
	    var headline, image, paragraph;
	    headline = element.querySelector(this.options.selectors.headline);
	    if (headline) {
	      headline.textContent = this.headline;
	    }
	    paragraph = element.querySelector(this.options.selectors.paragraph);
	    if (paragraph) {
	      paragraph.textContent = this.paragraph;
	    }
	    image = element.querySelector(this.options.selectors.image);
	    if (image && this.image_src) {
	      return image.src = this.image_src;
	    }
	  };

	  Term.prototype.display_term = function(element) {
	    var cover, paragraph, spinner;
	    cover = element.querySelector(this.options.selectors.cover);
	    if (cover) {
	      cover.classList.remove('element--hidden');
	    }
	    paragraph = element.querySelector(this.options.selectors.paragraph);
	    if (paragraph) {
	      paragraph.classList.remove('element--hidden');
	    }
	    spinner = element.querySelector(this.options.selectors.spinner);
	    if (spinner) {
	      return spinner.classList.add('element--hidden');
	    }
	  };

	  return Term;

	})(Livewiki);

	get_parent_element = function(element, tag, css_class) {
	  while (element.parentElement) {
	    element = element.parentElement;
	    if (element.tagName.toLowerCase() === tag.toLowerCase() && element.classList.contains(css_class)) {
	      return element;
	    }
	  }
	};

	module.exports = Term;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<div class=\"livewiki_term\" data-href=\"\">\n  <div class=\"term__header\">\n    <h2 class=\"livewiki__logo\">\n      <img src=\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MDAgODQuMyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAwIDg0LjMiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnPgoJCTxwYXRoIGZpbGw9IiMzQTNBM0EiIGQ9Ik01LjEsNjQuOGg4LjJWMTkuMUg1LjFWNC43SDQwdjE0LjRoLTguMnY0NC43aDE1LjhWNTNINjN2MjUuMkg1LjFWNjQuOHoiLz4KCQk8cGF0aCBmaWxsPSIjM0EzQTNBIiBkPSJNNzMuNiw2NS4zaDYuN1YzOC4xaC03LjJWMjUuMmgyNXY0MC4xaDYuN3YxMi45SDczLjZWNjUuM3ogTTgwLjUsNC43aDE3LjR2MTMuOUg4MC41VjQuN3oiLz4KCQk8cGF0aCBmaWxsPSIjM0EzQTNBIiBkPSJNMTExLjksMjUuMkgxNDB2MTIuOWgtNC43bDYuMSwxOS4xYzEuMSwzLjIsMS40LDcsMS40LDdoMC40YzAsMCwwLjMtMy44LDEuNC03bDYuMS0xOS4xSDE0NlYyNS4yaDI4LjIKCQkJdjEyLjloLTZsLTE0LjcsNDAuMWgtMjFsLTE0LjctNDAuMWgtNlYyNS4yeiIvPgoJCTxwYXRoIGZpbGw9IiMzQTNBM0EiIGQ9Ik0yMDkuMywyNGMxNS44LDAsMjQuNywxMC45LDI0LjcsMjUuNmMwLDEuNy0wLjQsNS4zLTAuNCw1LjNIMjAwYzEuMyw2LjgsNi43LDkuOCwxMi4zLDkuOAoJCQljNy44LDAsMTQuOS01LDE0LjktNWw2LjUsMTIuM2MwLDAtOC41LDcuNC0yMi44LDcuNGMtMTguOSwwLTI5LjEtMTMuNy0yOS4xLTI3LjhDMTgxLjgsMzYuMSwxOTIuMywyNCwyMDkuMywyNHogTTIxNS42LDQ1LjIKCQkJYzAtNC4yLTIuOC03LjgtNi43LTcuOGMtNS4xLDAtNy42LDMuNy04LjUsNy44SDIxNS42eiIvPgoJCTxwYXRoIGZpbGw9IiMzQTNBM0EiIGQ9Ik0yMzguNyw0LjdoMzIuNlYxOGgtOC41bDYuOCwzMi42YzAuNywzLjYsMC45LDcuNywwLjksNy43aDAuNGMwLDAsMC4zLTQuMSwxLjItNy43bDExLjMtNDZoMTQuMmwxMS4zLDQ2CgkJCWMwLjksMy42LDEuMiw3LjcsMS4yLDcuN2gwLjRjMCwwLDAuMi00LjEsMC45LTcuN2w2LjgtMzIuNmgtOC41VjQuN2gzMi42VjE4aC02LjJsLTE0LjYsNjAuMWgtMjAuM0wyOTIsNDAuNQoJCQljLTAuOS0zLjYtMS4yLTguMS0xLjItOC4xaC0wLjRjMCwwLTAuMyw0LjUtMS4yLDguMWwtOS40LDM3LjZoLTIwLjNMMjQ0LjksMThoLTYuMlY0Ljd6Ii8+CgkJPHBhdGggZmlsbD0iIzNBM0EzQSIgZD0iTTM1MC43LDY1LjNoNi43VjM4LjFoLTcuMlYyNS4yaDI1djQwLjFoNi43djEyLjloLTMxLjJWNjUuM3ogTTM1Ny42LDQuN0gzNzV2MTMuOWgtMTcuNFY0Ljd6Ii8+CgkJPHBhdGggZmlsbD0iIzNBM0EzQSIgZD0iTTM5MS43LDY1LjNoNi43VjE3LjVoLTcuMlY0LjdoMjV2NDAuMmg2LjFsNS42LTYuOGgtNVYyNS4yaDI3LjZ2MTIuOWgtNi41bC05LjIsMTEuMXYwLjIKCQkJYzAsMCwyLjMsMS4xLDQuMiw0LjdsNS4yLDkuNWMwLjgsMS40LDEuOSwxLjcsMy45LDEuN2gyLjZ2MTIuOWgtMTNjLTMuOCwwLTUuOC0wLjYtNy42LTRsLTguMS0xNWMtMC45LTEuNy0yLjktMS43LTQuMi0xLjdoLTEuNQoJCQl2Ny45aDMuOHYxMi45aC0yOC4zVjY1LjN6Ii8+CgkJPHBhdGggZmlsbD0iIzNBM0EzQSIgZD0iTTQ2Mi40LDY1LjNoNi43VjM4LjFoLTcuMlYyNS4yaDI1djQwLjFoNi43djEyLjloLTMxLjJWNjUuM3ogTTQ2OS4zLDQuN2gxNy40djEzLjloLTE3LjRWNC43eiIvPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=\" />\n      </h2>\n    <button class=\"header__icon term--close\">CLOSE</button>\n  </div>\n  <div class=\"spinner\">\n    <img class=\"spinner__image\" alt=\"Loading\">\n  </div>\n  <div class=\"term__cover element--hidden\">\n    <h1 class=\"headline\"></h1>\n    <div class=\"headline__overlay\"></div>\n    <img class=\"term__image\">\n  </div>\n    <p class=\"term__content element--hidden\"></p>\n</div>\n";

/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "src/img/spinner.gif";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "src/icons/black/16x16.png";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "src/icons/black/32x32.png";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "src/icons/black/48x48.png";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "src/icons/black/128x128.png";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "manifest.json";

/***/ }
/******/ ]);