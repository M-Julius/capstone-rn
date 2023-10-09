import React, {
  useState,
  useRef,
  useContext,
  useMemo,
} from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import PagerView from "react-native-pager-view";
import { validateEmail, validateName } from "../utils";
import Constants from "expo-constants";

import { AuthContext } from "../contexts/AuthContext";
import Header from "../components/Header";
import Button from "../components/Button";

const Onboarding = () => {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [pageSelected, setPages] = useState("0");

  const isEmailValid = useMemo(() => validateEmail(email), [email]);
  const isFirstNameValid = useMemo(() => validateName(firstName), [firstName]);
  const isLastNameValid = useMemo(() => validateName(lastName), [lastName]);
  const viewPagerRef = useRef(PagerView);

  const { onboard } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header />
      <Text style={styles.welcomeText}>Let us get to know you</Text>
      <PagerView
        style={styles.viewPager}
        scrollEnabled={false}
        initialPage={0}
        ref={viewPagerRef}
      >
        <View style={styles.page} key="1">
          <View style={styles.pageContainer}>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              style={styles.inputBox}
              value={firstName}
              onChangeText={onChangeFirstName}
              placeholder={"First Name"}
            />
          </View>
        </View>
        <View style={styles.page} key="2">
          <View style={styles.pageContainer}>
            <Text style={styles.text}>Last Name</Text>
            <TextInput
              style={styles.inputBox}
              value={lastName}
              onChangeText={onChangeLastName}
              placeholder={"Last Name"}
            />
          </View>
        </View>
        <View style={styles.page} key="3">
          <View style={styles.pageContainer}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.inputBox}
              value={email}
              onChangeText={onChangeEmail}
              placeholder={"Email"}
              keyboardType="email-address"
            />
          </View>
        </View>
      </PagerView>
      <View>
        <View style={styles.pageIndicator}>
          <View
            style={[
              styles.pageDot,
              pageSelected === "0" ? styles.pageDotActive : {},
            ]}
          ></View>
          <View
            style={[
              styles.pageDot,
              pageSelected === "1" ? styles.pageDotActive : {},
            ]}
          ></View>
          <View
            style={[
              styles.pageDot,
              pageSelected === "2" ? styles.pageDotActive : {},
            ]}
          ></View>
        </View>

        {pageSelected === "1" ? (
          <View style={styles.buttons}>
            <Button
              title={"Back"}
              disabled={false}
              halfBtn={true}
              onPress={() => {
                setPages("0");
                viewPagerRef.current.setPage(0);
              }}
            />
            <Button
              title={"Next"}
              disabled={!isLastNameValid}
              halfBtn={true}
              onPress={() => {
                setPages("2");
                viewPagerRef.current.setPage(2);
              }}
            />
          </View>
        ) : pageSelected === "2" ? (
          <View style={styles.buttons}>
            <Button
              title={"Back"}
              disabled={false}
              halfBtn={true}
              onPress={() => {
                setPages("1");
                viewPagerRef.current.setPage(1);
              }}
            />
            <Button
              title={"Submit"}
              disabled={!isEmailValid}
              halfBtn={true}
              onPress={() => {
                onboard({ firstName, lastName, email });
              }}
            />
          </View>
        ) : (
          <Button
            title={"Next"}
            disabled={!isFirstNameValid}
            onPress={() => {
              setPages("1");
              viewPagerRef.current.setPage(1);
            }}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#dee3e9",
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
  },
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 40,
    paddingVertical: 60,
    fontFamily: "MarkaziText-Medium",
    color: "#495E57",
    textAlign: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "Karla-ExtraBold",
    color: "#495E57",
  },
  inputBox: {
    borderColor: "#EDEFEE",
    backgroundColor: "#EDEFEE",
    alignSelf: "stretch",
    height: 50,
    margin: 18,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    borderRadius: 9,
    fontFamily: "Karla-Medium",
  },
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
  pageIndicator: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  pageDot: {
    backgroundColor: "grey",
    width: 22,
    height: 22,
    marginHorizontal: 10,
    borderRadius: 11,
  },
  pageDotActive: {
    backgroundColor: "#f4ce14",
    width: 22,
    height: 22,
    borderRadius: 11,
  },
});

export default Onboarding;
