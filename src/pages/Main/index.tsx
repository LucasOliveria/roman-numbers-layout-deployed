import { ChangeEvent, FormEvent, useState } from 'react';
import { RomanNumeralConverter } from '../../utils/class/RomanNumeralConverter';
import { TRomanNumeralMapping } from '../../utils/types/TRomanNumeralMapping';
import './style.css';

function Main() {
  const [form, setForm] = useState({
    roman: "",
    decimal: ""
  });
  const [span, setSpan] = useState("");
  const [spanVinculum, setSpanVinculum] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const submitEvent = event.nativeEvent as SubmitEvent;
    const submitter = submitEvent.submitter as HTMLButtonElement
    setSpanVinculum("");
    setSpan("");

    const converter = new RomanNumeralConverter();

    if (submitter.name === "romanToArabic") {
      if (!form.roman) {
        return
      }
      const response = converter.romanToArabic(form.roman) as TRomanNumeralMapping | string;

      if (typeof response === "string") {
        return setSpan(response);
      }

      handleVinculum(response);
      return;
    }

    if (submitter.name === "arabicToRoman") {
      if (!form.decimal) {
        return;
      }

      if (Number(form.decimal) > 3888888) {
        return setSpan("Valor máximo aceitável: 3888888");
      }

      const response = converter.arabicToRoman(Number(form.decimal)) as TRomanNumeralMapping;
      handleVinculum(response);
      return;
    }
  }

  function handleVinculum(response: TRomanNumeralMapping) {
    const arrayRomanNumeral = response.romanNumeral.split("|");

    if (arrayRomanNumeral.length > 1) {
      setSpanVinculum(arrayRomanNumeral[1]);
      setSpan(`${arrayRomanNumeral[2]} = ${response.value}`);

      const cleanedRomanNumeral = response.romanNumeral.replace(/\|/g, '');
      setForm({ roman: cleanedRomanNumeral, decimal: `${response.value}` });
      return
    }

    setSpan(`${response.romanNumeral} = ${response.value}`);
    setForm({ roman: response.romanNumeral, decimal: `${response.value}` });
  }

  function handleChangeInputs(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.name === "roman") {
      event.target.value = event.target.value.toLocaleUpperCase();
    }

    if (event.target.name === "decimal" && Number(event.target.value) < 1) {
      event.target.value = "";
    }

    setForm({ ...form, [event.target.name]: event.target.value })
  }

  console.log("vinculum: ", spanVinculum);
  console.log("span: ", span);
  return (
    <div className='main'>
      <div className="container-form">
        <h2>Conversor de Algarismos Romanos</h2>
        <form onSubmit={handleSubmit}>
          <div className="container-input">
            <label htmlFor="roman">Romano:</label>
            <input type="text" name="roman" value={form.roman} id="roman" onChange={handleChangeInputs} />
            <button name='romanToArabic'>CONVERTER</button>
          </div>
          <div className="container-input">
            <label htmlFor="decimal">Decimal:</label>
            <input type="number" name="decimal" value={form.decimal} id="decimal" onChange={handleChangeInputs} />
            <button name='arabicToRoman'>CONVERTER</button>
          </div>
        </form>
        <span><span className='overline'>{spanVinculum}</span>{span}</span>
      </div>
    </div>
  )
}

export default Main
