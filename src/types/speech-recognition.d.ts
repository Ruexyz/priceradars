/**
 * Web Speech API type declarations
 */

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  isFinal: boolean
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  maxAlternatives: number
  grammars: SpeechGrammarList
  
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null
  onend: ((this: SpeechRecognition, ev: Event) => void) | null
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null
  onsoundstart: ((this: SpeechRecognition, ev: Event) => void) | null
  onsoundend: ((this: SpeechRecognition, ev: Event) => void) | null
  onspeechstart: ((this: SpeechRecognition, ev: Event) => void) | null
  onspeechend: ((this: SpeechRecognition, ev: Event) => void) | null
  onaudiostart: ((this: SpeechRecognition, ev: Event) => void) | null
  onaudioend: ((this: SpeechRecognition, ev: Event) => void) | null
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null
  
  start(): void
  stop(): void
  abort(): void
}

interface SpeechGrammarList {
  length: number
  item(index: number): SpeechGrammar
  addFromString(string: string, weight?: number): void
  addFromURI(src: string, weight?: number): void
  [index: number]: SpeechGrammar
}

interface SpeechGrammar {
  src: string
  weight: number
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition
}

interface Window {
  SpeechRecognition?: SpeechRecognitionStatic
  webkitSpeechRecognition?: SpeechRecognitionStatic
}
