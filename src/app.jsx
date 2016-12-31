import './common/remset';

import React from 'react';
import ReactDOM, {render} from 'react-dom';
import Router from 'react-router';
import router from './route/route';
import init from './common/init';

import './style/normalize.css';
import './style/index.less';
import './style/components.less';

console.log('page init');

render(
    <div>
    {router}
</div>, document.getElementById("main"));