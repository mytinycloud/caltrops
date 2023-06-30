import { useDrag } from 'react-dnd';
import { SheetEquipment } from '../lib/rules';
import PointEntryBox from './PointEntryBox';
import IconButton from './IconButton';
import { EditMode, modifyObject } from '../lib/util';

type ModifierFunction = (sheetEquipment: SheetEquipment) => void;

export function EquipmentRow({ sheetEquipment, onEdit, onRemove, unlockStackSize = false, editable = EditMode.Live }: {
    sheetEquipment: SheetEquipment,
    onEdit: ModifierFunction,
    onRemove: ModifierFunction,
    unlockStackSize: boolean,
    editable?: EditMode
  }) {

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'equipment',
      item: sheetEquipment,
      end(item, monitor) {
        if (!monitor.didDrop()) return;

        if ((item.count || 0) <= 0) {
          // onRemove(item)
        } else {
          // onEdit(item)
        }
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    [sheetEquipment]
  )

  return (<tr ref={dragRef} style={{ opacity }} className='hover' >
    <td className='w-full'>
      {sheetEquipment.name}
    </td>
    <td>
      <PointEntryBox
        value={sheetEquipment.count ?? 0}
        setValue={v => { onEdit(modifyObject(sheetEquipment, 'count', v)) }}
        max={unlockStackSize ? 1000 : sheetEquipment.stack ?? 1}
        visible={(sheetEquipment.stack ?? 1) > 1}
        editable={editable >= EditMode.Live}
      />
    </td>
    <td>
      <IconButton
        icon='cross'
        onClick={() => { onRemove(sheetEquipment) }}
        btnStyle='btn-outline btn-error'
        enabled={editable >= EditMode.Live}
      />
    </td>
  </tr>)
}