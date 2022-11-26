// Components
import PointEntryBox from './PointEntryBox'

// Internal imports
import caltrops from '../lib/caltrops'
import { modifyObject } from '../lib/util'
import { Attribute, Dictionary } from '../lib/rules'

/* 
 * Attributes table.
 *    in: attriutes <- rules.attributes
 *    in: scores <- sheet.attributes
 *    out: setScores -> sheet.attributes
 *    in: level <- sheet.info.level
 */
function AttributeTable({attributes, scores, setScores, level, editable=false}: {
    attributes: Attribute[],
    scores: Dictionary<number>,
    setScores(scores: Dictionary<number>): void,
    level: number,
    editable?: boolean,
  }): JSX.Element {
  const attributeTotal = caltrops.attributeTotal(attributes, scores)
  const attributeMax = caltrops.attributeTotalMax
  const aspectTotal = caltrops.aspectTotal(attributes, scores)
  const aspectMax = caltrops.aspectTotalMax(level)

  return (
    <div>
      <table className="table table-compact">
        <thead>
          <tr>
            <th>Attributes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          attributes.map( attribute => {
            let base = scores[attribute.name] ?? 0

            return <tr key={attribute.name}>
              <td>
                <div className='card rounded-box bg-base-200'>
                <div className='flex flex-col content-center gap-2 m-2'>
                  <div className='text-center'>{attribute.name}</div>
                  <PointEntryBox
                    value={base}
                    setValue={v => { setScores(caltrops.attributeModify(scores, attribute, v)) }}
                    editable={editable}
                    min={caltrops.attributeMin}
                    max={caltrops.attributeMax}
                    isCapped={attributeTotal >= attributeMax}
                    encourageUp={true}
                  />
                </div>
                </div>
              </td>
              <td className='p-0'>
                <table className='table table-compact'>
                  <tbody>
                  {
                    attribute.aspects.map( aspect => {
                      return <tr className='hover' key={aspect.name}>
                        <td className='w-24'>{aspect.name}</td>
                        <td><PointEntryBox
                          value={scores[aspect.name] ?? 0}
                          setValue={v => setScores(modifyObject(scores, aspect.name, v))}
                          editable={editable}
                          min={base}
                          isCapped={aspectTotal >= aspectMax}
                          encourageUp={true}
                        /></td>
                      </tr>
                    })
                  }
                  </tbody>
                </table>
              </td>
            </tr>
          })
        }
        </tbody>
        <tfoot>
          <tr>
            <td className='text-center'>{attributeTotal} / {attributeMax}</td>
            <td className='text-center'>{aspectTotal} / {aspectMax}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default AttributeTable