/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,//swxAAABNABFVQxgAFlHyy3HtACAGmAmgwwAPiAEHFHNU5iZwoGOD7+cl5/4YWfD//lw+Xf/LmxBf641dLntq3Wd7IBXaQAAIqfgCEZIct7CCLZHSsEQ7gmJEINDM6agsxqN6Kws1DQR0jclGlwgJ0yxD1IOmXCQGnZRjQQbWXCSPeZf/rP6XZVf5oueT5uFpMv2LX036X0mUqG//syxAOACH0LbbzzgBEGoW29h5x4gAR0UX0gSAnHT1Cz9OfBB0axGmLgfEihQYUQQcFPmS4ZYTDXzPo3/8aINm//+giNRvM///sNGDQZt/hP14wT9FG0T/Ax4BQ+W5RkyorTrKps3/KTF/0dl4x72sXUgrCE9vPg8Eg04Xv3b1//xvHv//vG7bf///iYiYF//PGepWcI2yOnB2CccP/7MsQEgAitC2nnrakBCaNt9PY0uhL7mWwJ1yaHbAnCKh2PgdqlmlM8sJaIrp/QJgIUJCs29v//8eBwgHv//pkU3Utv///zchkIlS31eTTm0rINsJuQYCzQEHI/NwH1oHy4ZrXFkyJwga7Veo47xYZpBI75+NhZ/V9L//Kch///yQ/9f//sPpJHRCH1NmvnQ8N1vNmIW1G0hICCAOP/+zLEBIAIgR1rrD1FkQ6jbbWEqLJ+o+SJzarzTR6fRTJrffQ2rEOJdOHAsp+VATD7+v//+JilP/0+YTDQ0db0///kAoCyIos7ZfyALP3lq8xdg9iHAmaApN6LrZBgXQBoA2jQEfsDwzvFzxNMq24jYRX8wVA1r/7t/b8dNED///F+/9P//cfDEVgRszqiLwyFf7y6ZQaHMmYXIDFg//swxASACJkbc+etp1ENIW408ynKDiQlmGCI/odSEpSIhf2Dkj+WIJ1UJkBG3+Xg+iIXb0/q//zVZS///mD2/3//8xE6HcJiWoPc19Qrv3zTQbczcqYKugJ9XQTSE0sRO3GFIrP0gXr8JqZKAgYgVEO/7BICF1+KjtXb/+PlHH//+glDlvpUz//Y1REAQlKd/KiG6bRtitAtRYMA//syxAQACH0LcaelpJkUoW509bV2xTLZYR16ODhMutWSRZubmCeozUbf0wb4tVrKCWoy9rf/zw5BljmX/1fzNv////NRajuPXy82oaRyO3qJcL+psBoFAwIcdZNYrdn1tZeMbvxHBm8926oePEFn/+wiCVc+Qb79bf//y8PUHce//9azQ3OJf6f//dAcYpFe9R71i1drkF/V2IkAhv/7MsQDgAgtC2unsaWRFaFttPaeG4Fqxy2AMUwvNAjfJoG50HQH8fXcX0fPYyYTxN3/cdo6Zt9vX//mKzX//+VPf///+olg1lF+sz84SvLSDbSag7FQ4C2YA+wUtyqU6grLH9jkK6s01JYOgO9h7f0RzBZlh889cDeiFXU/3/Gzi9///10////qNFC13xK6goDvnUiGjElUtC1CZgH/+zLEBAAIYQtnrDGlkRKhbfz1nar6m2eBVWAvsvocfOEItS7dvd52EwSE5/pBIQ4CXLwxTBVx2Oup7//rMSeJs3//6/////WWDwduo98j6FMFh1VmFegRYBvX5D1D5685nNETyh8pzDiF14tqxOUJcjO//2BsBCNyoG3xC5Ju66f/Sb///Tb/f//yhMOE/uNfE4Psraxv7f0ayGGB//swxAQACEENb6exp3EWIa189qniNvKKDYsWFHHJLYK08KzX3mlluuTzgOyYJZ/cFJDMiZm1O7f//5jKb//9a9qH///9y0xRfyF50bNd6lQIdkZUA3BVYBXMMImILOoeBG1tEQmjeFK7yyFBVtMkEyD/WFkHpFZR8P26D63/6KFx//8xytF/2//8qWIyk/QWF48BTqW0b+28nYBh//syxAOAB5ELc6Yo7TDuoaz09Kiigdi0HgIeDVVAfswe+cE003jjkQvKiH/lA4ASLp5GVQBLtsrHp/9Y7///7////0NJW8inKLkXA/npQpAIqBesIvoDHFH8srZXcLBily/MlgbyALr+RgEwVM5/YXP6//6X///pv/v//6Ew72mim2UE9/WqaG2d0AsABgF6n5PD0LT32X8cCV1ai//7MsQLAAeNDWOsNKuQ6BGtdPOyKuLzmQyqrqTHYkFi38YQWjk9kUlxd/Jr/9YE////////VP0GN3Btdgus+oOzlUAfOFzsFq0g67U/f42mUPhKxKU3UcZBWof/gBgXFqgytAIHNqSanl/xomBNz/fR//Mc7XVoa2W4jUqKAY/YwNG56nRHkKy+qBn0qZzwuN6LyABhvzAWAE3UWe7/+zLEE4AHiQtlp7FFkO4Ra7WGNOotq+e1P/3V////b67//+isjeT+o5paEtd1AsAhQFPQXXQMqOLXihPecP/wTD7haqbrNolYNDMa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';
const soundByteArray = base64SoundToByteArray( phetAudioContext, soundURI );
const unlock = simLauncher.createLock( soundURI );
const wrappedAudioBuffer = new WrappedAudioBuffer();
const onDecodeSuccess = decodedAudio => {
  wrappedAudioBuffer.audioBufferProperty.set( decodedAudio );
  unlock();
};
const onDecodeError = decodeError => {
  console.warn( 'decode of audio data failed, using stubbed sound, error: ' + decodeError );
  wrappedAudioBuffer.audioBufferProperty.set( phetAudioContext.createBuffer( 1, 0, phetAudioContext.sampleRate ) );
  unlock();
};
phetAudioContext.decodeAudioData( soundByteArray.buffer, onDecodeSuccess, onDecodeError );
export default wrappedAudioBuffer;