import './app.css';

import ParentalAdvisory from './pages/ParentalAdvisory';
import { loadObject } from './lib/util';
import caltrops from './lib/caltrops';

const App = (props) => {

  let sheet = loadObject("sheet")
  let rules = null;
  if (sheet) {
    rules = caltrops.loadRules(sheet.rules)
  }
  else {
    rules = caltrops.loadRules()
    sheet = caltrops.newSheet(rules)
  }

  return (
    <div>
      <ParentalAdvisory defaultSheet={sheet} defaultRules={rules}></ParentalAdvisory>
    </div>
  );
};
export default App;