/**

Author: Elias Summermatter & Jan Friedli
Date: 28.05.2019

Licence:
This file is part of BloSQL.

BloSQL is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

BloSQL is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with BloSQL.  If not, see <http://www.gnu.org/licenses/>.

External Content:
None

**/

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
