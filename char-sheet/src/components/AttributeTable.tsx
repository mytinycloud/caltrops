// Components
import PointEntryBox from './PointEntryBox'

// Internal imports
import caltrops from '../lib/caltrops'
import ObjectService from '../lib/objectservice'
import { modifyObject, EditMode } from '../lib/util'
import { Dictionary, RollInfo, Rules } from '../lib/rules'



function AspectTable({rules, level, service, editable, roll, setRoll}: {
    rules: Rules,
    level: number,
    service: ObjectService,
    editable: EditMode,
    roll: RollInfo,
    setRoll(roll: RollInfo): void,
  }): JSX.Element {

  const scores: Dictionary<number> = service.subscribe()
  const attributes = rules.attributes
  // Total from the sheets
  const attributeTotal = caltrops.attributeTotal(attributes, scores)
  const aspectTotal = caltrops.aspectTotal(attributes, scores)

  // Rules defined limits
  const attributeTotalMax = caltrops.attributeTotalMax(rules, level)
  const attributeMax = caltrops.attributeMax(rules, level)
  const aspectTotalMax = caltrops.aspectTotalMax(rules, level)

  function selectAspect(aspect: string) {
    setRoll(modifyObject(roll, "attribute", {
      name: aspect,
      score: scores[aspect] ?? 0
    }))
  }

  function clearAspect() {
    setRoll(modifyObject(roll, "attribute", null))
  }

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
                    setValue={v => { service.publish(caltrops.attributeModify(scores, attribute, v)) }}
                    editable={editable >= EditMode.Full}
                    min={caltrops.attributeMin}
                    max={attributeMax}
                    isCapped={attributeTotal >= attributeTotalMax}
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
                      const selected = aspect.name === roll.attribute?.name
                      const bg = selected ? "bg-base-200" : ""
                      return <tr 
                          className={ 'hover cursor-pointer'}
                          key={aspect.name}
                          onClick={() => selected ? clearAspect() : selectAspect(aspect.name)}
                          >
                        <td className={`w-24 ${bg}`}>{aspect.name}</td>
                        <td className={bg}><PointEntryBox
                          value={scores[aspect.name] ?? 0}
                          setValue={v => service.set_key(aspect.name, v)}
                          editable={editable >= EditMode.Full}
                          min={base}
                          max={caltrops.aspectMax(base)}
                          isCapped={aspectTotal >= aspectTotalMax}
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
            <td className='text-center'>{attributeTotal} / {attributeTotalMax}</td>
            <td className='text-center'>{aspectTotal} / {aspectTotalMax}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}


function AttributeOnlyTable({rules, level, service, editable, roll, setRoll}: {
  rules: Rules,
  level: number,
  service: ObjectService,
  editable: EditMode,
  roll: RollInfo,
  setRoll(roll: RollInfo): void,
}): JSX.Element {

  const scores: Dictionary<number> = service.subscribe()
  const attributes = rules.attributes
  // Total from the sheets
  const attributeTotal = caltrops.attributeTotal(attributes, scores)
  // Rules defined limits
  const attributeTotalMax = caltrops.attributeTotalMax(rules, level)
  const attributeMax = caltrops.attributeMax(rules, level)


  function selectAspect(aspect: string) {
    setRoll(modifyObject(roll, "attribute", {
      name: aspect,
      score: scores[aspect] ?? 0
    }))
  }

  function clearAspect() {
    setRoll(modifyObject(roll, "attribute", null))
  }

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
            const selected = attribute.name === roll.attribute?.name
            const bg = selected ? "bg-base-200" : ""
            return <tr className='hover cursor-pointer'
              onClick={() => selected ? clearAspect() : selectAspect(attribute.name)}
              key={attribute.name}
              >
              <td className={bg}>{attribute.name}</td>
              <td className={bg}>
                <PointEntryBox
                    value={base}
                    setValue={v => { service.publish(caltrops.attributeModify(scores, attribute, v)) }}
                    editable={editable >= EditMode.Full}
                    min={caltrops.attributeMin}
                    max={attributeMax}
                    isCapped={attributeTotal >= attributeTotalMax}
                    encourageUp={true}
                  />
              </td>
              </tr>
            })
        }
        </tbody>
        <tfoot>
          <tr>
            <td>ATTRIBUTE COST</td>
            <td className='text-center'>{attributeTotal} / {attributeTotalMax}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

function AttributeTable({rules, level, service, editable=EditMode.Live, roll, setRoll}: {
    rules: Rules,
    level: number,
    service: ObjectService,
    editable?: EditMode,
    roll: RollInfo,
    setRoll(roll: RollInfo): void,
  }): JSX.Element {
  
    if (rules.useAspects) {
      return AspectTable( {
        rules: rules,
        level: level,
        service: service,
        editable: editable,
        roll: roll,
        setRoll: setRoll,
      } )
    } else {
      return AttributeOnlyTable( {
        rules: rules,
        level: level,
        service: service,
        editable: editable,
        roll: roll,
        setRoll: setRoll,
      } )
    }
}

export default AttributeTable