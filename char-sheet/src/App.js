import './app.css';

import MainPage from './pages/MainPage';
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
    <MainPage defaultSheet={sheet} defaultRules={rules}></MainPage>
  );
};
export default App;