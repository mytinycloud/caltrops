// External imports
import { useState } from 'react'

// Components
import { Modal } from 'react-daisyui'

// Interal imports
import { Attribute, RollInfo, Dictionary } from '../lib/rules'
import PointEntryBox from './PointEntryBox';
import caltrops from '../lib/caltrops';
import RollResultModal from './RollResultModal';
import { modifyObject } from '../lib/util';


function RollCreateModal({attributes, scores, roll, setRoll}: {
    attributes: Attribute[],
    scores: Dictionary<number>,
    roll: RollInfo | null,
    setRoll(roll: RollInfo | null): void,
  }): JSX.Element | null {

  const [result, setResult] = useState(null as number[] | null)

  if (roll == null || !roll.skill) {
    return null
  }

  function closeModal() {
    setResult(null)
    setRoll(null)
  }

  function setBonus(bonus: number): void {
    setRoll(modifyObject(roll, 'bonus', bonus))
  }

  function setAspect(name: string, score: number): void {
    setRoll(modifyObject(roll, 'aspect', {
      name: name,
      score: score,
    }))
  }

  function rollDice() {
    if (roll != null) {
      const result = caltrops.rollDice(roll)
      setResult(result);
    }
  }

  return <Modal open={true} onClickBackdrop={closeModal}>
    <h1 className='font-bold text-2xl mb-4'>Roll {roll.skill.name}</h1>

    <label className="label">
        <span className="label-text">Select aspect</span>
    </label>
    <div className='flex justify-center'>
      <div className='grid grid-cols-1 gap-2'>
        {
          attributes.map( attr => 
            <div className="btn-group">
            {
              attr.aspects.map( a => {
                let selected = roll.aspect?.name === a.name
                return <button
                  className={ `btn btn-sm w-24 ${ selected ? 'btn-active' : '' }`}
                  onClick={() => {setAspect(a.name, scores[a.name] ?? 0)}}
                >{a.name}</button>
                }
              )
            }
            </div>
          )
        }
      </div>
    </div>

    <label className="label">
        <span className="label-text">Roll bonus</span>
    </label>
    <PointEntryBox
      value={roll.bonus}
      setValue={setBonus}
      min={-9}
      max={9}
    />

    <div className='flex justify-center'>
      <button
        className='btn m-4 btn-primary'
        onClick={() => {rollDice()}}
        disabled={roll.aspect === null}
      >
        Roll { caltrops.rollDiceCount(roll) } Dice
      </button>
    </div>

    <RollResultModal
      results={result}
      info={roll}
      close={() => { closeModal(); }}
    />

  </Modal>
}

export default RollCreateModal