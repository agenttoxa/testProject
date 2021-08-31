export default (text) => {
  let transl = {
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'г': 'g',
    'д': 'd',
    'е': 'e',
    'ё': 'e',
    'ж': 'zh',
    'з': 'z',
    'и': 'i',
    'й': 'j',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'х': 'h',
    'ц': 'c',
    'ч': 'ch',
    'ш': 'sh',
    'щ': 'sh',
    'ы': 'y',
    'ь': '',
    'ъ': '',
    'э': 'e',
    'ю': 'yu',
    'я': 'ya'
  }
  let result = ''
  if (text) {
    text = text.replace(/[_]+/g, ' ').replace(/[^0-9a-zA-Zaа-яА-Я_ .]+/g, '')
    text = text.toLowerCase().trim()
    text = text.replace(/[ ]/g, '-')

    let currentSim = ''
    for (let i = 0; i < text.length; i++) {
      if (i > 50) {
        break
      }
      if (transl[text[i]] !== undefined) {
        if (currentSim !== transl[text[i]]) {
          result += transl[text[i]]
          currentSim = transl[text[i]]
        }
      } else {
        result += text[i]
        currentSim = text[i]
      }
    }
  }
  return result
}
