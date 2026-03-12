import React from "react";
import { Modal, StyleSheet, TouchableOpacity, TextInput, View } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import Icon from "@expo/vector-icons/FontAwesome6";
import GradientTitle from "@/components/GradientTitle";

interface AddGuestModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  setTitle: (val: string) => void;
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
}

const AddGuestModal: React.FC<AddGuestModalProps> = ({
  visible,
  onClose,
  onSave,
  title,
  setTitle,
  firstName,
  setFirstName,
  lastName,
  setLastName,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <Box style={styles.modalContent}>
          <Box flexDirection="row" alignItems="center" marginBottom="medium">
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="xmark" size={20} color={colors.black100} />
            </TouchableOpacity>
            <GradientTitle style={styles.modalTitle}>Add New Guests</GradientTitle>
          </Box>

          <RestyleText style={styles.description}>
            Name should be as per official govt. ID & travelers&apos; details. It cannot be changed
            after confirmation.
          </RestyleText>

          <Box marginVertical="small">
            <TextInput
              style={styles.input}
              placeholder="Title (Mr. / Ms.)"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={colors.neutral400}
            />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor={colors.neutral400}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor={colors.neutral400}
            />
          </Box>

          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <RestyleText style={styles.saveButtonText}>Done</RestyleText>
          </TouchableOpacity>
        </Box>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white100,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  closeButton: {
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: typography.poppinsSemibold,
  },
  description: {
    fontFamily: typography.poppinsRegular,
    fontSize: 13,
    color: colors.neutral500,
    lineHeight: 18,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral200,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontFamily: typography.poppinsRegular,
    fontSize: 14,
    color: colors.black100,
  },
  saveButton: {
    backgroundColor: colors.blue800,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    fontFamily: typography.poppinsSemibold,
    fontSize: 16,
    color: colors.white100,
  },
});

export default AddGuestModal;
