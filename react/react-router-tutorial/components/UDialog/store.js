import { EventEmitter } from 'events';

const Constants = {
    SHOW    : 'SHOW',
    CLOSE   : 'CLOSE',
    REFRESH : 'REFRESH'
};

export default class PopupStore extends EventEmitter {
    constructor(props) {
        super(props);

        this.id      = 1;
        this.popups  = {};
        this.queue   = [];
        this.active  = null;
        this.plugins = {};
        this.Constants = {
            SHOW    : 'SHOW',
            CLOSE   : 'CLOSE',
            REFRESH : 'REFRESH'
        };
    }

    /**
     * Get popup ID
     */
    getId() {
        return 'id_' + (this.id++);
    }

    /**
     * Get active popup
     * @returns {*}
     */
    activePopup() {
        return this.popups[this.active];
    }

    /**
     * Close current popup
     */
    close() {
        if (!this.active) {
            return false;
        }

        let id      = this.active;
        this.active = null;

        this.emit(this.Constants.CLOSE);
        this.dispatch();

        this.value = null;

        return id;
    }

    /**
     * Dispatch next popup in queue
     */
    dispatch() {
        if (this.active || this.queue.length < 1) {
            return false;
        }

        let id = this.queue.shift();

        /** Set active */
        this.active = id;

        this.emit(this.Constants.SHOW);
    }

    /**
     * Refresh popup position
     * @param position
     */
    refreshPosition(position) {
        this.emit(this.Constants.REFRESH, position);
    }

    /**
     * Clear queue
     */
    clearQueue() {
        this.queue = [];
    }
}