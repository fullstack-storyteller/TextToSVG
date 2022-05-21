$(document).ready(function () {
  //copy to clipboard
  function CopyValue(element) {
    navigator.clipboard.writeText(element.val());
  }

  //update tooltip : hover and click
  function TooltipUpdate(element, message) {
    element.children[1].innerHTML = message;
  }

  //function which does the encoding
  function EncodeSVG() {
    let svg_height = $("#font-size-dropdown").val();
    //console.log($("#idTxtToEncode").val().length);

    let svg_width =
      $("#idTxtToEncode").val().length * 16 === 0
        ? 10
        : $("#idTxtToEncode").val().length * 16; //average width of fonts

    let svg_color = $("#favcolor").val();

    let svg_link = $("#idURLToEncode").val().trim();

    let svg_font_family = $("#font-family-dropdown").val();

    let svg_font_size = $("#font-size-dropdown").val();

    let svg_font_weight = $("#font-weight-dropdown").val();
    if ($("#font-weight-dropdown").val() == "others") {
      svg_font_weight = $("#id-font-weight").val();
    }

    let svg_font_style = $("#font-style-dropdown").val();

    /*
      Escape the below from the URL:
      "   &quot;
      '   &apos;
      <   &lt;
      >   &gt;
      &   &amp;
      */
    const charactersToEscape = {
      '"': "&quot;",
      "'": "&apos;",
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
    };

    let svg_text = $("#idTxtToEncode").val().trim();

    svg_text = svg_text.replace(/["'<>&]/g, (m) => charactersToEscape[m]);

    let variableTextinSVG = `<text x="0" y="${svg_height}" fill="${svg_color}" font-family="${svg_font_family}" font-size="${svg_font_size}" font-style="${svg_font_style}" font-weight="${svg_font_weight}">${svg_text}</text>`;

    if (!(svg_link === "" || svg_link.length === 0)) {
      // svg_link = svg_link.replace(/&/g, "&amp;");
      svg_link = svg_link.replace(/["'<>&]/g, (m) => charactersToEscape[m]);

      variableTextinSVG = `<a xlink:href="${svg_link}" target="_blank">${variableTextinSVG}</a>`;
    }
    let XML = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="${svg_height}px"  version="1.1" width="${svg_width}px" viewBox="0 0 ${svg_width} ${svg_height}" style="enable-background:new 0 0 ${svg_width} ${svg_height}" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"	xmlns:xlink="http://www.w3.org/1999/xlink">${variableTextinSVG}Sorry, your browser does not support inline SVG!</svg>`;

    $("#idXML")[0].innerHTML = XML;

    // convert to base 64 and assign to output
    $("#idTxtEncoded")[0].innerHTML = `data:image/svg+xml;base64,${btoa(XML)}`;
  }

  //Tooltip handling
  $(".tooltip1").click(function () {
    TooltipUpdate(this, "Copied!");
    CopyValue($("#idXML"));
  });
  $(".tooltip2").click(function () {
    TooltipUpdate(this, "Copied!");
    CopyValue($("#idTxtEncoded"));
  });

  $(".tooltip1").hover(function () {
    TooltipUpdate(this, "Click to copy!");
  });

  $(".tooltip2").hover(function () {
    TooltipUpdate(this, "Click to copy!");
  });

  //Color of svg image
  $("#favcolor").focusout(function () {
    $("#colorme")[0].innerHTML = $("#favcolor").val();
  });

  //font-weight drop down functon
  $("#font-weight-dropdown").change(function () {
    if ($("#font-weight-dropdown").val() == "others") {
      $("#id-font-weight").css("display", "inline");
      return;
    }
    $("#id-font-weight").css("display", "none");
  });

  //$("#idBtnEncode").click(function () {
  $("#myform").submit(function (e) {
    e.preventDefault(); // to ensure the page doesn't refresh after clicking submit
    EncodeSVG();
  });
});
