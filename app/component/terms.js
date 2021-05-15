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
    Linking,
    ScrollView,

} from "react-native";

import Checkbox from 'expo-checkbox';
import { CheckBox } from "react-native-elements";

import React, { Component, useState, Fragment, useEffect, useRef } from "react";
const { height, width } = Dimensions.get("window");
import Constants from 'expo-constants';

export default class Terms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        }

        // console.log.log('Terms SErvices =>', props)
    }

    setSelection = (e) => {
        console.log('SetSelecton')
        this.setState({
            isSelected: !this.state.isSelected
        })
    }

    render() {

        console.log('this.props.hide =>', this.props.hide)

        if (this.props.hide) {
            return <CheckBox
                checked={this.state.isSelected}
                onPress={() => {
                    // console.log(
                    //   "Checkbox value change => ",
                    //   this.state.isSelected,
                    // );
                    this.setState({
                        isSelected: !this.state.isSelected,
                    });
                }}
                // style={styles.checkbox}
                title="By checking this Box, you agree to our Privacy Policy, and Terms and Conditions"
            />
        }
        return (
            <View style={styles.container}>
                <Text style={{ paddingTop: 50, textAlign: "center", fontSize: 20, fontWeight: 'bold' }}>
                    Terms & Condtions
                </Text>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.text}>
                        <Text style={{
                            fontWeight: 'bold',
                        }}>
                            SKIN RESEARCH INSTITUTE TERMS AND CONDITIONS {"\n\n"}
                        </Text>

                        The Skin Research Institute App (the “App”) is owned and operated by Skin Research Institute, LLC (“Company”, “we”, “our” or “us”).  The following terms and conditions, together with any documents they expressly incorporate by reference, govern your access to and use of the App on all platforms, including any content, functionality and services it offers (the “Services”), whether as a guest or registered user.
                        1. Acceptance of Terms and Conditions
                        Please read these Terms and Conditions carefully before using the App and using the Services. These Terms and Conditions set forth the legally binding terms and conditions for your use of the App. By using the App in any manner, you accept and agree to be bound and abide by these Terms and Conditions and our Privacy Policy, which is incorporated herein by reference. If you do not agree to these Terms and Conditions or the Privacy Policy, you are not permitted to access or use the App.
                        2. Changes and Modifications
                        Company reserves the right, at our sole discretion, to modify or replace these Terms and Conditions by posting updated terms on the App. Your continued use of the App after any such changes constitutes your acceptance of the new Terms and Conditions. Please review the App periodically for changes. If you do not agree to any or all posted changes, you must discontinue using the App.
                        3. Accessing the App and Account Security
                        We will do our best to ensure that the App is operational at all times, except for periodic down times relating to updates and maintenance. We will not be liable if for any reason the App is unavailable at any time or for any period. We cannot be held responsible for internet outages, faulty connections, or other connectivity issues.
                        To access the App or the Services it offers, you may be asked to provide certain personal information. It is a condition of your use of the App that all information you provide is correct, current, and complete. You agree that all information you provide to register with the Company is governed by our Privacy Policy and you consent to all actions we take with respect to your information consistent with our Privacy Policy.
                        We have the right to disable any e-mail account, username, password or other identifier at any time in our sole discretion for any or no reason, including if, in our opinion, you have violated any provision of these Terms and Conditions.
                        4. External Links and Content
                        The App may contain links to other Apps and resources provided by third parties. These links are provided for your convenience only and include links contained in advertisements, including banner advertisements and sponsored links. We have no control over the contents of those Apps or resources, and accept no responsibility for them or for any loss or damage that may arise from your use of them. If you decide to access any of the third-party Apps linked to the App, you do so entirely at your own risk and subject to the terms and conditions of use for such Apps.
                        5. User Age Requirement
                        In compliance with the requirements of Children’s Online Privacy Protection Act (COPPA), we do not collect any information from any person under 13 years of age. If you are aged 13 years or younger, you may not use the App. If you are 13 or older but under the age of 18, you must review these Terms and Conditions with your parent or guardian to make sure that you and your parent or guardian understand it. While persons under the age of 18 may use our Services, only adults may make purchases through the App. If you are under 18, you may only use the Services with the supervision of a parent or guardian.
                        6. Copyrights, Trademarks, and Service Marks
                        The App and its original content, features and functionality are owned by the Company and are protected by international copyright, trademark, patent, trade secret and other intellectual property or proprietary rights laws. None of the content may be downloaded, copied, reproduced, transmitted, stored, sold or distributed without the prior written consent of the Company.
                        7. User Conduct
                        You agree to use the App for lawful purposes only. You are not permitted to use the App to solicit business or advertise.  You further agree not to use the App to deter business from a competitor or otherwise engage in unfair business practices or misleading advertising.
                        8. Warranties
                        The App is provided as-is and you acknowledge Company does not guarantee the accuracy of any information provided on the App. The App does not offer medical advice and no one should rely on the App for diagnosis or treatment. Company expressly disclaims all warranties of any kind, whether express or implied, including but not limited to warranties of merchantability and fitness for a particular purpose. Company does not warrant the App will not be interrupted, and Company reserves the right to discontinue service at any time.
                        9. Indemnification and Limitation of Liability
                        You agree to indemnify and hold harmless the Company from and against any and all losses, expenses, damages, and costs, including without limitation reasonable attorneys’ fees, resulting, whether directly or indirectly, from your violation of the Terms and Conditions. You also agree to indemnify and hold harmless the Company from and against any and all claims brought by third parties arising out of your use of the App.
                        In no event will the Company, its employees, contractors, officers, directors, affiliates or agents, be liable to you on any legal theory for any incidental, direct, indirect, punitive, actual, consequential, special, exemplary or other damages including without limitation, loss of revenue or income, lost profits, pain and suffering, emotional distress, cost of substitute goods or services, or similar damages suffered or incurred by you or any third party that arise in connection with the App (or the interruption or termination thereof for any reason), even if foreseeable or if any form of notice has been provided.
                        10. Violation of this Agreement
                        Any user who violates this agreement may be blocked from using the App. We may terminate your access to the App without cause or notice, which may result in the forfeiture and destruction of all information associated with you. All provisions of these Terms and Conditions shall by their nature survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                        11. Governing Law & Dispute Resolution
                        You expressly agree that all matters relating to the App, the Privacy Policy, these Terms and Conditions and any dispute or claim related thereto, shall be governed by and construed in accordance with the laws of the State of California.  Any controversy or claim arising out of or relating to this agreement, or a breach thereof, shall be settled exclusively in Los Angeles, California by the American Arbitration Association under its Commercial Arbitration Rules.
                        12. Contact Us
                        For questions regarding these Terms and Conditions, please contact us at jmee@thgenesis.com


              </Text></ScrollView>

                <CheckBox
                    checked={this.state.isSelected}
                    onPress={() => {
                        // console.log(
                        //   "Checkbox value change => ",
                        //   this.state.isSelected,
                        // );
                        this.setState({
                            isSelected: !this.state.isSelected,
                        });
                    }}
                    // style={styles.checkbox}
                    title="By checking this Box, you agree to our Privacy Policy, and Terms and Conditions"
                />

                {/* <View style={{ margin: 20 }}>

                    <Text>
                        By checking this Box, you agree to our Privacy Policy, and Terms and Conditions
                </Text>
                </View> */}



                {/* <TouchableOpacity style={{

                    width: 130,
                    height: 50,
                    backgroundColor: "goldenrod",
                    marginBottom: 20,
                    marginLeft: width / 3,
                    // flex: 1,
                    justifyContent: "center",
                    alignItems: "center"

                }}

                    disabled={!this.state.isSelected}
                    onPress={() => {

                        // this.props.route.params.navigation.navigate("UploadS3", {
                        //     navigation: this.props.route.params.navigation,
                        //     photoStraight: this.props.route.params.photoStraight,
                        //     photoLeft: this.props.route.params.photoLeft,
                        //     photoRight: this.props.route.params.photoRight,

                        // });
                    }}
                >
                    <Text style={{ flex: 1, margin: 15, }}>
                        Accept
                    </Text>
                </TouchableOpacity> */}

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 10,
        alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
        // backgroundColor: '#def',
    },
    text: {
        // fontSize: 44,
        // fontWeight: 'bold',
        // textShadowColor: 'grey',
        // textShadowOffset: { width: -1, height: 1 },
        // textShadowRadius: 10,

        width: "100%",

        paddingTop: 50,
        textAlign: "justify",
        borderColor: "black",


    },
    scrollView: {
        backgroundColor: 'transparent',

        width: "80%",
        padding: 50,
        borderColor: "black",
        borderWidth: 1,
        margin: 25
    },

});
