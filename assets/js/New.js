var New,
  _this = this;

New = (function() {

  New.prototype.$el = '<div><header><h2>New Tweet</h2><a href="#" class="close" data-dismiss="alert">&times;</a></header><form id="newForm" class="form" action="/create" method="POST"><div class="controls"><textarea name="text"></textarea></div><div><button id="sendTweet" type="submit" class="btn btn-primary">送信</button></div></form></div>';

  New.prototype.$screen = null;

  function New() {
    var _this = this;
    this._removeContainer = function() {
      return New.prototype._removeContainer.apply(_this, arguments);
    };
    this._screenClickHandler = function(event) {
      return New.prototype._screenClickHandler.apply(_this, arguments);
    };
    this.closeHandler = function(event) {
      return New.prototype.closeHandler.apply(_this, arguments);
    };
    this._sendTweetHandler = function(event) {
      return New.prototype._sendTweetHandler.apply(_this, arguments);
    };
    this.toggleClickHandler = function(event) {
      return New.prototype.toggleClickHandler.apply(_this, arguments);
    };
    $('.new').on('click', this.toggleClickHandler);
  }

  New.prototype.toggleClickHandler = function(event) {
    event.preventDefault();
    if (this.$container) {
      return this._removeContainer();
    } else {
      $('body').append('<div id="screen" />');
      $('body').append('<div id="newContainer" />');
      this.$container = $('#newContainer');
      this.$container.append(this.$el);
      this.$container.css({
        left: window.innerWidth / 2 - 215
      });
      $('form').on('submit', this._sendTweetHandler);
      $('textarea[name=text]').focus();
      $('.close').on('click', this.closeHandler);
      this.$screen = $('#screen');
      return this.$screen.on('click', this._screenClickHandler);
    }
  };

  New.prototype._sendTweetHandler = function(event) {
    var data,
      _this = this;
    event.preventDefault();
    data = $('#newForm').serializeArray();
    $.ajax({
      url: '/create',
      method: "POST",
      data: data,
      success: function(data) {
        $(window).trigger('post_success', data);
        return Alert.dispAlert('作成しました', 'alert-success');
      }
    });
    return this._removeContainer();
  };

  New.prototype.closeHandler = function(event) {
    event.preventDefault();
    return this._removeContainer();
  };

  New.prototype._screenClickHandler = function(event) {
    event.preventDefault();
    return this._removeContainer();
  };

  New.prototype._removeContainer = function() {
    this.$container.remove();
    this.$screen.remove();
    this.$container = null;
    return this.$screen = null;
  };

  return New;

})();
