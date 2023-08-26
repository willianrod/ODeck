const EventTypes = {
  SYSTEM: {
    /**
     * Event to set handlers config
     */
    SET: 'SET_CONFIG',

    /**
     * Event used to request all handlers config
     */
    GET: 'GET_CONFIG',
  },
  DEVICES: {
    /**
     * Event used to select a device
     */
    SELECT: 'SELECT_DEVICE',

    /**
     * Event used to request all devices created on the server.
     */
    GET: 'GET_DEVICES',

    /**
     * Event used to broadcast all devices on the server
     */
    SET: 'SET_DEVICES',

    /**
     * Event used to request the creation of a device
     */
    CREATE: 'CREATE_DEVICE',

    /**
     * Event used to delete a device
     */
    DELETE: 'DELETE_DEVICE',

    /**
     * Event used to broadcast current device
     */
    CURRENT: 'CURRENT_DEVICE',
  },
  KEYS: {
    /**
     * Event used to request the creation of a key for a device
     */
    CREATE: 'CREATE_KEY',

    /**
     * Event used to broadcast all keys for a device
     */
    SET: 'SET_KEYS',

    /**
     * Event use do request all keys for a especif page
     */
    PAGE_KEYS: 'GET_PAGE_KEYS',

    /**
     * Event used to request the deletion of a certain key
     */
    DELETE: 'DELETE_KEY',

    /**
     * Event used to update key values
     */
    UPDATE: 'UPDATE_KEY',

    /**
     * Event used to indicate that a deck key was pressed
     */
    PRESS: 'KEY_PRESS',
  },
  PAGES: {
    /**
     * Event used to broadcast currentPage for a device
     */
    CURRENT: 'CURRENT_PAGE',

    /**
     * Event used to broadcast all pages for a device
     */
    SET: 'SET_PAGES',

    /**
     * Event used to request the creation of a page for a device
     */
    CREATE: 'CREATE_PAGE',

    /**
     * Event used to request the deletion of a page
     */
    DELETE: 'DELETE_PAGE',
  },
  IPS: {
    /**
     * Event used to request all available ip adresses
     */
    GET: 'GET_IPS',

    /**
     * Event used to broadcast all available ip adresses
     */
    SET: 'SET_IPS',
  },
  HANDLERS: {
    SET: 'SET_HANDLERS_DATA',
    UPDATE: 'UPDATE_HANDLERS_DATA',
  },
};

export default EventTypes;
