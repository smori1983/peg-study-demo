import Calc01 from './components/Calc01';
import CalcDigest01 from './components/CalcDigest01';
import CalcVariable01 from './components/CalcVariable01';

export default ({Vue}) => {
  Vue.component('CalcCalc01', Calc01);
  Vue.component('CalcDigest01', CalcDigest01);
  Vue.component('CalcVariable01', CalcVariable01);
}
