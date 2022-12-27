// Components
import TextEntryBox from './TextEntryBox'

// Internal imports
import { modifyObject } from '../lib/util'
import { Currency, Dictionary } from '../lib/rules'


function CurrencyTable({currencies, values, setValues}: {
    currencies: Currency[],
    values: Dictionary<number>,
    setValues(values: Dictionary<number>): void,
  }): JSX.Element {

  function editCurrency(currency: Currency, text: string) {
    let value = parseFloat(text)
    if (!value || isNaN(value)) {
      value = 0;
    }
    const p = Math.pow(10, currency.precision ?? 0)
    value = Math.round(value * p) / p
    setValues(modifyObject(values, currency.name, value))
  }

  return (
    <div>
      <table className="table table-compact">
        <thead>
        <tr>
            <th>Currency</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
          {
            currencies.map( currency => {
              return <tr className='hover' >
                <td>{currency.name}</td>
                <td className='py-0'><TextEntryBox
                  value={(values[currency.name] ?? 0).toString()}
                  setValue={v => editCurrency(currency, v)}
                  />
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default CurrencyTable