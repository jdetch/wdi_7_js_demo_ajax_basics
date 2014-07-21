# Ajax Basics with jQuery

"Ajax" refers to the ability of JavaScript to make HTTP requests asynchronously (a.k.a. "in the background") and act on the results directly without having the browser load a new page. Just like DOM manipulation and event handling, jQuery gives us a high-level interface to the browser's Ajax capabilities through the [`$.ajax` function](http://api.jquery.com/jQuery.ajax/).

Most Ajax interactions use the [JSON](http://json.org/) data format for requests and responses. For this demo, I've created a fake news service using [JsonStub](http://jsonstub.com/). Here are the valid endpoints:

* `GET http://jsonstub.com/articles` (gets all articles)
* `GET http://jsonstub.com/articles?category=ruby` (gets all articles in the "ruby" category)
* `GET http://jsonstub.com/articles/1` (gets a single article)
* `GET http://jsonstub.com/articles/4` (gives a 404 error)
* `POST http://jsonstub.com/articles` (fake-creates a new article)

And here is the basic template for using the `$.ajax` function:

```js
$.ajax({
  url: 'http://jsonstub.com/articles',
  type: 'GET', // This defaults to GET, so in this case we don't need it
  dataType: 'json' // Auto-guesses if left out, so technically don't need it
})
.done(function(data, textStatus, jqXHR) {
  // Success! `data` is the JSON data retrieved, do something with it
})
.fail(function(jqXHR, textStatus, errorThrown) {
  // Failure... maybe check `jqXHR.status` for clues to what went wrong
})
.always(function() {
  // This code will always run after either success or failure
});
```

Since we don't want the whole web page to freeze up and become unresponsive while an Ajax request is in progress, the call to `$.ajax` returns immediately and the browser does the request in the background. When it's finished, it will call either the `done` function or the `fail` function, followed by the `always` function.

Note that `$.ajax` returns a "promise" object that has the functions `done`, `fail`, and `always` defined on it. Calling any of these functions returns the promise itself, which is what allows us to chain them off each other. **We don't have to provide all of them**, and we also don't have to call them immediately &ndash; we could assign the return value of `$.ajax` to a variable, and call the functions later.
