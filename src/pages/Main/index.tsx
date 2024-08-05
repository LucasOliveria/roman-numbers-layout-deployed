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

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const submitEvent = event.nativeEvent as SubmitEvent;
    const submitter = submitEvent.submitter as HTMLButtonElement

    function formatRomanNumeral(romanNumeral: string): string {
      const regex = /\|([^\|]+)\|/g;
      return romanNumeral.replace(regex, '<span class="overline">$1</span>');
    }

    if (submitter.name === "romanToArabic") {
      if (!form.roman) {
        return
      }

      const conversor = new RomanNumeralConverter();

      const response = conversor.romanToArabic(form.roman) as TRomanNumeralMapping | string;

      if (typeof response === "string") {
        return setSpan(response);
      }

      const formattedRomanNumeral = formatRomanNumeral(response.romanNumeral);
      setSpan(`${formattedRomanNumeral} = ${response.value}`);

      const cleanedRomanNumeral = response.romanNumeral.replace(/\|/g, '');
      setForm({ roman: cleanedRomanNumeral, decimal: `${response.value}` });
      return
    }

    if (submitter.name === "arabicToRoman") {
      if (!form.decimal) {
        return
      }

      const conversor = new RomanNumeralConverter();

      const response = conversor.arabicToRoman(Number(form.decimal)) as TRomanNumeralMapping

      const formattedRomanNumeral = formatRomanNumeral(response.romanNumeral);
      setSpan(`${formattedRomanNumeral} = ${response.value}`);

      const cleanedRomanNumeral = response.romanNumeral.replace(/\|/g, '');
      setForm({ roman: cleanedRomanNumeral, decimal: `${response.value}` });
      return
    }
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
        <span dangerouslySetInnerHTML={{ __html: span }}></span>
      </div>
    </div>
  )
}

export default Main
