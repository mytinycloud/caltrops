import caltrops from '../lib/caltrops'
import { modifyObject } from '../lib/util'
import PointEntryBox from './PointEntryBox'

/* 
 * Attributes table.
 * This consumes sheets.attributes for attribute values.
 */

function AttributeTable({attributes, scores, setScores, level, isEditable=false}) {
  const attributeTotal = caltrops.totalAttributes(attributes, scores)
  const attributeMax = caltrops.maxAttributes(level)
  const aspectTotal = caltrops.totalAspects(attributes, scores)
  const aspectMax = caltrops.maxAspects(level)
  return (
    <div className='px-8'>
      <h2 className='text-2xl my-4'>Attributes</h2>
      <table className="table table-compact">
        {
          attributes.map( attribute => {
              return [<thead>
              <tr>
                  <th>{attribute.name}</th>
                  <th><PointEntryBox
                    value={scores[attribute.name] ?? 0}
                    setValue={v => setScores(modifyObject(scores, attribute.name, v))}
                    isEditable={isEditable}
                  />
                  </th>
              </tr>
              </thead>,
              <tbody>
                { attribute.aspects.map( aspect => {
                    return <tr>
                        <td>{aspect.name}</td>
                        <td><PointEntryBox
                          value={scores[aspect.name] ?? 0}
                          setValue={v => setScores(modifyObject(scores, aspect.name, v))}
                          isEditable={isEditable}
                        /></td>
                      </tr>
                })}
              </tbody>
              ]
          //    <tdata>
          //</tdata>      {
            //      attribute.aspects.map( aspect => {
          //          return <tr>
             //           <td>aspect.name</td>
            //          </tr>
             //     })
            //    }
           //   </tdata>
            })
        }
        <tfoot>
          <tr>
            <th>Attributes</th>
            <th>{attributeTotal} of {attributeMax}</th>
          </tr>
          <tr>
            <th>Aspects</th>
            <th>{aspectTotal} of {aspectMax}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default AttributeTable