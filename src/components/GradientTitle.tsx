import React from "react";
import { TextStyle } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";
import { RestyleText } from "@/theme";
import { dynamicCSS } from "@/utils/styles";

interface GradientTitleProps {
  style?: TextStyle;
  children: React.ReactNode;
}

// Creates a text element with a gradient color using MaskedView and LinearGradient.
// Renders the text twice: once with a masked gradient background, and once with transparent text for content.
// Technique inspired by: https://stackoverflow.com/a/51248256

const GradientTitle: React.FC<GradientTitleProps> = (props) => {
  return (
    <MaskedView maskElement={<RestyleText {...props} />}>
      <LinearGradient
        colors={[colors.linearStart, colors.linearEnd]}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 0 }}>
        <RestyleText {...props} style={[props.style, dynamicCSS("opacity", 0)]}>
          {props.children}
        </RestyleText>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientTitle;
