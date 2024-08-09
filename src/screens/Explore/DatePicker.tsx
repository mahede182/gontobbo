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
          <RestyleText style={styles.dateLabel}>
            {t("Explore.checkIn")}
          </RestyleText>
        </Box>
        <Box style={styles.dateBox}>
          <RestyleText style={styles.dateText}>
            {selectedCheckOutDate || t("Explore.dateAndGuestDetails")}
          </RestyleText>
          <RestyleText style={styles.dateLabel}>
            {t("Explore.checkOut")}
          </RestyleText>
        </Box>
      </Box>

      <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
        <RestyleText style={styles.doneButtonText}>
          {t("common.done")}
        </RestyleText>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* === Header === */}
      <Box flexDirection={"row"} alignItems={"center"} margin={"medium"}>
        <Box
          style={{ height: 32, width: 32, marginRight: 10 }}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={32}
          borderColor={"greyLight"}
          borderWidth={1}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={colors.black} />
          </TouchableOpacity>
        </Box>
        <GradientTitle variant="gradientTitle">
          {t("Explore.selectCheckInDate")}
        </GradientTitle>
      </Box>
      <Box style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markingType="period"
          markedDates={{
            [selectedCheckInDate]: {
              startingDay: true,
              color: colors.purpleDark,
              textColor: "white",
            },
            color: "green",
            [selectedCheckOutDate]: {
              endingDay: true,
              color: colors.purpleDark,
              textColor: "white",
            },
          }}
          style={{
            borderRadius: 10,
            height: 350,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
          theme={{
            calendarBackground: "white",
            textSectionTitleColor: "black",
            textSectionTitleDisabledColor: "gray",
            dayTextColor: "black",
            todayTextColor: "#5A31F4",
            selectedDayBackgroundColor: "yellow",
            selectedDayTextColor: "white",
            arrowColor: "black",
          }}
          //   === use when you want to custom header===
          //   customHeader={({ date }) => {
          //     return (
          //       <Box
          //         marginVertical={"ten"}
          //         paddingHorizontal={"ten"}
          //         flexDirection={"row"}
          //         alignItems={"center"}
          //         justifyContent={"space-between"}
          //       >
          //         <RestyleText
          //           fontFamily={typography.poppinsRegular}
          //           fontSize={16}
          //           color={"purpleDark"}
          //           style={{ color: colors.purpleDark }}
          //         >
          //           December 2025
          //         </RestyleText>
          //         <Box flexDirection={"row"} alignItems={"center"}>
          //           <Icon name="arrow-circle-left" size={24} color="black" />
          //           <Icon name="arrow-circle-right" size={24} color="black" />
          //         </Box>
          //       </Box>
          //     );
          //   }}
        />
      </Box>
      {renderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#333333",
  },
  calendarContainer: {
    marginVertical: 24,
    paddingHorizontal: 24,
  },
  footer: {
    // flexDirection: "row",
    // justifyContent: "space-around",
    marginHorizontal: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    shadowColor: "#000",
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
    borderColor: colors.greyLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 8,
  },
  dateText: {
    fontFamily: typography.poppinsBold,
    fontSize: 14,
    color: "#333333",
  },
  dateLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#333333",
  },
  doneButton: {
    backgroundColor: colors.purpleDark,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  doneButtonText: {
    fontFamily: "Poppins-Semibold",
    fontSize: 16,
    color: "#FFFFFF",
  },
});

export default SelectDateScreen;
