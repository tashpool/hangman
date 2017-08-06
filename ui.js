"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function drawHead() {
    // $(function () {
    //   $("div.draw-area").append("<div class='head body-part'></div>");
    // });
    $('.draw-area').append($('<div/>').addClass("head body-part"));
}
exports.drawHead = drawHead;
function drawTorso() {
    $(function () {
        $("div.draw-area").append("<div class='armbox'></div>");
        $("div.armbox").append("<div class='torso body-part'></div>");
        $("div.draw-area").append("<div class='legbox'><div class='pelvis body-part'></div></div>");
    });
}
exports.drawTorso = drawTorso;
function drawLeftArm() {
    $(function () {
        $("div.armbox").prepend("<div class='leftarm body-part'></div>");
    });
}
exports.drawLeftArm = drawLeftArm;
function drawRightArm() {
    $(function () {
        $("div.armbox").prepend("<div class='rightarm body-part'></div>");
    });
}
exports.drawRightArm = drawRightArm;
function drawLeftLeg() {
    $(function () {
        $("div.legbox").prepend("<div class='leftleg body-part'></div>");
    });
}
exports.drawLeftLeg = drawLeftLeg;
function drawRightLeg() {
    $(function () {
        $("div.legbox").prepend("<div class='rightleg body-part'></div>");
    });
}
exports.drawRightLeg = drawRightLeg;
