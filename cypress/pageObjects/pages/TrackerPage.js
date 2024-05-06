import header from '../components/Header';
import BasePage from './BasePage';

class TrackerPage extends BasePage {
    constructor() {
        super();
        this.header = header;
    }
}

const trackerPage = new TrackerPage();
export default trackerPage
