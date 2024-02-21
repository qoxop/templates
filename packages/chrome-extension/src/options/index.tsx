import ReactDom from 'react-dom';
import { App } from './src/app';
import './index.css';
import "../common/content-reload";

ReactDom.render(<App />, document.getElementById('root'));