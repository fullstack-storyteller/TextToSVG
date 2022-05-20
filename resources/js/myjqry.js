$(document).ready(function () {
  //copy to clipboard
  function CopyValue(element) {
    navigator.clipboard.writeText(element[0].innerHTML);
    console.log(element[0].innerHTML);
  }

  //update tooltip : hover and click
  function TooltipUpdate(element, message) {
    element.children[1].innerHTML = message;
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
    //console.log(document.getElementById("favcolor").value);
    // document.getElementById("colorme").innerHTML =
    //   document.getElementById("favcolor").value;
    //console.log($("#colorme"));
    $("#colorme")[0].innerHTML = $("#favcolor").val();
  });

  //font-weight drop down functon
  $("#font-weight-dropdown").change(function () {
    //console.log($("#font-weight-dropdown").val());
    if ($("#font-weight-dropdown").val() == "others") {
      $("#id-font-weight").css("display", "inline");
      return;
    }
    $("#id-font-weight").css("display", "none");
  });
});
