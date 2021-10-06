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
  wrappedAudioBuffer.audioBufferProperty.set( phetAudioContext.createBuffer( 1, 1, phetAudioContext.sampleRate ) );
  unlock();
};
phetAudioContext.decodeAudioData( soundByteArray.buffer, onDecodeSuccess, onDecodeError ).catch( e => { console.warn( 'promise rejection caught for audio decode, error = ' + e ) } );
export default wrappedAudioBuffer;