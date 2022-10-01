import React from 'react';
import './app.css';

import ParentalAdvisory from './pages/ParentalAdvisory';
import { loadObject } from './lib/util';
import { loadRuleset } from './data/rulesets';
import caltrops from './lib/caltrops';

const App = (props) => {

  let sheet = loadObject("sheet")
  let rules = null;
  if (sheet) {
    rules = loadRuleset(sheet.rules)
  }
  else {
    rules = loadRuleset("Airlocks")
    sheet = caltrops.newSheet(rules)
  }

  return (
    <div>
      <ParentalAdvisory defaultSheet={sheet} defaultRules={rules}></ParentalAdvisory>
    </div>
  );
};
export default App;