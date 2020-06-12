import { Launch } from 'wpe-lightning-sdk'
import App from './App.js'

export default function() {
    console.log(arguments)
    return Launch(App, ...arguments)
}
