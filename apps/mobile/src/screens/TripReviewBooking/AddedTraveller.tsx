// AddNewTraveller.tsx
import HeaderTitle from "@/components/HeaderTitle";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
} from "react-native";

const AddNewTraveller = () => {
  const [fullName, setFullName] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [passportIssuingCountry, setPassportIssuingCountry] = useState("");
  const [travellerType, setTravellerType] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  // const handleDateChange = (date) => {
  //   setShowDatePicker(false);
  //   setDateOfBirth(date);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Add New Traveller" />
      <View style={styles.innerContainer}>
        <Text style={styles.subheader}>Traveller 1</Text>
        <Text style={styles.title}>
          Full Name<Text style={{ color: colors.danger }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />
        <Text style={styles.title}>
          Date Of Birth<Text style={{ color: colors.danger }}>*</Text>
        </Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text>01/01/2000</Text>
        </TouchableOpacity>
        <Modal visible={showDatePicker} animationType="slide">
          <View style={styles.modalContainer}>
            {/* <DatePickerIOS date={dateOfBirth} mode="date" onDateChange={handleDateChange} /> */}
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowDatePicker(false)}>
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Text style={styles.title}>
          Gender<Text style={{ color: colors.danger }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Gender*"
          value={gender}
          onChangeText={setGender}
        />
        <Text style={styles.title}>
          Nationality<Text style={{ color: colors.danger }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nationality*"
          value={nationality}
          onChangeText={setNationality}
        />
        <Text style={styles.title}>
          Passport Number<Text style={{ color: colors.danger }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="---------------"
          value={passportNumber}
          onChangeText={setPassportNumber}
        />
        <Text style={styles.title}>
          Passport Issuing Country<Text style={{ color: colors.danger }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Passport Issuing Country*"
          value={passportIssuingCountry}
          onChangeText={setPassportIssuingCountry}
        />
        <Text style={styles.title}>
          Traveller Type<Text style={{ color: colors.danger }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Traveller Type*"
          value={travellerType}
          onChangeText={setTravellerType}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Traveller</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.neutral400,
    borderRadius: 8,
  },
  title: { fontFamily: typography.poppinsMedium, fontSize: 16, marginTop: 4, marginBottom: 2 },
  subheader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: colors.primary700,
  },
  input: {
    height: 40,
    borderColor: colors.neutral500,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    justifyContent: "center",
    borderRadius: 8,
  },
  button: {
    backgroundColor: colors.primary700,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButton: {
    backgroundColor: colors.primary700,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 16,
  },
  modalButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default AddNewTraveller;
