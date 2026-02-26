import { Dispatch } from "react"
import { OrderTipActions } from "../reducers/order_tip-reducer"

const tipOptions = [
    {
      id: 'tip-10',
      value: .10,
      label: '10%'
    },
    {
      id: 'tip-20',
      value: .20,
      label: '20%'
    },
    {
      id: 'tip-50',
      value: .50,
      label: '50%'
    },
]

type TipPercentageFormProps = {
    tip: number,
    dispatch: Dispatch<OrderTipActions>
    
}

export default function TipPercentageForm({ tip, dispatch }: TipPercentageFormProps) {
  return (
    <div>
        <h3 className="text-2xl font-black">Propina</h3>
        <form>
            {tipOptions.map(tipOption => (
                <div className="flex gap-2.5" key={tipOption.id}>
                    <input 
                        type="radio" 
                        name="tip" 
                        id={tipOption.id} 
                        value={tipOption.value}
                        onChange={e => dispatch({type: 'set-tip', payload: {percentage: +e.target.value}})}
                        checked={tipOption.value === tip }
                    />
                    <label htmlFor={tipOption.id}>{tipOption.label}</label>
                </div>
            ))}
        </form>
    </div>
  )
}
