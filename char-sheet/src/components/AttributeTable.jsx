import caltrops from '../lib/caltrops'
import { modifyObject } from '../lib/util'
import PointEntryBox from './PointEntryBox'

/* 
 * Attributes table.
 *    in: attriutes <- rules.attributes
 *    in: scores <- sheet.attributes
 *    out: setScores -> sheet.attributes
 *    in: level <- sheet.info.level
 */
function AttributeTable({attributes, scores, setScores, level, isEditable=false}) {
  const attributeTotal = caltrops.attributeTotal(attributes, scores)
  const attributeMax = caltrops.attributeTotalMax
  const aspectTotal = caltrops.aspectTotal(attributes, scores)
  const aspectMax = caltrops.aspectTotalMax(level)

  return (
    <div>
      <table className="table table-compact">
        {
          attributes.map( attribute => {
              let base = scores[attribute.name] ?? 0
              return [<thead>
              <tr>
                  <th>{attribute.name}</th>
                  <th><PointEntryBox
                    value={base}
                    setValue={v => { setScores(caltrops.attributeModify(scores, attribute, v)) }}
                    isEditable={isEditable}
                    min={caltrops.attributeMin}
                    max={caltrops.attributeMax}
                    isCapped={attributeTotal >= attributeMax}
                    encourageUp='true'
                  />
                  </th>
              </tr>
              </thead>,
              <tbody>
                { attribute.aspects.map( aspect => {
                    return <tr className='hover'>
                        <td>{aspect.name}</td>
                        <td><PointEntryBox
                          value={scores[aspect.name] ?? 0}
                          setValue={v => setScores(modifyObject(scores, aspect.name, v))}
                          isEditable={isEditable}
                          min={base}
                          isCapped={aspectTotal >= aspectMax}
                          encourageUp='true'
                        /></td>
                      </tr>
                })}
              </tbody>
              ]
            })
        }
        <tfoot>
          <tr>
            <th>Attributes</th>
            <th className='px-2 text-center'>{attributeTotal} / {attributeMax}</th>
          </tr>
          <tr>
            <th>Aspects</th>
            <th className='px-2 text-center'>{aspectTotal} / {aspectMax}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default AttributeTable