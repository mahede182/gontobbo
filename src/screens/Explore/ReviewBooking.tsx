// ReviewBooking.tsx
import React from "react";
import { Image, StyleSheet, ScrollView } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import Tag from "./component/Tag";
import Button from "@/components/RestyleButton"; // Assuming you have a custom Button component
import { Input } from "@/components/Input";
import HeaderTitle from "./component/HeaderTitle";
import { Box, RestyleText } from "@/theme";
import PriceSelect from "./component/PriceSelect";
import { Divider } from "./component/Divider";

const ReviewBooking = () => {
  return (
    <Box style={{ flex: 1, marginHorizontal: 10 }}>
      <HeaderTitle title="Select Room" />
      <ScrollView>
        {/* Header Section */}
        <Box style={styles.section}>
          <Box style={styles.header}>
            <Image
              source={require("@/assets/hotel_image_1.png")}
              style={styles.hotelImage}
            />
            <Box style={styles.hotelInfo}>
              <RestyleText style={styles.hotelName}>Caesars Palace</RestyleText>
              <RestyleText style={styles.hotelRating}>★★★★☆</RestyleText>
              <RestyleText style={styles.hotelLocation}>
                9 W 42nd St, Medtown, New York
              </RestyleText>
            </Box>
          </Box>
          <Divider />

          {/* Booking Details Section */}

          <Box style={styles.bookingDetails}>
            <Box
              alignItems={"center"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Box>
                <RestyleText style={styles.sectionTitle}>Check In</RestyleText>
                <RestyleText style={styles.sectionValue}>
                  01 Nov 2023, Sun
                </RestyleText>
              </Box>
              <Box>
                <RestyleText style={styles.sectionTitle}>Check Out</RestyleText>
                <RestyleText style={styles.sectionValue}>
                  15 Nov 2023, Tue
                </RestyleText>
              </Box>
            </Box>
            <Divider />
            <Box>
              <RestyleText style={styles.sectionTitle}>
                Guests & Room
              </RestyleText>
              <RestyleText style={styles.sectionValue}>
                2 Adults + 2 Rooms
              </RestyleText>
            </Box>
          </Box>
        </Box>

        {/* Room Details Section */}
        <Box style={styles.section}>
          <Box style={styles.roomDetails}>
            <RestyleText style={styles.roomTitle}>2x Standard Room</RestyleText>
            <RestyleText style={styles.roomDescription}>
              Room for 4 Persons
            </RestyleText>
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
            <RestyleText style={styles.sectionTitle}>
              Rules & Regulation
            </RestyleText>
            <RestyleText style={styles.ruleItem}>
              • Pets not allowed
            </RestyleText>
            <RestyleText style={styles.ruleItem}>
              • Guests are provided with free hand sanitizer
            </RestyleText>
            <RestyleText style={styles.ruleItem}>
              • Protective clothing is available to guests
            </RestyleText>
            <RestyleText style={styles.ruleItem}>
              • The hotel offers transfers from this airport (surcharges may
              apply). Guests must contact the hotel with arrival details before
              travel, using the contact information on the booking confirmation.
              Front desk staff will greet guests on arrival.
            </RestyleText>
            <RestyleText style={styles.ruleItem}>
              • Optional: fee for the buffet breakfast: approximately $20 and
              $14 for children (Airport shuttle fee: $15 per person / one-way)
            </RestyleText>
          </Box>
        </Box>

        {/* Guest Information Section */}
        <Box style={styles.section}>
          <Box style={styles.guestInfoContainer}>
            <RestyleText style={styles.sectionTitle}>
              I'm looking For
            </RestyleText>
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

            <Button title="Add New Guest" style={styles.addGuestButton} />

            <Box style={styles.stateContainer}>
              <RestyleText style={styles.sectionTitle}>Your State</RestyleText>
              <Button title="Edit" style={styles.stateButton} />
            </Box>

            <RestyleText style={styles.stateLabel}>
              USA / Outside USA
            </RestyleText>
            <RestyleText style={styles.stateNote}>
              Confirm and save these details to your profile
            </RestyleText>
          </Box>
        </Box>

        {/* Book Now Button */}
        <Button
          title="Book Now"
          style={styles.bookNowButton}
          textStyle={styles.bookNowButtonText}
        />
      </ScrollView>
      <PriceSelect
        price={450}
        gradient
        type="booking"
        buttonText="Book Now"
        priceSub="+$45 taxes & services fees, Per Night for 1 Rooms"
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  section: {
    borderWidth: 1,
    borderColor: colors.greyLight3,
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
    color: colors.black,
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
    // flexDirection: "row",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: typography.poppinsRegular,
    fontSize: 16,
    color: colors.black,
  },
  sectionValue: {
    fontFamily: typography.poppinsMedium,
    fontSize: 16,
    color: colors.black,
    marginBottom: 8,
  },
  roomDetails: {
    marginBottom: 16,
  },
  roomTitle: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 16,
    color: colors.black,
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
  priceContainer: {
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: {
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.gray,
  },
  priceValue: {
    fontFamily: typography.poppinsSemiBold,
    fontSize: 14,
    color: colors.black,
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
    color: colors.black,
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
    backgroundColor: colors.lightGray,
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
    color: colors.white,
  },
});

export default ReviewBooking;
