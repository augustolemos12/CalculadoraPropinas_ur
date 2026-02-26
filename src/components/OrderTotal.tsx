import { Dispatch, useMemo } from "react";
import { OrderItem } from "../types/types";
import { formatCurrency } from "../helpers";
import { OrderTipActions } from "../reducers/order_tip-reducer";

type OrderTotalProps = {
  order: OrderItem[],
  tip: number,
  dispatch: Dispatch<OrderTipActions>
}

export default function OrderTotal({ order, tip, dispatch }: OrderTotalProps) {
    
    const subtotalAmount = useMemo(() => order.reduce( (total,item) => total + (item.price * item.quantity), 0), [order])
    const tipAmount = useMemo((() => subtotalAmount * tip), [tip, order])
    const totalAmount = useMemo((() => subtotalAmount + tipAmount), [tip, order])

    return (
        <>
        <div className="space-y-3">
            <h2 className="text-2xl font-black">Totales y Propina:</h2>
            <p>
            Subtotal a pagar:
            <span className="font-bold"> {formatCurrency(subtotalAmount)}</span>
            </p>

            <p>
            Propina:
            <span className="font-bold"> {formatCurrency(tipAmount)}</span>
            </p>

            <p>
            Total a pagar:
            <span className="font-bold"> {formatCurrency(totalAmount)}</span>
            </p>
        </div>

        <div className="flex flex-row gap-2 justify-center items-center">
            <div>
                <button
                    className="w-full bg-green-900 hover:bg-green-950 text-white p-3 uppercase font-bold mt-10 rounded-2xl disabled:opacity-10"
                    disabled={totalAmount === 0}
                    onClick={()=>dispatch({type: 'save-order'})}
                >
                    Guardar Orden
                </button>
            </div>

            <div>
                <button
                    className="w-full bg-red-900 hover:bg-red-950 text-white p-3 uppercase font-bold mt-10 rounded-2xl disabled:opacity-10"
                    disabled={totalAmount === 0}
                    onClick={()=>dispatch({type:'restart-order'})}
                >
                    Restablecer Orden
                </button>
            </div>
            
        </div>
        
        </>
    );
}
