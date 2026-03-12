import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Text } from "react-native";
import { Box, RestyleText } from "@/theme";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";
import GradientTitle from "@/components/GradientTitle";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import HeaderTitle from "@/components/HeaderTitle";

const SelectDateScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [selectedCheckInDate, setSelectedCheckInDate] = useState<string | null>(null);
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState<string | null>(null);

  const handleDayPress = (day: any) => {
    if (!selectedCheckInDate) {
      setSelectedCheckInDate(day.dateString);
    } else if (!selectedCheckOutDate) {
      if (day.dateString > selectedCheckInDate) {
        setSelectedCheckOutDate(day.dateString);
      } else {
        setSelectedCheckInDate(day.dateString);
        setSelectedCheckOutDate(null);
      }
    } else {
      setSelectedCheckInDate(day.dateString);
      setSelectedCheckOutDate(null);
    }
  };

  const handleDonePress = () => {
    navigation.goBack();
  };

  // Build the marking object for a continuous period
  const getMarkedDates = () => {
    const marks: any = {};
    if (selectedCheckInDate) {
      marks[selectedCheckInDate] = {
        startingDay: true,
        color: colors.blue800,
        textColor: colors.white,
      };
    }
    if (selectedCheckOutDate && selectedCheckInDate) {
      marks[selectedCheckOutDate] = {
        endingDay: true,
        color: colors.blue800,
        textColor: colors.white,
      };

      // Fill dates between
      let current = dayjs(selectedCheckInDate).add(1, "day");
      const end = dayjs(selectedCheckOutDate);
      while (current.isBefore(end, "day")) {
        const dateString = current.format("YYYY-MM-DD");
        marks[dateString] = {
          color: colors.blue100,
          textColor: colors.blue800,
        };
        current = current.add(1, "day");
      }
    }
    return marks;
  };

  const formattedIn = selectedCheckInDate ? dayjs(selectedCheckInDate).format("D, MMM YY") : "--";
  const formattedOut = selectedCheckOutDate
    ? dayjs(selectedCheckOutDate).format("D, MMM YY")
    : "--";

  const renderFooter = () => (
    <View style={styles.footer}>
      <Box flexDirection={"row"} justifyContent={"space-between"} style={{ marginBottom: 16 }}>
        <Box style={styles.dateBox}>
          <Box flexDirection="row" alignItems="center" style={{ marginBottom: 4 }}>
            <Feather
              name="calendar"
              size={14}
              color={colors.neutral600}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.dateText}>{formattedIn}</Text>
          </Box>
          <Text style={styles.dateLabel}>{t("Explore.checkIn")}</Text>
        </Box>
        <View style={{ width: 12 }} />
        <Box style={styles.dateBox}>
          <Box flexDirection="row" alignItems="center" style={{ marginBottom: 4 }}>
            <Feather
              name="calendar"
              size={14}
              color={colors.neutral600}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.dateText}>{formattedOut}</Text>
          </Box>
          <Text style={styles.dateLabel}>{t("Explore.checkOut")}</Text>
        </Box>
      </Box>

      <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
        <RestyleText style={styles.doneButtonText}>{t("common.done")}</RestyleText>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* === Header === */}
      <Box flexDirection={"row"} alignItems={"center"} margin={"medium"}>
        <HeaderTitle title={t("Explore.selectCheckInDate")} />
      </Box>
      <Box style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markingType="period"
          markedDates={getMarkedDates()}
          style={styles.calenderStyle}
          hideArrows={false}
          renderArrow={(direction: string) => (
            <View style={styles.arrowBox}>
              <Icon
                name={direction === "left" ? "chevron-left" : "chevron-right"}
                size={20}
                color={colors.neutral400}
              />
            </View>
          )}
          theme={{
            backgroundColor: colors.white,
            calendarBackground: colors.white,
            textSectionTitleColor: colors.neutral400,
            selectedDayBackgroundColor: colors.blue800,
            selectedDayTextColor: colors.white,
            todayTextColor: colors.blue800,
            dayTextColor: colors.neutral500,
            textDisabledColor: colors.neutral300,
            monthTextColor: colors.blue800,
            textMonthFontFamily: typography.poppinsSemibold,
            textMonthFontSize: 16,
            textDayFontFamily: typography.poppinsRegular,
            textDayHeaderFontFamily: typography.poppinsMedium,
            "stylesheet.calendar.header": {
              header: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 6,
                marginBottom: 10,
              },
              monthText: {
                fontFamily: typography.poppinsSemiBold,
                fontSize: 16,
                color: colors.blue800,
                flex: 1,
                textAlign: "left",
              },
              arrow: {
                padding: 10,
              },
            },
          }}
        />
      </Box>
      <View style={{ flex: 1 }} />
      {renderFooter()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 36,
    width: 36,
    marginRight: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.neutral200,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.neutral50,
  },
  headerTitleSelect: {
    fontFamily: typography.poppinsBold,
    fontSize: 20,
    color: colors.blue800,
  },
  calendarContainer: {
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    paddingVertical: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  calenderStyle: {
    borderRadius: 16,
  },
  arrowBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.neutral100,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  dateBox: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral200,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  dateText: {
    fontFamily: typography.poppinsBold,
    fontSize: 15,
    color: colors.neutral800,
  },
  dateLabel: {
    fontFamily: typography.poppinsRegular,
    fontSize: 12,
    color: colors.neutral500,
    marginLeft: 20, // Align text under date
  },
  doneButton: {
    backgroundColor: colors.blue800,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
  },
  doneButtonText: {
    fontFamily: typography.poppinsMedium,
    fontSize: 16,
    color: colors.white,
  },
});

export default SelectDateScreen;
