import { ChangeEvent, useState } from 'react'
import './style.css'

function Main() {
  const [form, setForm] = useState({
    roman: "",
    decimal: ""
  });

  function handleChangeInputs(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.name);
    if (event.target.name === "roman") {
      event.target.value = event.target.value.toLocaleUpperCase()
    }

    if (event.target.name === "decimal" && Number(event.target.value) < 1) {
      event.target.value = ""
    }

    setForm({ ...form, [event.target.name]: event.target.value })
  }
  return (
    <div className='main'>
      <div className="container-form">
        <h2>Conversor de Algarismos Romanos</h2>
        <form action="">
          <div className="container-input">
            <label htmlFor="roman">Romano:</label>
            <input type="text" name="roman" value={form.roman} id="roman" onChange={handleChangeInputs} />
            <button>CONVERTER</button>
          </div>
          <div className="container-input">
            <label htmlFor="decimal">Decimal:</label>
            <input type="number" name="decimal" value={form.decimal} id="decimal" onChange={handleChangeInputs} />
            <button>CONVERTER</button>
          </div>
        </form>
        <span>IV = 4</span>
      </div>
    </div>
  )
}

export default Main
