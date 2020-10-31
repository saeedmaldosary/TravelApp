import {
    getData,
    removeFlight
} from "./js/fetchData.js";

import './styles/resets.scss'
import './styles/style.scss'


document.getElementById('submitBtn').addEventListener('click', getData);
document.getElementById('removeBtn').addEventListener('click', removeFlight);


export {
    getData,
    removeFlight
}