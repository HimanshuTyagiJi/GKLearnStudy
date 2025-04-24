function createDynamicRootSVG(contentHTML) {
  const temp = document.createElement("div");
  temp.style.visibility = "hidden";
  temp.style.position = "absolute";
  temp.innerHTML = contentHTML;
  document.body.appendChild(temp);
  const textWidth = temp.offsetWidth;
  document.body.removeChild(temp);

  const padding = 10;
  const totalWidth = textWidth + padding + 10;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", totalWidth);
  svg.setAttribute("height", "28");
  svg.setAttribute("class", "svg-root");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", `M2 18 L6 23 L10 5 H${totalWidth - 5}`);
  path.setAttribute("stroke", "var(--text)");
  path.setAttribute("stroke-width", "1.2");
  path.setAttribute("fill", "none");

  const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
  foreignObject.setAttribute("x", "12");
  foreignObject.setAttribute("y", "-2");
  foreignObject.setAttribute("width", totalWidth - 15);
  foreignObject.setAttribute("height", "50");

  const innerDiv = document.createElement("div");
  innerDiv.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  innerDiv.style.fontSize = "15px";
  innerDiv.style.display = "inline-block";
  innerDiv.innerHTML = contentHTML;

  foreignObject.appendChild(innerDiv);
  svg.appendChild(path);
  svg.appendChild(foreignObject);
  return svg;
}

function createFractionSVG(numeratorHTML, denominatorHTML) {
  const temp = document.createElement("div");
  temp.style.visibility = "hidden";
  temp.style.position = "absolute";
  temp.innerHTML = `
    <div style="display:inline-block;text-align:center;">
      <div>${numeratorHTML}</div>
      <div style="border-top: 1px solid var(--text);">${denominatorHTML}</div>
    </div>`;
  document.body.appendChild(temp);
  const width = temp.offsetWidth;
  document.body.removeChild(temp);

  const totalWidth = width + 10;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", totalWidth);
  svg.setAttribute("height", "60");
  svg.setAttribute("class", "svg-root");

  const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
  foreignObject.setAttribute("x", "0");
  foreignObject.setAttribute("y", "0");
  foreignObject.setAttribute("width", totalWidth);
  foreignObject.setAttribute("height", "70");

  const div = document.createElement("div");
  div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  div.style.fontSize = "15px";
  div.style.textAlign = "center";

  const top = document.createElement("div");
  top.innerHTML = numeratorHTML;

  const bottom = document.createElement("div");
  bottom.style.borderTop = "1px solid var(--text)";
  bottom.innerHTML = denominatorHTML;

  div.appendChild(top);
  div.appendChild(bottom);
  foreignObject.appendChild(div);
  svg.appendChild(foreignObject);

  return svg;
}

function createRootOverFractionSVG(numeratorHTML, denominatorHTML) {
  const temp = document.createElement("div");
  temp.style.visibility = "hidden";
  temp.style.position = "absolute";
  temp.innerHTML = `
    <div style="display:inline-block;text-align:center;font-size:16px;">
      <div>${numeratorHTML}</div>
      <div style="border-top: 1px solid var(--text);">${denominatorHTML}</div>
    </div>`;
  document.body.appendChild(temp);
  const width = temp.offsetWidth;
  document.body.removeChild(temp);

  const padding = 10;
  const rootArmLength = 20;
  const totalWidth = width + padding + rootArmLength;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", totalWidth);
  svg.setAttribute("height", "60");
  svg.setAttribute("class", "svg-root");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", `M2 35 L8 50 L16 10 H${totalWidth - 5}`);
  path.setAttribute("stroke", "var(--text)");
  path.setAttribute("stroke-width", "1.8");
  path.setAttribute("fill", "none");

  const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
  foreignObject.setAttribute("x", rootArmLength);
  foreignObject.setAttribute("y", "10");
  foreignObject.setAttribute("width", width + padding);
  foreignObject.setAttribute("height", "50");

  const div = document.createElement("div");
  div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  div.style.fontSize = "15px";
  div.style.textAlign = "center";

  const top = document.createElement("div");
  top.innerHTML = numeratorHTML;

  const bottom = document.createElement("div");
  bottom.style.borderTop = "1px solid var(--text)";
  bottom.innerHTML = denominatorHTML;

  div.appendChild(top);
  div.appendChild(bottom);
  foreignObject.appendChild(div);

  svg.appendChild(path);
  svg.appendChild(foreignObject);
  return svg;
}

// Apply root rendering
document.querySelectorAll("span.root").forEach(span => {
  const content = span.innerHTML.trim();
  const svg = createDynamicRootSVG(content);
  span.replaceWith(svg);
});

// Apply fraction rendering
document.querySelectorAll("span.rootfrac").forEach(span => {
  const numerator = span.querySelector(".num")?.innerHTML || "";
  const denominator = span.querySelector(".den")?.innerHTML || "";
  const svg = createFractionSVG(numerator, denominator);
  span.replaceWith(svg);
});

// Apply root over fraction rendering
document.querySelectorAll("span.rootwrapfrac").forEach(span => {
  const numerator = span.querySelector(".num")?.innerHTML || "";
  const denominator = span.querySelector(".den")?.innerHTML || "";
  const svg = createRootOverFractionSVG(numerator, denominator);
  span.replaceWith(svg);
});
