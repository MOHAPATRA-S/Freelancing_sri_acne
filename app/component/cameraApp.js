import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";
import React, { Component, useState, Fragment, useEffect, useRef } from "react";
import * as FaceDetector from "expo-face-detector";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  // Button,
  Image,
  TouchableOpacity,
} from "react-native";

import { Camera } from "expo-camera";

const { height, width } = Dimensions.get("window");

console.log("Width, Height =>", width, height);

import Terms from "./terms";

export default class CameraApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermissions: false,
      topScreen: 0,
      leftScreen: 0,
      widthScreen: 0,
      heightScreen: 0,
      step: -4,
      photoStraight: "",
      photoLeft: "",
      photoRight: "",
      rollAngle: 0,
      yawAngle: 0,
      facePosition: false,
      faceDirection: "Look Straight",
      termsHide: true,
    };

    this.camera = null;
  }

  async componentDidMount(props) {
    const { status } = await Camera.requestPermissionsAsync();

    if (status == "granted") {
      this.setState({
        hasPermissions: true,
      });
    }
  }

  snap = async () => {
    // console.log("Snapping a photo =>", this.camera);
    if (this.camera) {
      try {
        let photo = await this.camera.takePictureAsync();
        console.log("Photo Snapped => ", photo);

        if (this.state.step === 1) {
          console.log("Straight Photo");
          this.setState({
            photoStraight: photo.uri,
            step: this.state.step + 1,
            faceDirection: "Turn Left",
            facePosition: false,
          });
        } else if (this.state.step === 3) {
          console.log("photo Lefft Photo");
          this.setState({
            photoLeft: photo.uri,
            step: this.state.step + 1,
            faceDirection: "Turn Right",
            facePosition: false,
          });
        } else if (this.state.step === 5) {
          console.log("photo right Photo");
          this.setState({
            photoRight: photo.uri,
            step: this.state.step + 1,
          });
        }
      } catch (e) {
        console.log("Exception e =>", e);
      }
    }
  };

  handleFacesDetected = async (faceDetectedValue) => {
    ///swagatika code here///

    let faces = faceDetectedValue.faces[0];
    // console.log("faces =>", faces);
    let rollAngle = faces !== undefined ? faces.rollAngle : 0;
    let yawAngle = faces !== undefined ? faces.yawAngle : 0;
    let leftScreen = faces !== undefined ? faces.bounds.origin.x : 0;
    let topScreen = faces !== undefined ? faces.bounds.origin.y : 0;
    let widthScreen = faces !== undefined ? faces.bounds.size.width : 0;
    let heightScreen = faces !== undefined ? faces.bounds.size.height : 0;
    // console.log("check c==>", (Number(parseFloat(yawAngle).toFixed(0)) < 270), this.state.step, yawAngle, parseFloat(yawAngle).toFixed(0) < 100)
    // alert(yawAngle)
    this.setState({
      leftScreen,
      topScreen,
      widthScreen,
      heightScreen,
      rollAngle,
      yawAngle,
    });

    let heightMax = 410;
    let widthMax = 410;
    let heightMin = 360;
    let widthMin = 360;
    if (this.state.step === 0) {
      console.log('trucase check==>>0000 ', (Number(parseFloat(yawAngle).toFixed(0)) > 355 && Number(parseFloat(yawAngle).toFixed(0)) <= 360));
      if (
        // widthScreen < widthMax &&
        // heightScreen < heightMax &&
        // widthScreen >  &&
        // heightScreen > 250&&
        // this.state.step === 0
        (Number(parseFloat(yawAngle).toFixed(0)) >= 0 && Number(parseFloat(yawAngle).toFixed(0)) <= 4) ||
        (Number(parseFloat(yawAngle).toFixed(0)) > 355 && Number(parseFloat(yawAngle).toFixed(0)) <= 360)
      ) {
        this.setState({
          step: this.state.step + 1,
          leftScreen,
          topScreen,
          widthScreen,
          heightScreen,
          rollAngle,
          yawAngle,
          facePosition: true,
          faceDirection: "Look Straight",
        });
      }
      else {
        this.setState({
          leftScreen,
          topScreen,
          widthScreen,
          heightScreen,
          rollAngle,
          yawAngle,
          // step: this.state.step -1,
          facePosition: false,
        });
      }
    }


    if (this.state.step === 2) {
      // alert(yawAngle)
      console.log("check case 2222222==>", (Number(parseFloat(yawAngle).toFixed(0)) < 345 && Number(parseFloat(yawAngle).toFixed(0)) >= 300))

      if (
        (Number(parseFloat(yawAngle).toFixed(0)) > -45 && Number(parseFloat(yawAngle).toFixed(0)) <= -30)
        || (Number(parseFloat(yawAngle).toFixed(0)) < 345 && Number(parseFloat(yawAngle).toFixed(0)) >= 300)
      ) {
        this.setState({
          step: this.state.step + 1,
          leftScreen,
          topScreen,
          widthScreen,
          heightScreen,
          rollAngle,
          yawAngle,
          facePosition: true,
          faceDirection: "Turn Left",
        });

      } else {
        this.setState({
          leftScreen,
          topScreen,
          widthScreen,
          heightScreen,
          rollAngle,
          yawAngle,
          facePosition: false,
        });
      }

    }

    if (this.state.step === 4) {
      console.log("check case==>44444444", (Number(parseFloat(yawAngle).toFixed(0)) < 100 && Number(parseFloat(yawAngle).toFixed(0)) >= 45))

      if (
        (Number(parseFloat(yawAngle).toFixed(0)) < 45 && Number(parseFloat(yawAngle).toFixed(0)) >= 30)
        ||
        (Number(parseFloat(yawAngle).toFixed(0)) < 100 && Number(parseFloat(yawAngle).toFixed(0)) >= 45)
      ) {
        this.setState({
          step: this.state.step + 1,
          leftScreen,
          topScreen,
          widthScreen,
          heightScreen,
          rollAngle,
          yawAngle,
          facePosition: true,
          faceDirection: "Turn Right",
        });
      }
      else {
        this.setState({
          leftScreen,
          topScreen,
          widthScreen,
          heightScreen,
          rollAngle,
          yawAngle,
          facePosition: false,
        });
      }

    }

    if (this.state.step === 6) {
      // console.log("Navigation => ", this.props);
      // this.props.navigation.navigate("Results");

      this.props.navigation.navigate("UploadS3", {
        navigation: this.props.navigation,
        photoStraight: this.state.photoStraight,
        photoLeft: this.state.photoLeft,
        photoRight: this.state.photoRight,
        navigation: this.props.navigation,
      });

      // this.props.navigation.navigate(
      //   "Terms",
      //   {
      //     navigation: this.props.navigation,
      //     photoStraight: this.state.photoStraight,
      //     photoLeft: this.state.photoLeft,
      //     photoRight: this.state.photoRight,
      //   }
      // )
    }


    ///extra code

    // if (this.state.step === 1) {
    //   if (
    //     // widthScreen < widthMax &&
    //     // heightScreen < heightMax &&
    //     // widthScreen > 360 &&
    //     // heightScreen > 360 &&
    //     // this.state.step === 1
    //     widthScreen < widthMax &&
    //     heightScreen < heightMax &&
    //     widthScreen > 200 &&
    //     heightScreen > 200 &&
    //     this.state.step === 1
    //   ) {
    //     // console.log("Snapping Straigh Photo");
    //     // await this.snap();
    //     this.setState({
    //       step: this.state.step + 1,
    //       leftScreen,
    //       topScreen,
    //       widthScreen,
    //       heightScreen,
    //       rollAngle,
    //       yawAngle,
    //       facePosition: true,
    //       // faceDirection: "Turn Left",
    //     });
    //   } else {
    //     this.setState({
    //       leftScreen,
    //       topScreen,
    //       widthScreen,
    //       heightScreen,
    //       rollAngle,
    //       yawAngle,
    //       facePosition: false,
    //     });
    //   }
    // }

    // if (this.state.step === 2) {
    //   console.log("rollAngle =>", this.state.step);
    //   // this.setState({
    //   //   leftScreen,
    //   //   topScreen,
    //   //   widthScreen,
    //   //   heightScreen,
    //   //   rollAngle,
    //   //   yawAngle,
    //   // });

    //   // console.log('face dection at 2', rollAngle, parseFloat(yawAngle).toFixed(0))

    //   if (
    //     // widthScreen < widthMax &&zxc
    //     // heightScreen < heightMax &&
    //     // widthScreen > 300 &&
    //     // heightScreen > 300 &&
    //     parseFloat(yawAngle).toFixed(0) < -7.0
    //   ) {
    //     // console.log("snapping beffore ");
    //     // await this.snap();
    //     this.setState({
    //       step: this.state.step + 1,
    //       leftScreen,
    //       topScreen,
    //       widthScreen,
    //       heightScreen,
    //       rollAngle,
    //       yawAngle,
    //       facePosition: true,
    //       faceDirection: "Turn Left",
    //     });
    //   } else {
    //   }
    // }

    // if (this.state.step === 3) {
    //   console.log(
    //     "face dection at 3",
    //     yawAngle,
    //     parseFloat(yawAngle).toFixed(0),
    //   );
    //   if (
    //     // widthScreen < widthMax &&
    //     // heightScreen < heightMax &&
    //     // widthScreen > 300 &&
    //     // heightScreen > 300 &&
    //     parseFloat(yawAngle).toFixed(0) < -7.0
    //   ) {
    //     // console.log("snapping beffore ");
    //     // await this.snap();
    //     this.setState({
    //       // step: this.state.step + 1,
    //       leftScreen,
    //       topScreen,
    //       widthScreen,
    //       heightScreen,
    //       rollAngle,
    //       yawAngle,
    //       facePosition: true,
    //     });
    //   } else {
    //     this.setState({
    //       leftScreen,
    //       topScreen,
    //       widthScreen,
    //       heightScreen,
    //       rollAngle,
    //       yawAngle,
    //       facePosition: false,
    //     });
    //   }
    // }

    // if (this.state.step === 4) {
    //   // console.log("rollAngle =>", rollAngle);
    //   // this.setState({
    //   //   leftScreen,
    //   //   topScreen,
    //   //   widthScreen,
    //   //   heightScreen,
    //   //   rollAngle,
    //   //   yawAngle,
    //   // });

    //   if (
    //     widthScreen < widthMax &&
    //     heightScreen < heightMax &&
    //     // widthScreen > 300 &&
    //     // heightScreen > 300 &&
    //     parseFloat(yawAngle).toFixed(0) > 7.0
    //   ) {
    //     this.setState({
    //       step: this.state.step + 1,
    //       leftScreen,
    //       topScreen,
    //       widthScreen,
    //       heightScreen,
    //       rollAngle,
    //       yawAngle,
    //       facePosition: true,
    //       faceDirection: "Turn Right",
    //     });
    //   }
    // }

    // if (this.state.step === 5) {
    //   if (
    //     widthScreen < widthMax &&
    //     heightScreen < heightMax &&
    //     parseFloat(yawAngle).toFixed(0) > 7.0
    //   ) {
    //     this.setState({
    //       // step: this.state.step + 1,
    //       leftScreen,
    //       topScreen,
    //       widthScreen,
    //       heightScreen,
    //       rollAngle,
    //       yawAngle,
    //       facePosition: true,
    //     });
    //   } else {
    //     this.setState({
    //       // step: this.state.step + 1,
    //       leftScreen,
    //       topScreen,
    //       widthScreen,
    //       heightScreen,
    //       rollAngle,
    //       yawAngle,
    //       facePosition: false,
    //     });
    //   }
    // }
  };

  render() {
    // console.log(
    //   "WidthScreen and HeightScreen =>",
    //   this.state.widthScreen,
    //   this.state.heightScreen,
    // );

    if (this.state.step === -1) {
      if (this.state.termsHide) {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() => {
                console.log("State => ", this.state.termsHide);
                this.setState({
                  termsHide: false,
                });
              }}
            >
              <Text>Click here to see terms & conditions.</Text>
            </TouchableOpacity>
            <Terms hide={this.state.termsHide}></Terms>

            <TouchableOpacity
              style={{
                width: 130,
                height: 50,
                backgroundColor: "goldenrod",
                // marginBottom: 20,
                // marginLeft: width / 3,
                // flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              // disabled={!this.state.isSelected}
              onPress={() => {
                console.log("Testing");
                this.setState({
                  step: this.state.step + 1,
                });
              }}
            >
              <Text style={{ flex: 1, margin: 15 }}>Accept</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View style={{ flex: 1 }}>
            <Terms hide={this.state.termsHide}></Terms>

            <TouchableOpacity
              style={{
                width: 130,
                height: 50,
                backgroundColor: "goldenrod",
                marginBottom: 20,
                marginLeft: width / 3,
                // flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              // disabled={!this.state.isSelected}
              onPress={() => {
                console.log("Testing");
                this.setState({
                  step: this.state.step + 1,
                });
              }}
            >
              <Text style={{ flex: 1, margin: 15 }}>Accept</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }

    if (this.state.step === -2) {
      return (
        <View style={{ flex: 1, zIndex: 1 }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              zIndex: 2,
              marginBottom: 30,
            }}
            source={require("../images/thirdScreen.jpg")}
          ></Image>
          {height > 1200 ? (
            <TouchableOpacity
              style={{
                position: "absolute",
                width: width / 5,
                height: height / 12,
                borderColor: "black",
                backgroundColor: "burlywood",
                // borderWidth: 5,
                bottom: height / 28,
                left: width / 1.5,
                zIndex: 3,
              }}
              onPress={() => {
                console.log("Testing");
                this.setState({
                  step: this.state.step + 1,
                });
              }}
            >
              <Text style={{ fontSize: 24, textAlign: "center", margin: 40 }}>
                NEXT
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                position: "absolute",
                width: 220,
                height: 50,
                borderColor: "transparent",
                backgroundColor: "transparent",
                // borderWidth: 5,
                bottom: height / 28,
                left: width / 4.4,
                zIndex: 3,
              }}
              onPress={() => {
                console.log("Testing");
                this.setState({
                  step: this.state.step + 1,
                });
              }}
            ></TouchableOpacity>
          )}
          {/* <TouchableOpacity
            style={{
              position: "absolute",
              width: 220,
              height: 50,
              // borderColor: "trar",
              backgroundColor: "transparent",
              // borderWidth: 5,
              bottom: height / 28,
              left: width / 4.4,
              zIndex: 3,
            }}
            onPress={() => {
              console.log("Testing");
              this.setState({
                step: this.state.step + 1,
              });
            }}
          ></TouchableOpacity> */}
        </View>
      );
    }

    if (this.state.step === -3) {
      return (
        <View style={{ flex: 1, zIndex: 1 }}>
          <Image
            style={{
              width: "100%",
              height: "90%",
              zIndex: 2,
              margin: 30,
            }}
            source={require("../images/secondScreen.jpg")}
          ></Image>
          {height > 1200 ? (
            <TouchableOpacity
              style={{
                position: "absolute",
                width: width / 5,
                height: height / 12,
                borderColor: "black",
                backgroundColor: "burlywood",
                // borderWidth: 5,
                bottom: height / 28,
                left: width / 2.5,
                zIndex: 3,
              }}
              onPress={() => {
                console.log("Testing 2");
                this.setState({
                  step: this.state.step + 1,
                });
              }}
            >
              <Text style={{ fontSize: 24, textAlign: "center", margin: 40 }}>
                NEXT
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                position: "absolute",
                width: 220,
                height: 50,
                borderColor: "transparent",
                backgroundColor: "transparent",
                // borderWidth: 5,
                bottom: height / 28,
                left: width / 4.4,
                zIndex: 3,
              }}
              onPress={() => {
                console.log("Testing");
                this.setState({
                  step: this.state.step + 1,
                });
              }}
            ></TouchableOpacity>
          )}
          {/* <TouchableOpacity
            style={{
              position: "absolute",
              width: 220,
              height: 50,
              // borderColor: "black",
              backgroundColor: "transparent",
              // borderWidth: 5,
              bottom: height / 28,
              left: width / 4.4,
              zIndex: 3,
            }}
            onPress={() => {
              console.log("Testing");
              this.setState({
                step: this.state.step + 1,
              });
            }}
          ></TouchableOpacity> */}
        </View>
      );
    }

    if (this.state.step === -4) {
      return (
        <View style={{ flex: 1, zIndex: 1 }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              zIndex: 2,
            }}
            source={require("../images/firstScreen.jpg")}
          ></Image>

          {height > 1200 ? (
            <TouchableOpacity
              style={{
                position: "absolute",
                width: width / 5,
                height: height / 12,
                borderColor: "black",
                backgroundColor: "burlywood",
                // borderWidth: 5,
                bottom: height / 28,
                left: width / 2.5,
                zIndex: 3,
              }}
              onPress={() => {
                console.log("Testing");
                this.setState({
                  step: this.state.step + 1,
                });
              }}
            >
              <Text style={{ fontSize: 24, textAlign: "center", margin: 40 }}>
                NEXT
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                position: "absolute",
                width: 220,
                height: 50,
                borderColor: "transparent",
                backgroundColor: "transparent",
                // borderWidth: 5,
                bottom: height / 28,
                left: width / 4.4,
                zIndex: 3,
              }}
              onPress={() => {
                console.log("Testing");
                this.setState({
                  step: this.state.step + 1,
                });
              }}
            ></TouchableOpacity>
          )}
        </View>
      );
    }

    // if (this.state.step === -1) {

    //   return (
    //     <View style={
    //       {
    //         flex: 1,
    //         alignItems: "center"
    //       }
    //     }>
    //       <View style={{
    //         height: height / 1.5,
    //         width
    //       }}>
    //         <Image style={{
    //           width: "100%",
    //           height: height / 1.5
    //         }}
    //           source={
    //             require("../images/frontScreen.png")
    //           }></Image>

    //         <TouchableOpacity style={
    //           {
    //             width: 150,
    //             height: 50,
    //             backgroundColor: "blue",
    //             marginTop: 100,
    //             borderRadius: 10,
    //           }
    //         }
    //           onPress={
    //             () => {
    //               console.log('Step =>', here)
    //               this.setState({
    //                 step: this.state.step + 1
    //               })
    //             }

    //           }>
    //           <Text style={
    //             {
    //               color: "white",
    //               alignItems: "center",
    //               marginLeft: 24,
    //               marginTop: 18,
    //             }
    //           }>
    //             Get Started </Text></TouchableOpacity>
    //       </View>
    //     </View>
    //   );
    // }

    let heighDivision = 9;
    let widthDivision = 7;
    let heighDivisionSecond = 12;
    let widthDivisionSecond = 6;

    // console.log("Latest Step =>", this.state.step);
    // console.log("State Height", this.state.heightScreen, height / 3); // +40
    // console.log("State Width", this.state.widthScreen, width / 9);

    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.front}
          onFacesDetected={this.handleFacesDetected}
          flashMode="on"
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.accurate,
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.none,
            minDetectionInterval: 1000,
            tracking: true,
          }}
          ref={(ref) => {
            this.camera = ref;
          }}
        ></Camera>

        <View
          style={{
            position: "absolute",
            left: width / 4,
            top: height / 2,
            zIndex: 5,
          }}
        >
          {console.log("this.state==>", this.state.step, this.state.facePosition)}
          {/* {(this.state.step === 1 ||
            this.state.step === 3 ||
            this.state.step === 5) &&
            this.state.facePosition ? ( */}
          {this.state.facePosition === true && (this.state.step === 1 || this.state.step === 3 || this.state.step === 5) ?
            (
              <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
                Take Photo Now.
              </Text>)

            : (
              <View></View>
            )}
        </View>

        <View
          style={{
            backgroundColor: "white",
            zIndex: 2,
            flex: 0.1,
          }}
        >
          {this.state.facePosition === true && (this.state.step === 1 || this.state.step === 3 || this.state.step === 5) ? (
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={this.snap}
            >
              <Image
                style={{
                  height: 50,
                  width: 50,
                }}
                source={{
                  uri:
                    "https://cdn.iconscout.com/icon/premium/png-256-thumb/camera-2477673-2061935.png",
                }}
              ></Image>
            </TouchableOpacity>
          )

            : (
              <></>
            )}
        </View>

        {/* <View style={
          {
            top: 100,
            left: 100,
            zIndex: 4,
            backgroundColor: "brown",
            fontSize: 20,
          }
        }>
          <Text style={
            {
              position: "absolute",
            }
          } > {
              "Take Photos When Green."
            } </Text>
        </View> */}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            top: height / heighDivision,
            left: width / widthDivision,
            position: "absolute",
            width: 300,
            height: 20,

            zIndex: 2,
          }}
        >
          <View
            style={{
              width: 100,
              height: 20,

              flex: 1,
              flexDirection: "column",
              zIndex: 2,
              margin: 10,
              backgroundColor: this.state.facePosition ? "green" : "red",
            }}
          >
            <Text
              style={{
                zIndex: 2,
                color: "white",
              }}
            >
              Face Position{" "}
            </Text>
          </View>

          <View
            style={{
              width: 100,
              height: 20,

              flex: 1,
              flexDirection: "column",
              zIndex: 2,

              margin: 10,
              backgroundColor: this.state.facePosition ? "black" : "black",
            }}
          >
            <Text
              style={{
                zIndex: 2,
                color: "white",
              }}
            >
              {" "}
              {this.state.faceDirection}{" "}
            </Text>
          </View>
        </View>

        <View
          style={{
            //To make Oval Shape
            alignSelf: "center",
            zIndex: 2,
            top: height / 2.5,
            // left: 50,
            width: 300,
            height: 200,
            backgroundColor: "transparent",
            borderColor: "black",
            borderWidth: 5,
            borderRadius: 300 / 2,
            position: "absolute",
            transform: [
              {
                scaleY: 2.5,
              },
            ],
          }}
        ></View>

        {/* 


        <View style={
          {
            flex: 1,
            flexDirection: "row",
            top: height / heighDivision,
            left: width / widthDivision,
            position: "absolute",
            width: 300,
            height: 20,

            zIndex: 2,
          }
        }>
          
          <View style={
            {
              width: 100,
              height: 20,

              flex: 1,
              flexDirection: "column",
              zIndex: 2,

              margin: 10,
              backgroundColor: this.state.facePosition ? "black" : "black",
            }
          }>
            <Text style={
              {

                zIndex: 2,
                color: "white",

              }
            }> {
                this.state.faceDirection
              } </Text></View>
        </View>

        <View style={
          {
            //To make Oval Shape
            zIndex: 2,
            top: height / 2.5,
            left: width / 9,
            width: 300,
            height: 230,
            backgroundColor: "transparent",
            borderColor: "black",
            borderWidth: 5,
            borderRadius: 100,
            position: "absolute",
            transform: [{
              scaleY: 2.5
            }],
          }
        }>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    zIndex: 1,
  },
  camera: {
    flex: 1,
    backgroundColor: "transparent",
    zIndex: 2,
    // position: "absolute",
    // left: 0,
    // top: 0,
    // width,
    // height,
  },
  // camera: {
  //   // flex: 1,
  //   backgroundColor: "transparent",
  //   zIndex: 2,
  //   position: "absolute",
  //   left: 0,
  //   top: 0,
  //   width,
  //   height,
  // },
  OvalShapeView: {
    //To make Oval Shape
    zIndex: 13,
    marginTop: 20,
    top: 250,
    left: width / 4.5,
    width: 230,
    height: 200,
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 100,
    transform: [
      {
        scaleY: 2.5,
      },
    ],
  },

  OvalShapeView2: {
    //To make Oval Shape
    zIndex: 12,
    backgroundColor: "white",
    top: 0,
    left: 0,
    width,
    height,
    // marginTop: 10,
    // top: 250,
    // left: width / 4.5,
    // width: 230,
    // height: 200,
    // backgroundColor: "transparent",
    // borderColor: "red",
    // borderWidth: 5,
    // borderRadius: 100,
    transform: [
      {
        scaleY: 2.5,
      },
    ],
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
