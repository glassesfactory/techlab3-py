(function(e){var t;return t=function(){throw Error("いつからインスタンス化出来ると錯覚していた?")},t._tmpl='<div class="modalAlert"><section class="msg"><%= msg %></section><div class="action"><button class="btn btn-primary send" type="button">OK</button><button class="btn cancel" type="button">キャンセル</button></div></div>',t.container=null,t.dispModalAlert=function(n,r,i,o){return t.target=r,t.cb=i,t.args=o,$("body").append(_.template(t._tmpl,{msg:n})),$("body").append($('<div id="screen" />')),t.container=$(".modalAlert"),t.container.css({left:e.innerWidth/2-175}),t.container.on("click",".send",t._sendHandler),t.container.on("click",".cancel",t._hideHandler)},t._sendHandler=function(e){return e.preventDefault(),t.cb.apply(t.target,t.args),$("#screen").remove(),t.container.remove(),t.container=null},t._hideHandler=function(e){return e.preventDefault(),$("#screen").remove(),t.container.remove(),t.container=null},t.dispAlert=function(e,t){var n;return n='<div class="alert <%= alertType %>"><button type="button" class="close" data-dismiss="alert">&times;</button><%= msg %></div>',$("#container").prepend(_.template(n,{msg:e,alertType:t?t:""})),$(".alert").on("click",".close",function(){return $(".alert").remove()})},e.Alert=t})(window);var Delete;Delete=function(){function e(){}return e}();var EditView;EditView=function(){function e(e){this.el=_.template(this._template,{id:e.sid,text:e.text})}return e.prototype.el=null,e.prototype._template='<form id="editView" action="/<%= id %>" method="PUT"><input type="text" name="text" value="<%= text %>"><button type="button" class="send btn btn-primary btn-mini">OK</button><button type="button" class="cancel btn btn-mini">&times;</button></form>',e}();var Index,_this=this;Index=function(){function e(){var t,n=this;this.resize=function(){return e.prototype.resize.apply(n,arguments)},this.hide=function(){return e.prototype.hide.apply(n,arguments)},this.slide=function(){return e.prototype.slide.apply(n,arguments)},this.newTweetAppend=function(){return e.prototype.newTweetAppend.apply(n,arguments)},this.articleSelectedHandler=function(){return e.prototype.articleSelectedHandler.apply(n,arguments)},this._errorHandler=function(){return e.prototype._errorHandler.apply(n,arguments)},this._fetchSuccessHandler=function(){return e.prototype._fetchSuccessHandler.apply(n,arguments)},this.fetchTweetCollection=function(){return e.prototype.fetchTweetCollection.apply(n,arguments)},t=[],this.$el=$("#main"),this.$el.on("click",".article",this.articleSelectedHandler),this.resize(),$(window).on("post_success",this.newTweetAppend),$(window).on("resize",this.resize)}return e.prototype.tweets=[],e.prototype.$el=null,e.prototype.state=!0,e.prototype.fetchTweetCollection=function(){return this.$el.empty(),window.App.removeEventListener(KazitoriEvent.FIRST_REQUEST,this.fetchTweetCollection),$.ajax({url:"/",dataType:"json",contentType:"application/json",success:this._fetchSuccessHandler,error:this._errorHandler})},e.prototype._fetchSuccessHandler=function(e){var t,n,r;for(n=0,r=e.length;r>n;n++)t=e[n],this.tweets.push(new TweetModel(t.sid,t.text,t.created_at,t.updated_at));return this.render()},e.prototype._errorHandler=function(e){return console.log(e,"error")},e.prototype.render=function(){var e,t,n,r,i;for(e="",1>this.tweets.length&&(e+='<article class="article nullpo">ぬるぽ</article>'),i=this.tweets,n=0,r=i.length;r>n;n++)t=i[n],e+=new IndexListView(t).el;return this.$el.append(e),$("#container").css({height:this.$el.height()+20})},e.prototype.articleSelectedHandler=function(e){var t,n;return e.preventDefault(),n=e.currentTarget,t=$(n).attr("id").replace("tweetlist",""),window.App.fragment==="/"+t?(window.App.change("/"),void 0):("/"!==window.App.fragment&&this.hide(),window.App.change("/"+t))},e.prototype.newTweetAppend=function(e,t){var n,r;return r=new TweetModel(t.sid,t.text,t.created_at,t.updated_at),this.tweets.unshift(r),n=new IndexListView(r).el,this.$el.prepend(n)},e.prototype.slide=function(){return this.$el.animate({left:this.pos-420}),this.state=!1},e.prototype.hide=function(){return this.$el.animate({left:this.pos-250}),this.state=!0},e.prototype.resize=function(){var e;return e=$("#container"),this.pos=e.offset().left+e.width()/2,this.state?this.$el.css({left:this.pos-250}):this.$el.css({left:this.pos-420})},e}();var IndexListView;IndexListView=function(){function e(e){this.el=_.template(this._template,{id:e.id,text:e.text,created_at:e.created_at})}return e.prototype.el=null,e.prototype._template='<article id="tweetlist<%= id %>" class="article"><section class="icon"><img src="/assets/images/icon.jpg"></section><section class="tweet"><header>username</header><section class="tweetBody"><%= text %></section><footer><%= created_at %></footer></section></article>',e}();var New,_this=this;New=function(){function e(){var t=this;this._removeContainer=function(){return e.prototype._removeContainer.apply(t,arguments)},this._screenClickHandler=function(){return e.prototype._screenClickHandler.apply(t,arguments)},this.closeHandler=function(){return e.prototype.closeHandler.apply(t,arguments)},this._sendTweetHandler=function(){return e.prototype._sendTweetHandler.apply(t,arguments)},this.toggleClickHandler=function(){return e.prototype.toggleClickHandler.apply(t,arguments)},$(".new").on("click",this.toggleClickHandler)}return e.prototype.$el='<div><header><h2>New Tweet</h2><a href="#" class="close" data-dismiss="alert">&times;</a></header><form id="newForm" class="form" action="/create" method="POST"><div class="controls"><textarea name="text"></textarea></div><div><button id="sendTweet" type="submit" class="btn btn-primary">送信</button></div></form></div>',e.prototype.$screen=null,e.prototype.toggleClickHandler=function(e){return e.preventDefault(),this.$container?this._removeContainer():($("body").append('<div id="screen" />'),$("body").append('<div id="newContainer" />'),this.$container=$("#newContainer"),this.$container.append(this.$el),this.$container.css({left:window.innerWidth/2-215}),$("form").on("submit",this._sendTweetHandler),$("textarea[name=text]").focus(),$(".close").on("click",this.closeHandler),this.$screen=$("#screen"),this.$screen.on("click",this._screenClickHandler))},e.prototype._sendTweetHandler=function(e){var t;return e.preventDefault(),t=$("#newForm").serializeArray(),$.ajax({url:"/create",method:"POST",data:t,success:function(e){return $(window).trigger("post_success",e),Alert.dispAlert("作成しました","alert-success")}}),this._removeContainer()},e.prototype.closeHandler=function(e){return e.preventDefault(),this._removeContainer()},e.prototype._screenClickHandler=function(e){return e.preventDefault(),this._removeContainer()},e.prototype._removeContainer=function(){return this.$container.remove(),this.$screen.remove(),this.$container=null,this.$screen=null},e}();var Show,_this=this;Show=function(){function e(){var t,n=this;this.resize=function(){return e.prototype.resize.apply(n,arguments)},this.deleteTweet=function(){return e.prototype.deleteTweet.apply(n,arguments)},this.deleteClickHandler=function(){return e.prototype.deleteClickHandler.apply(n,arguments)},this.editCancelHandler=function(){return e.prototype.editCancelHandler.apply(n,arguments)},this.editSendHandler=function(){return e.prototype.editSendHandler.apply(n,arguments)},this.editClickHandler=function(){return e.prototype.editClickHandler.apply(n,arguments)},this.closeHandler=function(){return e.prototype.closeHandler.apply(n,arguments)},this._errorHandler=function(){return e.prototype._errorHandler.apply(n,arguments)},this._fetchSuccessHandler=function(){return e.prototype._fetchSuccessHandler.apply(n,arguments)},this.hideAndShow=function(){return e.prototype.hideAndShow.apply(n,arguments)},t=$("#show"),(!t||1>t.length)&&($("#container").append($('<div id="show" />')),t=$("#show")),this.$el=t,this.$el.addClass("detail"),this.resize(),this.$el.on("click",".delete",this.deleteClickHandler),this.$el.on("click",".edit",this.editClickHandler),$(window).on("resize",this.resize)}return e.prototype.$el=null,e.prototype.current=null,e.prototype.isEdit=!1,e.prototype.state=!1,e.prototype.show=function(e){var t;this.$el.animate({left:this.pos+80}),t="/"+e,this.state=!0,$.ajax({url:t,dataType:"json",contentType:"application/json",success:this._fetchSuccessHandler,error:this._errorHandler})},e.prototype.hide=function(){var e=this;this.$el.animate({left:this.pos-205},function(){return e.$el.empty(),e.state=!1})},e.prototype.hideAndShow=function(e){var t=this;return this.$el.animate({left:this.pos-225},function(){return t.$el.empty(),t.show(e)})},e.prototype._fetchSuccessHandler=function(e){return this.current=e,this.$el.append(new ShowView(e).el),$(".closeShow").on("click",this.closeHandler)},e.prototype._errorHandler=function(e){return console.log(e)},e.prototype.closeHandler=function(e){return e.preventDefault(),window.App.change("/")},e.prototype.editClickHandler=function(e){var t;return e.preventDefault(),this.isEdit?!1:(t=this.$el.find(".tweet"),t.after(new EditView(this.current).el),t.hide(),$("#editView").on("click",".cancel",this.editCancelHandler),$("#editView").on("click",".send",this.editSendHandler))},e.prototype.editSendHandler=function(e){var t,n,r,i=this;return e.preventDefault(),r=$("#editView"),n=r.serializeArray(),t=r.attr("action"),$.ajax({url:t,method:"PUT",data:n,success:function(e){var t,n;return n=i.$el.find(".tweet"),n.empty().append(e.text),n.show(),r.remove(),t=$("#tweetlist"+e.sid),t.find(".tweetBody").empty().append(e.text),Alert.dispAlert("更新しました","alert-success")},error:function(e){return console.log(e),Alert.dispAlert(e,"alert-error")}})},e.prototype.editCancelHandler=function(){var e;return $("#editView").remove(),e=this.$el.find(".tweet"),e.show()},e.prototype.deleteClickHandler=function(e){var t;return e.preventDefault(),t=$(e.currentTarget).data("delete"),Alert.dispModalAlert("消してもいいの",this,this.deleteTweet,[t])},e.prototype.deleteTweet=function(e){var t;return t="/"+e,$.ajax({url:t,method:"DELETE",dataType:"json",success:function(e){var t;return t=$("#tweetlist"+e.sid),t.remove(),window.App.change("/"),Alert.dispAlert("削除しました","alert-success")},error:function(e){return console.log(e),Alert.dispAlert(e,"alert-error")}})},e.prototype.resize=function(){return this.pos=window.innerWidth/2,this.state?this.$el.css({left:this.pos+80}):this.$el.css({left:this.pos-205})},e}();var ShowView;ShowView=function(){function e(e){this.el=_.template(this._template,{id:e.sid,text:e.text,created_at:e.created_at})}return e.prototype.el=null,e.prototype._template='<header><section class="icon"><a href="#" class="close closeShow" data-dismiss="alert">&times;</a><img src="/assets/images/icon.jpg" width="50"></section><section class="name">username</section></header><section class="tweet"><%= text %></section><footer><span class="ed"><a href="#" class="edit">[edit]</a></span><span class="del"><a href="/<%= id %>" data-delete="<%= id %>" class="delete">[del]</a></span><%= created_at %></footer>',e}();var TweetModel;TweetModel=function(){function e(e,t,n,r){this.id=e,this.text=t,this.created_at=n,this.updated_at=r}return e.prototype.id=null,e.prototype.text="",e.prototype.created_at=null,e.prototype.updated_at=null,e}();var contents,index,newController,__hasProp={}.hasOwnProperty,__extends=function(e,t){function n(){this.constructor=e}for(var r in t)__hasProp.call(t,r)&&(e[r]=t[r]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e};require.config({shim:{jquery:{exports:"jQuery"},lodash:{exports:"_"}},paths:{jquery:"components/jquery/jquery.min",lodash:"components/lodash/dist/lodash.min",kazitori:"components/kazitori.js/src/js/kazitori"}}),index=null,newController=null,contents=null,require(["jquery","lodash","kazitori"],function(){var e;e=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.routes={"/":"index","/<int:id>":"show"},t.prototype.index=function(){index.hide(),contents.hide()},t.prototype.show=function(e){null==contents&&(contents=new Show),"/"!==this.lastFragment?contents.hideAndShow(e):contents.show(e),index.slide()},t}(Kazitori),$(function(){return index=new Index,newController=new New,contents=new Show,window.App=new e,window.App.addEventListener(KazitoriEvent.FIRST_REQUEST,index.fetchTweetCollection)})});