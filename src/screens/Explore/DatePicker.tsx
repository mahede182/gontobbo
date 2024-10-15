import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Box, RestyleText } from "@/theme";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";
import GradientTitle from "@/components/GradientTitle";
import { useTranslation } from "react-i18next";

const SelectDateScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(null);
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(null);

  const handleDayPress = (day) => {
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

  const renderFooter = () => (
    <View style={styles.footer}>
      <Box flexDirection={"row"} justifyContent={"space-between"}>
        <Box style={styles.dateBox}>
          <RestyleText style={styles.dateText}>
            {selectedCheckInDate || t("Explore.dateAndGuestDetails")}
          </RestyleText>
          <RestyleText style={styles.dateLabel}>{t("Explore.checkIn")}</RestyleText>
        </Box>
        <Box style={styles.dateBox}>
          <RestyleText style={styles.dateText}>
            {selectedCheckOutDate || t("Explore.dateAndGuestDetails")}
          </RestyleText>
          <RestyleText style={styles.dateLabel}>{t("Explore.checkOut")}</RestyleText>
        </Box>
      </Box>

      <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
        <RestyleText style={styles.doneButtonText}>{t("common.done")}</RestyleText>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* === Header === */}
      <Box flexDirection={"row"} alignItems={"center"} margin={"medium"}>
        <Box
          style={styles.mainContainer}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={32}
          borderColor={"white200"}
          borderWidth={1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={colors.black100} />
          </TouchableOpacity>
        </Box>
        <GradientTitle variant="gradientTitle">{t("Explore.selectCheckInDate")}</GradientTitle>
      </Box>
      <Box style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markingType="period"
          markedDates={{
            [selectedCheckInDate]: {
              startingDay: true,
              color: colors.blue800,
              textColor: "white100",
            },
            color: "green",
            [selectedCheckOutDate]: {
              endingDay: true,
              color: colors.blue800,
              textColor: colors.white100,
            },
          }}
          style={styles.calenderStyle}
          theme={{
            calendarBackground: "white100",
            textSectionTitleColor: "black100",
            textSectionTitleDisabledColor: "gray",
            dayTextColor: "black100",
            todayTextColor: "#5A31F4",
            selectedDayBackgroundColor: "yellow",
            selectedDayTextColor: "white100",
            arrowColor: "black100",
          }}
        />
      </Box>
      {renderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { height: 32, width: 32, marginRight: 10 },
  container: {
    flex: 1,
  },
  calendarContainer: {
    marginVertical: 24,
    paddingHorizontal: 24,
  },
  calenderStyle: {
    borderRadius: 10,
    height: 350,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  footer: {
    marginHorizontal: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateBox: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.white200,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 8,
  },
  dateText: {
    fontFamily: typography.poppinsBold,
    fontSize: 14,
    color: colors.neutral600,
  },
  dateLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: colors.neutral600,
  },
  doneButton: {
    backgroundColor: colors.blue800,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  doneButtonText: {
    fontFamily: "Poppins-Semibold",
    fontSize: 16,
    color: colors.white,
  },
});

export default SelectDateScreen;
