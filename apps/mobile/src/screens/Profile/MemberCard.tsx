import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions } from "react-native";
import { SafeAreaView, MotiView } from "moti";
import { colors } from "@/theme/colors";
import HeaderTitle from "@/components/HeaderTitle";
import { typography } from "@/theme/typography";
import { useGetProfileQuery } from "@/store/api/usersApi";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

const MemberCard: React.FC = () => {
  const { data: userData, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return (
      <View style={[styles.mainContainer, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary700} />
      </View>
    );
  }

  const memberClass = userData?.memberClass || "BRONZE";

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderTitle title="Member Card" />
      <View style={styles.content}>
        <MotiView
          from={{ opacity: 0, scale: 0.5, rotateY: "45deg" }}
          animate={{ opacity: 1, scale: 1, rotateY: "0deg" }}
          transition={{ type: "timing", duration: 800, delay: 200 }}
          style={styles.cardContainer}>
          {/* Background Decorative Circles */}
          <View style={styles.circle1} />
          <View style={styles.circle2} />

          <View style={styles.cardHeader}>
            <Image
              source={require("@/assets/profile/info.png")}
              style={styles.headerLogo}
              fadeDuration={0}
            />
            <View style={styles.classBadge}>
              <Text style={styles.classText}>{memberClass}</Text>
            </View>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.userInfo}>
              <Text style={styles.nameLabel}>Card Holder</Text>
              <Text style={styles.name}>
                {userData?.firstName} {userData?.lastName}
              </Text>

              <View style={styles.numberContainer}>
                <Text style={styles.numberLabel}>Member ID</Text>
                <Text style={styles.memberNumber}>{userData?.memberNumber || "N/A"}</Text>
              </View>
            </View>

            <View style={styles.avatarContainer}>
              <Image
                source={
                  userData?.avatar
                    ? { uri: userData.avatar }
                    : require("@/assets/bottomTab/profile.png")
                }
                style={styles.avatar}
              />
            </View>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.barcodePlaceholder}>
              <Ionicons name="barcode-outline" size={32} color={colors.white} opacity={0.6} />
              <View style={[styles.barcodeLine, { width: "60%" }]} />
              <View style={[styles.barcodeLine, { width: "80%" }]} />
              <View style={[styles.barcodeLine, { width: "40%" }]} />
            </View>
            <Text style={styles.validThru}>Valid Thru: 12/28</Text>
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 1000 }}
          style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={colors.primary700} />
          <Text style={styles.infoText}>
            Show this digital card at our partner lounges and counters to enjoy exclusive benefits.
          </Text>
        </MotiView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white100,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.primary700,
    borderRadius: 20,
    padding: 24,
    overflow: "hidden",
    shadowColor: colors.primary700,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  circle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    top: -50,
    right: -50,
  },
  circle2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    bottom: -30,
    left: -30,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLogo: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    tintColor: colors.white,
  },
  classBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  classText: {
    color: colors.white,
    fontFamily: typography.poppinsBold,
    fontSize: 12,
    letterSpacing: 1,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flex: 1,
  },
  userInfo: {
    flex: 1,
  },
  nameLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 10,
    fontFamily: typography.poppinsMedium,
    textTransform: "uppercase",
  },
  name: {
    color: colors.white,
    fontSize: 20,
    fontFamily: typography.poppinsSemibold,
    marginBottom: 15,
  },
  numberContainer: {
    marginTop: 5,
  },
  numberLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 10,
    fontFamily: typography.poppinsMedium,
    textTransform: "uppercase",
  },
  memberNumber: {
    color: colors.white,
    fontSize: 16,
    fontFamily: typography.poppinsRegular,
    letterSpacing: 2,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
    padding: 2,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 33,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 20,
  },
  barcodePlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  barcodeLine: {
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 1,
  },
  validThru: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 10,
    fontFamily: typography.poppinsRegular,
  },
  infoBox: {
    flexDirection: "row",
    padding: 20,
    marginHorizontal: 30,
    backgroundColor: colors.white,
    borderRadius: 15,
    marginTop: 40,
    alignItems: "center",
    shadowColor: colors.neutral700,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  infoText: {
    flex: 1,
    marginLeft: 15,
    color: colors.neutral600,
    fontSize: 13,
    fontFamily: typography.poppinsRegular,
    lineHeight: 18,
  },
});

export default MemberCard;
