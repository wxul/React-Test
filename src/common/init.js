import { system, target } from './config';
import { Log } from './tools';
import fastclick from './fastclick';


//fastclick init
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoader', function() {
        fastclick.attach(document.body);
    }, false);
}