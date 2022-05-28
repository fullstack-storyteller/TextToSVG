$(document).ready(function () {
  const APPROX_WIDTH_OF_A_CHARACTER = 8;
  const FACTOR_OF_LEVITATION = 4.5;
  //copy to clipboard
  function CopyValue(element) {
    navigator.clipboard.writeText(element.val());
  }
  function GetLength(element) {
    return element.val().length * APPROX_WIDTH_OF_A_CHARACTER;
  }

  //update tooltip : hover and click
  function TooltipUpdate(element, message) {
    element.children[1].innerHTML = message;
  }

  //Decorate an area
  function DecorateMe(
    element,
    font_family,
    font_size,
    font_weight,
    font_style,
    font_color,
    region_flag = "output"
  ) {
    element.css("font-family", font_family);

    if (region_flag === "testing") {
      //do things
      element.css("font-size", font_size);
      element.css("font-weight", font_weight);
      element.css("font-style", font_style);
      element.css("color", font_color);
      return;
    }
    if (region_flag === "output") {
      element.css("font-size", 12);
      return;
    }

    //code for output regions here
  }

  //function which does the encoding
  function EncodeSVG(source = "main encode button") {
    let svg_height = Number($("#font-size-dropdown").val());
    //console.log($("#idTxtToEncode").val().length);
    //console.log($("#adjust-svg-width").val());

    let textlength = GetLength($("#idTxtToEncode"));

    let svg_width =
      source == "main encode button"
        ? textlength //.val().length * 7
        : $("#adjust-svg-width").val();

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

    let underline = $("#underline")[0].checked
      ? `text-decoration="underline"`
      : "";

    let variableTextinSVG = `<text ${underline} x="0" y="${svg_height}" fill="${svg_color}" font-family="${svg_font_family}" font-size="${svg_font_size}" font-style="${svg_font_style}" font-weight="${svg_font_weight}">${svg_text}</text>`;

    if (source == "main encode button") {
      $("#adjust-svg-width-div").css("display", "inline-block");
      $("#adjust-svg-width").css("display", "inline-block");
      if (!(svg_link === "" || svg_link.length === 0)) {
        $("#launch-behaviour-div").css("display", "inline-block");
      }
      $("#launch-behaviour")[0].checked = true;
    }

    if (!(svg_link === "" || svg_link.length === 0)) {
      // svg_link = svg_link.replace(/&/g, "&amp;");
      svg_link = svg_link.replace(/["'<>&]/g, (m) => charactersToEscape[m]);

      variableTextinSVG = `<a xlink:href="${svg_link}" ${
        $("#launch-behaviour")[0].checked ? 'target="_blank"' : ""
      }>${variableTextinSVG}</a>`;
    }
    let finalSVG = `<svg preserveAspectRatio="xMidYMax meet" height="${svg_height}px"  version="1.1" width="${svg_width}px" viewBox="0 ${
      svg_height / FACTOR_OF_LEVITATION
    } ${svg_width} ${svg_height}" style="enable-background:new 0 0 ${svg_width} ${svg_height}" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"	xmlns:xlink="http://www.w3.org/1999/xlink">${variableTextinSVG}Sorry, your browser does not support inline SVG!</svg>`;

    let XML = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>${finalSVG}`;

    $("#idXML")[0].innerHTML = XML;

    // convert to base 64 and assign to output
    let finalDataURL = `data:image/svg+xml;base64,${btoa(
      XML.replace(/[\u00A0-\u2666]/g, function (c) {
        return "&#" + c.charCodeAt(0) + ";";
      })
    )}`;
    $("#idTxtEncoded")[0].innerHTML = finalDataURL;
    $("#testing")[0].innerHTML = `Your SVG: ${finalSVG} will look like me!`;

    document.getElementById("adjust-svg-width").value = svg_width;
    // if (source == "main encode button") {
    //   $("#adjust-svg-width").css("display", "inline-block");
    //   if (!(svg_link === "" || svg_link.length === 0)) {
    //     $("#launch-behaviour-div").css("display", "inline-block");
    //   }
    //   $("#launch-behaviour")[0].checked = true;
    // }

    //Decorate stuff
    DecorateMe(
      $("#testing"),
      svg_font_family,
      svg_font_size,
      svg_font_weight,
      svg_font_style,
      svg_color,
      "testing"
    );
    $("#testing").css("display", "inline-block");
    DecorateMe(
      $("#idXML"),
      "Lucida Console",
      svg_font_size,
      svg_font_weight,
      svg_font_style,
      svg_color
    );
    DecorateMe(
      $("#idTxtEncoded"),
      "Lucida Console",
      svg_font_size,
      svg_font_weight,
      svg_font_style,
      svg_color
    );
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
  $("#favcolor").change(function () {
    $("#colorme")[0].innerHTML = $("#favcolor").val();
    //console.log($("#favcolor").val());
  });

  //font-weight drop down functon
  $("#font-weight-dropdown").change(function () {
    if ($("#font-weight-dropdown").val() == "others") {
      $("#id-font-weight").css("display", "inline");
      return;
    }
    $("#id-font-weight").css("display", "none");
  });

  //submit form function
  $("#myform").submit(function (e) {
    e.preventDefault(); // to ensure the page doesn't refresh after clicking submit
    EncodeSVG();
  });

  //update SVG by adjust width
  $("#adjust-svg-width").change(function () {
    if (Number($("#adjust-svg-width").val()) == 0) {
      document.getElementById("adjust-svg-width").value = GetLength(
        $("#idTxtToEncode")
      );
      // $("#idTxtToEncode").val().length * 7;
    }
    EncodeSVG("adjust svg input");
  });

  $("#idTxtToEncode").change(function () {
    $("#adjust-svg-width").css("display", "none");
    $("#adjust-svg-width-div").css("display", "none");
    $("#testing").css("display", "none");
    $("#launch-behaviour-div").css("display", "none");
  });

  $("#idURLToEncode").change(function () {
    $("#adjust-svg-width").css("display", "none");
    $("#adjust-svg-width-div").css("display", "none");
    $("#testing").css("display", "none");
    $("#launch-behaviour-div").css("display", "none");
  });

  $("#launch-behaviour").change(function () {
    EncodeSVG("adjust svg input");
  });
});
