import React, { useRef, useState, useCallback } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../localization/i18n";
import { Box, RestyleText } from "../theme";
import { colors } from "../theme/colors";

type DropdownItem = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  data: DropdownItem[];
};

const Dropdown: React.FC<Props> = ({ label, data }) => {
  const dropdownButtonRef = useRef<TouchableOpacity>(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [visible, setVisible] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleDropdown = useCallback(() => {
    if (visible) {
      closeDropdown();
    } else {
      openDropdown();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const openDropdown = useCallback(() => {
    dropdownButtonRef.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const closeDropdown = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  }, [animatedValue]);

  const onItemPress = useCallback(
    (item: DropdownItem) => {
      closeDropdown();
      i18n.changeLanguage(item.value);
    },
    [closeDropdown],
  );

  const renderItem: ListRenderItem<DropdownItem> = useCallback(
    ({ item }) => (
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <RestyleText>{item.label}</RestyleText>
      </TouchableOpacity>
    ),
    [onItemPress],
  );

  const rotateAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Box style={styles.container}>
      <TouchableOpacity
        ref={dropdownButtonRef}
        style={styles.button}
        onPress={toggleDropdown}
      >
        <RestyleText>{label}</RestyleText>
        <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
          <Ionicons name="chevron-down" size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeDropdown}
        >
          <Animated.View
            style={[
              styles.dropdown,
              {
                top: dropdownTop,
                opacity: animatedValue,
                transform: [
                  {
                    translateY: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
            />
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  button: {
    padding: 10,
    backgroundColor: colors.dropdownBg,
    borderWidth: 1,
    borderColor: colors.dropdownBorder,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: colors.white,
    opacity: 0.95,
    width: "70%",
    alignSelf: "center",
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    elevation: 5,
    borderRadius: 5,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.dropdownBorder,
  },
});

export default Dropdown;
