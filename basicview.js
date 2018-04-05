import * as React from "react";
import { requireNativeComponent } from "react-native";

const NativeView = requireNativeComponent("mpg_libBasicView", BasicView);
class BasicView extends React.Component {
  render() {
    return <NativeView {...this.props} />;
  }
}
export default BasicView;
