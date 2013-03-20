var Index,
  _this = this;

Index = (function() {

  Index.prototype.tweets = [];

  Index.prototype.$el = null;

  Index.prototype.state = true;

  function Index() {
    var tweets,
      _this = this;
    this.resize = function() {
      return Index.prototype.resize.apply(_this, arguments);
    };
    this.hide = function() {
      return Index.prototype.hide.apply(_this, arguments);
    };
    this.slide = function() {
      return Index.prototype.slide.apply(_this, arguments);
    };
    this.newTweetAppend = function(event, data) {
      return Index.prototype.newTweetAppend.apply(_this, arguments);
    };
    this.articleSelectedHandler = function(event) {
      return Index.prototype.articleSelectedHandler.apply(_this, arguments);
    };
    this._errorHandler = function(error) {
      return Index.prototype._errorHandler.apply(_this, arguments);
    };
    this._fetchSuccessHandler = function(datas) {
      return Index.prototype._fetchSuccessHandler.apply(_this, arguments);
    };
    this.fetchTweetCollection = function() {
      return Index.prototype.fetchTweetCollection.apply(_this, arguments);
    };
    tweets = [];
    this.$el = $('#main');
    this.$el.on('click', '.article', this.articleSelectedHandler);
    this.resize();
    $(window).on('post_success', this.newTweetAppend);
    $(window).on('resize', this.resize);
  }

  Index.prototype.fetchTweetCollection = function() {
    this.$el.empty();
    window.App.removeEventListener(KazitoriEvent.FIRST_REQUEST, this.fetchTweetCollection);
    return $.ajax({
      url: "/",
      dataType: "json",
      contentType: "application/json",
      success: this._fetchSuccessHandler,
      error: this._errorHandler
    });
  };

  Index.prototype._fetchSuccessHandler = function(datas) {
    var data, _i, _len;
    for (_i = 0, _len = datas.length; _i < _len; _i++) {
      data = datas[_i];
      this.tweets.push(new TweetModel(data.sid, data.text, data.created_at, data.updated_at));
    }
    return this.render();
  };

  Index.prototype._errorHandler = function(error) {
    return console.log(error, "error");
  };

  Index.prototype.render = function() {
    var elem, tweet, _i, _len, _ref;
    elem = '';
    if (this.tweets.length < 1) {
      elem += '<article class="article nullpo">ぬるぽ</article>';
    }
    _ref = this.tweets;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tweet = _ref[_i];
      elem += new IndexListView(tweet).el;
    }
    this.$el.append(elem);
    return $('#container').css({
      'height': this.$el.height() + 20
    });
  };

  Index.prototype.articleSelectedHandler = function(event) {
    var id, tgt;
    event.preventDefault();
    tgt = event.currentTarget;
    id = $(tgt).attr('id').replace('tweetlist', '');
    if (window.App.fragment === '/' + id) {
      window.App.change('/');
      return;
    } else if (window.App.fragment !== '/') {
      this.hide();
    }
    return window.App.change('/' + id);
  };

  Index.prototype.newTweetAppend = function(event, data) {
    var elem, tweet;
    tweet = new TweetModel(data.sid, data.text, data.created_at, data.updated_at);
    this.tweets.unshift(tweet);
    elem = new IndexListView(tweet).el;
    return this.$el.prepend(elem);
  };

  Index.prototype.slide = function() {
    this.$el.animate({
      left: this.pos - 420
    });
    return this.state = false;
  };

  Index.prototype.hide = function() {
    this.$el.animate({
      left: this.pos - 250
    });
    return this.state = true;
  };

  Index.prototype.resize = function() {
    var container;
    container = $('#container');
    this.pos = container.offset().left + container.width() / 2;
    if (this.state) {
      return this.$el.css({
        left: this.pos - 250
      });
    } else {
      return this.$el.css({
        left: this.pos - 420
      });
    }
  };

  return Index;

})();
