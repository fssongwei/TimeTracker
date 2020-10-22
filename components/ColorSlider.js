import React from "react";
import { SliderHuePicker } from "react-native-slider-color-picker";
import { View } from "react-native";

const ColorSlider = ({ defaultColor, onColorChange }) => {
  return (
    <View style={{ width: "110%", marginLeft: "-5%", paddingTop: 30 }}>
      <SliderHuePicker
        oldColor={defaultColor}
        trackStyle={{
          height: 15,
          width: "100%",
        }}
        thumbStyle={{
          height: 25,
          width: 10,
          borderRadius: 0,
        }}
        onColorChange={(color) => {
          onColorChange(hsvToRgb(color));
        }}
      />
    </View>
  );
};

export default ColorSlider;

const hsvToRgb = (color) => {
  var h = color.h,
    s = color.s,
    v = color.v;

  var r = 0,
    g = 0,
    b = 0;
  var i = parseInt((h / 60) % 6);
  var f = h / 60 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      break;
  }
  r = parseInt(r * 255.0);
  g = parseInt(g * 255.0);
  b = parseInt(b * 255.0);
  return "rgb(" + r + "," + g + "," + b + ")";
};
