import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
AppRegistry.registerComponent('cryptoportfolio', () => App);
// For react-navigation warning
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);