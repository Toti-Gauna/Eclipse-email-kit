import {existsSync} from 'node:fs';
export const chromiumOptions=existsSync('/usr/bin/chromium')?{executablePath:'/usr/bin/chromium',args:['--no-sandbox']}:{};
