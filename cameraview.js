// import { requireNativeComponent, NativeModules } from "react-native";
// import React, { Component } from "react";

// const NativeView = requireNativeComponent("mpg_libView", CameraView);
// class CameraView extends Component {
//   render() {
//     return <NativeView {...this.props} />;
//   }
// }
// CameraView.defaultProps = {
//   onStart: () => {
//     console.log("Started!");
//   },
//   cameraFront: true
// };
// CameraView.takePicture = async () => {
//   try {
//     const x = await NativeModules.mpg_libViewManager.takePicture();
//     return x;
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
// };
// export default CameraView;