import { menuItems } from "../data/db"
import { MenuItem, OrderItem } from "../types/types"

export type OrderTipActions =
    { type: 'add-item', payload: { item: MenuItem } } |
    { type: 'remove-item', payload: { id: MenuItem['id'] } } |
    { type: 'restart-order' } |
    { type: 'set-tip', payload: {percentage: number}} |
    { type: 'save-order' }

export type OrderTipState = {
    data: MenuItem[]
    order: OrderItem[]
    tip: number
}

const initialOrder = (): OrderItem[] => {
    const localStorageOrder = localStorage.getItem("order")
    return localStorageOrder ? JSON.parse(localStorageOrder) : []
}

const initialTip = (): number => {
    const localStorageTip = localStorage.getItem("tip")
    return localStorageTip ? JSON.parse(localStorageTip) : 0
}

export const initialState: OrderTipState = {
    data: menuItems,
    order: initialOrder(),
    tip: initialTip()
}

export const orderTipReducer = (state: OrderTipState = initialState, actions: OrderTipActions) => {
    if (actions.type === 'add-item') {
        const itemExist = state.order.find(orderItem => orderItem.id === actions.payload.item.id)
        let updatedOrder: OrderItem[] = []
        if (itemExist) {
            updatedOrder = state.order.map(item => {
                if (item.id === actions.payload.item.id) {
                    return { ...item, quantity: item.quantity + 1 }
                } else {
                    return item
                }
            })
        } else {
            const newItem: OrderItem = {...actions.payload.item, quantity: 1}
            updatedOrder = [...state.order, newItem] 
        }
        return {
            ...state,
            order: updatedOrder
        }
    }

    if(actions.type === 'remove-item'){
        const updatedOrder: OrderItem[] = state.order.filter(item => item.id !== actions.payload.id)
        return{
            ...state,
            order: updatedOrder
        }
    }

    if(actions.type === 'restart-order'){
        return{
            ...state,
            order: [],
            tip: 0
        }
    }

    if(actions.type === 'save-order'){
        return{
            ...state,
            order: [],
            tip: 0
        }
    }

    if(actions.type === 'set-tip'){
        return{
            ...state,
            tip: actions.payload.percentage
        }
    }

    return state
}