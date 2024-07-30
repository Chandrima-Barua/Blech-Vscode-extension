let sModel = {};

const getSModel = () => sModel;
const setSModel = (model: {}) => {
    sModel = model;
};

export { getSModel, setSModel };
