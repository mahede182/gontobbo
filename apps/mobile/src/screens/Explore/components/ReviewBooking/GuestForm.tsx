import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { MotiView } from "moti";
import { Input } from "@/components/Input";
import Icon from "@expo/vector-icons/FontAwesome6";

interface GuestFormProps {
  bookingFor: "MYSELF" | "SOMEONE_ELSE";
  setBookingFor: (val: "MYSELF" | "SOMEONE_ELSE") => void;
  title: string;
  setTitle: (val: string) => void;
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  onAddNewGuest: () => void;
}

const GuestForm: React.FC<GuestFormProps> = ({
  bookingFor,
  setBookingFor,
  title,
  setTitle,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  address,
  setAddress,
  phone,
  setPhone,
  onAddNewGuest,
}) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500, delay: 600 }}
      style={styles.container}>
      <RestyleText style={styles.title}>I&apos;m Looking For</RestyleText>

      <Box flexDirection="row" alignItems="center" marginVertical="medium">
        <TouchableOpacity style={styles.typeToggle} onPress={() => setBookingFor("MYSELF")}>
          <Icon
            name={bookingFor === "MYSELF" ? "circle-check" : "circle"}
            size={18}
            color={bookingFor === "MYSELF" ? colors.primary700 : colors.neutral400}
          />
          <RestyleText style={[styles.typeLabel, bookingFor === "MYSELF" && styles.activeType]}>
            Myself
          </RestyleText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeToggle, { marginLeft: 20 }]}
          onPress={() => setBookingFor("SOMEONE_ELSE")}>
          <Icon
            name={bookingFor === "SOMEONE_ELSE" ? "circle-check" : "circle"}
            size={18}
            color={bookingFor === "SOMEONE_ELSE" ? colors.primary700 : colors.neutral400}
          />
          <RestyleText
            style={[styles.typeLabel, bookingFor === "SOMEONE_ELSE" && styles.activeType]}>
            Someone Else
          </RestyleText>
        </TouchableOpacity>
      </Box>

      <Box flexDirection="row" justifyContent="space-between">
        <Box width="30%">
          <Input label="Title" placeholder="Mr." value={title} onChangeText={setTitle} />
        </Box>
        <Box width="65%">
          <Input
            label="First Name"
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
        </Box>
      </Box>

      <Input
        label="Last Name"
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <Input
        label="Email Address"
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Current Address"
        placeholder="Current Address"
        value={address}
        onChangeText={setAddress}
      />

      <Box width="100%">
        <Input
          label="Contact Number"
          placeholder="Contact No."
          value={phone}
          onChangeText={setPhone}
          leftElement={
            <Box
              flexDirection="row"
              alignItems="center"
              paddingRight="small"
              borderRightWidth={1}
              borderColor="neutral200"
              marginRight="small">
              <RestyleText style={styles.countryCode}>+1</RestyleText>
              <Icon
                name="chevron-down"
                size={10}
                color={colors.neutral500}
                style={{ marginLeft: 4 }}
              />
            </Box>
          }
        />
      </Box>

      <TouchableOpacity onPress={onAddNewGuest} style={styles.addGuestLink}>
        <RestyleText style={styles.addGuestText}>Add New Guest</RestyleText>
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.white100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral200,
    marginBottom: 16,
  },
  title: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 18,
    color: colors.black100,
  },
  typeToggle: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeLabel: {
    fontFamily: typography.poppinsMedium,
    fontSize: 14,
    color: colors.neutral500,
    marginLeft: 8,
  },
  activeType: {
    color: colors.black100,
  },
  countryCode: {
    fontFamily: typography.poppinsMedium,
    fontSize: 14,
    color: colors.neutral700,
  },
  addGuestLink: {
    marginTop: 12,
  },
  addGuestText: {
    fontFamily: typography.poppinsBold,
    fontSize: 14,
    color: colors.primary700,
  },
});

export default GuestForm;
