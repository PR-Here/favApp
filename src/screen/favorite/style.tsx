import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  listItem: {
    width: "80%",
    padding: 10,
    backgroundColor: "white",
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "relative",
    overflow: "visible",
  },
  profileImage: {
    width: 65,
    height: 60,
    borderRadius: 100,
    marginLeft: -20,
    position: "absolute",
    borderWidth: 2,
    borderColor: "white",
    alignSelf: "center",
  },
  nameView: {
    marginLeft: 60,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  userName: {
    fontSize: 16,
    color: "black",
    textAlign: "left",
    fontWeight: "bold",
  },
  cityText: {
    color: "black",
    fontWeight: "400",
  },
  age: {
    color: "black",
    fontWeight: "400",
    marginTop: 5,
  },
  starImageBtn: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  starImage: {
    width: 25,
    height: 25,
  },
  view:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
  }
});
