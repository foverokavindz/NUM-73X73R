import { useState } from 'react';

const App = () => {
  const [generatedText, setGeneratedText] = useState({ v1: '', v2: '' });
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(1);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setGeneratedText(letterMix(inputText));
    setLoading(false);
  };

  const handleChange = (text: string) => {
    setInputText(text);
    setGeneratedText(letterMix(text));
  };

  const handleSelectedStyle = (style: number) => {
    setSelectedStyle(style);
  };

  const handleCopyClick = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="flex flex-col justify-start items-center container mx-auto px-4 h-screen font-mono">
      <div className="sm:h-full md:h-2/6 flex flex-col justify-center items-center gap-5">
        <div>
          <h1 className="text-5xl subpixel-antialiased font-semibold ">
            Num Texter
          </h1>
        </div>
        <div>
          <div className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            <a
              href="https://github.com/foverokavindz/NUM-73X73R"
              target="_blank"
            >
              <div className="flex flex-row gap-2 justify-center items-center">
                Get Code
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 md:gap-16 h-full">
        <div className="flex flex-col gap-5 w-full">
          <div>
            <label
              htmlFor="input_text-input"
              className="block  text-md text-gray-900 mb-7 font-semibold"
            >
              Your Text
            </label>
            <textarea
              onChange={(e) => handleChange(e.target.value)}
              id="input_text"
              placeholder="Insert your text here.."
              className="h-96 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 "
            ></textarea>
          </div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={() => handleGenerate()}
          >
            <div className="flex flex-row gap-2 justify-center items-center">
              {loading ? (
                'Generating...'
              ) : (
                <>
                  Generate
                  <svg
                    className="w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16.153 19 21 12l-4.847-7H3l4.848 7L3 19h13.153Z"
                    />
                  </svg>
                </>
              )}
            </div>
          </button>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <div>
            <div className="flex flex-row justify-between items-center mb-5">
              <label
                htmlFor="input_text-input"
                className="block  text-md text-gray-900 font-semibold"
              >
                Generated Text
              </label>
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-4 py-1 text-sm font-medium  rounded-s-lg  ${
                    selectedStyle === 1
                      ? 'text-white bg-blue-500 border border-blue-200 hover:bg-blue-600 '
                      : 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700'
                  } `}
                  onClick={() => handleSelectedStyle(1)}
                >
                  Style 1
                </button>

                <button
                  type="button"
                  className={`px-4 py-1 text-sm font-medium  rounded-e-lg  ${
                    selectedStyle === 2
                      ? 'text-white bg-blue-500 border border-blue-200 hover:bg-blue-600 '
                      : 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700'
                  } `}
                  onClick={() => handleSelectedStyle(2)}
                >
                  Style 2
                </button>
              </div>
            </div>
            <textarea
              value={
                selectedStyle === 1
                  ? generatedText.v1
                  : selectedStyle === 2
                  ? generatedText.v2
                  : ''
              }
              id="input_text"
              placeholder="You will see generated text here.."
              className="h-96 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 "
            ></textarea>
          </div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={() =>
              handleCopyClick(
                selectedStyle === 1 ? generatedText.v1 : generatedText.v2
              )
            }
          >
            <div className="flex flex-row gap-2 justify-center items-center">
              {copied ? 'Copied!' : 'Copy'}
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

export const letterMix = (word: string) => {
  const letters = [
    { letter: ' ', v1: ' ', v2: ' ' },
    { letter: '!', v1: '!', v2: '!' },
    { letter: '.', v1: '.', v2: '.' },
    { letter: ',', v1: ',', v2: ',' },
    { letter: '?', v1: '?', v2: '?' },
    { letter: ':', v1: ':', v2: ':' },
    { letter: ';', v1: ';', v2: ';' },
    { letter: '(', v1: '(', v2: '(' },
    { letter: ')', v1: ')', v2: ')' },
    { letter: '[', v1: '[', v2: '[' },
    { letter: ']', v1: ']', v2: ']' },
    { letter: '{', v1: '{', v2: '{' },
    { letter: '}', v1: '}', v2: '}' },
    { letter: '<', v1: '<', v2: '<' },
    { letter: '>', v1: '>', v2: '>' },
    { letter: '/', v1: '/', v2: '/' },
    { letter: '\\', v1: '\\', v2: '\\' },
    { letter: '|', v1: '|', v2: '|' },
    { letter: '-', v1: '-', v2: '-' },
    { letter: '_', v1: '_', v2: '_' },
    { letter: '=', v1: '=', v2: '=' },
    { letter: '+', v1: '+', v2: '+' },
    { letter: '*', v1: '*', v2: '*' },
    { letter: '&', v1: '&', v2: '&' },
    { letter: '^', v1: '^', v2: '^' },
    { letter: '%', v1: '%', v2: '%' },
    { letter: '$', v1: '$', v2: '$' },
    { letter: '#', v1: '#', v2: '#' },
    { letter: '@', v1: '@', v2: '@' },
    { letter: '!', v1: '!', v2: '!' },
    { letter: '~', v1: '~', v2: '~' },
    { letter: '`', v1: '`', v2: '`' },
    { letter: '"', v1: '"', v2: '"' },
    { letter: "'", v1: "'", v2: "'" },
    { letter: '0', v1: '0', v2: '0' },
    { letter: '1', v1: '1', v2: '1' },
    { letter: '2', v1: '2', v2: '2' },
    { letter: '3', v1: '3', v2: '3' },
    { letter: '4', v1: '4', v2: '4' },
    { letter: '5', v1: '5', v2: '5' },
    { letter: '6', v1: '6', v2: '6' },
    { letter: '7', v1: '7', v2: '7' },
    { letter: '8', v1: '8', v2: '8' },
    { letter: '9', v1: '9', v2: '9' },
    { letter: 'A', v1: 4, v2: 4 },
    { letter: 'B', v1: 8, v2: 8 },
    { letter: 'C', v1: '( ', v2: 'C' },
    { letter: 'D', v1: '|)', v2: 'D' },
    { letter: 'E', v1: 3, v2: 3 },
    { letter: 'F', v1: 'F', v2: 'F' },
    { letter: 'G', v1: 6, v2: 6 },
    { letter: 'H', v1: '|-|', v2: 'H' },
    { letter: 'I', v1: 1, v2: 1 },
    { letter: 'J', v1: 'J', v2: 'J' },
    { letter: 'K', v1: '|<', v2: 'K' },
    { letter: 'L', v1: '|_', v2: 'L' },
    { letter: 'M', v1: '|\\/|', v2: 'M' },
    { letter: 'N', v1: '|\\|', v2: 'N' },
    { letter: 'O', v1: 0, v2: 0 },
    { letter: 'P', v1: '?', v2: 'P' },
    { letter: 'Q', v1: 'Q', v2: 'Q' },
    { letter: 'R', v1: 'R', v2: 'R' },
    { letter: 'S', v1: 5, v2: 5 },
    { letter: 'T', v1: 7, v2: 7 },
    { letter: 'U', v1: '\\_/', v2: 'U' },
    { letter: 'V', v1: '\\/', v2: 'V' },
    { letter: 'W', v1: '\\/\\/', v2: 'W' },
    { letter: 'X', v1: 'X', v2: 'X' },
    { letter: 'Y', v1: 'Y', v2: 'Y' },
    { letter: 'Z', v1: 2, v2: 2 },
  ];
  const letterArr = word.toUpperCase().split('');

  let v1 = '';
  let v2 = '';

  for (let i = 0; i < letterArr.length; i++) {
    letters.filter((letter) => {
      if (letter.letter === letterArr[i]) {
        v1 += letter.v1;
        v2 += letter.v2;
      }
    });
  }

  return { v1, v2 };
};
