// External imports
import { useState } from 'react'

// Components
import TextEntryBox from './TextEntryBox';
import { Modal } from 'react-daisyui'

// Interal imports
import { Attribute, Aspect, RollInfo, Dictionary } from '../lib/rules'
import PointEntryBox from './PointEntryBox';
import caltrops from '../lib/caltrops';
import RollResultModal from './RollResultModal';


function RollCreateModal({attributes, scores, roll, close}: {
    attributes: Attribute[],
    scores: Dictionary<number>,
    roll: RollInfo | null,
    close(): void,
  }): JSX.Element | null {

  const [aspect, setAspect] = useState(null as Aspect | null)
  const [bonus, setBonus] = useState(0)
  const [result, setResult] = useState(null as number[] | null)

  if (roll == null || !roll.skill) {
    return null
  }

  function closeModal() {
    //setAspect(null)
    setBonus(0)
    setResult(null)
    close()
  }

  let info: RollInfo = {
    skill: roll.skill,
    bonus: bonus,
  }
  if (aspect) {
    info.aspect = {
      name: aspect.name,
      score: scores[aspect.name] ?? 0
    }
  }

  function rollDice() {
    const result = caltrops.rollDice(info)
    setResult(result);
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
                let selected = aspect?.name === a.name
                return <button
                  className={ `btn btn-sm w-24 ${ selected ? 'btn-active' : '' }`}
                  onClick={() => {setAspect(a)}}
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
      value={bonus}
      setValue={setBonus}
      min={-9}
      max={9}
    />

    <div className='flex justify-center'>
      <button
        className='btn m-4 btn-primary'
        onClick={() => {rollDice()}}
        disabled={aspect === null}
      >
        Roll { caltrops.rollDiceCount(info) } Dice
      </button>
    </div>

    <RollResultModal
      results={result}
      close={() => { closeModal(); }}
    />

  </Modal>
}

export default RollCreateModal