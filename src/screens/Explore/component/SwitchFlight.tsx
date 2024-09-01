import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Box, RestyleText } from "@/theme";
import HeaderTitle from "@/components/HeaderTitle";
import { Divider } from "@/screens/Explore/component/Divider";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { images } from "@/theme/images";

type Props = {};

const SwitchFlight = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Switch to Flight" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box
          style={[
            styles.flightDetailsContainer,
            { borderColor: colors.linearEnd, backgroundColor: colors.blue100 },
          ]}>
          <Box style={styles.flightDetailsHeader}>
            <RestyleText style={styles.flightDetailsTitle}>Flight Details</RestyleText>
            <Box>
              {false && <RestyleText style={styles.price}>$350</RestyleText>}
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  {
                    backgroundColor: colors.blue800,
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    borderRadius: 5,
                  },
                ]}>
                <RestyleText style={[styles.selectButtonText, { color: colors.white }]}>
                  Selected
                </RestyleText>
              </TouchableOpacity>
            </Box>
          </Box>
          <Divider />
          {/* Departure */}
          <Box style={styles.flightDetailsRow}>
            <Box>
              <RestyleText
                style={[
                  styles.title,
                  { color: colors.black, fontFamily: typography.poppinsRegular },
                ]}>
                Departure
              </RestyleText>
              <RestyleText variant="caption">
                Australia - Canada, Ontario | American Airlines | 5E-342 , 6E-056
              </RestyleText>
              <Box style={styles.flightDetailsRowContent}>
                <Box flexDirection={"row"}>
                  <Image source={images.plane} style={styles.icon} />
                  <Box>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      10:30
                    </RestyleText>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      Thu, 11 Feb
                    </RestyleText>
                  </Box>
                </Box>
                <Box>
                  <RestyleText variant="thinTitle">14 hours</RestyleText>
                  <Box
                    style={{
                      backgroundColor: colors.primary500,
                      height: 1,
                      marginVertical: 2,
                    }}
                  />
                  <RestyleText variant="thinTitle">1 stop</RestyleText>
                </Box>
                <Box>
                  <RestyleText style={styles.caption}>8:00</RestyleText>
                  <RestyleText style={styles.caption}>Thu, 11 Feb</RestyleText>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box style={styles.flightDetailsRow}>
            <Box>
              <RestyleText
                style={[
                  styles.title,
                  { color: colors.black, fontFamily: typography.poppinsRegular },
                ]}>
                Return
              </RestyleText>
              <RestyleText variant="caption">
                Canada, Ontario - Australia | American Airlines | 5E-342 , 6E-056
              </RestyleText>
              <Box style={styles.flightDetailsRowContent}>
                <Box flexDirection={"row"}>
                  <Image source={images.plane} style={styles.icon} />
                  <Box>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      12:00
                    </RestyleText>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      Thu, 18 Feb
                    </RestyleText>
                  </Box>
                </Box>
                <Box>
                  <RestyleText variant="thinTitle">14 hours</RestyleText>
                  <Box
                    style={{
                      backgroundColor: colors.primary500,
                      height: 1,
                      marginVertical: 2,
                    }}
                  />
                  <RestyleText variant="thinTitle">1 stop</RestyleText>
                </Box>
                <Box>
                  <RestyleText style={styles.caption}>20:45</RestyleText>
                  <RestyleText style={styles.caption}>Thu, 18 Feb</RestyleText>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* flight details 2 */}
        <Box style={styles.flightDetailsContainer}>
          <Box style={styles.flightDetailsHeader}>
            <RestyleText style={styles.flightDetailsTitle}>Flight Details</RestyleText>
            <Box>
              <RestyleText style={styles.price}>$350</RestyleText>
              <TouchableOpacity style={styles.selectButton}>
                <RestyleText style={styles.selectButtonText}>Select</RestyleText>
              </TouchableOpacity>
            </Box>
          </Box>
          <Divider />
          {/* Departure */}
          <Box style={styles.flightDetailsRow}>
            <Box>
              <RestyleText
                style={[
                  styles.title,
                  { color: colors.black, fontFamily: typography.poppinsRegular },
                ]}>
                Departure
              </RestyleText>
              <RestyleText variant="caption">
                Australia - Canada, Ontario | American Airlines | 5E-342 , 6E-056
              </RestyleText>
              <Box style={styles.flightDetailsRowContent}>
                <Box flexDirection={"row"}>
                  <Image source={images.plane} style={styles.icon} />
                  <Box>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      10:30
                    </RestyleText>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      Thu, 11 Feb
                    </RestyleText>
                  </Box>
                </Box>
                <Box>
                  <RestyleText variant="thinTitle">14 hours</RestyleText>
                  <Box
                    style={{
                      backgroundColor: colors.primary500,
                      height: 1,
                      marginVertical: 2,
                    }}
                  />
                  <RestyleText variant="thinTitle">1 stop</RestyleText>
                </Box>
                <Box>
                  <RestyleText style={styles.caption}>8:00</RestyleText>
                  <RestyleText style={styles.caption}>Thu, 11 Feb</RestyleText>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box style={styles.flightDetailsRow}>
            <Box>
              <RestyleText
                style={[
                  styles.title,
                  { color: colors.black, fontFamily: typography.poppinsRegular },
                ]}>
                Return
              </RestyleText>
              <RestyleText variant="caption">
                Canada, Ontario - Australia | American Airlines | 5E-342 , 6E-056
              </RestyleText>
              <Box style={styles.flightDetailsRowContent}>
                <Box flexDirection={"row"}>
                  <Image source={images.plane} style={styles.icon} />
                  <Box>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      12:00
                    </RestyleText>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      Thu, 18 Feb
                    </RestyleText>
                  </Box>
                </Box>
                <Box>
                  <RestyleText variant="thinTitle">14 hours</RestyleText>
                  <Box
                    style={{
                      backgroundColor: colors.primary500,
                      height: 1,
                      marginVertical: 2,
                    }}
                  />
                  <RestyleText variant="thinTitle">1 stop</RestyleText>
                </Box>
                <Box>
                  <RestyleText style={styles.caption}>20:45</RestyleText>
                  <RestyleText style={styles.caption}>Thu, 18 Feb</RestyleText>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* flight details 3 */}
        <Box style={styles.flightDetailsContainer}>
          <Box style={styles.flightDetailsHeader}>
            <RestyleText style={styles.flightDetailsTitle}>Flight Details</RestyleText>
            <Box>
              <RestyleText style={styles.price}>$350</RestyleText>
              <TouchableOpacity style={styles.selectButton}>
                <RestyleText style={styles.selectButtonText}>Select</RestyleText>
              </TouchableOpacity>
            </Box>
          </Box>
          <Divider />
          {/* Departure */}
          <Box style={styles.flightDetailsRow}>
            <Box>
              <RestyleText
                style={[
                  styles.title,
                  { color: colors.black, fontFamily: typography.poppinsRegular },
                ]}>
                Departure
              </RestyleText>
              <RestyleText variant="caption">
                Australia - Canada, Ontario | American Airlines | 5E-342 , 6E-056
              </RestyleText>
              <Box style={styles.flightDetailsRowContent}>
                <Box flexDirection={"row"}>
                  <Image source={images.plane} style={styles.icon} />
                  <Box>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      10:30
                    </RestyleText>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      Thu, 11 Feb
                    </RestyleText>
                  </Box>
                </Box>
                <Box>
                  <RestyleText variant="thinTitle">14 hours</RestyleText>
                  <Box
                    style={{
                      backgroundColor: colors.primary500,
                      height: 1,
                      marginVertical: 2,
                    }}
                  />
                  <RestyleText variant="thinTitle">1 stop</RestyleText>
                </Box>
                <Box>
                  <RestyleText style={styles.caption}>8:00</RestyleText>
                  <RestyleText style={styles.caption}>Thu, 11 Feb</RestyleText>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box style={styles.flightDetailsRow}>
            <Box>
              <RestyleText
                style={[
                  styles.title,
                  { color: colors.black, fontFamily: typography.poppinsRegular },
                ]}>
                Return
              </RestyleText>
              <RestyleText variant="caption">
                Canada, Ontario - Australia | American Airlines | 5E-342 , 6E-056
              </RestyleText>
              <Box style={styles.flightDetailsRowContent}>
                <Box flexDirection={"row"}>
                  <Image source={images.plane} style={styles.icon} />
                  <Box>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      12:00
                    </RestyleText>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      Thu, 18 Feb
                    </RestyleText>
                  </Box>
                </Box>
                <Box>
                  <RestyleText variant="thinTitle">14 hours</RestyleText>
                  <Box
                    style={{
                      backgroundColor: colors.primary500,
                      height: 1,
                      marginVertical: 2,
                    }}
                  />
                  <RestyleText variant="thinTitle">1 stop</RestyleText>
                </Box>
                <Box>
                  <RestyleText style={styles.caption}>20:45</RestyleText>
                  <RestyleText style={styles.caption}>Thu, 18 Feb</RestyleText>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* flight details 4 */}
        <Box style={styles.flightDetailsContainer}>
          <Box style={styles.flightDetailsHeader}>
            <RestyleText style={styles.flightDetailsTitle}>Flight Details</RestyleText>
            <Box>
              <RestyleText style={styles.price}>$350</RestyleText>
              <TouchableOpacity style={styles.selectButton}>
                <RestyleText style={styles.selectButtonText}>Select</RestyleText>
              </TouchableOpacity>
            </Box>
          </Box>
          <Divider />
          {/* Departure */}
          <Box style={styles.flightDetailsRow}>
            <Box>
              <RestyleText
                style={[
                  styles.title,
                  { color: colors.black, fontFamily: typography.poppinsRegular },
                ]}>
                Departure
              </RestyleText>
              <RestyleText variant="caption">
                Australia - Canada, Ontario | American Airlines | 5E-342 , 6E-056
              </RestyleText>
              <Box style={styles.flightDetailsRowContent}>
                <Box flexDirection={"row"}>
                  <Image source={images.plane} style={styles.icon} />
                  <Box>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      10:30
                    </RestyleText>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      Thu, 11 Feb
                    </RestyleText>
                  </Box>
                </Box>
                <Box>
                  <RestyleText variant="thinTitle">14 hours</RestyleText>
                  <Box
                    style={{
                      backgroundColor: colors.primary500,
                      height: 1,
                      marginVertical: 2,
                    }}
                  />
                  <RestyleText variant="thinTitle">1 stop</RestyleText>
                </Box>
                <Box>
                  <RestyleText style={styles.caption}>8:00</RestyleText>
                  <RestyleText style={styles.caption}>Thu, 11 Feb</RestyleText>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box style={styles.flightDetailsRow}>
            <Box>
              <RestyleText
                style={[
                  styles.title,
                  { color: colors.black, fontFamily: typography.poppinsRegular },
                ]}>
                Return
              </RestyleText>
              <RestyleText variant="caption">
                Canada, Ontario - Australia | American Airlines | 5E-342 , 6E-056
              </RestyleText>
              <Box style={styles.flightDetailsRowContent}>
                <Box flexDirection={"row"}>
                  <Image source={images.plane} style={styles.icon} />
                  <Box>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      12:00
                    </RestyleText>
                    <RestyleText style={[styles.caption, styles.marginHorizontal]}>
                      Thu, 18 Feb
                    </RestyleText>
                  </Box>
                </Box>
                <Box>
                  <RestyleText variant="thinTitle">14 hours</RestyleText>
                  <Box
                    style={{
                      backgroundColor: colors.primary500,
                      height: 1,
                      marginVertical: 2,
                    }}
                  />
                  <RestyleText variant="thinTitle">1 stop</RestyleText>
                </Box>
                <Box>
                  <RestyleText style={styles.caption}>20:45</RestyleText>
                  <RestyleText style={styles.caption}>Thu, 18 Feb</RestyleText>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SwitchFlight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: colors.white100,
  },
  flightDetailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 18,
    fontFamily: typography.poppinsSemibold,
  },
  selectButton: {
    // marginLeft: 8,
  },
  selectButtonText: {
    color: colors.primary700,
    fontFamily: typography.poppinsMedium,
  },
  flightDetailsContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.neutral300,
    marginTop: 16,
  },
  flightDetailsTitle: {
    fontSize: 18,
    fontFamily: typography.poppinsSemibold,
  },
  flightDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  flightDetailsRowContent: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    color: colors.neutral600,
  },
  icon: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  marginHorizontal: {
    marginHorizontal: 8,
  },
});
