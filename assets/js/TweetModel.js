var TweetModel;

TweetModel = (function() {

  TweetModel.prototype.id = null;

  TweetModel.prototype.text = "";

  TweetModel.prototype.created_at = null;

  TweetModel.prototype.updated_at = null;

  function TweetModel(id, text, created_at, updated_at) {
    this.id = id;
    this.text = text;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  return TweetModel;

})();
