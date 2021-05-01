import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";
import React, { Component, useState, Fragment, useEffect, useRef } from "react";

import { RNS3 } from "react-native-aws3";

import config from "../config";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Results from "./results";

import RadioButtonRN from 'radio-buttons-react-native';

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
  ActivityIndicator,
} from "react-native";

export default class UploadS3 extends Component {
  constructor(props) {
    super(props);

    // arn:aws:s3:::skin-face-images
    this.state = {
      options: {
        bucket: "skin-face-images",
        region: "us-west-1",
        accessKey: "AKIARSXLZHKGTXK3XFH3",
        secretKey: "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",
        successActionStatus: 201,
      },
      currentState: -6,
      enterEmail: "",
      enterPhone: "",
      dataUploaded: false,
      maleOrFemale: '',
      acneTime: "",
      acneLevel: "",
      otherAcne: "",
      age: '',
      ageError: '',
      sportsWear: ""
    };

    // console.log("props =>", this.props);
  }

  async componentDidMount() {
    if (this.state.currentState === 0) {
      console.log("inside upload 1=>");
      let allProps = this.props;
      let faceImages = {
        name: "Face_Straight" + "_poster_" + Math.floor(Date.now() / 1000),
        type: `image/png`,
        uri: allProps.route.params.photoStraight,
      };

      let faceImageUpload1 = await RNS3.put(faceImages, this.state.options);
      console.log("FaceImage Upload 1", faceImageUpload1);
      faceImageUpload1 = faceImageUpload1.body.postResponse.location;

      faceImages = {
        name: "Face_Left" + "_poster_" + Math.floor(Date.now() / 1000),
        type: `image/png`,
        uri: allProps.route.params.photoLeft,
      };

      let faceImageUpload2 = await RNS3.put(faceImages, this.state.options);
      console.log("FaceImage Upload 2", faceImageUpload2);
      faceImageUpload2 = faceImageUpload2.body.postResponse.location;

      faceImages = {
        name: "Face_Right" + "_poster_" + Math.floor(Date.now() / 1000),
        type: `image/png`,
        uri: allProps.route.params.photoRight,
      };

      let faceImageUpload3 = await RNS3.put(faceImages, this.state.options);
      console.log("FaceImage Upload 3", faceImageUpload3);
      faceImageUpload3 = faceImageUpload3.body.postResponse.location;

      // Now have an api to upload the data to database

      this.setState({
        currentState: this.state.currentState + 1,
      });

      let axiosResponse = await axios.post(config.apiGateway + "/adddata", {
        message: {
          id: uuidv4(),
          dateTime: new Date().getTime(),
          lookStraight: faceImageUpload1,
          lookLeft: faceImageUpload2,
          lookRight: faceImageUpload3,
          email: this.state.enterEmail,
          phone: this.state.enterPhone,
          maleOrFemale: this.state.maleOrFemale,
          acneTime: this.state.acneTime,
          age: this.state.age,
          acneLevel: this.state.acneLevel,
          otherAcne: this.state.otherAcne,
          sportsWear: this.state.sportsWear
        },
      });

      console.log("Axios Response =>", axiosResponse);

      this.setState({
        dataUploaded: true,
      });

      //   this.props.route.params.navigation.navigate("Results");
    }
  }

  onEmailChange = async (email) => {
    this.setState({
      enterEmail: email,
    });
  };

  onPhoneChange = async (phone) => {
    this.setState({
      enterPhone: phone,
    });
  };

  validateHandle = (text, type) => {
    console.log("text,type===>", text, type)
    if (type === 'age') {
      if (text == '') {
        this.setState({ age: '', })
      } else {
        this.setState({ age: text, })
      }

    }
    if (type === 'sex') {
      if (text.label) {
        this.setState({ maleOrFemale: text.label, })
      } else {
        this.setState({ maleOrFemale: '' })
      }

    }
    if (type === 'sufferedTime') {
      if (text.label) {
        this.setState({ acneTime: text.label, })
      } else {
        this.setState({ acneTime: '', })

      }

    }
    if (type === 'sufferingFrom') {
      if (text.label) {
        this.setState({ acneLevel: text.label, })
      } else {
        this.setState({ acneLevel: '', })
      }

    }
    if (type === 'skinConcerns') {
      if (text.label) {
        this.setState({ otherAcne: text.label, })
      } else {
        this.setState({ otherAcne: '', })
        // alert('Please select your answer to proceed next.')
      }

    }

    if (type === 'accessories') {
      if (text.label) {
        this.setState({ sportsWear: text.label, })
      } else {
        this.setState({ sportsWear: '', })

      }

    }
    if (type === 'phonenumber') {
      if (text == '') {
        this.setState({ enterPhone: '', })
      } else {
        this.setState({ enterPhone: text, })
      }

    }

    if (type === 'email') {
      if (text == '') {
        this.setState({ enterEmail: '', })
      } else {
        this.setState({ enterEmail: text, })
      }

    }
  }



