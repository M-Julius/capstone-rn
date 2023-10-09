import { useNavigation } from "@react-navigation/native";
import { assets_images } from "../assets";
import { AntDesign } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Header = ({ profile, showBack }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {showBack && (
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" color={"white"} size={25} />
        </Pressable>
      )}
      <Image
        style={styles.logo}
        source={assets_images.little_lemon_logo}
        accessible={true}
        accessibilityLabel={"Little Lemon Logo"}
      />
      {profile?.firstName && (
        <Pressable
          style={styles.avatar}
          onPress={() => navigation.navigate("Profile")}
        >
          {profile?.image ? (
            <Image
              source={{ uri: profile?.image }}
              style={styles.avatarImage}
            />
          ) : (
            <View style={styles.avatarEmpty}>
              <Text style={styles.avatarEmptyText}>
                {profile?.firstName && Array.from(profile?.firstName)[0]}
                {profile?.lastName && Array.from(profile?.lastName)[0]}
              </Text>
            </View>
          )}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  avatar: {
    flex: 1,
    position: "absolute",
    right: 10,
    top: 10,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarEmpty: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#495e57",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    flex: 1,
    position: "absolute",
    left: 10,
    top: 10,
    backgroundColor: "#495e57",
    width: 50,
    height: 50,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 25,
  },
});

export default Header;
