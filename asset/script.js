jQuery(document).ready(function ($) {
  var config = window["tributeO2Data"];
  var tributeCategories = new Tribute({
    noMatchTemplate() {
      if (this.current.collection.trigger === "#")
        return '<li><a href="#createTag">Add new tag</a></li>';
      else if (this.current.collection.trigger === "@")
        return '<li><a href="#createCat">Add new category</a></li>';
    },
    collection: [
      {
        values: function (text, cb) {
          RemoteCategorySearch(text, (categories) => cb(categories));
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
            item.original.description +
            '">@' +
            item.original.name +
            "</a>"
          );
        },
        requireLeadingSpace: false,
        trigger: "@",
      },
      {
        values: function (text, cb) {
          RemoteTagSearch(text, (tags) => cb(tags));
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

          return "#" + item.original.name;
        },
        requireLeadingSpace: false,
        trigger: "#",
      },
    ],
  });

  function RemoteTagSearch(text, cb) {
    var URL = config["endpoint"] + "tags";
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
  function RemoteCategorySearch(text, cb) {
    var URL = config["endpoint"] + "categories";
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

  tributeCategories.attach(document.querySelectorAll(".o2-editor-text"));
});
