/**
 * Created by eason on 17/7/23.
 */
console.log('run.js 运行了');
let current_path = process.cwd();
require('runkoa')(current_path + '/bin/www');