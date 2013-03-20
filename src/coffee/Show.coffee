class Show
  $el:null
  current:null
  isEdit:false
  constructor:()->
    $el = $('#show')
    if not $el or $el.length < 1
      $('#container').append($('<div id="show" />'))
      $el = $('#show')
    @$el = $el
    @$el.addClass('detail')
    @$el.css {left:window.innerWidth / 2 - 205}
    @$el.on 'click', '.delete', @deleteClickHandler
    @$el.on 'click', '.edit', @editClickHandler
    

  show:(id)->
    @$el.animate {left: window.innerWidth / 2 + 80}
    url = '/' + id
    $.ajax({
      url:url
      dataType:"json"
      contentType:"application/json"
      success:@_fetchSuccessHandler
      error:@_errorHandler
      })

    return

  hide:()->
    @$el.animate { left: window.innerWidth / 2 - 205}, ()=>
      @$el.empty()
    return

  hideAndShow:(id)=>
    @$el.animate { left:window.innerWidth / 2 - 225 }, ()=>
      @$el.empty()
      @show(id)

  _fetchSuccessHandler:(data)=>
    @current = data
    @$el.append(new ShowView(data).el)
    $('.closeShow').on 'click', @closeHandler

  _errorHandler:(error)=>
    console.log error

  closeHandler:(event)=>
    event.preventDefault()
    window.App.change('/')

  editClickHandler:(event)=>
    event.preventDefault()
    if @.isEdit
      return false
    $tweet = @$el.find('.tweet')
    $tweet.after(new EditView(@current).el)
    $tweet.hide()

    $('#editView').on 'click', '.cancel', @editCancelHandler
    $('#editView').on 'click', '.send', @editSendHandler

  editSendHandler:(event)=>
    event.preventDefault()
    form = $('#editView')
    data = form.serializeArray()
    action = form.attr('action')

    $.ajax({
      url:action
      method:'PUT'
      data:data
      success:(event)=>
        $tweet = @$el.find('.tweet')
        console.log event
        $tweet.empty().append(event.text)
        $tweet.show()
        form.remove()
        #一覧も変更
        $listView = $('#tweetlist' + event.sid)
        $listView.find('.tweetBody').empty().append(event.text)

      error:(event)=>
        console.log event
      })

  editCancelHandler:(event)=>
    $('#editView').remove()
    $tweet = @$el.find('.tweet')
    $tweet.show()



  deleteClickHandler:(event)=>
    event.preventDefault()
    id = $(event.currentTarget).data('delete')
    Alert.dispAlert('消してもいいの', @, deleteTweet, id )

  deleteTweet:(id)=>
    url = '/' + id
    $.ajax({
      url:url
      method:"DELETE"
      success: (data)=>
        console.log data
      error:(error)=>
        console.log error
    })