  render() {
    // console.log("Email => ", this.state.enterPhone);
    // console.log("Phone => ", this.state.enterEmail);
    // console.log("this.state.currentState =>", this.state.currentState);

    if (this.state.dataUploaded) {
      return (
        // <View
        //   style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        // >
        //   <TouchableOpacity
        //     style={{
        //       width: 150,
        //       height: 100,
        //       backgroundColor: "black",
        //       marginTop: 100,
        //       flex: 0.2,
        //       justifyContent: "center",
        //       alignItems: "center",
        //       borderRadius: 10,
        //     }}
        //     onPress={() => {
        //       this.props.route.params.navigation.navigate("Results");
        //     }}
        //   >
        //     <Text style={{ fontSize: 20, color: "white" }}>Results</Text>
        //   </TouchableOpacity>
        // </View>
        <Results navigation={this.props.route.params.navigation}></Results>
      );
    }


    if (this.state.currentState === -6) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

          <Text style={{ fontSize: 15, marginBottom: 30, }}>
            Whats your age?
          </Text>
          <TextInput style={{
            width: 70,
            height: 40,
            backgroundColor: "white",
            borderBottomWidth: 1,
            borderBottomColor: "black"

          }}
            value={this.state.age}
            placeholder="0"
            keyboardType="number-pad"
            onChangeText={(text) => this.validateHandle(text, 'age')}
          >
          </TextInput>
          {/* <Text>
            {this.state.ageError}
          </Text> */}
          <TouchableOpacity style={{
            backgroundColor: "black",
            width: 100,
            height: 70,
            borderRadius: 5,
            marginTop: 50,
          }}
            onPress={() => {
              if (this.state.age) {
                this.setState({
                  currentState: this.state.currentState + 1
                })
              }
              else {
                alert('Please enter your age to proceed next')
              }
            }}
          >

            <Text style={{ color: "white", textAlign: "center", paddingTop: 25 }}>
              Next
            </Text>

          </TouchableOpacity>
        </View>)
    }



    if (this.state.currentState === -5) {
      const data = [
        {
          label: 'Male'
        },
        {
          label: 'Female'
        }
      ];


      const dataAcne = [
        {
          label: 'Less than 3 months'
        },
        {
          label: '3-12 months'
        },
        {
          label: 'Over a year'
        }
      ];

      const acneLevel = [
        {
          label: 'mild'
        },
        {
          label: 'moderate'
        },
        {
          label: 'severe',
        },
        {
          label: 'none',
        }
      ];


      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 15 }}>
            What is your sex?
          </Text>
          <RadioButtonRN
            animationTypes={['pulse', 'zoomIn']}
            data={data}
            selectedBtn={(e) => {
              console.log(e); this.validateHandle(e, 'sex')
              // this.setState({
              //   maleOrFemale: e
              // })
            }}

          />



          <Text style={{ fontSize: 15, marginTop: 10 }}>
            How long have you suffered from acne?
          </Text>

          <RadioButtonRN
            data={dataAcne}
            animationTypes={['pulse', 'zoomIn']}
            selectedBtn={(e) => {
              this.validateHandle(e, 'sufferedTime')
              //    console.log(e);
              //    // this.setState({
              //    //   acneTimemf
              //    //     : e
              //    // })
            }}
          />

          <TouchableOpacity style={{
            backgroundColor: "black",
            width: 100,
            height: 70,
            borderRadius: 5,
            marginLeft: 100,
            marginTop: 50,

          }}
            onPress={() => {
              if (this.state.maleOrFemale && this.state.acneTime) {
                this.setState({
                  currentState: this.state.currentState + 1
                })
              }
              else {
                alert('Please select your answer to proceed next.')
              }

            }}
          >


            <Text style={{ color: "white", textAlign: "center", paddingTop: 25 }}>
              Next
            </Text>

          </TouchableOpacity>
        </View >


      )
    }


    if (this.state.currentState === -4) {
      const acneLevel = [
        {
          label: 'mild'
        },
        {
          label: 'moderate'
        },
        {
          label: 'severe',
        },
        {
          label: 'none',
        }
      ];

      const otherAcne = [
        {
          label: 'Rosacea'
        },
        {
          label: 'Seborrhea'
        },
        {
          label: 'Fungal acne',
        },
        {
          label: 'none',
        }
      ];
console.log('')
      return (
        <View>

          <Text style={{ fontSize: 15, marginTop: 100 }}>
            What do you think you are suffering from, mild, moderate, or severe acne?
          </Text>
          <RadioButtonRN
            animationTypes={['pulse', 'zoomIn']}
            data={acneLevel}
            selectedBtn={(e) => {
              console.log(e); this.validateHandle(e, 'sufferingFrom')
              // this.setState({
              //   acneLevel
              //     : e
              // })
            }}
          />

          <Text style={{ fontSize: 15, }}>
            Do you have other skin concerns in addition to acne: such as rosacea, seborrhea, fungal acne?
          </Text>
          <RadioButtonRN
            animationTypes={['pulse', 'rotate']}
            data={otherAcne}
            selectedBtn={(e) => {
              console.log(e); this.validateHandle(e, 'skinConcerns')
              // this.setState({
              //   otherAcne
              //     : e
              // })
            }}
          />

          <TouchableOpacity style={{
            backgroundColor: "black",
            width: 100,
            height: 70,
            borderRadius: 5,
            marginLeft: 120,
            marginTop: 20,

          }}
            onPress={() => {
              if (this.state.acneLevel && this.state.otherAcne) {
                this.setState({
                  currentState: this.state.currentState + 1
                })
              }
              else {
                alert('Please select your answer to proceed next.')
              }

            }}
          >
            <Text style={{ color: "white", textAlign: "center", paddingTop: 25 }}>
              Next
            </Text>

          </TouchableOpacity>

        </View>)
    }


    if (this.state.currentState === -3) {
      const sportsWear = [
        {
          label: 'Yes'
        },
        {
          label: 'No'
        },
      ];

      return (
        <View>

          <Text style={{ fontSize: 15, marginTop: 100 }}>
            Do you frequently wear accessories on your face/head like masks, sportswear, etc.?
          </Text>
          <RadioButtonRN
            animationTypes={['pulse', 'zoomIn']}
            data={sportsWear}
            selectedBtn={(e) => {
              console.log(e); this.validateHandle(e, 'accessories')
              // this.setState({
              //   sportsWear
              //     : e
              // })
            }}
          />


          <TouchableOpacity style={{
            backgroundColor: "black",
            width: 100,
            height: 70,
            borderRadius: 5,
            marginLeft: 100,
            marginTop: 50,

          }}
            onPress={() => {
              if (this.state.sportsWear) {
                this.setState({
                  currentState: this.state.currentState + 1
                })
              }
              else {
                alert('Please select your answer to proceed next.')
              }

            }}
          >
            <Text style={{ color: "white", textAlign: "center", paddingTop: 25 }}>
              Next
            </Text>

          </TouchableOpacity>

        </View>)
    }


    if (this.state.currentState === -2) {
      console.log("caseee checkk===>>>> --222")
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >

          <Text style={{ color: "black", fontSize: 20, margin: 20 }}>
            Enter your phone:
          </Text>
          <TextInput
            style={{
              width: 200,
              height: 40,
              borderColor: "gray",
              borderWidth: 3,
              borderRadius: 10,
            }}
            onChangeText={(text) => this.validateHandle(text, 'phonenumber')}
            value={this.state.enterPhone}
            // autoCompleteType="tel"
            keyboardType="number-pad"
            placeholder="310-621-4107"
          />

          <TouchableOpacity
            style={{
              width: 150,
              height: 100,
              backgroundColor: "black",
              marginTop: 100,
              flex: 0.2,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => {
              if (this.state.enterPhone) {
                this.setState({
                  currentState: this.state.currentState + 1,
                });
              }
              else {
                alert('Please enter your phone number to proceed next')
              }

            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>NEXT</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (this.state.currentState === -1) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "black", fontSize: 20, margin: 20 }}>
            Enter your email:
          </Text>
          <TextInput
            style={{
              width: 200,
              height: 40,
              borderColor: "gray",
              borderWidth: 3,
              borderRadius: 10,
            }}
            onChangeText={(text) => this.validateHandle(text, 'email')}
            value={this.state.enterEmail}
            autoCompleteType="email"
            keyboardType="email-address"
            placeholder="xyz@gmail.com"
          />

          <TouchableOpacity
            style={{
              width: 150,
              height: 100,
              backgroundColor: "black",
              marginTop: 100,
              flex: 0.2,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => {
              if (this.state.enterEmail) {
                this.state.currentState = this.state.currentState + 1;
                this.componentDidMount();
              }
              else {
                alert('Please enter your email to proceed next')
              }

            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>NEXT</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {this.state.currentState === 0 ? (
          <Text style={{ color: "brown", fontSize: 30 }}>Uploading Images</Text>
        ) : (
          <Text style={{ color: "green", fontSize: 30 }}>Uploading Data</Text>
        )}

        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}
