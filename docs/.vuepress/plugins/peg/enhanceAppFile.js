import Calc01 from './components/Calc01';
import CalcDigest01 from './components/CalcDigest01';
import CalcVariable01 from './components/CalcVariable01';

import Condition01 from './components/Condition01';
import ConditionEvaluation01 from './components/ConditionEvaluation01';

import Method01 from './components/Method01';

export default ({Vue}) => {
  Vue.component('CalcCalc01', Calc01);
  Vue.component('CalcDigest01', CalcDigest01);
  Vue.component('CalcVariable01', CalcVariable01);

  Vue.component('Condition01', Condition01);
  Vue.component('ConditionEvaluation01', ConditionEvaluation01);

  Vue.component('Method01', Method01);
}
