"use strict";

// src/hexo-image-redirect/index.ts
var cheerio = require("cheerio");
hexo.extend.filter.register("before_post_render", function(data) {
  data.content = data.content.replace(
    /!\[\[(.+?).(jpg|jpeg|png|gif|bmp|tiff|svg|webp|ico)\]\]side([0-9]+)/g,
    '<img src="/2024/03/01/3.Source/$1.$2" alt="$1.$2" align="right" width="$3">'
  );
  data.content = data.content.replace(
    /!\[\[(.+?).(jpg|jpeg|png|gif|bmp|tiff|svg|webp|ico)\]\]side/g,
    '<img src="/2024/03/01/3.Source/$1.$2" alt="$1.$2" align="right" width="450">'
  );
  data.content = data.content.replace(
    /!\[\[(.+?).(jpg|jpeg|png|gif|bmp|tiff|svg|webp|ico)\]\]name/g,
    "![$1](/2024/03/01/3.Source/$1.$2)"
  );
  data.content = data.content.replace(
    /!\[\[(.+?).(jpg|jpeg|png|gif|bmp|tiff|svg|webp|ico)\]\]/g,
    "![](/2024/03/01/3.Source/$1.$2)"
  );
  data.content = data.content.replace(
    /\[\[___(.*?)\]\]\n#/g,
    '<a href="/tags/$1/" rel="contents" data-pjax-state=""># $1</a> <br>\n#'
  );
  data.content = data.content.replace(
    /\[\[___(.*?)\]\]\n/g,
    '<a href="/tags/$1/" rel="contents" data-pjax-state=""># $1</a> <br>'
  );
});
hexo.extend.filter.register("after_post_render", function(data) {
  const link = data.permalink;
  const linkPrefix = "/2024/03/01/3.Source/";
  const toprocess = ["excerpt", "more", "content"];
  for (let i = 0; i < toprocess.length; i++) {
    const key = toprocess[i];
    const $ = cheerio.load(data[key], {
      ignoreWhitespace: false,
      xmlMode: false,
      lowerCaseTags: false,
      decodeEntities: false
    });
    $("img").each(function() {
      if ($(this).attr("src")) {
        hexo.log.info("in file" + link);
        const src = $(this).attr("src").replace("\\", "/");
        if (!(/http[s]*.*|\/\/.*/.test(src) || /^\s+\//.test(src) || /^\s*\/uploads|images\//.test(src))) {
          const srcArray = src.split("/").filter(function(elem) {
            return elem !== "" && elem !== ".";
          });
          $(this).attr(
            "src",
            linkPrefix + srcArray[srcArray.length - 1]
          );
          console.info && console.info(
            "update link as:-->" + linkPrefix + srcArray[srcArray.length - 1]
          );
        }
      } else {
        console.info && console.info("no src attr, skipped...");
        console.info && console.info($(this));
      }
    });
    data[key] = $.html();
  }
});
