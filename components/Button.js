import { Pressable, StyleSheet, Text } from "react-native";

const Button = ({onPress, disabled, title, halfBtn, styleBtn = {}, styleText = {}}) => {
  return (
    <Pressable
      style={[halfBtn ? styles.halfBtn : styles.btn, disabled ? styles.btnDisabled : {}, styleBtn ?? {}]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.btntext, styleText ?? {}]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#f4ce14",
        borderColor: "#f4ce14",
        borderRadius: 9,
        alignSelf: "stretch",
        marginHorizontal: 18,
        marginBottom: 60,
        padding: 10,
        borderWidth: 1,
      },
      btnDisabled: {
        backgroundColor: "#f1f4f7",
        borderColor: "#f1f4f7",
      },
      buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 18,
        marginBottom: 60,
      },
      halfBtn: {
        flex: 1,
        borderColor: "#f4ce14",
        backgroundColor: "#f4ce14",
        borderRadius: 9,
        alignSelf: "stretch",
        marginRight: 18,
        padding: 10,
        borderWidth: 1,
      },
      btntext: {
        fontSize: 22,
        color: "#333",
        fontFamily: "Karla-Bold",
        alignSelf: "center",
      },
})

export default Button;