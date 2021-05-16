import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";
import React, { Component, useState, Fragment, useEffect, useRef } from "react";

import { RNS3 } from "react-native-aws3";

import config from "../config";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Results from "./results";

import RadioButtonRN from 'radio-buttons-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
  ScrollView
} from "react-native";
const { width } = Dimensions.get('window')
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
      sportsWear: "",
      flareLevel: '',
      likeProduct: '',
      currentsolution: '',
      treatAcne: '',
      otherIssue: '',
      sunburn: '',
      review: [],
      agequestion: '',
      maleOrFemalequestion: '',
      acneTimequestion: '',
      flareLevelquestion: '',
      acneLevelquestion: '',
      likeProductquestion: '',
      currentsolutionqusetion: '',
      treatAcnequestion: '',
      otherAcnequestion: '',
      otherIssuequestion: '',
      sportsWearquestion: '',
      sunburnquestion: '',
      yesflare: ''

    };

  }

  async componentDidMount() {
    if (this.state.currentState === 0) {
      let allProps = this.props;
      let faceImages = {
        name: "Face_Straight" + "_poster_" + Math.floor(Date.now() / 1000),
        type: `image/png`,
        uri: allProps.route.params.photoStraight,
      };

      let faceImageUpload1 = await RNS3.put(faceImages, this.state.options);
      faceImageUpload1 = faceImageUpload1.body.postResponse.location;

      faceImages = {
        name: "Face_Left" + "_poster_" + Math.floor(Date.now() / 1000),
        type: `image/png`,
        uri: allProps.route.params.photoLeft,
      };

      let faceImageUpload2 = await RNS3.put(faceImages, this.state.options);
      faceImageUpload2 = faceImageUpload2.body.postResponse.location;

      faceImages = {
        name: "Face_Right" + "_poster_" + Math.floor(Date.now() / 1000),
        type: `image/png`,
        uri: allProps.route.params.photoRight,
      };

      let faceImageUpload3 = await RNS3.put(faceImages, this.state.options);
      faceImageUpload3 = faceImageUpload3.body.postResponse.location;

      // Now have an api to upload the data to database

      this.setState({
        currentState: this.state.currentState + 1,
      });

      let data = {
        review: this.state.review,
        right_image: faceImageUpload2,
        left_image: faceImageUpload3,
        front_image: faceImageUpload1,
        email: this.state.enterEmail,
        phonenumber: this.state.enterPhone
      }

      let axiosResponse = await axios.post(config.apiGateway + "/acne", data);

      // id: uuidv4(),
      // dateTime: new Date().getTime(),
      // lookStraight: faceImageUpload1,
      // lookLeft: faceImageUpload2,
      // lookRight: faceImageUpload3,
      // email: this.state.enterEmail,
      // phone: this.state.enterPhone,
      // maleOrFemale: this.state.maleOrFemale,
      // acneTime: this.state.acneTime,
      // age: this.state.age,
      // acneLevel: this.state.acneLevel,
      // otherAcne: this.state.otherAcne,
      // sportsWear: this.state.sportsWear

      // if()
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

  validateHandle = (text, type, question) => {
    if (type === 'age') {
      if (text == '') {
        this.setState({ age: '', })
      } else {
        this.setState({ age: text, agequestion: question })
      }

    }
    if (type === 'sex') {
      if (text.label) {
        this.setState({ maleOrFemale: text.label, maleOrFemalequestion: question })

      } else {
        this.setState({ maleOrFemale: '' })
      }

    }
    if (type === 'sufferedTime') {
      if (text.label) {
        this.setState({ acneTime: text.label, acneTimequestion: question })
      } else {
        this.setState({ acneTime: '', })

      }

    }
    if (type === 'flare') {
      if (text.label) {
        this.setState({ flareLevel: text.label, flareLevelquestion: question })
      } else {
        this.setState({ flareLevel: '', })
      }

    }

    if (type === 'yesflare') {
      if (text == '') {
        this.setState({ yesflare: '', })
      } else {
        this.setState({ yesflare: text, })
      }

    }
    if (type === 'sufferingFrom') {
      if (text.label) {
        this.setState({ acneLevel: text.label, acneLevelquestion: question })
      } else {
        this.setState({ acneLevel: '', })
      }

    }
    if (type === 'likeProduct') {
      if (text == '') {
        this.setState({ likeProduct: '', })
      } else {
        this.setState({ likeProduct: text, likeProductquestion: question })
      }

    }
    if (type === 'currentsolution') {
      if (text == '') {
        this.setState({ currentsolution: '', })
      } else {
        this.setState({ currentsolution: text, currentsolutionqusetion: question })
      }

    }

    if (type === 'treatAcne') {
      if (text == '') {
        this.setState({ treatAcne: '', })
      } else {
        this.setState({ treatAcne: text, treatAcnequestion: question })
      }

    }

    if (type === 'skinConcerns') {
      if (text.label) {
        this.setState({ otherAcne: text.label, otherAcnequestion: question })
      } else {
        this.setState({ otherAcne: '', })
        // alert('Please select your answer to proceed next.')
      }

    }

    if (type === 'accessories') {
      if (text.label) {
        this.setState({ sportsWear: text.label, sportsWearquestion: question })
      } else {
        this.setState({ sportsWear: '', })

      }

    }
    if (type === 'otherIssue') {
      if (text == '') {
        this.setState({ otherIssue: '', })
      } else {
        this.setState({ otherIssue: text, otherIssuequestion: question })
      }

    }

    if (type === 'sunburn') {
      if (text == '') {
        this.setState({ sunburn: '', })
      } else {
        this.setState({ sunburn: text, sunburnquestion: question })
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

      return (
        <View style={{ flex: 1, marginTop: 40, justifyContent: "center", alignItems: "center", }}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} enableOnAndroid>
            <Text style={{ fontSize: 15, marginBottom: 30, }}>
              1. Whats your age?
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
              onChangeText={(text) => this.validateHandle(text, 'age', 'Whats your age?')}
            >
            </TextInput>
            <View style={{ flex: 1, justifyContent: "center", marginTop: 8, }}>
              <Text style={{ fontSize: 15 }}>
                2. What is your sex?
          </Text>
              <RadioButtonRN
                animationTypes={['pulse', 'zoomIn']}
                data={data}
                selectedBtn={(e) => {
                  this.validateHandle(e, 'sex', 'What is your sex?')
                  // this.setState({
                  //   maleOrFemale: e
                  // })
                }}

              />

              <Text style={{ fontSize: 15, marginTop: 10 }}>
                3. How long have you suffered from acne?
          </Text>

              <RadioButtonRN
                data={dataAcne}
                animationTypes={['pulse', 'zoomIn']}
                selectedBtn={(e) => {
                  this.validateHandle(e, 'sufferedTime', 'How long have you suffered from acne?')

                }}
              />
            </View>
            {/* <Text>
            {this.state.ageError}
          </Text> */}
            <TouchableOpacity style={{
              backgroundColor: "black",
              width: 100,
              height: 70,
              borderRadius: 5,
              marginTop: 50, alignSelf: 'center'
            }}
              onPress={() => {
                if (this.state.age && this.state.maleOrFemale && this.state.acneTime) {
                  let reviewarray = []
                  let objone = {
                    "question": this.state.agequestion,
                    "answer": this.state.age
                  }
                  let objtwo = {
                    "question": this.state.maleOrFemalequestion,
                    "answer": this.state.maleOrFemale
                  }
                  let objthree = {
                    "question": this.state.acneTimequestion,
                    "answer": this.state.acneTime
                  }
                  reviewarray.push(objone, objtwo, objthree)

                  this.setState({
                    review: reviewarray,
                    currentState: this.state.currentState + 1
                  })
                }
                else {
                  alert('Please select your answer to proceed next.')
                }
              }}
            >
              <Text style={{ color: "white", textAlign: "center", paddingTop: 25, fontSize: 18, }}>
                Next
            </Text>

            </TouchableOpacity>
          </KeyboardAwareScrollView>

        </View>

      )
    }



    if (this.state.currentState === -5) {
      const data = [
        {
          label: 'Yes'
        },
        {
          label: 'No'
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
        <View style={{ flex: 1, marginTop: 40, justifyContent: "center", alignItems: "center", }}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} enableOnAndroid>
            <View style={{ flex: 1, justifyContent: "center", marginTop: 8, width: width * 0.78, alignSelf: 'center' }}>
              <Text style={{ fontSize: 15 }}>
                4. Are there certain triggers that cause your acne to flare up?
          </Text>
              <RadioButtonRN
                animationTypes={['pulse', 'zoomIn']}
                data={data}
                selectedBtn={(e) => {
                  this.validateHandle(e, 'flare', 'Are there certain triggers that cause your acne to flare up?')
                  // this.setState({
                  //   maleOrFemale: e
                  // })
                }}

              />
              {this.state.flareLevel === 'Yes' ?
                <TextInput style={{
                  width: width,
                  height: 60,
                  backgroundColor: "white",
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                  marginTop: 8, paddingLeft: 5

                }}
                  multiline={true}
                  maxLength={300}
                  placeholder="ex. shaving, masks, poor diet, stress,"
                  keyboardType='default'
                  value={this.state.yesflare}

                  onChangeText={(text) => this.validateHandle(text, 'yesflare',)}
                >
                </TextInput>
                :
                null
              }

              <Text style={{ fontSize: 15, marginTop: 8, }}>
                5. What do you think you are suffering from?
          </Text>
              <RadioButtonRN
                animationTypes={['pulse', 'zoomIn']}
                data={acneLevel}
                selectedBtn={(e) => {
                  this.validateHandle(e, 'sufferingFrom', 'What do you think you are suffering from?')
                  // this.setState({
                  //   acneLevel
                  //     : e
                  // })
                }}
              />

            </View>
            <TouchableOpacity style={{
              backgroundColor: "black",
              width: 100,
              height: 70,
              borderRadius: 5,
              marginTop: 50,
              alignSelf: 'center'

            }}
              onPress={() => {
                if (this.state.flareLevel && this.state.acneLevel) {
                  let obj = {
                    "question": this.state.flareLevelquestion,
                    "answer": `${this.state.flareLevel} ${this.state.yesflare}`
                  }
                  let objtwo = {
                    "question": this.state.acneLevelquestion,
                    "answer": this.state.acneLevel
                  }
                  this.state.review.push(obj, objtwo)
                  this.setState({
                    review: this.state.review,
                    currentState: this.state.currentState + 1
                  })
                }
                else {
                  alert('Please select your answer to proceed next.')
                }

              }}
            >
              <Text style={{ color: "white", textAlign: "center", paddingTop: 25, fontSize: 18, }}>
                Next
            </Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View >


      )
    }


    if (this.state.currentState === -4) {

      return (
        <View style={{ flex: 1, marginTop: 60, justifyContent: "center", alignItems: "center", }}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} enableOnAndroid>
            <View style={{ flex: 1, justifyContent: "center", marginTop: 8, width: width * 0.78, alignSelf: 'center' }}>

              <Text style={{ fontSize: 15, }}>
                6. What products are you currently using for your skin and what do you like or not like about them?
          </Text>
              <TextInput style={{
                width: width,
                height: 60,
                backgroundColor: "white",
                borderBottomWidth: 1,
                borderBottomColor: "black",
                marginTop: 8, paddingLeft: 5

              }}
                multiline={true}
                maxLength={300}
                placeholder=""
                keyboardType='default'
                value={this.state.likeProduct}

                onChangeText={(text) => this.validateHandle(text, 'likeProduct', 'What products are you currently using for your skin and what do you like or not like about them?')}
              >
              </TextInput>
              <Text style={{ fontSize: 15, marginTop: 8, }}>
                7. What do you not like about the current solutions available to you for treating acne?
          </Text>
              {/* <RadioButtonRN
            animationTypes={['pulse', 'rotate']}
            data={otherAcne}
            selectedBtn={(e) => {
             
            }}
          /> */}

              <TextInput style={{
                width: width,
                height: 60,
                backgroundColor: "white",
                borderBottomWidth: 1,
                borderBottomColor: "black",
                marginTop: 8, paddingLeft: 5

              }}
                multiline={true}
                maxLength={300}
                placeholder=""
                keyboardType='default'
                value={this.state.currentsolution}

                onChangeText={(text) => this.validateHandle(text, 'currentsolution', 'What do you not like about the current solutions available to you for treating acne?')}
              >
              </TextInput>
            </View>
            <TouchableOpacity style={{
              backgroundColor: "black",
              width: 100,
              height: 70,
              borderRadius: 5,
              marginTop: 20, alignSelf: 'center'

            }}
              onPress={() => {
                if (this.state.likeProduct && this.state.currentsolution) {
                  let obj = {
                    "question": this.state.likeProductquestion,
                    "answer": this.state.likeProduct
                  }
                  let objtwo = {
                    "question": this.state.currentsolutionqusetion,
                    "answer": this.state.currentsolution
                  }
                  this.state.review.push(obj, objtwo)
                  this.setState({
                    review: this.state.review,
                    currentState: this.state.currentState + 1
                  })
                }
                else {
                  alert('Please select your answer to proceed next.')
                }

              }}
            >
              <Text style={{ color: "white", textAlign: "center", paddingTop: 25, fontSize: 18, }}>
                Next
            </Text>

            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>)
    }


    if (this.state.currentState === -3) {


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
      return (
        <View style={{ flex: 1, marginTop: 40, justifyContent: "center", alignItems: "center", }}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} enableOnAndroid>
            <View style={{ flex: 1, justifyContent: "center", marginTop: 8, width: width * 0.78, alignSelf: 'center' }}>

              <Text style={{ fontSize: 15, marginTop: 20 }}>
                8. Do you prefer a natural, medical, or a mixture of both for solutions to treat acne?
          </Text>

              <TextInput style={{
                width: width,
                height: 60,
                backgroundColor: "white",
                borderBottomWidth: 1,
                borderBottomColor: "black",
                marginTop: 8, paddingLeft: 5

              }}
                multiline={true}
                maxLength={300}
                placeholder=""
                value={this.state.treatAcne}

                keyboardType='default'
                onChangeText={(text) => this.validateHandle(text, 'treatAcne', 'Do you prefer a natural, medical, or a mixture of both for solutions to treat acne?')}
              >
              </TextInput>

              <Text style={{ fontSize: 15, marginTop: 8 }}>
                9. Do you have other skin concerns in addition to acne?
          </Text>
              <RadioButtonRN
                animationTypes={['pulse', 'rotate']}
                data={otherAcne}
                selectedBtn={(e) => {
                  this.validateHandle(e, 'skinConcerns', 'Do you have other skin concerns in addition to acne?')
                  // this.setState({
                  //   otherAcne
                  //     : e
                  // })
                }}
              />
            </View>
            <TouchableOpacity style={{
              backgroundColor: "black",
              width: 100,
              height: 70,
              borderRadius: 5,
              marginLeft: 100,
              marginTop: 50,

            }}
              onPress={() => {
                if (this.state.treatAcne && this.state.otherAcne) {
                  let obj = {
                    "question": this.state.treatAcnequestion,
                    "answer": this.state.treatAcne
                  }
                  let objtwo = {
                    "question": this.state.otherAcnequestion,
                    "answer": this.state.otherAcne
                  }
                  this.state.review.push(obj, objtwo)
                  this.setState({
                    review: this.state.review,
                    currentState: this.state.currentState + 1
                  })
                }
                else {
                  alert('Please select your answer to proceed next.')
                }

              }}
            >
              <Text style={{ color: "white", textAlign: "center", paddingTop: 25, fontSize: 18, }}>
                Next
            </Text>

            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>)
    }


    if (this.state.currentState === -2) {

      return (
        <View style={{ flex: 1, marginTop: 40, justifyContent: "center", alignItems: "center", }}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} enableOnAndroid>
            <View style={{ flex: 1, justifyContent: "center", marginTop: 8, width: width * 0.78, alignSelf: 'center' }}>

              <Text style={{ fontSize: 15, marginTop: 20 }}>
                10. Other than the previously mentioned concerns, what other issues do you have for your skin
                health?
          </Text>

              <TextInput style={{
                width: width,
                height: 60,
                backgroundColor: "white",
                borderBottomWidth: 1,
                borderBottomColor: "black",
                marginTop: 8, paddingLeft: 5

              }}
                multiline={true}
                maxLength={300}
                value={this.state.otherIssue}
                placeholder="ex. body acne, dark spots, acne scars, skin aging, etc"
                keyboardType='default'
                onChangeText={(text) => this.validateHandle(text, 'otherIssue', 'Other than the previously mentioned concerns, what other issues do you have for your skin health?')}
              >
              </TextInput>

              <Text style={{ fontSize: 15, marginTop: 8 }}>
                11. Does your skin sunburn easily on a scale of 1-5 (1 never burns and 5 easily burns)?
          </Text>
              <TextInput style={{
                width: width,
                height: 60,
                backgroundColor: "white",
                borderBottomWidth: 1,
                borderBottomColor: "black",
                marginTop: 8, paddingLeft: 5

              }}
                multiline={true}
                maxLength={300}
                placeholder=""
                keyboardType='default'
                onChangeText={(text) => this.validateHandle(text, 'sunburn', 'Does your skin sunburn easily on a scale of 1-5 (1 never burns and 5 easily burns)?')}
              >
              </TextInput>

            </View>
            <TouchableOpacity style={{
              backgroundColor: "black",
              width: 100,
              height: 70,
              borderRadius: 5,
              marginLeft: 100,
              marginTop: 50,

            }}
              onPress={() => {
                if (this.state.otherIssue && this.state.sunburn) {
                  let obj = {
                    "question": this.state.otherIssuequestion,
                    "answer": this.state.otherIssue
                  }
                  let objtwo = {
                    "question": this.state.sunburnquestion,
                    "answer": this.state.sunburn
                  }
                  this.state.review.push(obj, objtwo)
                  this.setState({
                    review: this.state.review,
                    currentState: this.state.currentState + 1
                  })
                }
                else {
                  alert('Please select your answer to proceed next.')
                }

              }}
            >
              <Text style={{ color: "white", textAlign: "center", paddingTop: 25, fontSize: 18, }}>
                Next
            </Text>

            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      );
    }
    if (this.state.currentState === -1) {
      const sportsWear = [
        {
          label: 'Yes'
        },
        {
          label: 'No'
        },
      ];
      return (
        <View style={{ flex: 1, marginTop: 40, justifyContent: "center", alignItems: "center", }}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} enableOnAndroid>
            <View style={{ flex: 1, justifyContent: "center", marginTop: 8, width: width * 0.78, alignSelf: 'center' }}>

              <Text style={{ color: "black", fontSize: 15, }}>
                12. Do you frequently wear accessories on your head or face? (Ex. masks, hats, sports helmets,
                etc.)?
          </Text>
              <RadioButtonRN
                animationTypes={['pulse', 'zoomIn']}
                data={sportsWear}
                selectedBtn={(e) => {
                  this.validateHandle(e, 'accessories', 'Do you frequently wear accessories on your head or face? (Ex. masks, hats, sports helmets,etc.)?')
                  // this.setState({
                  //   sportsWear
                  //     : e
                  // })
                }}
              />
              <Text style={{ color: "black", fontSize: 15, marginTop: 8 }}>
                13. Enter your phone:
          </Text>
              <TextInput
                style={{
                  width: width,
                  height: 60,
                  backgroundColor: "white",
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                  marginTop: 8, paddingLeft: 5
                }}
                onChangeText={(text) => this.validateHandle(text, 'phonenumber')}
                value={this.state.enterPhone}
                // autoCompleteType="tel"
                keyboardType="number-pad"
                placeholder="310-621-4107"
              />
              <Text style={{ color: "black", fontSize: 15, marginTop: 8 }}>
                14. Enter your email:
          </Text>
              <TextInput
                style={{
                  width: width,
                  height: 60,
                  backgroundColor: "white",
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                  marginTop: 8, paddingLeft: 5
                }}
                onChangeText={(text) => this.validateHandle(text, 'email')}
                value={this.state.enterEmail}
                autoCompleteType="email"
                keyboardType="email-address"
                placeholder="xyz@gmail.com"
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                width: 100,
                height: 70,
                borderRadius: 5,
                marginLeft: 100,
                marginTop: 50,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                if (this.state.sportsWear && this.state.enterPhone && this.state.enterEmail) {
                  let obj = {
                    "question": this.state.sportsWearquestion,
                    "answer": this.state.sportsWear
                  }

                  this.state.review.push(obj,)
                  this.setState({ review: this.state.review })
                  this.state.currentState = this.state.currentState + 1;
                  this.componentDidMount();
                }
                else {
                  alert('Please select your answer to proceed next.')
                }

              }}
            >
              <Text style={{ color: "white", textAlign: "center", fontSize: 18, }}>NEXT</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
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
