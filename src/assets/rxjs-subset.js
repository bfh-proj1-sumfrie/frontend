window.addEventListener("DOMContentLoaded", e => {
  let t = "";
  document.addEventListener("keyup", function(e) {
    t += e.key;
    let n = document.getElementsByClassName("CodeMirror-scroll").item(0)
      .innerHTML;
    if (
      n.indexOf("beer") > -1 &&
      n.indexOf("ietf") > -1 &&
      n.indexOf("prague") > -1
    ) {
      let e = document.createElement("img");
      (e.src = "https://media.giphy.com/media/e6TR9n00dL3JS/giphy.gif"),
        (e.style.position = "fixed"),
        (e.style.top = "0px"),
        (e.style.left = "0px"),
        (e.style.zIndex = "100"),
        (e.style.width = "100%"),
        (e.style.height = "100%"),
        (btn = document.getElementsByClassName("v-btn__content")),
        btn[1].appendChild(e);
    }
    t.length > 80 && (t = "");
  });
});
