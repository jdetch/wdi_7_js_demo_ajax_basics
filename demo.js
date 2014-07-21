// Don't worry about this part -- it's only necessary because we are using
// JSONStub. We would not need to do this if we were dealing with a "real" app.
$(document).ajaxSend(function(event, xhr, settings) {
  xhr.setRequestHeader('JsonStub-User-Key', '8fdc9aab-804d-4e7a-883c-3060cdcd1d6a');
  xhr.setRequestHeader('JsonStub-Project-Key', 'cb7137cf-2e83-478f-8ada-fed0402ebbfe');
});

$(document).ready(function() {
  // Your ajax code in here!
  $.ajax({
    url: 'http://jsonstub.com/articles',
    type: 'GET'
  })
  .done(function(data){
    data.forEach(function(article){
      var $article = $('<article>');
      $article.append($('<a href="#">').data("article_id", article.id) // better to do this with href
        .append($('<h2>').text(article.title))
      );
      $article.append($('<p>').text(article.summary));
      $('.articles').append($article);
    });
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

  $('.articles').on("click", "article a", function(event) {
    event.preventDefault();

    $.ajax({
      url: 'http://jsonstub.com/articles/' + $(this).data("article_id"),
      type: 'GET'
    })
    .done(function(article) {
      event.preventDefault();
      $('.articles').empty();
      var $article = $('<article>');
      $article.append($('<h2>').text(article.title));
      $article.append($('<p>').text(article.content));
      $('.articles').append($article);
    })

    .fail(function() { console.log("error"); })
    .always(function() { console.log("COMPLETE WOW"); });

  });

});
