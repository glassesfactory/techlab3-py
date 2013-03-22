var Show,
  _this = this;

Show = (function() {

  Show.prototype.$el = null;

  Show.prototype.current = null;

  Show.prototype.isEdit = false;

  Show.prototype.state = false;

  function Show() {
    var $el,
      _this = this;
    this.resize = function(event) {
      return Show.prototype.resize.apply(_this, arguments);
    };
    this.deleteTweet = function(id) {
      return Show.prototype.deleteTweet.apply(_this, arguments);
    };
    this.deleteClickHandler = function(event) {
      return Show.prototype.deleteClickHandler.apply(_this, arguments);
    };
    this.editCancelHandler = function(event) {
      return Show.prototype.editCancelHandler.apply(_this, arguments);
    };
    this.editSendHandler = function(event) {
      return Show.prototype.editSendHandler.apply(_this, arguments);
    };
    this.editClickHandler = function(event) {
      return Show.prototype.editClickHandler.apply(_this, arguments);
    };
    this.closeHandler = function(event) {
      return Show.prototype.closeHandler.apply(_this, arguments);
    };
    this._errorHandler = function(error) {
      return Show.prototype._errorHandler.apply(_this, arguments);
    };
    this._fetchSuccessHandler = function(data) {
      return Show.prototype._fetchSuccessHandler.apply(_this, arguments);
    };
    this.hideAndShow = function(id) {
      return Show.prototype.hideAndShow.apply(_this, arguments);
    };
    $el = $('#show');
    if (!$el || $el.length < 1) {
      $('#container').append($('<div id="show" />'));
      $el = $('#show');
    }
    this.$el = $el;
    this.$el.addClass('detail');
    this.resize();
    this.$el.on('click', '.delete', this.deleteClickHandler);
    this.$el.on('click', '.edit', this.editClickHandler);
    $(window).on('resize', this.resize);
  }

  Show.prototype.show = function(id) {
    var url;
    this.$el.animate({
      left: this.pos + 80
    });
    url = '/' + id;
    this.state = true;
    $.ajax({
      url: url,
      dataType: "json",
      contentType: "application/json",
      success: this._fetchSuccessHandler,
      error: this._errorHandler
    });
  };

  Show.prototype.hide = function() {
    var _this = this;
    this.$el.animate({
      left: this.pos - 205
    }, function() {
      _this.$el.empty();
      return _this.state = false;
    });
  };

  Show.prototype.hideAndShow = function(id) {
    var _this = this;
    return this.$el.animate({
      left: this.pos - 225
    }, function() {
      _this.$el.empty();
      return _this.show(id);
    });
  };

  Show.prototype._fetchSuccessHandler = function(data) {
    this.current = data;
    this.$el.append(new ShowView(data).el);
    return $('.closeShow').on('click', this.closeHandler);
  };

  Show.prototype._errorHandler = function(error) {
    return console.log(error);
  };

  Show.prototype.closeHandler = function(event) {
    event.preventDefault();
    return window.App.change('/');
  };

  Show.prototype.editClickHandler = function(event) {
    var $tweet;
    event.preventDefault();
    if (this.isEdit) {
      return false;
    }
    $tweet = this.$el.find('.tweet');
    $tweet.after(new EditView(this.current).el);
    $tweet.hide();
    $('#editView').on('click', '.cancel', this.editCancelHandler);
    return $('#editView').on('click', '.send', this.editSendHandler);
  };

  Show.prototype.editSendHandler = function(event) {
    var action, data, form,
      _this = this;
    event.preventDefault();
    form = $('#editView');
    data = form.serializeArray();
    action = form.attr('action');
    return $.ajax({
      url: action,
      method: 'PUT',
      data: data,
      success: function(event) {
        var $listView, $tweet;
        $tweet = _this.$el.find('.tweet');
        $tweet.empty().append(event.text);
        $tweet.show();
        form.remove();
        $listView = $('#tweetlist' + event.sid);
        $listView.find('.tweetBody').empty().append(event.text);
        return Alert.dispAlert('更新しました', 'alert-success');
      },
      error: function(event) {
        console.log(event);
        return Alert.dispAlert(event, 'alert-error');
      }
    });
  };

  Show.prototype.editCancelHandler = function(event) {
    var $tweet;
    $('#editView').remove();
    $tweet = this.$el.find('.tweet');
    return $tweet.show();
  };

  Show.prototype.deleteClickHandler = function(event) {
    var id;
    event.preventDefault();
    id = $(event.currentTarget).data('delete');
    return Alert.dispModalAlert('消してもいいの', this, this.deleteTweet, [id]);
  };

  Show.prototype.deleteTweet = function(id) {
    var url,
      _this = this;
    url = '/' + id;
    return $.ajax({
      url: url,
      method: "DELETE",
      dataType: 'json',
      success: function(data) {
        var $listView;
        $listView = $('#tweetlist' + data.sid);
        $listView.remove();
        window.App.change('/');
        return Alert.dispAlert('削除しました', 'alert-success');
      },
      error: function(error) {
        console.log(error);
        return Alert.dispAlert(error, 'alert-error');
      }
    });
  };

  Show.prototype.resize = function(event) {
    this.pos = window.innerWidth / 2;
    if (this.state) {
      return this.$el.css({
        left: this.pos + 80
      });
    } else {
      return this.$el.css({
        left: this.pos - 205
      });
    }
  };

  return Show;

})();
