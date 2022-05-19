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
});
