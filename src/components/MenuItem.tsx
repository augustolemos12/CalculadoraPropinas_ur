import type { MenuItem } from "../types/types"
import { formatCurrency } from "../helpers"
import { Dispatch } from "react"
import { OrderTipActions } from "../reducers/order_tip-reducer"

type MenuItemProps = {
    item: MenuItem
    dispatch: Dispatch<OrderTipActions>
}

export default function MenuItem({ item, dispatch }: MenuItemProps) {
    return (
        <>
            <button
                className="rounded-2xl border-2 border-black hover:bg-gray-300 w-full p-3 flex justify-between"
                onClick={() => dispatch({ type: 'add-item', payload: { item: item } })}
            >
                <p className="font-medium">{item.name}</p>
                <p className="font-black">{formatCurrency(item.price)}</p>
            </button>

        </>
    )
}
