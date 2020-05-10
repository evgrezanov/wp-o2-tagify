jQuery(document).ready(function ($) {
  var tribute = new Tribute({
    values: function (text, cb) {
      remoteSearch(text, (users) => cb(users));
    },
    lookup: "name",
    fillAttr: "name",
    selectTemplate: function (item) {
      if (typeof item === "undefined") return null;
      if (this.range.isContentEditable(this.current.element)) {
        return (
          '<span contenteditable="false"><a href="' +
          item.original.link +
          '" target="_blank" title="' +
          item.original.name +
          '">' +
          item.original.name +
          "</a></span>"
        );
      }

      return (
        '<a href="' +
        item.original.link +
        '" target="_blank" title="' +
        item.original.name +
        '">@' +
        item.original.name +
        "</a>"
      );
    },
    requireLeadingSpace: false,
  });

  function remoteSearch(text, cb) {
    var URL = "http://o2.local/wp-json/wp/v2/categories";
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          cb(data);
        } else if (xhr.status === 403) {
          cb([]);
        }
      }
    };
    xhr.open("GET", URL + "?search=" + text, true);
    xhr.send();
  }

  tribute.attach(document.querySelectorAll(".o2-editor-text"));
});
