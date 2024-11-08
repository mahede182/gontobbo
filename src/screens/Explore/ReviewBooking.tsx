/* eslint-disable react-native/no-inline-styles */
// ReviewBooking.tsx
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  View,
  TextInput,
  SafeAreaView,
} from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import Tag from "./component/Tag";
import Button from "@/components/RestyleButton";
import { Input } from "@/components/Input";
import { Box, RestyleText } from "@/theme";
import PriceSelect from "./component/PriceSelect";
import { Divider } from "./component/Divider";
import { useNavigation } from "@react-navigation/native";
import GradientTitle from "@/components/GradientTitle";
import { FontAwesome } from "@expo/vector-icons";
import Dropdown from "@/components/Dropdown";
import { stateData } from "@/data/stateData";
import HeaderTitle from "@/components/HeaderTitle";

const ReviewBooking = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleAddGuest = () => {
    // Handle adding a new guest here
    setIsModalVisible(false);
    setTitle("");
    setFirstName("");
    setLastName("");
  };
  const handleEdit = () => {
    setIsEditVisible(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderTitle title="Review Booking" />
      <ScrollView>
        {/* Header Section */}
        <Box style={styles.section}>
          <Box style={styles.header}>
            <Image source={require("@/assets/hotel_image_1.png")} style={styles.hotelImage} />
            <Box style={styles.hotelInfo}>
              <RestyleText style={styles.hotelName}>Caesars Palace</RestyleText>
              <RestyleText style={styles.hotelRating}>★★★★☆</RestyleText>
              <RestyleText style={styles.hotelLocation}>9 W 42nd St, Medtown, New York</RestyleText>
            </Box>
          </Box>
          <Divider />

          {/* Booking Details Section */}
          <Box style={styles.bookingDetails}>
            <Box alignItems={"center"} flexDirection={"row"} justifyContent={"space-between"}>
              <Box>
                <RestyleText style={styles.sectionTitle}>Check In</RestyleText>
                <RestyleText style={styles.sectionValue}>01 Nov 2023, Sun</RestyleText>
              </Box>
              <Box>
                <RestyleText style={styles.sectionTitle}>Check Out</RestyleText>
                <RestyleText style={styles.sectionValue}>15 Nov 2023, Tue</RestyleText>
              </Box>
            </Box>
            <Divider />
            <Box>
              <RestyleText style={styles.sectionTitle}>Guests & Room</RestyleText>
              <RestyleText style={styles.sectionValue}>2 Adults + 2 Rooms</RestyleText>
            </Box>
          </Box>
        </Box>

        {/* Room Details Section */}
        <Box style={styles.section}>
          <Box style={styles.roomDetails}>
            <RestyleText style={styles.roomTitle}>2x Standard Room</RestyleText>
            <RestyleText style={styles.roomDescription}>Room for 4 Persons</RestyleText>
            <Box style={styles.tagContainer}>
              <Tag tag="Breakfast" />
              <Tag tag="Non-Refundable" />
              <Tag tag="Free Self Parking" />
              <Tag tag="Free Wifi" />
              <Tag tag="Free Breakfast" />
            </Box>
            <Divider />
            <RestyleText style={styles.roomNotes}>Non-Refundable</RestyleText>
            <RestyleText style={styles.roomNotes}>
              Surcharge is not applicable for this booking
            </RestyleText>
          </Box>
        </Box>

        {/* Rules & Regulations Section */}
        <Box style={styles.section}>
          <Box style={styles.rulesContainer}>
            <RestyleText style={styles.sectionTitle}>Rules & Regulation</RestyleText>
            <RestyleText style={styles.ruleItem}>• Pets not allowed</RestyleText>
            <RestyleText style={styles.ruleItem}>
              • Guests are provided with free hand sanitizer
            </RestyleText>
            <RestyleText style={styles.ruleItem}>
              • Protective clothing is available to guests
            </RestyleText>
            <RestyleText style={styles.ruleItem}>
              • The hotel offers transfers from this airport (surcharges may apply). Guests must
              contact the hotel with arrival details before travel, using the contact information on
              the booking confirmation. Front desk staff will greet guests on arrival.
            </RestyleText>
            <RestyleText style={styles.ruleItem}>
              • Optional: fee for the buffet breakfast: approximately $20 and $14 for children
              (Airport shuttle fee: $15 per person / one-way)
            </RestyleText>
          </Box>
        </Box>

        {/* Guest Information Section */}
        <Box style={styles.section}>
          <Box style={styles.guestInfoContainer}>
            <RestyleText style={styles.sectionTitle}>I'm looking For</RestyleText>
            <Box style={styles.guestTypeContainer}>
              <Button
                title="Myself"
                style={styles.guestTypeButton}
                textStyle={styles.guestTypeButtonText}
              />
              <Button
                title="Someone Else"
                style={styles.guestTypeButton}
                textStyle={styles.guestTypeButtonText}
              />
            </Box>

            <Input label="Title" placeholder="Mr." />
            <Input label="First Name" placeholder="First Name" />
            <Input label="Last Name" placeholder="Last Name" />
            <Input label="Email Address" placeholder="Email Address" />
            <Input label="Current Address" placeholder="Current Address" />
            <Input label="Contact Number" placeholder="Contact No." />

            <TouchableOpacity style={styles.addGuestButton} onPress={() => setIsModalVisible(true)}>
              <RestyleText
                style={{
                  color: colors.linearStart,
                  fontSize: 16,
                  fontWeight: "600",
                }}>
                Add New Guest
              </RestyleText>
            </TouchableOpacity>
          </Box>
        </Box>
        <Box style={styles.section}>
          <Box style={styles.stateContainer}>
            <RestyleText style={styles.sectionTitle}>Your State</RestyleText>
            <TouchableOpacity
              onPress={() => {
                setIsEditVisible(true);
              }}
              style={styles.stateButton}>
              <RestyleText style={styles.stateButtonText}>Edit</RestyleText>
            </TouchableOpacity>
          </Box>

          <RestyleText style={styles.stateLabel}>USA / Outside USA</RestyleText>
          <RestyleText style={styles.stateNote}>
            Confirm and save these details to your profile
          </RestyleText>

          {/* Book Now Button */}
          <Button
            title="Book Now"
            style={styles.bookNowButton}
            textStyle={styles.bookNowButtonText}
          />
          <TouchableOpacity
            style={{ alignItems: "flex-end" }}
            onPress={() => navigation.navigate("RULES_AND_REGULATIONS")}>
            <RestyleText style={{ color: colors.primary700 }}>Rules and Regulations *</RestyleText>
          </TouchableOpacity>
        </Box>
      </ScrollView>
      <PriceSelect
        price={450}
        gradient
        type="booking"
        buttonText="Book Now"
        priceSub="+$45 taxes & services fees, Per Night for 1 Rooms"
      />

      {/* Add Guest Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <Box style={styles.modalContent}>
            <Box
              style={{ backgroundColor: colors.white, padding: 10 }}
              flexDirection="row"
              alignItems="center">
              <FontAwesome
                onPress={handleAddGuest}
                name="close"
                size={16}
                style={{ marginRight: 8 }}
              />
              <GradientTitle style={styles.modalTitle}>Add New Guests</GradientTitle>
            </Box>
            <RestyleText style={styles.modalDescription}>
              Name should be as per official govt. ID & travelers' details. It cannot be changed
              after confirmation.
            </RestyleText>

            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />

            <TouchableOpacity
              style={{
                backgroundColor: colors.blue800,
                alignItems: "center",
                borderRadius: 8,
                paddingVertical: 8,
                marginBottom: 16,
              }}
              onPress={handleAddGuest}>
              <RestyleText
                style={{
                  fontFamily: typography.poppinsSemibold,
                  fontSize: 16,
                  color: colors.white100,
                }}>
                Done
              </RestyleText>
            </TouchableOpacity>
          </Box>
        </View>
      </Modal>
      {/* Edit State Modal */}
      <Modal visible={isEditVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <Box style={styles.modalContent}>
            <Box
              style={{ backgroundColor: colors.white, padding: 10 }}
              flexDirection="row"
              alignItems="center">
              <FontAwesome onPress={handleEdit} name="close" size={16} style={{ marginRight: 8 }} />
              <GradientTitle style={styles.modalTitle}>Edit State</GradientTitle>
            </Box>
            <Box marginVertical={"ten"}>
              <RestyleText
                style={{
                  fontFamily: typography.poppinsRegular,
                  fontSize: 22,
                  paddingVertical: 10,
                }}>
                State
              </RestyleText>
              <Dropdown label="California" data={stateData} />
            </Box>

            <TouchableOpacity
              style={{
                backgroundColor: colors.blue800,
                alignItems: "center",
                borderRadius: 8,
                paddingVertical: 8,
                marginBottom: 16,
              }}
              onPress={handleEdit}>
              <RestyleText
                style={{
                  fontFamily: typography.poppinsSemibold,
                  fontSize: 16,
                  color: colors.white100,
                }}>
                Done
              </RestyleText>
            </TouchableOpacity>
          </Box>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, marginHorizontal: 10 },
  section: {
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  hotelImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  hotelInfo: {
    flex: 1,
  },
  hotelName: {
    fontFamily: typography.poppinsSemiBold,
    fontSize: 18,
    color: colors.black100,
  },
  hotelRating: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.yellow,
  },
  hotelLocation: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.gray,
  },
  bookingDetails: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: typography.poppinsRegular,
    fontSize: 16,
    color: colors.black100,
  },
  sectionValue: {
    fontFamily: typography.poppinsMedium,
    fontSize: 16,
    color: colors.black100,
    marginBottom: 8,
  },
  roomDetails: {
    marginBottom: 16,
  },
  roomTitle: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 16,
    color: colors.black100,
    marginBottom: 4,
  },
  roomDescription: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  roomNotes: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  rulesContainer: {
    marginBottom: 16,
  },
  ruleItem: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  guestInfoContainer: {
    marginBottom: 16,
  },
  guestTypeContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  guestTypeButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    paddingVertical: 8,
  },
  guestTypeButtonText: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.black100,
  },
  addGuestButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 16,
  },
  stateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  stateButton: {
    // Changed from colors.lightGray to colors.neutral100
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  stateLabel: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  stateNote: {
    fontFamily: typography.poppinsRegular,
    fontSize: 12,
    color: colors.gray,
  },
  bookNowButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
  },
  bookNowButtonText: {
    fontFamily: typography.poppinsSemiBold,
    fontSize: 16,
    color: colors.white100,
  },
  // eslint-disable-next-line react-native/no-color-literals
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.white100,
    padding: 16,
    borderRadius: 8,
    width: "100%",
  },
  modalTitle: {
    fontFamily: typography.poppinsMedium,
    fontSize: 18,
    color: colors.black100,
  },
  modalDescription: {
    fontFamily: typography.poppinsRegular,
    fontSize: 12,
    color: colors.black100,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.white200,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.black100,
  },
});

export default ReviewBooking;
