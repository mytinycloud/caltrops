// Components
import { Modal } from 'react-daisyui'

// Interal imports

function RollResultModal({results, close}: {
    results: number[] | null,
    close(): void,
  }): JSX.Element | null {

  if (results == null) {
    return null
  }

  function closeModal() {
    close()
  }

  return <Modal open={true} onClickBackdrop={closeModal}>
    <h1 className='font-bold text-2xl mb-4'>Roll result</h1>
    <div className='flex gap-4 flex-row flex-wrap justify-center'>
      {
      results.map( (r, i) => {
        let success = r >= 4
        return <div
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          style={{
            animation: "ping 0.5s cubic-bezier(.49,.01,.83,.45)",
            animationDirection: "reverse",
            animationDelay: `${0.1 * i}s`,
            animationFillMode: "backwards"
          }}
          viewBox="0 0 100 100"
          strokeWidth={0}
          preserveAspectRatio="xMidYMid meet"
          >
            <polygon points="0,86 100,86 50,0"
              style={{strokeWidth: 2, stroke: success ? "hsl(var(--su))" : "hsl(var(--er))"}}
              fill={success ? "hsl(var(--suc))" : "hsl(var(--erc))"}
            />
            <text
              x={50}
              y={60}
              style={{fontSize: 48}}
              fill={success ? "hsl(var(--su))" : "hsl(var(--er))"}
              dominant-baseline="middle"
              text-anchor="middle"
            >
              {r}
            </text>
        </svg>
        </div>
        })
      }
    </div>
  </Modal>
}

export default RollResultModal