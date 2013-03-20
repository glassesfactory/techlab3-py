var contents, index, newController,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require.config({
  shim: {
    'jquery': {
      exports: 'jQuery'
    },
    'lodash': {
      exports: '_'
    }
  },
  paths: {
    'jquery': 'components/jquery/jquery.min',
    'lodash': 'components/lodash/dist/lodash.min',
    'kazitori': 'components/kazitori.js/src/js/kazitori'
  }
});

index = null;

newController = null;

contents = null;

require(['jquery', 'lodash', 'kazitori', 'Index', 'New', 'IndexListView', 'TweetModel', 'Show', 'ShowView', 'EditView'], function() {
  var Router;
  Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      '/': 'index',
      '/<int:id>': 'show'
    };

    Router.prototype.index = function() {
      index.hide();
      contents.hide();
    };

    Router.prototype.show = function(id) {
      if (contents == null) {
        contents = new Show();
      }
      if (this.lastFragment !== '/') {
        contents.hideAndShow(id);
      } else {
        contents.show(id);
      }
      index.slide();
    };

    return Router;

  })(Kazitori);
  $(function() {
    index = new Index();
    newController = new New();
    contents = new Show();
    window.App = new Router();
    return window.App.addEventListener(KazitoriEvent.FIRST_REQUEST, index.fetchTweetCollection);
  });
});
