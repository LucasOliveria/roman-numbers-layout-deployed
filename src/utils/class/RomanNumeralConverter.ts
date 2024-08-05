// Importa o tipo TRomanNumeralMapping
import { TRomanNumeralMapping } from "../types/TRomanNumeralMapping";

// Declaração da Classe que terá os métodos de conversão
export class RomanNumeralConverter {
  // Atributo que receberá o array com o mapeamento dos numeros romanos e arábicos
  private romanNumeralMappings: TRomanNumeralMapping[];

  constructor() {
    // Inicialização do array de mapeamento dos números
    this.romanNumeralMappings = [
      { romanNumeral: 'M', value: 1000 },
      { romanNumeral: 'CM', value: 900 },
      { romanNumeral: 'D', value: 500 },
      { romanNumeral: 'CD', value: 400 },
      { romanNumeral: 'C', value: 100 },
      { romanNumeral: 'XC', value: 90 },
      { romanNumeral: 'L', value: 50 },
      { romanNumeral: 'XL', value: 40 },
      { romanNumeral: 'X', value: 10 },
      { romanNumeral: 'IX', value: 9 },
      { romanNumeral: 'V', value: 5 },
      { romanNumeral: 'IV', value: 4 },
      { romanNumeral: 'I', value: 1 }
    ];
  }

  // Método para converter números decimais em algarismos romanos
  arabicToRoman(value: number): TRomanNumeralMapping {
    let romanNumeral: string = "";
    let arabicNumeral = value;

    // Código que lida com números maiores que 3999
    if (arabicNumeral > 3999) {
      const thousands = Math.floor(arabicNumeral / 1000);
      romanNumeral += `|${this.arabicToRoman(thousands).romanNumeral}|`; //  vinculum
      arabicNumeral %= 1000;
    }

    // Loop para percorrer a lista de mapeamentos e constrói o número romano
    for (let i = 0; i < this.romanNumeralMappings.length; i++) {
      // Laço while ativo enquanto o numero que fornecemos for maior ou igual a um dos itens da lista 
      while (arabicNumeral >= this.romanNumeralMappings[i].value) {
        romanNumeral += this.romanNumeralMappings[i].romanNumeral;

        arabicNumeral -= this.romanNumeralMappings[i].value;
      }
    }

    // Retorna um objeto com número romano final e o valor decimal passado como argumento
    return { romanNumeral, value };
  }

  // Método para converter algarismos romanos em números decimais
  romanToArabic(romanNumeral: string): TRomanNumeralMapping | string {
    let arabicNumeral: number = 0
    // Transforma a string recebida para maiúsculo
    let romanNumeralUpperCase = romanNumeral.toUpperCase();
    // Flag booleana para controle de erros
    let errorFound = false;

    // Loop para percorrer a string de números romanos
    for (let i = 0; i < romanNumeralUpperCase.length; i++) {
      const currentNextRomanNumeral = romanNumeralUpperCase[i] + romanNumeralUpperCase[i + 1];
      errorFound = false

      // Verifica se o próximo caractere existe para considerar numerais compostos (ex: IV, IX)
      if (romanNumeralUpperCase[i + 1]) {

        // Verifica se a combinação atual de caracteres é uma das subtrações válidas
        if (currentNextRomanNumeral !== "IX" && currentNextRomanNumeral !== "IV" && currentNextRomanNumeral !== "XL" && currentNextRomanNumeral !== "XC" && currentNextRomanNumeral !== "CD" && currentNextRomanNumeral !== "CM") {

          // Busca os valor atual na lista de mapeamentos
          const currentValue = this.romanNumeralMappings.find(numeral => numeral.romanNumeral === romanNumeralUpperCase[i]);

          // Busca os proximo valor na lista de mapeamentos
          const nextValue = this.romanNumeralMappings.find(numeral => numeral.romanNumeral === romanNumeralUpperCase[i + 1]);

          // Se algum dos valores não for encontrado, retorna um erro
          if (!currentValue?.value || !nextValue?.value) {
            return "Informe um algarismo romano válido";

            // Se o valor atual for menor que o próximo isso já demonstrará um erro a ser tratado
          } else if (currentValue?.value < nextValue?.value) {
            const subtraction = nextValue.value - currentValue.value;
            arabicNumeral += subtraction;

            // Flag booleana
            errorFound = true;

            // Pula o próximo caractere 
            // esse i++ em conjunto com o i++ do proprio loop fazem os números serem avaliados de 2 em 2
            // caso um erro seja detectado
            i++
          }
        }
      }

      // Se não houve erro na combinação de caracteres atual o codigo segue normalmente
      if (!errorFound) {
        // Loop para percorrer a lista de mapeamento
        for (let j = 0; j < this.romanNumeralMappings.length; j++) {

          // Considerar condições tanto de algarismos sozinhos quanto de algarimos em dupla
          if (currentNextRomanNumeral === this.romanNumeralMappings[j].romanNumeral) {
            arabicNumeral += this.romanNumeralMappings[j].value;
            i++;
            break;
          } else if (romanNumeralUpperCase[i] === this.romanNumeralMappings[j].romanNumeral) {
            arabicNumeral += this.romanNumeralMappings[j].value;

            break;
          }
        }
      }
    }

    // Verificar se o valor encontrado é zero. Caso sim, isso configura um erro e a mensagem deve ser informada
    if (arabicNumeral === 0) {
      return "Informe um algarismo romano válido";
    }

    // Apos obter o numero decimal correspondente é feita uma ultima correção usando o método arabicToRoman
    // Retorna um objeto com número romano final e o valor decimal passado como argumento
    return this.arabicToRoman(arabicNumeral)
  }
}