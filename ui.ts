function drawHead(): void {
  // $(function () {
  //   $("div.draw-area").append("<div class='head body-part'></div>");
  // });
  $('.draw-area').append( $('<div/>').addClass("head body-part") );
}

function drawTorso(): void {
  $(function () {
    $("div.draw-area").append("<div class='armbox'></div>");
    $("div.armbox").append("<div class='torso body-part'></div>");

    $("div.draw-area").append("<div class='legbox'><div class='pelvis body-part'></div></div>");
  });
}

function drawLeftArm(): void {
  $(function () {
    $("div.armbox").prepend("<div class='leftarm body-part'></div>");
  });
}

function drawRightArm(): void {
  $(function () {
    $("div.armbox").prepend("<div class='rightarm body-part'></div>");
  });
}

function drawLeftLeg(): void {
  $(function () {
    $("div.legbox").prepend("<div class='leftleg body-part'></div>");
  });
}

function drawRightLeg(): void {
  $(function () {
    $("div.legbox").prepend("<div class='rightleg body-part'></div>");
  });
}

export { drawTorso, drawHead, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg };