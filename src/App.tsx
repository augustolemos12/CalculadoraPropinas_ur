import { useEffect, useReducer } from "react";
import MenuItem from "./components/MenuItem";
import OrderContents from "./components/OrderContents";
import OrderTotal from "./components/OrderTotal";
import TipPercentageForm from "./components/TipPercentageForm";
import { initialState, orderTipReducer } from "./reducers/order_tip-reducer";

function App() {
  // const { addItem, order, removeItem, setTip, tip, restartOrder, saveOrder } = useOrder()

  const [state, dispatch] = useReducer(orderTipReducer, initialState)
  
  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(state.order))
    localStorage.setItem("tip", JSON.stringify(state.tip))
  }, [state.order, state.tip])

  return (
    <>
      <header className="bg-blue-300 py-5">
        <h1 className="text-center text-4xl font-black">
          Calculadora de Propinas y Consumo
        </h1>
      </header>

      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        {/*  MENÚ  */}
        <div className="p-5">
          <h2 className="text-4xl font-black">Menú</h2>
          <div className="space-y-3 mt-10">
            {state.data.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                dispatch={dispatch}
              />
            ))}
          </div>
        </div>

        {/* ORDEN */}
        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {
            state.order.length === 0
              ? (
                <p className="text-2xl text-center font-bold">La orden está vacía</p>
              )
              : (
                <>
                  <OrderContents
                    order={state.order}
                    dispatch={dispatch}
                  />

                  <TipPercentageForm
                    tip={state.tip}
                    dispatch={dispatch}
                  />

                  <OrderTotal
                    order={state.order}
                    tip={state.tip}
                    dispatch={dispatch}
                  />
                </>
              )
          }
        </div>
      </main>
    </>
  );
}

export default App;
