/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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';
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