/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;